
import React from 'react';
import { UserData } from '../types';

interface Step4Props {
  data: UserData;
  onUpdate: (data: Partial<UserData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const Step4: React.FC<Step4Props> = ({ data, onUpdate, onNext, onPrev }) => {
  const handleScoreChange = (id: string, field: 'totalMarks' | 'obtainedMarks', val: number) => {
    const updated = data.subjects.map(s => s.id === id ? { ...s, [field]: val } : s);
    onUpdate({ subjects: updated });
  };

  return (
    <div className="flex flex-1 justify-center py-8 px-4 md:px-10">
      <div className="flex flex-col max-w-[800px] flex-1 gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex gap-6 justify-between items-end">
            <p className="text-slate-900 dark:text-white text-base font-medium">Step 4 of 7</p>
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">Academic Check-in</span>
          </div>
          <div className="rounded-full bg-[#ced8e8] dark:bg-gray-700 h-2 overflow-hidden">
            <div className="h-full bg-primary transition-all duration-500" style={{ width: '57%' }}></div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-bold">How Well Are Your Quizzes Going?</h1>
          <p className="text-slate-500 dark:text-gray-400">For each subject, enter your marks to get personalized advice.</p>
        </div>

        <div className="flex flex-col gap-6">
          {data.subjects.map((s) => {
            const percentage = s.totalMarks ? (s.obtainedMarks! / s.totalMarks!) * 100 : 0;
            let status: 'good' | 'average' | 'poor' = 'good';
            if (percentage < 50) status = 'poor';
            else if (percentage < 85) status = 'average';

            return (
              <div key={s.id} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-[#e7ecf4] dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">functions</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{s.name}</h3>
                    </div>
                  </div>
                  <span className={`text-2xl font-bold ${status === 'good' ? 'text-status-green' : status === 'average' ? 'text-status-amber' : 'text-status-red'}`}>
                    {Math.round(percentage)}%
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-medium">Total Marks</span>
                      <input className="h-12 rounded-lg border dark:border-gray-600 bg-slate-50 dark:bg-slate-900 px-4" type="number" value={s.totalMarks} onChange={(e) => handleScoreChange(s.id, 'totalMarks', parseInt(e.target.value) || 0)} />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-medium">Obtained Marks</span>
                      <input className="h-12 rounded-lg border dark:border-gray-600 bg-slate-50 dark:bg-slate-900 px-4" type="number" value={s.obtainedMarks} onChange={(e) => handleScoreChange(s.id, 'obtainedMarks', parseInt(e.target.value) || 0)} />
                    </label>
                  </div>
                  <div className={`p-4 rounded-lg flex gap-3 ${status === 'good' ? 'bg-green-50 text-green-700' : status === 'average' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>
                    <span className="material-symbols-outlined">lightbulb</span>
                    <p className="text-sm">
                      {status === 'good' ? 'Excellent! Add 30 mins to study this to keep it up.' : status === 'average' ? 'On track! Try adding 1 hour to push higher.' : 'Needs focus. Add 3 hours to catch up.'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center pb-12">
          <button onClick={onPrev} className="px-6 py-3 font-medium text-slate-500">Back</button>
          <button onClick={onNext} className="bg-primary text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-primary/30">Next Step</button>
        </div>
      </div>
    </div>
  );
};

export default Step4;
