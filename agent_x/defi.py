from web3 import Web3
from web3.middleware import geth_poa_middleware
import json
import requests
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder

YOUR_PROJECT_ID = "ENV"
# Connect to an Ethereum node (replace with your own node URL)
w3 = Web3(Web3.HTTPProvider(f"https://mainnet.infura.io/v3/{YOUR_PROJECT_ID}"))
w3.middleware_onion.inject(geth_poa_middleware, layer=0)

# Contract ABI and address (replace with your actual ABI and deployed contract address)
contract_address = "0x1234567890123456789012345678901234567890"
with open("abi.json") as f:
    contract_abi = json.load(f)

# Create contract instance
contract = w3.eth.contract(address=contract_address, abi=contract_abi)

# Default account for transactions (replace with your account address)
default_account = "0x1234567890123456789012345678901234567890"
w3.eth.default_account = default_account


@tool
def send_transaction(func, *args, **kwargs):
    """Helper function to send a transaction"""
    transaction = func.build_transaction(
        {
            "from": default_account,
            "nonce": w3.eth.get_transaction_count(default_account),
            "gas": 2000000,
            "gasPrice": w3.eth.gas_price,
        }
    )
    signed_txn = w3.eth.account.sign_transaction(
        transaction, private_key="YOUR_PRIVATE_KEY"
    )
    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    return w3.eth.wait_for_transaction_receipt(tx_hash)


@tool
def buy_tokens(amount_eth):
    """Buy tokens by sending ETH"""
    func = contract.functions.buyTokens()
    return send_transaction(func, value=w3.to_wei(amount_eth, "ether"))


@tool
def sell_tokens(amount):
    """Sell tokens back to the contract"""
    func = contract.functions.sellTokens(w3.to_wei(amount, "ether"))
    return send_transaction(func)


@tool
def stake_tokens(amount):
    """Stake tokens"""
    func = contract.functions.stakeTokens(w3.to_wei(amount, "ether"))
    return send_transaction(func)


@tool
def unstake_tokens():
    """Unstake tokens"""
    func = contract.functions.unstakeTokens()
    return send_transaction(func)


@tool
def get_stake_info(address):
    """Get staking info for an address"""
    return contract.functions.getStakeInfo(address).call()


def create_task(
    title,
    description,
    task_type,
    tools,
    automation_level,
    human_interaction,
    duration,
    bounty,
    expertise,
    total_slots,
    filled_slots,
    priority,
    is_confidential,
):
    """Create a new task"""
    func = contract.functions.createTask(
        title,
        description,
        task_type,
        tools,
        automation_level,
        human_interaction,
        duration,
        w3.to_wei(bounty, "ether"),
        expertise,
        total_slots,
        filled_slots,
        priority,
        is_confidential,
    )
    return send_transaction(func)


def get_task(task_id):
    """Get task details by ID"""
    return contract.functions.getTask(task_id).call()


# # Example usage:
# if __name__ == "__main__":
#     # Buy tokens
#     print(buy_tokens(0.1))  # Buy tokens with 0.1 ETH

#     # Sell tokens
#     print(sell_tokens(100))  # Sell 100 tokens

#     # Stake tokens
#     print(stake_tokens(50))  # Stake 50 tokens

#     # Get stake info
#     print(get_stake_info(default_account))

#     # Unstake tokens
#     print(unstake_tokens())

#     # Create a task
#     task_id = create_task(
#     "Develop NLP Pipeline",
#     "Create an NLP pipeline for sentiment analysis and entity recognition.",
#     2,  # TaskType.AIHuman
#     ["NLTK", "SpaCy", "Transformers"],
#     3,
#     3,
#     40 * 3600,  # 40 hours in seconds
#     18000,
#     "Advanced",
#     4,
#     4,
#     1,  # Priority.Medium
#     True
#     )
#     print(f"Created task with ID: {task_id}")

#     # Get task details
#     task = get_task(task_id)
#     print(f"Task details: {task}")
