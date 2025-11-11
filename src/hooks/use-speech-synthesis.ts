
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
      // Some browsers load voices asynchronously.
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;

      return () => {
        if(window.speechSynthesis) {
            window.speechSynthesis.onvoiceschanged = null;
            // Clean up speech synthesis on component unmount
            window.speechSynthesis.cancel();
        }
      }
    }
  }, [handleVoicesChanged]);

  const getVoices = useCallback(() => {
    // Some browsers like Safari do not fire onvoiceschanged, so we get voices directly.
    if (typeof window !== 'undefined' && window.speechSynthesis) {
        const currentVoices = window.speechSynthesis.getVoices();
        if (currentVoices.length) {
            setVoices(currentVoices);
            return currentVoices;
        }
    }
    return voices;
  }, [voices]);

  const speak = (params: SpeakParams) => {
    if (!supported || isSpeaking || !params.text) return;

    // Ensure we have the latest voices, especially for browsers that load them late.
    const allVoices = getVoices();

    const utterance = new SpeechSynthesisUtterance(params.text);
    
    // Find a suitable voice
    const langCode = params.lang || 'en-US';
    let voiceToUse = params.voice;
    
    if (!voiceToUse && allVoices.length > 0) {
        voiceToUse = allVoices.find(v => v.lang === langCode && v.name.includes('Google') && !v.name.includes('Premium')) || allVoices.find(v => v.lang === langCode && v.default) || allVoices.find(v => v.lang === langCode);
    }

    if (voiceToUse) {
      utterance.voice = voiceToUse;
    }
    
    utterance.lang = langCode;
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
    
    window.speechSynthesis.speak(utterance);
  };

  const cancel = () => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const pause = () => {
    if (!supported || !isSpeaking || isPaused) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const resume = () => {
    if (!supported || !isSpeaking || !isPaused) return;
    window.speechSynthesis.resume();
    setIsPaused(false);
  };

  return { speak, cancel, pause, resume, isSpeaking, isPaused, supported, getVoices };
};
