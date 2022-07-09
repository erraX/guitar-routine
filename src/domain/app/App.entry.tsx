import { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from '@/configs/routes';
import { AppNavigator } from './components/AppNavigator';
import { AppHeader } from './components/AppHeader';
import { AppBody } from './components/AppBody';
import { AppBreadCrumbs } from './components/AppBreadCrumbs';

export const AppEntry: FC = () => {
  const appRoutes = useRoutes(routes);

  return (
    <div className="App">
      <AppHeader>
        <AppBreadCrumbs />
        <AppNavigator />
      </AppHeader>
      <AppBody>{appRoutes}</AppBody>
    </div>
  );
};
