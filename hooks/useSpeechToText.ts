import { useEffect, useRef, useState } from 'react';

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
  const recognition = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition.current = new SpeechRecognition();
      recognition.current.lang = initialLanguage;
      recognition.current.continuous = true;
      recognition.current.interimResults = true;

      recognition.current.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('');
        setTranscript(currentTranscript);
      };
      recognition.current.onspeechend = () => {
        stopListening();
      };
      recognition.current.onerror = (event) => {
        setError(event.error);
      };
    } else {
      setError('Speech recognition is not supported in this browser.');
    }

    return () => {
      if (recognition.current) {
        recognition.current.abort(); // Stops the speech recognition service from listening to incoming audio
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLanguage]);

  const startListening = () => {
    if (recognition.current && !isListening) {
      try {
        setTranscript('');
        setIsListening(true);
        recognition.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setIsListening(false);
      }
    }
  };

  const stopListening = () => {
    if (recognition.current && isListening) {
      recognition.current.stop();
      setIsListening(false);
    }
  };

  const setSpeechLanguage = (newLanguage: string) => {
    if (recognition.current) recognition.current.lang = newLanguage;
  };

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
    error,
    setSpeechLanguage,
  };
};
