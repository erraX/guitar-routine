import { useLocation } from 'react-router-dom';
import { matchRoutes } from '../utils/matchRoutes';
import type { RouteObject } from '../../types/Router.type';

export const useMatchRoutes = (routesConfig: RouteObject[]) => {
  const location = useLocation();
  return matchRoutes(routesConfig, location.pathname);
};
