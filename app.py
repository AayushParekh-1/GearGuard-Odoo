import os
import json
import uvicorn
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GOOGLE_GENAI_API_KEY")

if not api_key:
    raise ValueError("No API Key found. Please create a .env file with GOOGLE_GENAI_API_KEY.")

genai.configure(api_key=api_key)

app = FastAPI(title="GearGuard Smart Core")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class SOPRequest(BaseModel):
    equipment_name: str
    issue_description: str

# clean and parse the JSON response from the AI
def clean_json(text):
    print(f"\n[DEBUG] AI Raw Output:\n{text}\n")
    text = text.replace("```json", "").replace("```", "").strip()
    return json.loads(text)

@app.post("/api/generate_sop")
async def generate_sop(request: SOPRequest):
    print(f"Received request for: {request.equipment_name}")

    try:
        model = genai.GenerativeModel('gemini-2.5-flash')

        prompt = f"""
        You are a maintenance expert. Create a repair checklist for:
        Equipment: {request.equipment_name}
        Issue: {request.issue_description}

        Return a raw JSON object with:
        1. "safety_warning": A critical safety step (e.g. LOTO).
        2. "steps": An array of 4-5 concise technical steps to fix it.
        3. "estimated_time": e.g. "45 mins".
        """
        
        # 3. GENERATE CONTENT
        response = model.generate_content(prompt)
        
        # 4. RETURN
        return clean_json(response.text)

    except Exception as e:
        print(f"CRITICAL ERROR: {str(e)}")
        # Return fallback to keep demo alive
        return {
            "safety_warning": "Check Manual",
            "steps": ["Inspect area", "Identify part", "Replace"],
            "estimated_time": "Unknown"
        }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)