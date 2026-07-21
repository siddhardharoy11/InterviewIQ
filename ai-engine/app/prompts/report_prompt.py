import json



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
    }
}


def build_report_prompt(
    resume: str,
    job_description: str,
    transcript: str,

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

If some information is unavailable, state that it could not be determined.

Return ONLY valid JSON.

Do not wrap the response inside markdown.

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

Evaluation Guidelines

1. Score each category from 0 to 10.

2. Every score must include a short reason.

3. Resume Match should compare resume against the job description.

4. Technical score should only depend on technical correctness.

5. Communication score should evaluate:
- clarity
- grammar
- professionalism
- answer structure

6. Problem Solving should evaluate:
- reasoning
- approach
- explanation

7. Behavioral should evaluate:
- ownership
- teamwork
- leadership
- confidence

8. Provide:

- strengths
- weaknesses
- recommendations

9. Recommendations must:
- be specific
- reference observations from the interview
- provide clear actions the candidate can take
- avoid generic advice

10. Summary should be around 150 words.

Return ONLY JSON.
""" 