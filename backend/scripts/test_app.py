import requests
import time

from backend.wallet.wallet import Wallet

base_url = 'http://localhost:5000/'

def get_blockchain():
  return requests.get(f'{base_url}blockchain').json()

def get_blockchain_mine():
  return requests.get(f'{base_url}blockchain/mine').json()

def post_wallet_transaction(recipient, amount):
  return requests.post(f'{base_url}wallet/transaction',
  json={
    'recipient': recipient,
    'amount': amount
  }).json()

def get_wallet_info():
  return requests.get(f'{base_url}wallet/info').json()

start_blockchain = get_blockchain()
print(f'start_blockchain: {start_blockchain}')

recipient = Wallet().address

post_wallet_transaction_1 = post_wallet_transaction(recipient, 11)
print(f'\npost_wallet_transaction_1: {post_wallet_transaction_1}')

time.sleep(1)
post_wallet_transaction_2 = post_wallet_transaction(recipient, 21)
print(f'\npost_wallet_transaction_2: {post_wallet_transaction_2}')

time.sleep(1)
mined_block = get_blockchain_mine()
print(f'\nmined_block: {mined_block}')

wallet_info = get_wallet_info()
print(f'\nwallet_info: {wallet_info}')
