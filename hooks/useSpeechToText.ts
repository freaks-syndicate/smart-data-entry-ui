import { useEffect, useState } from "react";

type SpeechToTextResult = {
  transcript: string;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  error: string | null;
  setSpeechLanguage: (newLanguage: string) => void;
};

export const useSpeechToText = (
  initialLanguage: string = "en-US",
): SpeechToTextResult => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState(initialLanguage);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      (!window.SpeechRecognition && !window.webkitSpeechRecognition)
    ) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = language;
    recognition.continuous = true; // Keep listening even after the user stops speaking
    recognition.interimResults = true; // Show intermediate results

    recognition.onresult = (event) => {
      const currentTranscript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setTranscript(currentTranscript);
    };

    recognition.onerror = (event) => {
      setError(event.error);
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => recognition.stop();
  }, [isListening, language]);

  const startListening = () => setIsListening(true);
  const stopListening = () => setIsListening(false);

  const setSpeechLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
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
