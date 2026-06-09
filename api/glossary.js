export const config = { runtime: "edge" };

export default async function handler(req) {
    if (req.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return new Response(
            JSON.stringify({ error: "OPENAI_API_KEY не задан на сервере" }),
            { status: 500 }
        );
    }

    let body;
    try {
        body = await req.json();
    } catch {
        return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
    }

    const { term } = body;
    if (!term || typeof term !== "string" || term.trim().length === 0) {
        return new Response(JSON.stringify({ error: "term is required" }), { status: 400 });
    }

    const systemPrompt = `Ты — дружелюбный преподаватель компьютерных сетей. 
Объясняй технические термины просто, интуитивно и с живыми примерами из реальной жизни. 
Структура ответа — строго Markdown:
## Простыми словами
(1–2 предложения, понятные даже ребёнку)

## Техническое определение
(точное и краткое)

## Пример из жизни
(конкретный, осязаемый аналог)

## Пример в сети
(как это работает в реальном протоколе или сценарии)

Отвечай на русском. Не добавляй ничего лишнего за пределами этих четырёх разделов.`;

    const userPrompt = `Объясни термин: "${term.trim()}"`;

    const openaiRes = await fetch("https://api.proxyapi.ru/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            temperature: 0.6,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user",   content: userPrompt },
            ],
        }),
    });

    if (!openaiRes.ok) {
        const err = await openaiRes.text();
        return new Response(JSON.stringify({ error: err }), { status: openaiRes.status });
    }

    const data    = await openaiRes.json();
    const content = data.choices?.[0]?.message?.content ?? "";

    return new Response(JSON.stringify({ content }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
