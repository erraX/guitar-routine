import { FC } from 'react';
import styled from 'styled-components';

interface BlockProps {
  className?: string;
}

const BlockDiv = styled.div`
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px 0px;
  color: var(--geist-foreground);
  padding: 24px;
  text-decoration: none;
  background: white;
`;

export const Block: FC<BlockProps> = ({ className, children }) => (
  <BlockDiv className={className}>{children}</BlockDiv>
);
