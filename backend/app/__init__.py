import os
import requests
import random

from decouple import config

from flask import Flask, jsonify, request

from backend.blockchain.blockchain import Blockchain
from backend.blockchain.pubsub import PubSub
from backend.wallet.wallet import Wallet
from backend.wallet.transaction import Transaction

app = Flask(__name__)
blockchain = Blockchain()
wallet = Wallet()
pubsub = PubSub(blockchain)

@app.route('/')
def route_default():
  return 'Welcome to the blockchain'

@app.route('/blockchain')
def route_blockchain():
  return jsonify(blockchain.to_json())

@app.route('/blockchain/mine')
def route_blockchain_mine():
  transaction_data = 'stubbed_transaction_data'

  blockchain.add_block(transaction_data)

  block = blockchain.chain[-1]
  pubsub.broadcast_block(block)

  return jsonify(block.to_json())

@app.route('/wallet/transaction', methods=['POST'])
def route_wallet_transaction():
  transaction_data = request.get_json()
  transaction = Transaction(
    wallet,
    transaction_data['recipient'],
    transaction_data['amount']
  )

  print(f'transaction.to_json(): {transaction.to_json()}')

  return jsonify(transaction.to_json())

PORT = config('PORT')
url = config('API_URL')
api_url = f'{url}:{PORT}'

if os.environ.get('PEER') == 'True':
  PORT = random.randint(5001, 6000)

  result = requests.get(f'{api_url}/blockchain')

  result_blockchain = Blockchain.from_json(result.json())

  try:
    blockchain.replace_chain(result_blockchain.chain)
    print('\n -- Successfully synchronized the local chain')
  except Exception as e:
    print(f'\n -- Error synchronizing: {e}')

app.run(port=PORT)
