
import React, { useEffect, useState } from 'react';
import { UserData, WellnessInsight } from '../types';
import { getWellnessInsights } from '../services/wellness';

interface Step7Props {
  data: UserData;
  onRestart: () => void;
}

const Step7: React.FC<Step7Props> = ({ data, onRestart }) => {
  const [insight, setInsight] = useState<WellnessInsight | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getWellnessInsights(data);
        setInsight(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background-light dark:bg-background-dark">
        <div className="size-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <h2 className="mt-6 text-xl font-bold">Generating Personalized Wellness Report...</h2>
        <p className="mt-2 text-slate-500">Calculating stress scores and analyzing habit impacts...</p>
      </div>
    );
  }

  if (!insight) return null;

  const academicLoad = data.subjects.reduce((a, b) => a + b.credits, 0);

  return (
    <main className="flex-grow w-full max-w-[960px] mx-auto px-4 py-8 flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <div className="flex gap-6 justify-between items-center">
          <p className="text-base font-medium">Step 7 of 7</p>
          <div className="flex items-center gap-2 text-primary font-bold">
            <span className="material-symbols-outlined">check_circle</span>
            <span>Complete</span>
          </div>
        </div>
        <div className="rounded-full bg-primary h-2 w-full"></div>
      </section>

      <section className="text-center py-4">
        <h1 className="text-3xl md:text-4xl font-bold">Your Stress Assessment Results</h1>
        <p className="text-slate-500 mt-2">Comprehensive breakdown of your wellness status based on personalized analysis.</p>
      </section>

      <section className="flex flex-col items-center justify-center py-6">
        <div className="relative w-[300px] h-[160px] flex justify-center overflow-hidden">
          <svg className="w-full h-full transform translate-y-2" viewBox="0 0 200 110">
            <path d="M 20 100 A 80 80 0 0 1 73.3 28.5" fill="none" stroke="#10B981" strokeWidth="15" />
            <path d="M 76 27 A 80 80 0 0 1 124 27" fill="none" stroke="#F59E0B" strokeWidth="15" />
            <path d="M 126.7 28.5 A 80 80 0 0 1 180 100" fill="none" stroke="#EF4444" strokeWidth="15" />
            <g className="gauge-needle" style={{ transform: `rotate(${((insight.score / 10) * 180) - 90}deg)` }}>
              <path className="dark:stroke-white" d="M 100 100 L 100 20" stroke="#0d131c" strokeLinecap="round" strokeWidth="4" />
              <circle className="dark:fill-white" cx="100" cy="100" fill="#0d131c" r="6" />
            </g>
          </svg>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className="text-5xl font-bold tracking-tighter">{insight.score}</span>
            <span className="text-sm font-medium text-slate-500 uppercase tracking-widest">out of 10</span>
          </div>
        </div>
        <div className={`mt-6 flex items-center gap-2 px-6 py-2 rounded-full font-bold shadow-lg ${insight.level === 'High' ? 'bg-red-100 text-red-700 animate-pulse' : insight.level === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
          <span className="text-2xl">{insight.level === 'High' ? '😟' : insight.level === 'Medium' ? '😐' : '😊'}</span>
          <span>{insight.level.toUpperCase()} STRESS ZONE</span>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard title="Academic Load" score={academicLoad} max={16} icon="school" items={['Multiple subjects', `${academicLoad} credit hours`]} color={academicLoad > 18 ? 'red' : 'amber'} />
        <SummaryCard title="Time Balance" score={insight.level === 'High' ? 'POOR' : 'OK'} icon="schedule" desc="Daily study hours and sleep schedule analysis." status={insight.level === 'High' ? 'alert' : 'check'} />
        <SummaryCard title="Health Score" score={data.waterIntake} max={8} icon="ecg_heart" items={[`${data.junkFoodPerWeek} junk food days`, `${data.waterIntake} glasses water`]} color={data.waterIntake < 6 ? 'red' : 'emerald'} />
      </section>

      <section className={`p-6 rounded-xl border-l-4 flex flex-col md:flex-row gap-4 items-center justify-between ${insight.level === 'High' ? 'bg-red-50 border-red-500 text-red-800' : 'bg-green-50 border-green-500 text-green-800'}`}>
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined">warning</span> STRESS LEVEL: {insight.level}
          </h3>
          <p className="mt-1">{insight.analysis}</p>
        </div>
        <button className="shrink-0 px-4 py-2 bg-white rounded-lg border font-semibold">Read Analysis</button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Recommended Actions</h2>
          <div className="flex flex-col gap-4">
            {insight.nextSteps.map((step, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-xl border flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-primary/10 p-2 rounded-full text-primary shrink-0"><span className="material-symbols-outlined">lightbulb</span></div>
                <p className="font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl">
          <h3 className="font-bold text-lg mb-4">Your Next Steps</h3>
          <div className="flex flex-col gap-3">
            {['Book counselor appointment', 'Download sleep tracker', 'Buy reusable water bottle', 'Review syllabus'].map((task, i) => (
              <label key={i} className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border cursor-pointer hover:border-primary transition-all group">
                <input type="checkbox" className="size-5 rounded text-primary border-slate-300" />
                <span className="font-medium group-hover:text-primary">{task}</span>
              </label>
            ))}
          </div>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8 pb-12 border-t">
        <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/30 transition-transform hover:scale-105"><span className="material-symbols-outlined">download</span> Download Report</button>
        <button className="bg-white dark:bg-slate-800 border px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all"><span className="material-symbols-outlined">share</span> Share</button>
        <button onClick={onRestart} className="text-slate-500 font-bold hover:text-primary transition-colors">Start Over</button>
      </div>
    </main>
  );
};

const SummaryCard: React.FC<any> = ({ title, score, max, icon, items, desc, color, status }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-gray-700 shadow-sm flex flex-col gap-3">
    <div className="flex items-center gap-2"><span className="material-symbols-outlined text-primary">{icon}</span><h3 className="font-bold">{title}</h3></div>
    <div className="flex items-end gap-2">
      <span className={`text-3xl font-bold ${color === 'red' ? 'text-red-500' : ''}`}>{score}</span>
      {max && <span className="text-slate-400 mb-1">/ {max}</span>}
    </div>
    {max && <div className="w-full bg-slate-100 h-2 rounded-full"><div className={`h-full rounded-full ${color === 'red' ? 'bg-red-500' : 'bg-primary'}`} style={{ width: `${(score / max) * 100}%` }}></div></div>}
    {items && <ul className="text-sm text-slate-500 mt-2 space-y-1 list-disc list-inside">{items.map((it: string, i: number) => <li key={i}>{it}</li>)}</ul>}
    {desc && <p className="text-sm text-slate-500">{desc}</p>}
  </div>
);

export default Step7;
