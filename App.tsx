
import React, { useState, useEffect } from 'react';
import { UserData, Subject, DayBalance } from './types';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import Step6 from './components/Step6';
import Step7 from './components/Step7';
import Navbar from './components/Navbar';

const INITIAL_DATA: UserData = {
  fullName: '',
  department: '',
  semester: '',
  subjects: [
    { id: '1', name: 'Mathematics', credits: 3, totalMarks: 100, obtainedMarks: 90, totalTopics: 20, coveredTopics: 18 },
    { id: '2', name: 'Physics', credits: 4, totalMarks: 100, obtainedMarks: 70, totalTopics: 24, coveredTopics: 15 },
    { id: '3', name: 'History', credits: 3, totalMarks: 100, obtainedMarks: 42, totalTopics: 30, coveredTopics: 12 },
  ],
  timeBalance: [
    { day: 1, class: 6, study: 4, refresh: 4, sleep: 8 },
    { day: 2, class: 8, study: 6, refresh: 2, sleep: 6 },
    { day: 3, class: 4, study: 4, refresh: 8, sleep: 8 },
  ],
  mealsPerDay: 3,
  junkFoodPerWeek: 2,
  waterIntake: 5,
};

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<UserData>(INITIAL_DATA);

  const nextStep = () => setStep(prev => Math.min(prev + 1, 7));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const updateFormData = (newData: Partial<UserData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1 data={formData} onUpdate={updateFormData} onNext={nextStep} />;
      case 2: return <Step2 data={formData} onUpdate={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 3: return <Step3 data={formData} onUpdate={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 4: return <Step4 data={formData} onUpdate={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 5: return <Step5 data={formData} onUpdate={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 6: return <Step6 data={formData} onUpdate={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 7: return <Step7 data={formData} onRestart={() => setStep(1)} />;
      default: return <Step1 data={formData} onUpdate={updateFormData} onNext={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display">
      {step > 1 && <Navbar currentStep={step} />}
      <div className="w-full">
        {renderStep()}
      </div>
      <footer className="w-full py-8 text-center text-slate-400 text-sm">
        <p>Develop by <span className="font-semibold text-primary">Waqar Ahmed</span> with Love</p>
      </footer>
    </div>
  );
};

export default App;
