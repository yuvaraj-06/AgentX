from langchain_community.document_loaders import RSSFeedLoader
import requests
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
import os
from tools import reddit_search, twitter, rss_listener
from defi import (
    stake_tokens,
    sell_tokens,
    send_transaction,
    get_stake_info,
    unstake_tokens,
    buy_tokens,
)

# Initialize the language model
llm = ChatOpenAI(temperature=1, model="gpt-4o-mini")
os.environ["OPENAI_API_KEY"] = "YOUR_OPENAI_API_KEY"


def generate_gemini(system, messages):
    import google.generativeai as genai
    from google.generativeai.types import HarmCategory, HarmBlockThreshold

    safe = {
        HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
    }
    GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY"
    os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel(
        model_name="gemini-1.5-pro-002",
        system_instruction=system,
        safety_settings=safe,
    )

    response = model.generate_content(
        messages, generation_config=genai.types.GenerationConfig(temperature=1)
    )
    return response.text


# Agent functions


def create_meme_coin_watcher_agent():
    meme_coin_prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "You are a Meme Coin Watcher Agent that monitors RSS feeds for potential meme coins to buy.",
            ),
            ("user", "{input}"),
            MessagesPlaceholder(variable_name="agent_scratchpad"),
        ]
    )
    meme_coin_agent = create_tool_calling_agent(
        llm,
        [
            rss_listener,
            stake_tokens,
            sell_tokens,
            send_transaction,
            get_stake_info,
            unstake_tokens,
            buy_tokens,
        ],
        meme_coin_prompt,
    )
    meme_coin_executor = AgentExecutor(
        agent=meme_coin_agent,
        tools=[
            rss_listener,
            stake_tokens,
            sell_tokens,
            send_transaction,
            get_stake_info,
            unstake_tokens,
            buy_tokens,
        ],
        verbose=True,
    )
    return meme_coin_executor


def create_social_listener_agent():
    social_listener_prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "You are a Social Listener Agent that listens to social media for signals to buy or sell coins.",
            ),
            ("user", "{input}"),
            MessagesPlaceholder(variable_name="agent_scratchpad"),
        ]
    )
    social_listener_agent = create_tool_calling_agent(
        llm,
        [
            twitter,
            reddit_search,
            stake_tokens,
            sell_tokens,
            send_transaction,
            get_stake_info,
            unstake_tokens,
            buy_tokens,
        ],
        social_listener_prompt,
    )
    social_listener_executor = AgentExecutor(
        agent=social_listener_agent,
        tools=[
            twitter,
            reddit_search,
            stake_tokens,
            sell_tokens,
            send_transaction,
            get_stake_info,
            unstake_tokens,
            buy_tokens,
        ],
        verbose=True,
    )
    return social_listener_executor


def create_market_analyzer_agent():
    market_analyzer_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", "You are a Market Analyzer Agent that analyzes market trends."),
            ("user", "{input}"),
            MessagesPlaceholder(variable_name="agent_scratchpad"),
        ]
    )
    market_analyzer_agent = create_tool_calling_agent(
        llm,
        [reddit_search, twitter],
        market_analyzer_prompt,
    )
    market_analyzer_executor = AgentExecutor(
        agent=market_analyzer_agent,
        tools=[reddit_search, twitter],
        verbose=True,
    )
    return market_analyzer_executor


def create_investment_advisor_agent():
    investment_advisor_prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "You are an Investment Advisor Agent that provides investment advice and staking options.",
            ),
            ("user", "{input}"),
            MessagesPlaceholder(variable_name="agent_scratchpad"),
        ]
    )
    investment_advisor_agent = create_tool_calling_agent(
        llm,
        [rss_listener, stake],
        investment_advisor_prompt,
    )
    investment_advisor_executor = AgentExecutor(
        agent=investment_advisor_agent,
        tools=[rss_listener, stake],
        verbose=True,
    )
    return investment_advisor_executor


# You can add more agent functions here as needed.


# Optional: Function to get all agents in a dictionary
def get_all_agents():
    return {
        "meme_coin_watcher": create_meme_coin_watcher_agent(),
        "social_listener": create_social_listener_agent(),
        "market_analyzer": create_market_analyzer_agent(),
        "investment_advisor": create_investment_advisor_agent(),
        # Add other agents here
    }
