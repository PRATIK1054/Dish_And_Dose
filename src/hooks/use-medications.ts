"use client";

import { useMemo, useCallback } from "react";
import { useCollection, useFirebase, useMemoFirebase } from "@/firebase";
import { collection, doc } from "firebase/firestore";
import { addDocumentNonBlocking, deleteDocumentNonBlocking } from "@/firebase/non-blocking-updates";

const MEDICATIONS_COLLECTION = "medications";

export function useMedications() {
  const { firestore, user, isUserLoading } = useFirebase();

  const medicationsCollection = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, 'users', user.uid, MEDICATIONS_COLLECTION);
  }, [firestore, user]);

  const { data: medications, isLoading: isLoadingMedications } = useCollection(medicationsCollection);

  const addMedication = useCallback((medName: string) => {
    if (!medicationsCollection || !user) return;
    const medExists = medications?.some(med => med.name.toLowerCase() === medName.toLowerCase());
    if(medExists) return;

    addDocumentNonBlocking(medicationsCollection, { name: medName, userId: user.uid });
  }, [medicationsCollection, medications, user]);

  const removeMedication = useCallback((medId: string) => {
    if (!medicationsCollection) return;
    const medRef = doc(medicationsCollection, medId);
    deleteDocumentNonBlocking(medRef);
  }, [medicationsCollection]);

  const medicationNames = useMemoFirebase(() => {
    return medications ? medications.map(m => m.name) : [];
  }, [medications]);

  return {
    medications: medicationNames, 
    medicationDocs: medications,
    addMedication, 
    removeMedication, 
    isLoaded: !isUserLoading && !isLoadingMedications
  };
}
