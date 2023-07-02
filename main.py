from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline

app = FastAPI()

class TextRequest(BaseModel):
    text: str
    

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/process_text")
def process_text(request: TextRequest):
    print(request.text)
    

    sent_pipeline = pipeline("sentiment-analysis")
    sentiment = sent_pipeline(request.text)
    print(sentiment)
    
    return {"sentiment": sentiment}
