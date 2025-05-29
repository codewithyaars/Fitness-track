import React, { useState } from 'react';
import Card from '../ui/Card';
import { workoutData } from '../../data/workoutData';
import { Dumbbell, Calendar as CalendarIcon, Play, Pause } from 'lucide-react';
import Calendar from 'react-calendar';
import YouTube from 'react-youtube';
import { format } from 'date-fns';
import 'react-calendar/dist/Calendar.css';

interface WorkoutLog {
  date: string;
  completed: boolean;
  workoutType: string;
}

const WorkoutSection: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[new Date().getDay()];
  
  const currentDayWorkout = workoutData.find(workout => 
    workout.day.toLowerCase() === (selectedDay || today).toLowerCase()
  );

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const dayName = days[date.getDay()];
    setSelectedDay(dayName);
  };

  const handleWorkoutComplete = () => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const workout = currentDayWorkout?.focus || '';
    
    setWorkoutLogs(prev => {
      const existingLog = prev.find(log => log.date === dateStr);
      if (existingLog) {
        return prev.map(log => 
          log.date === dateStr ? { ...log, completed: !log.completed } : log
        );
      }
      return [...prev, { date: dateStr, completed: true, workoutType: workout }];
    });
  };

  const tileClassName = ({ date }: { date: Date }) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const log = workoutLogs.find(log => log.date === dateStr);
    
    if (log?.completed) {
      return 'bg-emerald-500/20 text-emerald-400 rounded-full';
    }
    return '';
  };

  const toggleVideo = (videoId: string) => {
    if (playingVideo === videoId) {
      setPlayingVideo(null);
    } else {
      setPlayingVideo(videoId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Workout Plan</h1>
        <p className="text-slate-400">Your 6-day workout schedule with home exercises (30-40 min per day)</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card title="Workout Calendar" className="overflow-visible">
            <div className="p-4">
              <Calendar 
                onChange={handleDateChange} 
                value={selectedDate}
                tileClassName={tileClassName}
                className="w-full border-none shadow-none bg-slate-900 text-slate-300"
              />
            </div>
          </Card>

          <div className="grid grid-cols-7 gap-2">
            {workoutData.map((workout) => (
              <button
                key={workout.day}
                onClick={() => setSelectedDay(workout.day)}
                className={`p-2 text-center rounded-lg transition-all ${
                  (selectedDay || today) === workout.day
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {workout.day.substring(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {currentDayWorkout && (
          <Card 
            title={`${currentDayWorkout.day}'s Workout`} 
            className="transform transition-all hover:scale-[1.01]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-emerald-500/20 p-2 rounded-full mr-3">
                    <Dumbbell className="text-emerald-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-300">Focus Area</h3>
                    <p className="text-emerald-400 font-semibold">{currentDayWorkout.focus}</p>
                  </div>
                </div>
                <button
                  onClick={handleWorkoutComplete}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    workoutLogs.find(log => log.date === format(selectedDate, 'yyyy-MM-dd'))?.completed
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {workoutLogs.find(log => log.date === format(selectedDate, 'yyyy-MM-dd'))?.completed
                    ? 'Completed!'
                    : 'Mark Complete'}
                </button>
              </div>
              
              <div className="space-y-4">
                {currentDayWorkout.exercises.map((exercise, index) => (
                  <div key={index} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
                            {index + 1}
                          </span>
                          <h4 className="font-medium text-slate-300">{exercise.name}</h4>
                        </div>
                        <p className="text-slate-400 ml-9">
                          {exercise.sets} sets × {exercise.reps}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleVideo(exercise.videoId)}
                        className="ml-4 p-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
                      >
                        {playingVideo === exercise.videoId ? <Pause size={20} /> : <Play size={20} />}
                      </button>
                    </div>
                    
                    {playingVideo === exercise.videoId && (
                      <div className="mt-4 aspect-video rounded-lg overflow-hidden">
                        <YouTube
                          videoId={exercise.videoId}
                          className="w-full"
                          opts={{
                            width: '100%',
                            height: '100%',
                            playerVars: {
                              autoplay: 1,
                              modestbranding: 1,
                              rel: 0
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {currentDayWorkout.day === 'Sunday' ? (
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <p className="font-medium text-blue-400">Rest Day Tips:</p>
                  <ul className="mt-2 space-y-1 text-slate-300">
                    <li>• Take a relaxing walk</li>
                    <li>• Do light stretching</li>
                    <li>• Focus on recovery</li>
                  </ul>
                </div>
              ) : (
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <p className="font-medium text-emerald-400">Workout Tips:</p>
                  <ul className="mt-2 space-y-1 text-slate-300">
                    <li>• Warm up properly before starting</li>
                    <li>• Stay hydrated throughout</li>
                    <li>• Focus on form over speed</li>
                    <li>• Rest 30-60 seconds between sets</li>
                  </ul>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WorkoutSection;