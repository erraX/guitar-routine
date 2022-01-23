import { RouteObject as RRouteObject, RouteMatch as RROuteMatch } from 'react-router-dom';

export interface RouteObject extends RRouteObject {
  breadCrumb?: {
    title: string;
    to?: string;
  };
}

export interface RouteMatch extends RROuteMatch {
  route: RouteObject;
}
