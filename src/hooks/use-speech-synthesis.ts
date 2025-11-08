
"use client";

import { useState, useEffect, useCallback } from "react";

interface SpeakParams {
  text: string;
  lang?: string;
  voice?: SpeechSynthesisVoice;
  rate?: number;
  pitch?: number;
  volume?: number;
}

export const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [supported, setSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const handleVoicesChanged = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
        setVoices(window.speechSynthesis.getVoices());
    }
  }, []);
  
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSupported(true);
      handleVoicesChanged();
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;

      return () => {
        window.speechSynthesis.onvoiceschanged = null;
        // Clean up speech synthesis on component unmount
        window.speechSynthesis.cancel();
      }
    }
  }, [handleVoicesChanged]);

  const getVoices = () => {
    return voices;
  };

  const speak = (params: SpeakParams) => {
    if (!supported || isSpeaking) return;

    const utterance = new SpeechSynthesisUtterance(params.text);
    if (params.voice) {
      utterance.voice = params.voice;
    }
    if (params.lang) utterance.lang = params.lang;
    
    utterance.rate = params.rate || 1;
    utterance.pitch = params.pitch || 1;
    utterance.volume = params.volume || 1;
    
    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    utterance.onerror = (e) => {
      console.error("Speech synthesis error", e);
      setIsSpeaking(false);
      setIsPaused(false);
    }
    
    // onpause and onresume are not consistently fired,
    // so we manage the isPaused state in our pause() and resume() functions.
    
    window.speechSynthesis.speak(utterance);
  };

  const cancel = () => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const pause = () => {
    if (!supported || !isSpeaking) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const resume = () => {
    if (!supported || !isSpeaking) return;
    window.speechSynthesis.resume();
    setIsPaused(false);
  };

  return { speak, cancel, pause, resume, isSpeaking, isPaused, supported, getVoices };
};
