import { FC } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/colors';

const Header = styled.header`
  padding: 10px 50px;
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.grey2};
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  min-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const AppHeader: FC = ({ children }) => (
  <Header>
    <HeaderContent>
      {children}
    </HeaderContent>
  </Header>
);
