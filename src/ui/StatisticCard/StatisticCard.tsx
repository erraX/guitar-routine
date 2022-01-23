import { FC, ReactElement } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/colors';
import type { ColorKeys } from '../../styles/colors';

interface StatisticCardProps {
  title: string | ReactElement;
  color: ColorKeys;
}

const Root = styled.div<{ color: ColorKeys }>`
  color: ${(props) => colors[props.color]};
`;

const Title = styled.div<{ color: ColorKeys }>`
  font-weight: 900;
  font-size: 20px;
  padding-bottom: 5px;
`;

const Splitor = styled.div<{ color: ColorKeys }>`
  background-color: ${(props) => colors[props.color]};
  margin-bottom: 20px;
  width: 70%;
  height: 2px;
`;

const Content = styled.div`
  font-size: 60px;
  line-height: 1;
`;

export const StatisticCard: FC<StatisticCardProps> = ({ color = 'blue', title, children }) => (
  <Root color={color}>
    <Title color={color}>{title}</Title>
    <Splitor color={color} />
    <Content>{children}</Content>
  </Root>
);
