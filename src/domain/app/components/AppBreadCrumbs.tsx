import { FC } from 'react';
import styled from 'styled-components';
import { useMatchRoutes } from '@common/hooks/useMatchRoutes';
import { BreadCrumb, BreadCrumbItem } from '@common/components/BreadCrumb';
import { routes } from '@/configs/routes';

const StyledBreadCrumb = styled(BreadCrumb)`
  height: 80px;
  display: flex;
  align-items: center;
`;

const StyledBreadCrumbItem = styled(BreadCrumbItem)`
  font-size: 20px;
`;

const BreadCrumbSeparator = styled.span`
  display: block;
  width: 30px;
  height: 1px;
  transform: rotate(125deg);
  background: #d7d7d7;
`;

export const AppBreadCrumbs: FC = () => {
  const matchedRoutes = useMatchRoutes(routes);

  if (!matchedRoutes || !matchedRoutes.length) {
    return null;
  }

  return (
    <StyledBreadCrumb separator={<BreadCrumbSeparator />}>
      <StyledBreadCrumbItem>Guitar Practice</StyledBreadCrumbItem>
      {matchedRoutes[0].route.breadCrumb?.title
        && (
          <StyledBreadCrumbItem>
            {matchedRoutes[0].route.breadCrumb?.title}
          </StyledBreadCrumbItem>
        )}
    </StyledBreadCrumb>
  );
};
