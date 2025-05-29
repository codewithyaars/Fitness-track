import { MealPlan } from '../types';

export const dietData: MealPlan[] = [
  {
    time: 'Morning (Post Workout - 7:15 AM)',
    title: 'Post Workout',
    items: [
      '1 banana', 
      '4–5 soaked almonds', 
      '1 glass low-fat milk (haldi / cinnamon optional)'
    ]
  },
  {
    time: 'Lunch (12:30–1:00 PM)',
    title: 'Main Meal',
    items: [
      '2 roti (ghee optional)',
      'Seasonal sabzi (no methi/karela)',
      '1 bowl dal / chole / rajma',
      'Salad (cucumber, carrot, beetroot)',
      'Chaas (buttermilk)'
    ]
  },
  {
    time: 'Evening (4:30 PM)',
    title: 'Evening Snack',
    items: [
      '1 fruit OR roasted chana / sprouts / makhana',
      'Green tea / lemon tea (no sugar)'
    ]
  },
  {
    time: 'Dinner (7:30–8:30 PM)',
    title: 'Light Dinner',
    items: [
      '1 roti + sabzi',
      'Ya moong dal khichdi + papad',
      'Ya bhakar + sabzi',
      'Ya 1 bowl rice + sabzi',
      'Clear veg soup (optional)'
    ]
  },
  {
    time: 'Before Sleeping (10:30 PM)',
    title: 'Night Time',
    items: [
      '1 glass warm water (haldi / cinnamon)'
    ]
  }
];