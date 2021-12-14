import time

from pubnub.pubnub import PubNub
from pubnub.pnconfiguration import PNConfiguration
from pubnub.callbacks import SubscribeCallback

from backend.blockchain.block import Block

pnconfig = PNConfiguration()
pnconfig.subscribe_key = "sub-c-ae3ae5fc-5cf3-11ec-b575-1ef0bc164062"
pnconfig.publish_key = "pub-c-8f4eb5c2-ff28-48ce-8562-c6012fdbfef0"
pnconfig.uuid = '44de6736-41b0-4c97-b368-3b27ad1c6dc5'

CHANNELS = {
    'TEST': 'TEST',
    'BLOCK': 'BLOCK'
}


class Listener(SubscribeCallback):
    def __init__(self, blockchain):
        self.blockchain = blockchain

    def message(self, pubnub, message_object):
        print(
            f'\n-- Channel: {message_object.channel} | Message: {message_object.message}')

        if message_object.channel == CHANNELS['BLOCK']:
            block = Block.from_json(message_object.message)
            potentional_chain = self.blockchain.chain[:]
            potentional_chain.append(block)

            try:
                self.blockchain.replace_chain(potentional_chain)
                print(f'\n -- Successfully replaced the localchain chain.')
            except Exception as e:
                print(f'\n -- Did not replace a chain: {e}')


class PubSub():
    def __init__(self, blockchain):
        self.pubnub = PubNub(pnconfig)
        self.pubnub.subscribe().channels(CHANNELS.values()).execute()
        self.pubnub.add_listener(Listener(blockchain))

    def publish(self, channel, message):
        self.pubnub.publish().channel(channel).message(message).sync()

    def broadcast_block(self, block):
        self.publish(CHANNELS['BLOCK'], block.to_json())


def main():
    pubsub = PubSub()

    time.sleep(1)

    pubsub.publish(CHANNELS['TEST'], {'foo': 'bar'})


if __name__ == '__main__':
    main()
