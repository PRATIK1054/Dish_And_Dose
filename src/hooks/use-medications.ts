"use client";

import { useState, useEffect, useCallback } from "react";

const MEDICATIONS_STORAGE_KEY = "medconnect_medications";

export function useMedications() {
  const [medications, setMedications] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedMeds = window.localStorage.getItem(MEDICATIONS_STORAGE_KEY);
      if (storedMeds) {
        setMedications(JSON.parse(storedMeds));
      }
    } catch (error) {
      console.error("Failed to load medications from localStorage", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const updateLocalStorage = (newMeds: string[]) => {
    try {
      window.localStorage.setItem(MEDICATIONS_STORAGE_KEY, JSON.stringify(newMeds));
    } catch (error) {
      console.error("Failed to save medications to localStorage", error);
    }
  };

  const addMedication = useCallback((med: string) => {
    setMedications((prevMeds) => {
      const lowerCaseMed = med.toLowerCase();
      if (prevMeds.some(m => m.toLowerCase() === lowerCaseMed)) return prevMeds;
      const newMeds = [...prevMeds, med];
      updateLocalStorage(newMeds);
      return newMeds;
    });
  }, []);

  const removeMedication = useCallback((med: string) => {
    setMedications((prevMeds) => {
      const newMeds = prevMeds.filter((m) => m !== med);
      updateLocalStorage(newMeds);
      return newMeds;
    });
  }, []);

  return { medications, addMedication, removeMedication, isLoaded };
}
