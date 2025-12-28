
import React from 'react';
import { UserData, Subject } from '../types';

interface Step2Props {
  data: UserData;
  onUpdate: (data: Partial<UserData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const Step2: React.FC<Step2Props> = ({ data, onUpdate, onNext, onPrev }) => {
  const totalCredits = data.subjects.reduce((sum, s) => sum + s.credits, 0);
  const isHeavy = totalCredits > 18;

  const handleSubjectChange = (id: string, credits: number) => {
    const updated = data.subjects.map(s => s.id === id ? { ...s, credits } : s);
    onUpdate({ subjects: updated });
  };

  const handleCourseCountChange = (count: number) => {
    const current = data.subjects.length;
    let updated = [...data.subjects];
    if (count > current) {
      for (let i = current; i < count; i++) {
        updated.push({ id: `${Date.now()}-${i}`, name: `Subject ${i + 1}`, credits: 3 });
      }
    } else {
      updated = updated.slice(0, count);
    }
    onUpdate({ subjects: updated });
  };

  return (
    <main className="flex-1 flex justify-center py-10 px-4 md:px-10">
      <div className="w-full max-w-[800px] flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-baseline">
            <p className="text-slate-900 dark:text-white text-base font-medium">Step 2 of 7</p>
            <p className="text-slate-500 dark:text-gray-400 text-sm font-normal">Academic Assessment</p>
          </div>
          <div className="h-2 w-full bg-[#ced8e8] dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '28%' }}></div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-slate-900 dark:text-white text-3xl md:text-[32px] font-bold leading-tight mb-2">How Many Courses Are You Taking?</h1>
            <p className="text-slate-500 dark:text-gray-400 text-base font-normal">Enter your course count to estimate your semester workload.</p>
          </div>
          <div className="w-full max-w-[200px]">
            <label className="block mb-2 text-sm font-medium text-slate-900 dark:text-gray-300">Number of Subjects</label>
            <div className="relative flex items-center">
              <input 
                className="block w-full rounded-lg border-2 border-[#ced8e8] dark:border-gray-600 bg-white dark:bg-slate-800 py-3 pl-4 pr-12 text-2xl font-bold text-slate-900 dark:text-white focus:border-primary focus:ring-0 transition-colors shadow-sm"
                type="number"
                min="1"
                max="10"
                value={data.subjects.length}
                onChange={(e) => handleCourseCountChange(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
          {data.subjects.map((subject, idx) => (
            <div key={subject.id} className="group relative flex items-center gap-4 rounded-xl border border-[#ced8e8] dark:border-gray-700 bg-white dark:bg-slate-800 p-4 shadow-sm hover:shadow-md transition-all animate-slide-in">
              <div className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary">
                <span className="material-symbols-outlined">menu_book</span>
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-sm font-medium text-slate-500 dark:text-gray-400">{subject.name}</span>
                <div className="flex items-center gap-2 mt-1">
                  <input 
                    className="w-16 rounded border border-[#ced8e8] dark:border-gray-600 bg-transparent p-1 text-center text-lg font-bold text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    type="number"
                    value={subject.credits}
                    onChange={(e) => handleSubjectChange(subject.id, parseInt(e.target.value) || 0)}
                  />
                  <span className="text-xs text-gray-500 dark:text-gray-400">credits</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-8 rounded-2xl p-6 flex flex-col md:flex-row gap-8 items-start animate-slide-in transition-colors ${isHeavy ? 'bg-red-50 dark:bg-red-950/20 border border-status-red/30' : 'bg-green-50 dark:bg-green-950/20 border border-status-green/30'}`}>
          <div className="flex flex-col gap-2 min-w-[240px]">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Assessment</span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Total Credit Hours: {totalCredits}</h2>
            <div className={`inline-flex items-center gap-2 px-4 py-2 mt-2 rounded-full text-white w-fit shadow-md ${isHeavy ? 'bg-status-red' : 'bg-status-green'}`}>
              <span className="material-symbols-outlined !text-[20px]">{isHeavy ? 'warning' : 'check_circle'}</span>
              <span className="text-base font-bold">{isHeavy ? 'Heavy Load (>18)' : 'Balanced Load'}</span>
            </div>
          </div>
          <div className={`flex flex-col gap-3 flex-1 border-l-0 md:border-l pl-0 md:pl-8 pt-4 md:pt-0 ${isHeavy ? 'border-status-red/20' : 'border-status-green/20'}`}>
            <div className={`flex items-center gap-2 font-semibold ${isHeavy ? 'text-status-red' : 'text-status-green'}`}>
              <span className="material-symbols-outlined">lightbulb</span>
              <h3>Recommendation</h3>
            </div>
            <p className="text-base text-slate-900 dark:text-gray-200 leading-relaxed">
              {isHeavy 
                ? "You are exceeding the standard maximum for a balanced semester. Taking this many credits increases risk of burnout."
                : "Your academic load is within healthy limits. You should have enough time for extracurriculars and rest."}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-8 pb-10">
          <button onClick={onPrev} className="flex items-center gap-2 px-6 py-3 rounded-lg text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span> Back
          </button>
          <button onClick={onNext} className="flex items-center gap-2 px-8 py-3 rounded-lg bg-primary hover:opacity-90 text-white font-bold shadow-lg shadow-primary/30 transition-all hover:scale-[1.02]">
            Next Step <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Step2;
