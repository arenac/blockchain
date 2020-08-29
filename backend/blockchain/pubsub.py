import time

from decouple import config

from pubnub.pubnub import PubNub
from pubnub.pnconfiguration import PNConfiguration
from pubnub.callbacks import SubscribeCallback

pnconfig = PNConfiguration()
pnconfig.publish_key = config('PUBLISH_KEY')
pnconfig.subscribe_key = config('SUBSCRIBE_KEY')

pupnub = PubNub(pnconfig)

TEST_CHANNEL = 'TEST_CHANNEL'

pupnub.subscribe().channels([TEST_CHANNEL]).execute()

class Listener(SubscribeCallback):
  def message(self, pubnub, message_object):
    print(f'\n-- Incoming message_object: {message_object}')

pupnub.add_listener(Listener())

def main():
  time.sleep(1)
  pupnub.publish().channel(TEST_CHANNEL).message({ 'foo': 'bar' }).sync()

if __name__ == '__main__':
  main()
