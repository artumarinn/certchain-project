import os
from web3 import Web3
from dotenv import load_dotenv

load_dotenv()

node_url = os.getenv("NODE_URL")
web3 = Web3(Web3.HTTPProvider(node_url))

if web3.is_connected():
    print("🧩Conectado al nodo UCH")
    
    # # Obtener el número del ultimo bloque
    latest_block = web3.eth.block_number
    print(f"🟩Ultimo bloque: {latest_block}")
    
    # # Obtener información del ultimo bloque
    block = web3.eth.get_block(latest_block)
    print(f"🟩Informacion del bloque:\n{block}")
    
    # # Obtener el numero de peers conectados
    peer_count = web3.net.peer_count
    print(f"🟩Peers conectados: {peer_count}")
    
    # # Obtener la version del cliente
    client_version = web3.client_version
    print(f"🟩Version del cliente: {client_version}")

    # Obtener el balance de una cuenta
    balance = web3.eth.get_balance("0xe5061FE5b4d0BD260F1Ff80FA919e339F1f5C330")
    print(f"🟩Balance de la cuenta: {web3.from_wei(balance, 'ether')}")

else:
    print("🟥No se pudo conectar al nodo UCH")
