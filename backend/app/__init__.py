import sys
import requests
import random
from collections import Counter

from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.exceptions import abort

from backend.blockchain.blockchain import Blockchain
from backend.wallet.wallet import Wallet
from backend.wallet.transaction import Transaction
from backend.wallet.transaction_pool import TransactionPool
from backend.pubsub import PubSub

app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': 'http://localhost:3000'}})

blockchain = Blockchain()
wallet = Wallet(blockchain)
transaction_pool = TransactionPool()

pubsub = PubSub(blockchain, transaction_pool)


@app.route('/blockchain')
def route_blockchain():
    return jsonify(blockchain.to_json())


@app.route('/blockchain/range')
def route_blockchain_range():
    start = int(request.args.get('start'))
    end = int(request.args.get('end'))

    return jsonify(blockchain.to_json()[::-1][start:end])


@app.route('/blockchain/mine')
def route_blockchain_mine():
    transaction_data = transaction_pool.transaction_data()
    transaction_data.append(Transaction.reward_transaction(wallet).to_json())
    blockchain.add_block(transaction_data)
    block = blockchain.chain[-1]
    pubsub.broadcast_block(block)
    transaction_pool.clear_blockchain_transactions(blockchain)

    return jsonify(block.to_json())


@app.route('/blocks/<hash>')
def route_block_data(hash):
    for block in blockchain.chain:
        if (block.hash == hash):
            return jsonify(block.to_json())

    abort(404)


@app.route('/wallet/transact', methods=['POST'])
def route_wallet_transact():
    transaction_data = request.get_json()
    transaction = transaction_pool.existing_transaction(wallet.address)

    if transaction:
        transaction.update(
            wallet,
            transaction_data['recipient'],
            transaction_data['amount']
        )
    else:
        transaction = Transaction(
            wallet,
            transaction_data['recipient'],
            transaction_data['amount']
        )

    pubsub.broadcast_transaction(transaction)

    return jsonify(transaction.to_json())


@app.route('/wallet/info')
def route_wallet_info():
    transaction_list = []

    for block in blockchain.chain:
        for transaction in block.data:
            if wallet.address in transaction['output'].keys():
                transaction_list.append(transaction)

    return jsonify({'address': wallet.address, 'balance': wallet.balance, 'transactions': transaction_list})


@app.route('/wallet/<address>')
def route_wallet_address(address):
    balance = Wallet.calculate_balance(blockchain, address)
    transaction_list = []

    for block in blockchain.chain:
        for transaction in block.data:
            if address in transaction['output'].keys():
                transaction_list.append(transaction)

    return jsonify({'address': address, 'balance': balance, 'transactions': transaction_list})


@app.route('/transactions')
def route_transactions():
    return jsonify(transaction_pool.transaction_data()[::-1])


@app.route('/transactions/range')
def route_transactions_range():
    start = int(request.args.get('start'))
    end = int(request.args.get('end'))

    return jsonify(transaction_pool.transaction_data()[::-1][start:end])


@app.route('/transactions/<id>')
def route_transaction_data(id):
    transaction_data = transaction_pool.transaction_data()

    for transaction in transaction_data:
        if (transaction['id'] == id):
            return jsonify({'data': transaction, 'status': 'Unconfirmed', 'block': 'Transaction Pool'})

    for block in blockchain.chain:
        for transaction in block.data:
            if (transaction['id'] == id):
                return jsonify({'data': transaction, 'status': 'Confirmed', 'block': block.hash})

    abort(404)


@app.route('/transactions-per-block')
def route_transaction_per_block():
    data = {
        'block': [],
        'transactions': []
    }

    for i in range(len(blockchain.chain)):
        if (i == 0):
            continue
        data['block'].append(i + 1)
        data['transactions'].append(len(blockchain.chain[i].data))

    return jsonify(data)


@app.route('/miner-percentage')
def route_miner_percentage():
    miners = []

    for i in range(len(blockchain.chain)):
        if (i == 0):
            continue
        data = blockchain.chain[i].data
        miners.append(list(data[len(data) - 1]['output'].keys())[0])

    miners_dict = dict(Counter(miners))

    return jsonify(miners_dict)


ROOT_PORT = 5000
PORT = ROOT_PORT

if (len(sys.argv) > 1):
    if (sys.argv[1] == 'peer'):
        PORT = random.randint(5001, 6000)

        result_blockchain_json = requests.get(
            f'http://localhost:{ROOT_PORT}/blockchain')
        result_blockchain = Blockchain.from_json(result_blockchain_json.json())

        try:
            blockchain.replace_chain(result_blockchain.chain)
            print('\033[92m \n -- Successfully synchronized the local chain --')

            result_transactions_json = requests.get(
                f'http://localhost:{ROOT_PORT}/transactions')
            transaction_pool = TransactionPool.from_json(
                result_transactions_json.json())

            print(
                '\033[92m \n -- Successfully synchronized the transaction pool --')
        except Exception as e:
            print(f'\n -- Error synchronizing: {e}')

    elif (sys.argv[1] == 'seed'):
        print('\033[92mCreating blockchain seed...')
        for i in range(random.randint(5, 15)):
            transaction_list = []

            for y in range(random.randint(5, 15)):
                transaction_list.append(Transaction(
                    Wallet(), Wallet().address, random.randint(1, 250)).to_json())

            transaction_list.append(
                Transaction.reward_transaction(wallet).to_json())

            blockchain.add_block(transaction_list)
            print(f'\033[94m{len(blockchain.chain)}. block mined!')

        for i in range(random.randint(5, 10)):
            transaction_pool.set_transaction(
                Transaction(Wallet(), Wallet().address,
                            random.randint(1, 250))
            )

app.run(port=PORT)
