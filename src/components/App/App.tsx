import { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from '../../routes';
import { AppNavigator } from './AppNavigator';
import { AppHeader } from './AppHeader';
import { AppBody } from './AppBody';
import { AppBreadCrumbs } from './AppBreadCrumbs';

export const App: FC = () => {
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

export default App;
