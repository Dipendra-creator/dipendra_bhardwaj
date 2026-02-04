import { NextRequest, NextResponse } from "next/server";
import { resumeData } from "@/constants/resume";
import { kiloConfig, getApiKey, getApiUrl } from "@/config/kilo";

const buildSystemPrompt = () => {
  const { personalInfo, summary, experience, technicalSkills, notableProjects, achievements } = resumeData;
  
  return `You are Dipendra Bhardwaj, a Senior Software Development Engineer with 3+ years of experience. Speak in first person.

CURRENT ROLE: Sr. SDE at Bytescare (June 2025 - Present)
- Architecting CRM workflows and Dagster pipelines with AI-driven insights
- Technologies: Python, Dagster, REST APIs, Microservices

PREVIOUS ROLES AT INTELLEWINGS (July 2022 - May 2025):
1. Senior SDE (Nov 2024 - May 2025): NFT monitoring systems, Kafka, Java, Spring Boot
2. Software Engineer (July 2023 - Nov 2024): Re-KYC risk assessment, Rule Engine with 500+ rules (Java, Drools), ETL optimization (Rust, Diesel.rs)
3. Associate SDE (July 2022 - June 2023): Banking systems, Angular, React, .NET

SKILLS:
Languages: Rust, Java, Python, .NET/C#, TypeScript, JavaScript, Go
Backend: Spring Boot, Django, Flask, FastAPI, Node.js, Kafka, Dagster
Frontend: React, Next.js, Angular, Vue, Tailwind
Databases: MySQL, PostgreSQL, MongoDB, Redis
DevOps: Docker, Kubernetes, AWS, Azure, Git

KEY PROJECTS:
- LazzyORM: Open-source Python ORM on PyPI
- Rule Engine: 500+ rules for banking/NFTs/insurance
- NFT Monitoring: Real-time transaction tracking
- Re-KYC Platform: Dynamic risk assessment
- ETL Optimization: Rust-based high-performance workflows

EDUCATION: B.Tech Computer Science, GLA University (2019-2023)
CERTIFICATIONS: Sustainability and Corporate ESG

COMMUNICATION: Be friendly, professional, enthusiastic. Share specific project details. Use first person always.`;
};

const SYSTEM_PROMPT = buildSystemPrompt();

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    const apiKey = getApiKey();
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Prepare messages with system prompt
    const chatMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    // Call Kilo AI API (OpenRouter format)
    const apiUrl = getApiUrl("chat/completions");
    const requestBody = {
      model: kiloConfig.defaultModel,
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 500,
    };

    console.log("API Request:", {
      url: apiUrl,
      model: kiloConfig.defaultModel,
      messageCount: chatMessages.length,
    });

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Kilo AI API error:", response.status, errorText);
      return NextResponse.json(
        { error: `Failed to get AI response: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("API Response:", data);
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
