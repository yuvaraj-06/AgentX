# AgentX

[![AgentX Demo](https://img.youtube.com/vi/4E9X_eTdZBc/0.jpg)](https://youtu.be/4E9X_eTdZBc "AgentX Demo")
#### Click on the image above to watch the demo

## Instructions to Run the Application

1. **Set Up Virtual Environment**: Create a Python 3.7 virtual environment.
   ```bash
   python3 -m venv agentx-env
   source agentx-env/bin/activate
   ```

2. **Clone Repository**: Clone this repository and navigate to the project directory.
   ```bash
   git clone https://github.com/yuvaraj-06/AgentX.git
   cd AgentX
   ```

3. **Install Dependencies**: Install all required modules.
   ```bash
   pip install -r requirements.txt
   ```

4. **Set Up Environment Variables**: Create a `.env` file in the root directory and add your API keys.
   ```bash
   OPENAI_API_KEY=your_openai_api_key
   GOOGLE_API_KEY=your_google_api_key
   MONGODB_URI=your_mongodb_connection_string
   RAPID_API_KEY=your_rapidapi_key
   ```

5. **Run the FastAPI Server**: Start the backend server.
   ```bash
   cd api
   uvicorn main:app --reload --port 8080
   ```

6. **Access Swagger UI**: You can access the API documentation at [http://localhost:8080/docs](http://localhost:8080/docs).

7. **Run the Dashboard**: In a new terminal window, navigate to the dashboard directory.
   ```bash
   cd ../dashboard
   python manage.py migrate
   python manage.py runserver
   ```

8. **Access the Web Application**: Open your browser and go to [http://localhost:8000/](http://localhost:8000/).

9. **Create an Account**: Sign up for a new account to start using AgentX.

## Motivation for the Project

In the rapidly evolving world of decentralized finance (DeFi) and blockchain technology, users often face challenges in navigating the vast amount of on-chain data and making informed decisions. AgentX aims to bridge this gap by leveraging AI-powered agents to provide real-time insights, automate trading strategies, and enhance user interactions with DeFi protocols.

## Overview of the Project

AgentX is an AI-driven platform that integrates multiple specialized agents to assist users in DeFi activities. These agents include:

- **Meme Coin Watcher**: Monitors emerging meme coins and automates the buying process based on predefined criteria.
- **Social Listener**: Analyzes social media trends to inform buy/sell decisions.
- **Market Analyzer**: Provides in-depth market analysis across multiple blockchain networks.
- **Investment Advisor**: Offers personalized investment advice and staking options.

By utilizing natural language processing and connecting to various data sources like Reddit, Twitter, and RSS feeds, AgentX empowers users to make data-driven decisions seamlessly.

## Challenges We Ran Into

- **API Limitations**: Integrating multiple APIs with rate limits and differing data formats required extensive handling and optimization.
- **Real-Time Data Processing**: Ensuring that the agents provide up-to-date insights was challenging due to the latency in data retrieval from various sources.
- **Scalability**: Designing the system to handle multiple concurrent users and agents without compromising performance.
- **Security**: Managing sensitive information like API keys and wallet addresses necessitated robust security measures.

## Tech Stack and Modules Used

- **Backend**: FastAPI for the API server.
- **Database**: MongoDB for storing session data and conversation history.
- **AI Models**: OpenAI's GPT-4 and Google's Generative AI for language processing.
- **APIs and Libraries**:
  - `langchain` for building conversational agents.
  - `google-generativeai` for integrating Google's AI models.
  - `pymongo` for MongoDB interactions.
  - `requests` for HTTP requests to third-party APIs.
- **Frontend**: Django for the web dashboard.
- **Blockchain Networks Supported**: Ethereum, Binance Smart Chain, Polygon, Fantom.

## Overview of the Platform

### Dashboard
 
- **Agent Management**: Interface to view, activate, or deactivate agents.
- **Session Tracking**: Monitor active sessions and review conversation history.

### Agents

- **Meme Coin Watcher**
  - Monitors RSS feeds for new meme coins.
  - Automates the purchasing process based on user preferences.
  
 

- **Social Listener**
  - Analyzes trends on Twitter and Reddit.
  - Generates insights and trading signals.
  
 

- **Market Analyzer**
  - Provides cross-chain analytics.
  - Helps in identifying market opportunities.
   

- **Investment Advisor**
  - Offers personalized staking options.
  - Advises on portfolio diversification.
   
## Getting Started

1. **Sign Up**: Create a new account on the platform.
2. **Configure Agents**: Select and configure the agents you wish to use.
3. **Connect Wallet**: Link your blockchain wallet to enable trading functionalities.
4. **Start Interacting**: Use the chat interface to communicate with agents and receive insights.

 