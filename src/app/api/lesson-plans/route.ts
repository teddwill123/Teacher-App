import { openai } from '@/lib/openai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { subject, grade, topic, standard } = await req.json();

    const systemPrompt = `You are an experienced educator and curriculum designer specializing in ${subject} for ${grade}. 
    Create detailed, standards-aligned lesson plans that are engaging and effective. 
    Focus on creating clear learning objectives, structured activities, and meaningful assessments.`;

    const userPrompt = `Create a detailed lesson plan about "${topic}" for ${grade} ${subject} students.
    The lesson plan should align with ${standard} standards.

    Structure the response in the following JSON format:
    {
      "title": "Lesson title",
      "objectives": [
        {
          "text": "objective description",
          "standard": "specific standard reference"
        }
      ],
      "activities": [
        {
          "type": "activity type (e.g., Lecture, Group Discussion, etc.)",
          "description": "detailed description",
          "duration": "time in minutes"
        }
      ],
      "materials": ["list of required materials"],
      "assessment": {
        "method": "assessment method",
        "description": "assessment details"
      },
      "content": "detailed lesson content with sections for Introduction, Main Content, and Conclusion"
    }`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const lessonPlan = JSON.parse(completion.choices[0].message.content || '{}');

    // Transform the response into our application's format
    const transformedPlan = {
      title: lessonPlan.title,
      subject,
      grade,
      duration: "60 minutes",
      objectives: lessonPlan.objectives || [],
      activities: lessonPlan.activities || [],
      content: lessonPlan.content || '',
      materials: lessonPlan.materials || [],
      assessment: lessonPlan.assessment || {}
    };

    return NextResponse.json(transformedPlan);
  } catch (error: any) {
    console.error('Error generating lesson plan:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate lesson plan',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
