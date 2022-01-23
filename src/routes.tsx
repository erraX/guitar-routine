import { Navigate } from 'react-router-dom';
import type { RouteObject } from './types/Router.type';
import { MetronomePage } from './domain/Metronome';

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
    path: '/tracker',
    breadCrumb: {
      title: 'Tracker',
      to: '/tracker',
    },
    element: <div>tracker</div>,
  },
  {
    path: '/statistics',
    breadCrumb: {
      title: 'Statistics',
      to: '/statistics',
    },
    element: <div>statistics</div>,
  },
  {
    path: '*',
    element: <Navigate to="/metronome" />,
  },
];
