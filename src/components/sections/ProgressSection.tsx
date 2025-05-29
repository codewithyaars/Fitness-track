import React, { useState } from 'react';
import { format, subDays, differenceInDays } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, BarChart, Bar } from 'recharts';
import { Droplets, Pizza, Star, Activity, TrendingUp, Award, Scale, Target, Flame, Heart, Brain, Moon } from 'lucide-react';
import Card from '../ui/Card';

interface DailyProgress {
  date: string;
  workout: boolean;
  waterIntake: number;
  noJunkFood: boolean;
  dayRating: number;
  weight?: number;
  calories?: number;
  steps?: number;
  sleepHours?: number;
  moodRating?: number;
  stressLevel?: number;
}

const ProgressSection: React.FC = () => {
  const [progress, setProgress] = useState<DailyProgress>({
    date: format(new Date(), 'yyyy-MM-dd'),
    workout: false,
    waterIntake: 0,
    noJunkFood: true,
    dayRating: 3,
    weight: undefined,
    calories: 0,
    steps: 0,
    sleepHours: 0,
    moodRating: 3,
    stressLevel: 3
  });

  const [progressHistory, setProgressHistory] = useState<DailyProgress[]>([
    { date: format(subDays(new Date(), 4), 'yyyy-MM-dd'), workout: true, waterIntake: 3.5, noJunkFood: true, dayRating: 4, weight: 75, calories: 2100, steps: 8000, sleepHours: 7, moodRating: 4, stressLevel: 2 },
    { date: format(subDays(new Date(), 3), 'yyyy-MM-dd'), workout: true, waterIntake: 3.0, noJunkFood: true, dayRating: 5, weight: 74.8, calories: 2000, steps: 10000, sleepHours: 8, moodRating: 5, stressLevel: 1 },
    { date: format(subDays(new Date(), 2), 'yyyy-MM-dd'), workout: false, waterIntake: 2.5, noJunkFood: false, dayRating: 3, weight: 74.5, calories: 2300, steps: 6000, sleepHours: 6, moodRating: 3, stressLevel: 4 },
    { date: format(subDays(new Date(), 1), 'yyyy-MM-dd'), workout: true, waterIntake: 4.0, noJunkFood: true, dayRating: 5, weight: 74.3, calories: 1900, steps: 12000, sleepHours: 7.5, moodRating: 4, stressLevel: 2 },
    { date: format(new Date(), 'yyyy-MM-dd'), workout: true, waterIntake: 3.8, noJunkFood: true, dayRating: 4, weight: 74.2, calories: 2050, steps: 9000, sleepHours: 8, moodRating: 5, stressLevel: 1 },
  ]);

  const handleSaveProgress = () => {
    const newProgress = {
      ...progress,
      date: format(new Date(), 'yyyy-MM-dd')
    };
    
    setProgressHistory(prev => [...prev, newProgress]);
    setProgress({
      date: format(new Date(), 'yyyy-MM-dd'),
      workout: false,
      waterIntake: 0,
      noJunkFood: true,
      dayRating: 3,
      weight: undefined,
      calories: 0,
      steps: 0,
      sleepHours: 0,
      moodRating: 3,
      stressLevel: 3
    });
  };

  const calculateStreak = () => {
    let streak = 0;
    const sortedHistory = [...progressHistory].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    for (const day of sortedHistory) {
      if (day.workout && day.noJunkFood && day.waterIntake >= 3) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const getWeightChange = () => {
    if (progressHistory.length < 2) return 0;
    const sortedHistory = [...progressHistory]
      .filter(day => day.weight)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    if (sortedHistory.length < 2) return 0;
    return Number((sortedHistory[0].weight! - sortedHistory[sortedHistory.length - 1].weight!).toFixed(1));
  };

  const calculateAverages = () => {
    const total = progressHistory.reduce((acc, day) => ({
      calories: (acc.calories || 0) + (day.calories || 0),
      steps: (acc.steps || 0) + (day.steps || 0),
      sleep: (acc.sleep || 0) + (day.sleepHours || 0),
      mood: (acc.mood || 0) + (day.moodRating || 0)
    }), { calories: 0, steps: 0, sleep: 0, mood: 0 });

    return {
      calories: Math.round(total.calories / progressHistory.length),
      steps: Math.round(total.steps / progressHistory.length),
      sleep: Number((total.sleep / progressHistory.length).toFixed(1)),
      mood: Number((total.mood / progressHistory.length).toFixed(1))
    };
  };

  const averages = calculateAverages();

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Progress Tracker</h1>
        <p className="text-slate-400">Track your daily fitness journey</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card title="Today's Progress" className="bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-emerald-500/20 p-2 rounded-full">
                        <Activity className="text-emerald-400" size={24} />
                      </div>
                      <span className="font-medium text-white">Workout Done?</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={progress.workout}
                        onChange={e => setProgress(prev => ({ ...prev, workout: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-500/20 p-2 rounded-full">
                        <Droplets className="text-blue-400" size={24} />
                      </div>
                      <div>
                        <span className="font-medium text-white">Water (L)</span>
                        <div className="text-sm text-slate-400">Target: 3-4L</div>
                      </div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      max="6"
                      step="0.1"
                      value={progress.waterIntake}
                      onChange={e => setProgress(prev => ({ ...prev, waterIntake: parseFloat(e.target.value) }))}
                      className="w-20 px-3 py-2 bg-slate-700 border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-500/20 p-2 rounded-full">
                        <Pizza className="text-red-400" size={24} />
                      </div>
                      <span className="font-medium text-white">No Junk Food?</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={progress.noJunkFood}
                        onChange={e => setProgress(prev => ({ ...prev, noJunkFood: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                    </label>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-500/20 p-2 rounded-full">
                        <Scale className="text-purple-400" size={24} />
                      </div>
                      <div>
                        <span className="font-medium text-white">Weight (kg)</span>
                        <div className="text-sm text-slate-400">Morning weight</div>
                      </div>
                    </div>
                    <input
                      type="number"
                      min="30"
                      max="150"
                      step="0.1"
                      value={progress.weight || ''}
                      onChange={e => setProgress(prev => ({ ...prev, weight: parseFloat(e.target.value) }))}
                      className="w-20 px-3 py-2 bg-slate-700 border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="0.0"
                    />
                  </div>
                </div>

                <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-orange-500/20 p-2 rounded-full">
                        <Flame className="text-orange-400" size={24} />
                      </div>
                      <div>
                        <span className="font-medium text-white">Calories</span>
                        <div className="text-sm text-slate-400">Daily intake</div>
                      </div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      max="5000"
                      step="50"
                      value={progress.calories || ''}
                      onChange={e => setProgress(prev => ({ ...prev, calories: parseFloat(e.target.value) }))}
                      className="w-24 px-3 py-2 bg-slate-700 border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-emerald-500/20 p-2 rounded-full">
                        <Target className="text-emerald-400" size={24} />
                      </div>
                      <div>
                        <span className="font-medium text-white">Steps</span>
                        <div className="text-sm text-slate-400">Daily goal: 10k</div>
                      </div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      max="50000"
                      step="100"
                      value={progress.steps || ''}
                      onChange={e => setProgress(prev => ({ ...prev, steps: parseFloat(e.target.value) }))}
                      className="w-24 px-3 py-2 bg-slate-700 border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-amber-500/20 p-2 rounded-full">
                    <Star className="text-amber-400" size={24} />
                  </div>
                  <span className="font-medium text-white">Day Rating</span>
                </div>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setProgress(prev => ({ ...prev, dayRating: rating }))}
                      className={`flex-1 p-3 rounded-lg transition-colors ${
                        rating <= progress.dayRating
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                          : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                      }`}
                    >
                      <Star size={20} className="mx-auto" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-blue-500/20 p-2 rounded-full">
                      <Brain className="text-blue-400" size={24} />
                    </div>
                    <span className="font-medium text-white">Mood Rating</span>
                  </div>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setProgress(prev => ({ ...prev, moodRating: rating }))}
                        className={`flex-1 p-3 rounded-lg transition-colors ${
                          rating <= (progress.moodRating || 0)
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                            : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                        }`}
                      >
                        <Star size={20} className="mx-auto" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-purple-500/20 p-2 rounded-full">
                      <Heart className="text-purple-400" size={24} />
                    </div>
                    <span className="font-medium text-white">Sleep (hours)</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="24"
                    step="0.5"
                    value={progress.sleepHours || ''}
                    onChange={e => setProgress(prev => ({ ...prev, sleepHours: parseFloat(e.target.value) }))}
                    className="w-full px-3 py-2 bg-slate-700 border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Hours of sleep"
                  />
                </div>
              </div>

              <button
                onClick={handleSaveProgress}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Save Today's Progress
              </button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Progress Overview" className="bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="h-[200px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={progressHistory}>
                  <defs>
                    <linearGradient id="waterColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E293B',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#F1F5F9'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="waterIntake" 
                    stroke="#2DD4BF" 
                    fillOpacity={1} 
                    fill="url(#waterColor)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="h-[200px] mt-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E293B',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#F1F5F9'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#A78BFA" 
                    strokeWidth={2} 
                    dot={{ fill: '#A78BFA' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="h-[200px] mt-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={progressHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E293B',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#F1F5F9'
                    }}
                  />
                  <Bar dataKey="steps" fill="#34D399" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div className="flex items-center space-x-3 mb-2">
                  <TrendingUp className="text-emerald-400" size={24} />
                  <h3 className="font-medium text-white">Current Streak</h3>
                </div>
                <p className="text-3xl font-bold text-emerald-400">
                  {calculateStreak()} days
                </p>
              </div>

              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div className="flex items-center space-x-3 mb-2">
                  <Award className="text-purple-400" size={24} />
                  <h3 className="font-medium text-white">Weight Change</h3>
                </div>
                <p className="text-3xl font-bold text-purple-400">
                  {getWeightChange()} kg
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Card title="Weekly Averages" className="bg-slate-800 border border-slate-700">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-slate-900/50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Flame className="text-orange-400" size={18} />
                      <span className="text-slate-300">Calories</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{averages.calories}</p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-slate-900/50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="text-emerald-400" size={18} />
                      <span className="text-slate-300">Steps</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{averages.steps}</p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-slate-900/50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Moon className="text-purple-400" size={18} />
                      <span className="text-slate-300">Sleep</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{averages.sleep}h</p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-slate-900/50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain className="text-blue-400" size={18} />
                      <span className="text-slate-300">Mood</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{averages.mood}/5</p>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;