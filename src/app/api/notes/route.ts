import { openai } from '@/lib/openai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { topic, gradeLevel, complexity } = await req.json();

    const systemPrompt = `You are an experienced educator and content creator specializing in creating educational notes.
    Create detailed, well-structured notes that are clear, informative, and engaging.
    Focus on creating content that is appropriate for the specified grade level and complexity.`;

    const userPrompt = `Create detailed educational notes about "${topic}" for ${gradeLevel} students at ${complexity} complexity level.
    
    Structure the response in the following JSON format:
    {
      "title": "Notes title",
      "introduction": "A clear introduction to the topic",
      "mainPoints": [
        {
          "heading": "Main point heading",
          "content": "Detailed explanation",
          "examples": ["Real-world examples"]
        }
      ],
      "conclusion": "A concise summary of key points",
      "visualAidPrompt": "A description for generating a relevant diagram or image"
    }`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" }
    });

    const result = completion.choices[0].message.content;
    return NextResponse.json(JSON.parse(result));
  } catch (error) {
    console.error('Error generating notes:', error);
    return NextResponse.json(
      { error: 'Failed to generate notes' },
      { status: 500 }
    );
  }
}
