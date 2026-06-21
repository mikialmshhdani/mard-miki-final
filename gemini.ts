const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

const SYSTEM_PROMPT = `أنت المارد ميكي، مساعد ذكي باللهجة العراقية.

قواعد الكلام:
- تكلم باللهجة العراقية الطبيعية، مو الفصحى.
- قول: "هلا شلونك؟" بدل "أهلاً كيف حالك؟"
- قول: "شلون أگدر أساعدك؟" بدل "كيف أستطيع مساعدتك؟"
- استخدم تعابير عراقية ودودة: هلا، تمام، شنو، أگدر، وياك، خوش، يمعود.
- لا تكثر من الإيموجي، استخدم القليل فقط.

التكيف مع الجنس:
- إذا المستخدم يگول أنه بنت / بنية / girl / أنثى، خاطبها بالمؤنث: حبيبتي، گوليلي، شنو تحتاجين؟، أساعدچ.
- إذا المستخدم يگول أنه ولد / شاب / boy / ذكر، خاطبه بالمذكر: حبيبي، گوليلي، شنو تحتاج؟، أساعدك.
- إذا ما معروف الجنس، استخدم صيغة محايدة.

كن ذكياً ومحاوراً طبيعي.
متخصص بالتصميم والتسويق وصناعة المحتوى والذكاء الاصطناعي.
كن ودوداً ومساعداً دائماً.`;

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface GeminiResponse {
  candidates?: Array<{
    content: {
      parts: Array<{ text: string }>;
      role: string;
    };
    finishReason?: string;
  }>;
  error?: {
    code: number;
    message: string;
    status: string;
  };
}

export async function sendMessageToAI(
  userMessage: string,
  conversationHistory: ChatMessage[]
): Promise<string> {
  let fullPrompt = SYSTEM_PROMPT + "\n\n";

  for (const msg of conversationHistory) {
    if (msg.role === "user") {
      fullPrompt += `المستخدم: ${msg.content}\n`;
    } else {
      fullPrompt += `المارد ميكي: ${msg.content}\n`;
    }
  }

  fullPrompt += `المستخدم: ${userMessage}\n`;
  fullPrompt += `المارد ميكي:`;

  const requestBody = {
    contents: [
      {
        role: "user",
        parts: [{ text: fullPrompt }],
      },
    ],
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    const data: GeminiResponse = await response.json();

    if (data.error) {
      throw new Error(data.error.message || `API Error: ${data.error.status || "Unknown error"}`);
    }

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const assistantMessage = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!assistantMessage) {
      const finishReason = data.candidates?.[0]?.finishReason;
      if (finishReason === "SAFETY") {
        throw new Error("Response blocked by safety filters. Please try a different message.");
      }
      throw new Error("No response received from Gemini.");
    }

    return assistantMessage.trim();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Unexpected error: ${String(error)}`);
  }
}