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

    const { systemPrompt, userPrompt } = body;

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            temperature: 0.7,
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
