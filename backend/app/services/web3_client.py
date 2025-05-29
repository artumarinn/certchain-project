import os
from web3 import Web3
from dotenv import load_dotenv

load_dotenv()

# Conect to the UCH node
node_url = os.getenv("NODE_URL")
web3 = Web3(Web3.HTTPProvider(node_url))

if web3.is_connected():
    print("🧩Conectado al nodo UCH")
    
    # Get the latest block number
    latest_block = web3.eth.block_number
    print(f"🟩Ultimo bloque: {latest_block}")
    
    # Get information about the latest block
    block = web3.eth.get_block(latest_block)
    print(f"🟩Informacion del bloque:\n{block}")
    
    # Get peer count
    peer_count = web3.net.peer_count
    print(f"🟩Peers conectados: {peer_count}")
    
    # Get client version
    client_version = web3.client_version
    print(f"🟩Version del cliente: {client_version}")

    # Get balance of a specific account
    balance = web3.eth.get_balance("0xe5061FE5b4d0BD260F1Ff80FA919e339F1f5C330")
    print(f"🟩Balance de la cuenta: {web3.from_wei(balance, 'ether')}")

else:
    print("🟥No se pudo conectar al nodo UCH")

# # Connect to the Ethereum network sepolia testnet
# w3 = Web3(Web3.HTTPProvider('https://eth-sepolia.g.alchemy.com/v2/Epi2SNyJ_QWWIOe4Pdl-f'))

# # Get block by number
# latest_block = w3.eth.block_number
# block = w3.eth.get_block(latest_block)

# print(f"🟩Block: {block}")