import { FC } from 'react';
import { Button } from 'react-bootstrap';
import { useTrainingContext } from '../context/MetronomePageContext';

export interface ButtonCreateTrainingProps {}

export const ButtonResetTraining: FC<ButtonCreateTrainingProps> = () => {
  const trainingCtx = useTrainingContext();

  const handleClick = () => {
    trainingCtx.reset();
  };

  return (
    <Button onClick={handleClick}>
      Reset
    </Button>
  );
};
