class TransactionPool:
  def __init__(self):
    self.transaction_map = {}

  def set_transaction(self, transaction):
    """
    Set a transaction in the transaction pool.
    """
    self.transaction_map[transaction.id] = transaction

  def existing_transaction(self, address):
    """
    Find a transaction generated by teh address in the transaction pool.
    """
    for transaction in self.transaction_map.values():
      if transaction.input['address'] == address:
        return transaction

  def transation_data(self):
    """
    Return the transactions of the transaction pool represented in their
    json serialized form.
    """
    return list(map(
      lambda transaction: transaction.to_json(),
      self.transaction_map.values()
    ))
