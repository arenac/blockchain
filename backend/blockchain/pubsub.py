import time

from decouple import config

from pubnub.pubnub import PubNub
from pubnub.pnconfiguration import PNConfiguration
from pubnub.callbacks import SubscribeCallback

from backend.blockchain.block import Block
from backend.wallet.transaction import Transaction

pnconfig = PNConfiguration()
pnconfig.publish_key = config('PUBLISH_KEY')
pnconfig.subscribe_key = config('SUBSCRIBE_KEY')

CHANNELS = {
  'TEST': 'TEST',
  'BLOCK': 'BLOCK',
  'TRANSACTION': 'TRANSACTION'
}

class Listener(SubscribeCallback):
  def __init__(self, blockchain, transaction_pool):
    self.blockchain = blockchain
    self.transaction_pool = transaction_pool

  def message(self, pubnub, message_object):
    print(f'\n-- Channel: {message_object.channel} | Message: {message_object.message}')

    if message_object.channel == CHANNELS['BLOCK']:
      block = Block.from_json(message_object.message)
      potential_chain = self.blockchain.chain[:]
      potential_chain.append(block)

      try:
        self.blockchain.replace_chain(potential_chain)
        print('\n -- Successfully replaced the local chain')
      except Exception as e:
        print(f'\n -- Did not replace the chain: {e}')
    elif message_object.channel == CHANNELS['TRANSACTION']:
      transaction = Transaction.from_json(message_object.message)
      self.transaction_pool.set_transaction(transaction)
      print(f'\n -- Set the new transaction in the transaction pool.')

class PubSub():
  """
  Handles the publish/subscribe layer of the application.
  Provides communication between the nodes of blockchain network.
  """
  def __init__(self, blockchain, transaction_pool):
    self.pupnub = PubNub(pnconfig)
    self.pupnub.subscribe().channels(CHANNELS.values()).execute()
    self.pupnub.add_listener(Listener(blockchain, transaction_pool))

  def publish(self, channel, message):
    """
    Publish the message object to the channel.
    """
    self.pupnub.publish().channel(channel).message(message).sync()

  def broadcast_block(self, block):
    """
    Broadcast a block object to all nodes.
    """
    self.publish(CHANNELS['BLOCK'], block.to_json())

  def broadcast_transaction(self, transation):
    """
    Broadcast a transaction to all nodes.
    """
    self.publish(CHANNELS['TRANSACTION'], transation.to_json())

def main():
  pubsub = PubSub()
  time.sleep(1)
  pubsub.publish(CHANNELS['TEST'], { 'foo': 'bar' })

if __name__ == '__main__':
  main()
