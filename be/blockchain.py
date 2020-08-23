class Block:
  """
  Block: a unit s storage.
  Store a transaction in a blockchain supports a cryptocurrency.
  """
  def __init__(self, data):
    self.data = data

  def __repr__(self):
    return f'Block - data: {self.data}'

class Blockchain:
  """
  Blockchain: a public ladger of transactions.
  Implement as a list of block - data sets of transactions
  """

  def __init__(self):
    self.chain = []

  def add_block(self, data):
    self.chain.append(Block(data))

  def __repr__(self):
      return f'Blockchain: {self.chain}'

blockchain = Blockchain()
blockchain.add_block('one')
blockchain.add_block('two')

print(blockchain)
