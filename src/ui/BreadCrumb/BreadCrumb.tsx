import React, { FC } from 'react';
import styled from 'styled-components';
import { ROLE_BREAD_CRUMB_ITEM } from './constants';

export interface BreadCrumbProps {
  separator?: string | React.ReactElement;
  className?: string;
}

const isBreadCrumbItem = (component: any): boolean => (
  component?.type?.role === ROLE_BREAD_CRUMB_ITEM
);

const BreadCrumbDiv = styled.div`
`;

const BreadCrumbSeparator = styled.span`
  margin: 0 5px;
`;

export const BreadCrumb: FC<BreadCrumbProps> = ({
  separator = '',
  className = '',
  children,
}) => {
  const items = React.Children.map(
    children,
    (item) => (isBreadCrumbItem(item) ? item : null),
  )?.filter(Boolean);

  if (!items || !items.length) {
    throw new Error('No valid breadcrumbs');
  }

  const itemsWithSeparator = [];
  for (let i = 0; i < items.length; i += 1) {
    itemsWithSeparator.push(items[i]);
    if (i !== items.length - 1) {
      itemsWithSeparator.push(
        <BreadCrumbSeparator>
          {separator}
        </BreadCrumbSeparator>,
      );
    }
  }

  return <BreadCrumbDiv className={className}>{itemsWithSeparator}</BreadCrumbDiv>;
};
