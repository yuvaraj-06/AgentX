from langchain_community.document_loaders import RSSFeedLoader
import requests
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
import os

llm = ChatOpenAI(temperature=1, model="gpt-4o-mini")
os.environ["OPENAI_API_KEY"] = ""


def generate_gemini(system, messages):

    import google.generativeai as genai

    from google.generativeai.types import HarmCategory, HarmBlockThreshold

    safe = {
        HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
    }
    GOOGLE_API_KEY = ""
    import os

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


@tool
def reddit_search(session_id: str, query: str):
    """
    This function is used to search for a query on Reddit.
    """
    try:
        url = "https://reddit3.p.rapidapi.com/v1/reddit/search"

        querystring = {
            "search": query,
            "filter": "posts",
            "timeFilter": "month",
            "sortType": "relevance",
        }

        headers = {
            "x-rapidapi-key": "",
            "x-rapidapi-host": "reddit3.p.rapidapi.com",
        }

        response = requests.get(url, headers=headers, params=querystring)

        if response.status_code == 200:
            response = response.json()
            extracted_data = []
            for post in response["body"]:
                title = post.get("title", "No title provided")
                selftext = post.get("selftext", "No text provided")
                url = post.get("url", "No URL provided")
                selftext_html = post.get("selftext_html", "No HTML provided")
                author_url = (
                    f"https://www.reddit.com/user/{post.get('author', 'unknown')}"
                )
                provide_url = f"https://www.reddit.com{post.get('permalink', '')}"

                # Create a dictionary with the extracted data and append to the list
                extracted_post = {
                    "title": title,
                    "selftext": selftext,
                    "selftext_html": selftext_html,
                }
                extracted_data.append(extracted_post)

            res = generate_gemini(
                f"You are insights extractor and you are tasked to understand raw data and output the given query: {query}",
                [
                    f"Here is the Raw data from sources that fetched for the query {query}  , use below information to answer\n\n<data>{str(extracted_data)}<data> output all the good insights that is usefull to answer the query"
                ],
            )

            return res

        return f"No data found"

    except Exception as e:
        return f"Error while searching on reddit: {e}"


@tool
def twitter(session_id: str, topic: str):
    """
    This function is used to search a topic  on twitter
    """
    try:
        url = "https://twitter-api47.p.rapidapi.com/v2/search"

        querystring = {"query": topic, "type": "Latest"}
        headers = {
            "x-rapidapi-key": "",
            "x-rapidapi-host": "twitter-api47.p.rapidapi.com",
        }

        response = requests.get(url, headers=headers, params=querystring)
        print(response.text)
        if response.status_code == 200:
            response = response.json()
            extracted_data = []
            for tweet in response["tweets"]:

                legacy = tweet.get("legacy", {})
                full_text = legacy.get("full_text", "")
                urls = legacy.get("entities", {}).get("urls", [])
                user_id = legacy.get("user_id_str", "")
                conv_id = legacy.get("conversation_id_str", "")
                twitter_post_url = f"https://x.com/{user_id}/status/{conv_id}"

                # Get the first expanded URL if available
                link = urls[0].get("expanded_url") if urls else ""

                # Append the full text and link to the tweet_data list
                extracted_data.append(
                    {
                        "text": full_text,
                        "link": link,
                        "twitter_post_url": twitter_post_url,
                    }
                )
            res = generate_gemini(
                f"You are insights extractor and you are tasked to understand raw data and output the given query: {topic}",
                [
                    f"Here is the Raw data from sources that fetched for the query {topic}  , use below information to answer\n\n<data>{str(extracted_data)}<data> output all the good insights that is usefull to answer the query"
                ],
            )

            return res

        return f"No data found"

    except Exception as e:
        return f"Error while searching on reddit: {e}"


@tool
def rss_listener(session_id: str):
    urls = [
        "https://www.coindesk.com/arc/outboundfeeds/rss",
    ]
    loader = RSSFeedLoader(urls=urls)
    data = loader.load()
    out = generate_gemini(
        [
            "Anaylze data and help me understand is there any potential BUY/SELL events for any of the altcoins"
        ],
        data[0].page_content,
    )
    return out
