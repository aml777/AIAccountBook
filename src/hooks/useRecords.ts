import { useState, useEffect, useCallback } from 'react';

export interface RecordData {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  createdAt: number;
}

const STORAGE_KEY = 'ai_account_records';

export function useRecords() {
  const [records, setRecords] = useState<RecordData[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecords(JSON.parse(stored));
      } catch {
        setRecords([]);
      }
    }
  }, []);

  const saveRecords = useCallback((newRecords: RecordData[]) => {
    setRecords(newRecords);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecords));
  }, []);

  const addRecord = useCallback((record: Omit<RecordData, 'id' | 'createdAt'>) => {
    const newRecord: RecordData = {
      ...record,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    saveRecords([newRecord, ...records]);
    return newRecord;
  }, [records, saveRecords]);

  const deleteRecord = useCallback((id: string) => {
    saveRecords(records.filter(r => r.id !== id));
  }, [records, saveRecords]);

  const exportData = useCallback(() => {
    const blob = new Blob([JSON.stringify(records, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `account-records-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [records]);

  const clearAll = useCallback(() => {
    saveRecords([]);
  }, [saveRecords]);

  return { records, addRecord, deleteRecord, exportData, clearAll };
}
