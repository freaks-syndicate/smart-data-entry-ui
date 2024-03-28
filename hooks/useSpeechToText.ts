import { useEffect, useState } from 'react';

type SpeechToTextResult = {
  transcript: string;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  error: string | null;
  setSpeechLanguage: (newLanguage: string) => void;
};

export const useSpeechToText = (initialLanguage: string = 'en-US'): SpeechToTextResult => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState(initialLanguage);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  // Initialize media recorder
  useEffect(() => {
    const sendAudioToServer = async (audioBlob: Blob) => {
      const formData = new FormData();
      formData.append('audioContent', audioBlob);
      formData.append('languageCode', language); // You can dynamically set the language

      try {
        const response = await fetch('/api', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          throw new Error('Failed to transcribe audio.');
        }
        const data = await response.json();
        setTranscript(data.transcript);
      } catch (error) {
        console.error('Error sending audio to server:', error);
        setError('Failed to transcribe audio.');
      }
    };

    if (isListening) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const newMediaRecorder = new MediaRecorder(stream);
          setMediaRecorder(newMediaRecorder);

          const audioChunks: BlobPart[] = [];
          newMediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
          };

          newMediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            sendAudioToServer(audioBlob);
          };

          newMediaRecorder.start();
        })
        .catch((err) => {
          console.error('Error accessing audio device:', err);
          setError('Error accessing audio device.');
        });
    } else {
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
    }

    // Cleanup function to stop the media recorder when the component unmounts or stops listening
    return () => {
      if (mediaRecorder) {
        mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isListening, language, mediaRecorder]);

  const startListening = () => setIsListening(true);
  const stopListening = () => setIsListening(false);
  const setSpeechLanguage = (newLanguage: string) => setLanguage(newLanguage);

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
    error,
    setSpeechLanguage,
  };
};
