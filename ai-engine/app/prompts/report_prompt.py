import json
from typing import Optional

from app.schemas import InterviewerRatings


REPORT_SCHEMA = {
    "scores": {
        "technical": {
            "score": 0,
            "confidence": "High",
            "reason": ""
        },
        "communication": {
            "score": 0,
            "confidence": "High",
            "reason": ""
        },
        "problemSolving": {
            "score": 0,
            "confidence": "High",
            "reason": ""
        },
        "behavioral": {
            "score": 0,
            "confidence": "High",
            "reason": ""
        },
        "resumeMatch": {
            "score": 0,
            "confidence": "High",
            "reason": ""
        }
    },
    "summary": "",
    "strengths": [],
    "weaknesses": [],
    "recommendations": [],
    "resumeAnalysis": {
        "matchingSkills": [],
        "missingSkills": [],
        "additionalSkills": []
    },
    "technicalAnalysis": {
        "strongConcepts": [],
        "incorrectConcepts": [],
        "feedback": ""
    },
    "communicationAnalysis": {
        "clarity": "",
        "grammar": "",
        "confidence": ""
    },
    "candidateFeedback": {
    "emailSubject": "",
    "emailBody": "",
    "strengths": [],
    "areasToImprove": []
}
}


def build_report_prompt(
    resume: str,
    job_description: str,
    transcript: str,
    interviewer_notes: str,
    interviewer_ratings: Optional[InterviewerRatings],

    role: str,
    interview_type: str,
    experience_level: str,

    interview_duration: int,
    questions_answered: int,
) -> str:

    jd_section = (
        f"Job Description\n\n{job_description}"
        if job_description.strip()
        else "Job Description\n\nNot Provided"
    )

    ratings_section = "No interviewer ratings provided."

    if interviewer_ratings:
        ratings_section = f"""
Technical: {interviewer_ratings.technical}
Communication: {interviewer_ratings.communication}
Problem Solving: {interviewer_ratings.problemSolving}
Behavioral: {interviewer_ratings.behavioral}
"""

    notes_section = (
        interviewer_notes.strip()
        if interviewer_notes.strip()
        else "No interviewer notes provided."
    )

    return f"""
Important Rules:

1. Return ONLY valid JSON.
2. Do not use markdown.
3. Do not use ```json.
4. Do not explain your reasoning outside the JSON.
5. Every score must be an integer from 0 to 10.
6. Every list must contain at least one item if sufficient information exists.
7. If the job description is empty, evaluate only the resume and interview.
8. Never invent projects, skills, certifications, or experiences.

You are an experienced senior technical recruiter and software engineering interviewer.

Your job is to evaluate the candidate professionally.

Evaluate ONLY using the information provided.

Do not invent experiences.

Do not hallucinate skills.

If some information is unavailable, clearly state that it could not be determined.

The JSON MUST exactly follow this schema:

{json.dumps(REPORT_SCHEMA, indent=2)}

------------------------------------------------------

Interview Context

Role: {role}

Interview Type: {interview_type}

Experience Level: {experience_level}

Interview Duration: {interview_duration} minutes

Questions Answered: {questions_answered}

------------------------------------------------------

Resume

{resume}

------------------------------------------------------

Job Description

{jd_section}

------------------------------------------------------

Interview Transcript

{transcript}

------------------------------------------------------

Interviewer Notes

{notes_section}

------------------------------------------------------

Interviewer Ratings

{ratings_section}

------------------------------------------------------

Use interviewer notes as an additional source of evidence. Combine them with the transcript, resume and job description while generating the evaluation.

If interviewer notes contradict the transcript, mention the inconsistency and explain how it affected your assessment.

Use interviewer ratings only as supporting evidence.

Do not copy interviewer ratings directly into the final scores.

Use the resume, job description, transcript, interviewer notes, and interviewer ratings together to produce an independent evaluation.

If the interviewer ratings significantly differ from your own assessment, mention the discrepancy and explain why.

Candidate Feedback

Also generate a candidate feedback email.

Requirements:

- This email will be sent automatically if the candidate is not selected.
- Thank the candidate for their time.
- Mention 2-4 strengths observed during the interview.
- Mention 2-4 areas for improvement.
- Be constructive, encouraging, and professional.
- Do NOT mention scores.
- Do NOT mention interviewer ratings.
- Do NOT mention internal evaluation.
- Do NOT say "you were rejected" or "you failed."
- Keep the email between 150 and 250 words.
- Return the result in the "candidateFeedback" object.
Use only the provided resume, job description, interview transcript, interviewer notes, and interviewer ratings as evidence.

The strengths and areas for improvement should be consistent with the evaluation report.

Evaluation Guidelines

1. Score each category from 0 to 10.

2. Every score must include a short reason.

3. Resume Match should compare the resume against the job description.

4. Technical score should only depend on technical correctness.

5. Communication should evaluate:
- Clarity
- Grammar
- Professionalism
- Answer structure

6. Problem Solving should evaluate:
- Reasoning
- Approach
- Explanation

7. Behavioral should evaluate:
- Ownership
- Teamwork
- Leadership
- Confidence

8. Provide:
- Strengths
- Weaknesses
- Recommendations

9. Recommendations must:
- Be specific
- Reference observations from the interview
- Provide clear actions the candidate can take
- Avoid generic advice

10. Summary should be around 150 words.

Return ONLY valid JSON.
"""