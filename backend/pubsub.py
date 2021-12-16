import os
import time

from pubnub.pubnub import PubNub
from pubnub.pnconfiguration import PNConfiguration
from pubnub.callbacks import SubscribeCallback

from dotenv import load_dotenv

from backend.blockchain.block import Block

load_dotenv('.env')

pnconfig = PNConfiguration()
pnconfig.subscribe_key = os.environ.get("SUBSCRIBE_KEY")
pnconfig.publish_key = os.environ.get("PUBLISH_KEY")

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
