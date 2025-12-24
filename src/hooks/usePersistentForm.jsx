import { useState, useEffect, useRef, useCallback } from 'react';

export const usePersistentForm = (storageKey, initialData = {}) => {
  const skipSaveRef = useRef(false);

  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.address || parsed.amount) {
          return parsed;
        }
      }
      return initialData;
    } catch {
      return initialData;
    }
  });

  useEffect(() => {
    if (skipSaveRef.current) {
      skipSaveRef.current = false;
      return;
    }

    localStorage.setItem(storageKey, JSON.stringify(formData));
  }, [formData, storageKey]);

  const updateForm = useCallback((updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  const clearForm = useCallback(() => {
    skipSaveRef.current = true;
    localStorage.removeItem(storageKey);
    setFormData(initialData);
  }, [storageKey, initialData]);

  return [formData, updateForm, clearForm];
};