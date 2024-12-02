from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
from agents import create_agents
from pymongo import MongoClient
import uuid


app = FastAPI()

client = MongoClient("mongodb://localhost:27017/")
db = client["agentx"]
sessions_collection = db["sessions"]
agents_collection = db["agents"]

agents = create_agents()


# Pydantic models
class ChatRequest(BaseModel):
    session_id: str
    agent_name: str
    message: str


class NewAgentTask(BaseModel):
    agent_name: str
    task_details: Dict[str, Any]


class SessionData(BaseModel):
    session_id: str
    wallet_address: str
    messages: List[Dict[str, Any]]


# Endpoint to list all agents
@app.get("/agents")
def list_agents():
    agents = []
    return {"agents": agents}


@app.get("/tasks")
def list_tasks():
    tasks = []
    return {"tasks": tasks}


# Endpoint to create a new agent task
@app.post("/create")
def create_agent_task(new_task: Request):

    agents_collection.insert_one(new_task.dict())
    return {
        "message": f"New task for agent {new_task.agent_name} created successfully."
    }


@app.post("/chat")
def chat_with_agent(chat_request: ChatRequest):
    session = sessions_collection.find_one({"session_id": chat_request.session_id})
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    if chat_request.agent_name not in agents:
        raise HTTPException(status_code=404, detail="Agent not found")

    agent_executor = agents[chat_request.agent_name]

    try:
        result = agent_executor.invoke({"input": chat_request.message})
        response = result["output"]
    except Exception as e:
        response = f"An error occurred: {str(e)}"

    sessions_collection.update_one(
        {"session_id": chat_request.session_id},
        {"$push": {"messages": {"user": chat_request.message, "agent": response}}},
    )

    return {"response": response}


@app.post("/sessions/create")
def create_session(wallet_address: str):
    session_id = str(uuid.uuid4())
    session_data = {
        "session_id": session_id,
        "wallet_address": wallet_address,
        "messages": [],
    }
    sessions_collection.insert_one(session_data)
    return {"session_id": session_id}


@app.get("/sessions/{session_id}")
def get_session(session_id: str):
    session = sessions_collection.find_one({"session_id": session_id}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session
