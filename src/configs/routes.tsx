import { Navigate } from 'react-router-dom';
import type { RouteObject } from '@/types/Router.type';
import { MetronomePage } from '@/pages/Metronome.page';
import { MetronomeTrainingPage } from '@/pages/MetronomeTraining.page';

export const routes: RouteObject[] = [
  {
    path: '/metronome',
    breadCrumb: {
      title: 'Metronome',
      to: '/metronome',
    },
    element: <MetronomePage />,
  },
  {
    path: '/training',
    breadCrumb: {
      title: 'Training',
      to: '/training',
    },
    element: <MetronomeTrainingPage />,
  },
  // {
  //   path: '/statistics',
  //   breadCrumb: {
  //     title: 'Statistics',
  //     to: '/statistics',
  //   },
  //   element: <div>statistics</div>,
  // },
  // {
  //   path: '*',
  //   element: <Navigate to="/plan" />,
  // },
];
