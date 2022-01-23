import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ROLE_BREAD_CRUMB_ITEM } from './constants';

export interface BreadCrumbItemProps {
  to?: string;
  className?: string;
}

export const BreadCrumbItem: FC<BreadCrumbItemProps> & { role: symbol } = ({
  to,
  className,
  children,
}) => {
  const content = children;

  if (to) {
    return <Link className={className} to={to}>{content}</Link>;
  }

  return <span className={className}>{content}</span>;
};

BreadCrumbItem.role = ROLE_BREAD_CRUMB_ITEM;
