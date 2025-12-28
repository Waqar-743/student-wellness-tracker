
import React from 'react';
import { UserData, DayBalance } from '../types';

interface Step3Props {
  data: UserData;
  onUpdate: (data: Partial<UserData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const Step3: React.FC<Step3Props> = ({ data, onUpdate, onNext, onPrev }) => {
  const handleDayChange = (dayIndex: number, field: keyof DayBalance, value: number) => {
    const updated = [...data.timeBalance];
    updated[dayIndex] = { ...updated[dayIndex], [field]: value };
    onUpdate({ timeBalance: updated });
  };

  const getDayTotal = (db: DayBalance) => db.class + db.study + db.refresh + db.sleep;

  return (
    <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 lg:px-10 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">How Well Is Your Time Balanced?</h1>
            <p className="text-slate-500 dark:text-gray-400 text-base font-normal">Analyze your daily schedule to identify time management gaps.</p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-[#e7ecf4] dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <p className="text-slate-900 dark:text-white text-sm font-bold">Step 3 of 7</p>
              <p className="text-primary text-sm font-bold">50% Complete</p>
            </div>
            <div className="h-2.5 w-full rounded-full bg-[#e7ecf4] dark:bg-gray-700 overflow-hidden">
              <div className="h-full rounded-full bg-primary w-1/2 transition-all duration-500"></div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {data.timeBalance.map((db, idx) => {
              const total = getDayTotal(db);
              const isOver = total > 24;
              return (
                <div key={idx} className={`bg-white dark:bg-slate-800 rounded-xl shadow-md border overflow-hidden transition-all ${isOver ? 'border-red-400' : 'border-[#e7ecf4] dark:border-gray-700'}`}>
                  <div className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-900/50 border-b border-[#e7ecf4] dark:border-gray-700">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <span className="bg-primary/10 text-primary p-1.5 rounded-md">
                        <span className="material-symbols-outlined text-sm">calendar_today</span>
                      </span>
                      Day {db.day}
                    </h3>
                    <div className="flex items-center gap-3">
                      {isOver ? (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold">
                          <span className="material-symbols-outlined text-[16px]">warning</span> POOR
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                          <span className="material-symbols-outlined text-[16px]">check_circle</span> BALANCED
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-4">
                      <label className="block">
                        <span className="text-sm font-medium text-slate-700 dark:text-gray-300">Class Hours</span>
                        <input className="w-full h-12 mt-1 rounded-lg border border-[#e7ecf4] dark:border-gray-600 bg-slate-50 dark:bg-slate-900 px-4" type="number" value={db.class} onChange={(e) => handleDayChange(idx, 'class', parseInt(e.target.value) || 0)} />
                      </label>
                      <label className="block">
                        <span className="text-sm font-medium text-slate-700 dark:text-gray-300">Study Hours</span>
                        <input className="w-full h-12 mt-1 rounded-lg border border-[#e7ecf4] dark:border-gray-600 bg-slate-50 dark:bg-slate-900 px-4" type="number" value={db.study} onChange={(e) => handleDayChange(idx, 'study', parseInt(e.target.value) || 0)} />
                      </label>
                    </div>
                    <div className="flex flex-col gap-4">
                      <label className="block">
                        <span className="text-sm font-medium text-slate-700 dark:text-gray-300">Refreshment</span>
                        <input className="w-full h-12 mt-1 rounded-lg border border-[#e7ecf4] dark:border-gray-600 bg-slate-50 dark:bg-slate-900 px-4" type="number" value={db.refresh} onChange={(e) => handleDayChange(idx, 'refresh', parseInt(e.target.value) || 0)} />
                      </label>
                      <label className="block">
                        <span className="text-sm font-medium text-slate-700 dark:text-gray-300">Sleep Hours</span>
                        <input className="w-full h-12 mt-1 rounded-lg border border-[#e7ecf4] dark:border-gray-600 bg-slate-50 dark:bg-slate-900 px-4" type="number" value={db.sleep} onChange={(e) => handleDayChange(idx, 'sleep', parseInt(e.target.value) || 0)} />
                      </label>
                    </div>
                  </div>
                  <div className="px-5 pb-5">
                    <div className={`p-4 rounded-xl flex items-center gap-6 ${isOver ? 'bg-red-50 text-red-700' : 'bg-slate-50 dark:bg-slate-900/30'}`}>
                      <div className="size-16 rounded-full shadow-sm" style={{ background: `conic-gradient(#3C467B 0% ${(db.class/24)*100}%, #10b981 ${(db.class/24)*100}% ${((db.class+db.study)/24)*100}%, #f59e0b ${((db.class+db.study)/24)*100}% ${((db.class+db.study+db.refresh)/24)*100}%, #8b5cf6 ${((db.class+db.study+db.refresh)/24)*100}% ${(total/24)*100}%, #e2e8f0 ${(total/24)*100}% 100%)` }}></div>
                      <div>
                        <h4 className="font-bold">Total Logged: {total}h / 24h</h4>
                        <p className="text-sm">{isOver ? 'Overbooked! Reduce some activities.' : `You have ${24 - total}h remaining for flexibility.`}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full lg:w-96 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-[#e7ecf4] dark:border-gray-700 p-5">
            <h3 className="text-base font-bold mb-4">Activity Legend</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><div className="size-3 rounded-full bg-primary"></div><span className="text-sm">Class</span></div>
              <div className="flex items-center gap-2"><div className="size-3 rounded-full bg-status-green"></div><span className="text-sm">Study</span></div>
              <div className="flex items-center gap-2"><div className="size-3 rounded-full bg-status-amber"></div><span className="text-sm">Refresh</span></div>
              <div className="flex items-center gap-2"><div className="size-3 rounded-full bg-purple-500"></div><span className="text-sm">Sleep</span></div>
            </div>
          </div>
          <button onClick={onNext} className="h-14 bg-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/30">Next Step</button>
          <button onClick={onPrev} className="h-14 bg-slate-100 dark:bg-slate-700 rounded-xl font-bold">Back</button>
        </div>
      </div>
    </main>
  );
};

export default Step3;
