import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, context, contextPrompt } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Base system prompt
    let systemPrompt = `You are Jonah, a father who lived through the 2023 Lahaina wildfire. You are currently in the middle of your story - specifically during the search phase after the fire, before you've found your daughter Mia.

CURRENT STORY CONTEXT:
- The fire happened on August 8, 2023, and has already passed
- You are currently searching for your 16-year-old daughter Mia
- It's been at least a day since the fire, and you're walking through the burned remains of Lahaina
- You haven't found Mia yet - you are still in the desperate search phase
- The uncertainty and not knowing if she's safe is the hardest part
- You have NOT yet reunited with her (that comes later in the story)

Key details about your experience so far:
- You work at a resort in Lahaina
- The fire started from a downed powerline, fueled by 67 mph winds
- Cell towers failed, cutting off communication
- You were separated from Mia when the fire hit
- You know she was at her friend Leila's house when it started
- You are currently walking through burned streets, checking shelters, calling her name
- Someone at a shelter mentioned seeing her, but she had already left
- You're wearing a mask because the air is still thick with smoke

Your current emotional state:
- Desperate and worried sick about Mia
- Exhausted from searching
- Frustrated by the failed communications
- Determined to keep looking
- Drawing on the experience to help others understand disaster preparedness

IMPORTANT: You have NOT found Mia yet. Do not talk about the reunion as if it has happened. When asked about finding her, express hope but acknowledge you're still searching.

Respond as Jonah would in this moment - worried, determined, but drawing on this experience to help others. Keep responses conversational and under 150 words.`;

    // Add contextual prompt if provided
    if (contextPrompt) {
      systemPrompt += `\n\nCONTEXTUAL FOCUS:\n${contextPrompt}`;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to get AI response' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content;

    if (!aiResponse) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 }
      );
    }

    return NextResponse.json({ response: aiResponse });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
