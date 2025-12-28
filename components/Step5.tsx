
import React from 'react';
import { UserData } from '../types';

interface Step5Props {
  data: UserData;
  onUpdate: (data: Partial<UserData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const Step5: React.FC<Step5Props> = ({ data, onUpdate, onNext, onPrev }) => {
  const handleTopicChange = (id: string, field: 'totalTopics' | 'coveredTopics', val: number) => {
    const updated = data.subjects.map(s => s.id === id ? { ...s, [field]: val } : s);
    onUpdate({ subjects: updated });
  };

  const overallPrep = Math.round(data.subjects.reduce((acc, s) => acc + (s.totalTopics ? (s.coveredTopics! / s.totalTopics!) : 0), 0) / data.subjects.length * 100);

  return (
    <main className="flex flex-col items-center py-8 px-4 sm:px-6">
      <div className="w-full max-w-[960px] flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-end">
            <p className="text-base font-medium">Step 5 of 7</p>
            <p className="text-slate-500 text-sm">Academic Tracking</p>
          </div>
          <div className="h-2 w-full rounded-full bg-[#ced8e8] dark:bg-gray-700 overflow-hidden">
            <div className="h-full bg-primary" style={{ width: '71%' }}></div>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black">How Prepared Are You for Exams?</h1>

        <div className="flex flex-col gap-6">
          {data.subjects.map((s, idx) => {
            const coverage = s.totalTopics ? Math.round((s.coveredTopics! / s.totalTopics!) * 100) : 0;
            const colorClass = coverage > 80 ? 'emerald' : coverage > 50 ? 'amber' : 'red';
            return (
              <div key={s.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-[#e7ecf4] dark:border-gray-700 p-6 flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="flex-1 w-full flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <span className={`flex items-center justify-center size-8 rounded-full bg-${colorClass}-100 text-${colorClass}-600 font-bold`}>{idx + 1}</span>
                    <h3 className="text-xl font-bold">{s.name}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-slate-500">Total Topics</span>
                      <input className="w-full rounded-lg border dark:border-gray-600 bg-slate-50 dark:bg-slate-900 px-4 py-3" type="number" value={s.totalTopics} onChange={(e) => handleTopicChange(s.id, 'totalTopics', parseInt(e.target.value) || 0)} />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-slate-500">Covered Topics</span>
                      <input className="w-full rounded-lg border dark:border-gray-600 bg-slate-50 dark:bg-slate-900 px-4 py-3" type="number" value={s.coveredTopics} onChange={(e) => handleTopicChange(s.id, 'coveredTopics', parseInt(e.target.value) || 0)} />
                    </label>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center min-w-[200px] gap-4">
                  <div className="relative size-40 rounded-full flex flex-col items-center justify-center" style={{ background: `conic-gradient(${colorClass === 'emerald' ? '#10b981' : colorClass === 'amber' ? '#f59e0b' : '#ef4444'} ${coverage}%, #e2e8f0 0%)` }}>
                    <div className="size-32 rounded-full bg-white dark:bg-slate-800 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black">{coverage}%</span>
                      <span className="text-xs uppercase">Coverage</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-[#e7ecf4] dark:border-gray-700 p-4 shadow-xl z-50">
        <div className="max-w-[960px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-500">Overall Readiness</span>
              <span className="text-lg font-black">{overallPrep}% Ready</span>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={onPrev} className="px-6 py-2.5 rounded-lg border dark:border-gray-600 font-bold">Back</button>
            <button onClick={onNext} className="px-8 py-2.5 rounded-lg bg-primary text-white font-bold">Next Step</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Step5;
