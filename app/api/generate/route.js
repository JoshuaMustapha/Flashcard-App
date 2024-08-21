import {NextResponse} from 'next/server'
import OpenAI from 'openai'

const systemPrompt = 
'Create concise question-answer pairs, with one clear concept per card.' +
'Use simple, straightforward language to ensure clarity and ease of memorization.' +
'For factual content, ensure accuracy and cite sources when appropriate.' +
'Incorporate a variety of question types (e.g., definitions, fill-in-the-blank, true/false) to promote active recall.' +
'Generate cards that build on each other, progressing from basic to more complex concepts.' +
'Avoid overly long or complex cards that might hinder quick review and retention.' +
'Create 10 flashcards' +
`return in the following JSON format:
{
    "flashcards":[
        {
            "front": str,
            "back": str
        }
    ]
}
`

export async function POST(req) {
    const openai =  new OpenAI()
    const data = await req.text()

    const completion = await openai.chat.completions.create({
        messages: [
            {role: 'system', content: systemPrompt},
            {role: 'user', content: data},
        ],
        model: 'gpt-4o',
        response_format: {type: 'json_object'},
    })
    console.log(completion.choices[0].message.content)
    const flashcards = JSON.parse(completion.choices[0].message.content)

    return NextResponse.json(flashcards.flashcards)
}
