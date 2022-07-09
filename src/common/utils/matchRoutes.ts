import { matchRoutes as reactRouterMatchRoutes } from 'react-router-dom';
import type { RouteMatch } from '../../types/Router.type';

export const matchRoutes = (...args: Parameters<typeof reactRouterMatchRoutes>) => (
  reactRouterMatchRoutes(...args) as null | RouteMatch[]
);
