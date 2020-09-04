import pytest

from backend.wallet.transaction import Transaction
from backend.wallet.wallet import Wallet

def test_transaction():
  sender_wallet = Wallet()
  recipient = 'recipient'
  amount = 100
  transaction = Transaction(sender_wallet, recipient, amount)

  assert transaction.output[recipient] == amount
  assert transaction.output[sender_wallet.address] == sender_wallet.balance - amount

  assert 'timestamp' in transaction.input
  assert transaction.input['amount'] == sender_wallet.balance
  assert transaction.input['address'] == sender_wallet.address
  assert transaction.input['public_key'] == sender_wallet.public_key

  assert Wallet.verify(
    transaction.input['public_key'],
    transaction.output,
    transaction.input['signature']
  )

def test_transaction_exceeds_balance():
  with pytest.raises(Exception, match='Amount exceeds balance'):
    Transaction(Wallet(), 'recipient', 10000)

def test_transaction_update_exceeds_balance():
  sender_wallet = Wallet()
  transaction = Transaction(sender_wallet, 'recipient', 100)

  with pytest.raises(Exception, match='Amount exceeds balance'):
    transaction.update(sender_wallet, 'new_recipient', 1000)

def test_transaction_update():
  sender_wallet = Wallet()
  first_recipient = 'first_recipient'
  first_amount = 50
  transaction = Transaction(sender_wallet, first_recipient, first_amount)

  next_recipient = 'next_recipient'
  next_amount = 90
  transaction.update(sender_wallet, next_recipient, next_amount)

  assert transaction.output[next_recipient] == next_amount
  assert transaction.output[sender_wallet.address] == \
    sender_wallet.balance - first_amount - next_amount

  assert Wallet.verify(
    transaction.input['public_key'],
    transaction.output,
    transaction.input['signature']
  )

  to_first_again_amount = 35
  transaction.update(sender_wallet, first_recipient, to_first_again_amount)
  assert transaction.output[sender_wallet.address] == \
    sender_wallet.balance - first_amount - next_amount - to_first_again_amount
  assert Wallet.verify(
    transaction.input['public_key'],
    transaction.output,
    transaction.input['signature']
  )
