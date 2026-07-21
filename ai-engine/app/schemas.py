from pydantic import BaseModel
from typing import List
from typing import Optional

class AnalyzeRequest(BaseModel):
    candidateName: str
    resumePath: str
    jobDescriptionPath: str
    audioPath: str


class Score(BaseModel):
    score: int
    confidence: str
    reason: str


class Scores(BaseModel):
    technical: Score
    communication: Score
    problemSolving: Score
    behavioral: Score
    resumeMatch: Score
    overall: float = 0


class ResumeAnalysis(BaseModel):
    matchingSkills: List[str]
    missingSkills: List[str]
    additionalSkills: List[str]


class TechnicalAnalysis(BaseModel):
    strongConcepts: List[str]
    incorrectConcepts: List[str]
    feedback: str


class CommunicationAnalysis(BaseModel):
    clarity: str
    grammar: str
    confidence: str


class InterviewReport(BaseModel):
    scores: Scores

    summary: str

    strengths: List[str]

    weaknesses: List[str]

    recommendations: List[str]

    resumeAnalysis: ResumeAnalysis

    technicalAnalysis: TechnicalAnalysis

    communicationAnalysis: CommunicationAnalysis

class InterviewerRatings(BaseModel):
    technical: Optional[int] = None
    communication: Optional[int] = None
    problemSolving: Optional[int] = None
    behavioral: Optional[int] = None
    
class AnalyzeRequest(BaseModel):
    candidateName: str

    role: str
    interviewType: str
    experienceLevel: str

    interviewDuration: int
    questionsAnswered: int

    resumePath: str
    jobDescriptionPath: str
    audioPath: str

    interviewerNotes: str = ""
    interviewerRatings: Optional[InterviewerRatings] = None

