import { FC } from 'react';
import styled from 'styled-components';
import { ButtonCreateTraining } from './ButtonCreateTraining';
import { ButtonResetTraining } from './ButtonResetTraining';
import { useTrainingContext } from '../context/MetronomePageContext';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const TrainingControlBar: FC = () => {
  const trainingCtx = useTrainingContext();
  return (
    <Wrapper>
      <ButtonCreateTraining />
      {!trainingCtx.isTraining && <ButtonResetTraining />}
    </Wrapper>
  );
};
