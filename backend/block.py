class Block:
  """
  Block: a unit s storage.
  Store a transaction in a blockchain supports a cryptocurrency.
  """
  def __init__(self, data):
    self.data = data

  def __repr__(self):
    return f'Block - data: {self.data}'

def main():
  block = Block('foo')
  print(block)
  print(f'block.py__name__:{__name__}')

if __name__ == '__main__':
  main()