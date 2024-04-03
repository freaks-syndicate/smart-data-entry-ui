import speech from '@google-cloud/speech';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Ensure your environment and setup allow for async operations and direct use of Google Cloud client libraries.
  if (!process.env.GOOGLE_CLOUD_PROJECT_ID || !process.env.GOOGLE_CLOUD_CLIENT_EMAIL || !process.env.GOOGLE_CLOUD_PRIVATE_KEY) {
    return new NextResponse(JSON.stringify({ error: 'Server configuration error' }), { status: 500 });
  }

  try {
    const formData = await req.formData();
    const audioFile = formData.get('audioContent') as File; // Assert it's a File
    const languageCode = (formData.get('languageCode') as string) || 'en-US';

    if (!audioFile) {
      return new NextResponse(JSON.stringify({ error: 'No audio content provided' }), { status: 400 });
    }

    // Convert Blob to base64
    const buffer = Buffer.from(await audioFile.arrayBuffer());
    const audioBase64 = buffer.toString('base64');

    const speechClient = new speech.SpeechClient({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      credentials: {
        client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
    });

    const audio = { content: audioBase64 };
    const config = {
      encoding: 'WEBM_OPUS' as const,
      sampleRateHertz: 48000,
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
