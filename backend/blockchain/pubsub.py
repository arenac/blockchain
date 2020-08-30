import time

from decouple import config

from pubnub.pubnub import PubNub
from pubnub.pnconfiguration import PNConfiguration
from pubnub.callbacks import SubscribeCallback

pnconfig = PNConfiguration()
pnconfig.publish_key = config('PUBLISH_KEY')
pnconfig.subscribe_key = config('SUBSCRIBE_KEY')

TEST_CHANNEL = 'TEST_CHANNEL'

class Listener(SubscribeCallback):
  def message(self, pubnub, message_object):
    print(f'\n-- Channel: {message_object.channel} | Message: {message_object.message}')

class PubSub():
  """
  Handles the publish/subscribe layer of the application.
  Provides communication between the nodes of blockchain network.
  """
  def __init__(self):
    self.pupnub = PubNub(pnconfig)
    self.pupnub.subscribe().channels([TEST_CHANNEL]).execute()
    self.pupnub.add_listener(Listener())

  def publish(self, channel, message):
    """
    Publish the message object to the channel.
    """
    self.pupnub.publish().channel(channel).message(message).sync()

def main():
  pubsub = PubSub()
  time.sleep(1)
  pubsub.publish(TEST_CHANNEL, { 'foo': 'bar' })

if __name__ == '__main__':
  main()
