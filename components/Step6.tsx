
import React from 'react';
import { UserData } from '../types';

interface Step6Props {
  data: UserData;
  onUpdate: (data: Partial<UserData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const Step6: React.FC<Step6Props> = ({ data, onUpdate, onNext, onPrev }) => {
  const updateHabit = (field: keyof UserData, val: number) => {
    onUpdate({ [field]: Math.max(0, val) });
  };

  const getHealthScore = () => {
    let score = 0;
    if (data.mealsPerDay >= 3) score += 2;
    if (data.junkFoodPerWeek <= 1) score += 2;
    if (data.waterIntake >= 8) score += 2;
    return score;
  };

  const score = getHealthScore();

  return (
    <main className="flex-1 flex flex-col items-center py-5 px-4 md:px-10 lg:px-40">
      <div className="max-w-[960px] w-full flex flex-col gap-6">
        <div className="flex flex-col gap-3 p-4">
          <div className="flex justify-between items-end">
            <p className="text-base font-medium">Step 6 of 7</p>
            <p className="text-slate-500 text-sm">Almost done!</p>
          </div>
          <div className="rounded-full bg-[#ced8e8] h-2 overflow-hidden">
            <div className="h-full bg-primary" style={{ width: '85%' }}></div>
          </div>
        </div>

        <div className="p-4">
          <h1 className="text-3xl font-bold">Let's Check Your Health & Eating Habits</h1>
          <p className="text-slate-500 mt-3">Understanding your nutrition is key to managing academic stress.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
          <HabitCard title="Meals Per Day" value={data.mealsPerDay} icon="restaurant" color="orange" onMinus={() => updateHabit('mealsPerDay', data.mealsPerDay - 1)} onPlus={() => updateHabit('mealsPerDay', data.mealsPerDay + 1)} desc="Rec: 3 full meals" />
          <HabitCard title="Junk Food" value={data.junkFoodPerWeek} icon="local_pizza" color="red" onMinus={() => updateHabit('junkFoodPerWeek', data.junkFoodPerWeek - 1)} onPlus={() => updateHabit('junkFoodPerWeek', data.junkFoodPerWeek + 1)} desc="Days per week" />
          <HabitCard title="Water Intake" value={data.waterIntake} icon="water_drop" color="blue" onMinus={() => updateHabit('waterIntake', data.waterIntake - 1)} onPlus={() => updateHabit('waterIntake', data.waterIntake + 1)} desc="Glasses per day" />
        </div>

        <div className="px-4">
          <div className="flex flex-col lg:flex-row gap-6 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-[#ced8e8] dark:border-gray-700">
            <div className="flex-1 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r pb-6 lg:pb-0 lg:pr-6 dark:border-gray-700">
              <div className="relative size-32 flex items-center justify-center">
                <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke={score >= 4 ? '#10b981' : '#f59e0b'} strokeWidth="3" strokeDasharray={`${(score/6)*100}, 100`} />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-black">{score.toFixed(1)}</span>
                  <span className="text-xs font-medium text-slate-500">SCORE</span>
                </div>
              </div>
              <span className={`mt-4 px-3 py-1 rounded-full text-sm font-bold ${score >= 4 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {score >= 5 ? 'Great' : score >= 3 ? 'Average' : 'Needs Improvement'} Habits
              </span>
            </div>
            <div className="flex-[2] flex flex-col gap-6">
              <h3 className="font-bold text-lg">Habit Impact Analysis</h3>
              <div className="rounded-lg bg-slate-50 dark:bg-slate-900 p-4 border border-[#e7ecf4] dark:border-gray-700">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-primary">tips_and_updates</span>
                  <p className="text-sm">
                    {score >= 5 ? 'Excellent lifestyle choices. This will significantly reduce academic fatigue.' : 'Small changes in hydration and meal consistency can boost your concentration by up to 20%.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between p-4 mt-4">
          <button onClick={onPrev} className="px-6 py-3 font-bold">Back</button>
          <button onClick={onNext} className="bg-primary px-8 py-3 rounded-lg text-white font-bold shadow-lg shadow-primary/30">Next Step</button>
        </div>
      </div>
    </main>
  );
};

const HabitCard: React.FC<any> = ({ title, value, icon, color, onPlus, onMinus, desc }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-[#ced8e8] dark:border-gray-700 shadow-sm flex flex-col gap-4">
    <div className="flex items-center gap-3">
      <div className={`size-12 rounded-full flex items-center justify-center bg-${color}-100 text-${color}-600`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <h3 className="font-bold">{title}</h3>
    </div>
    <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 p-1 rounded-lg">
      <button onClick={onMinus} className="size-10 flex items-center justify-center bg-white dark:bg-slate-700 rounded-md shadow-sm"><span className="material-symbols-outlined">remove</span></button>
      <span className="text-2xl font-bold">{value}</span>
      <button onClick={onPlus} className="size-10 flex items-center justify-center bg-primary text-white rounded-md shadow-sm"><span className="material-symbols-outlined">add</span></button>
    </div>
    <p className="text-xs text-center text-slate-500">{desc}</p>
  </div>
);

export default Step6;
