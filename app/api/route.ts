import speech from '@google-cloud/speech';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Ensure your environment and setup allow for async operations and direct use of Google Cloud client libraries.
  if (!process.env.GOOGLE_CLOUD_PROJECT_ID || !process.env.GOOGLE_CLOUD_CLIENT_EMAIL || !process.env.GOOGLE_CLOUD_PRIVATE_KEY) {
    return new NextResponse(JSON.stringify({ error: 'Server configuration error' }), { status: 500 });
  }

  try {
    const body = await req.json();
    const audioContent = body.audioContent;
    const languageCode = body.languageCode || 'en-US';

    if (!audioContent) {
      return new NextResponse(JSON.stringify({ error: 'No audio content provided' }), { status: 400 });
    }

    const speechClient = new speech.SpeechClient({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      credentials: {
        client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
    });

    const audio = { content: audioContent };
    const config = {
      encoding: 'WEBM_OPUS' as const,
      sampleRateHertz: 16000,
      languageCode: languageCode || 'en-US',
    };
    const request = {
      audio: audio,
      config: config,
    };

    // Await the promise and then access the response array
    const recognitionResult = await speechClient.recognize(request);
    const response = recognitionResult[0]; // Access the first element for the recognition result
    const transcription =
      response.results?.flatMap((result) => result.alternatives?.map((alternative) => alternative.transcript) ?? []).join('\n') ??
      'No transcription available';

    return new NextResponse(JSON.stringify({ transcript: transcription }), { status: 200 });
  } catch (error) {
    console.error('Error processing speech to text:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
