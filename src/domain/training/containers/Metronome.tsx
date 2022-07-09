import { MetronomeRoundButton } from '@common/components/Metronome';
import { useGlobalStateContext } from '../context/MetronomePageContext';

export const Metronome = () => {
  const globalStateCtx = useGlobalStateContext();

  const handleClickMetroButton = () => {
    globalStateCtx.toggleIsBeating();
  };

  return (
    <MetronomeRoundButton
      status={globalStateCtx.status}
      bpm={globalStateCtx.bpm}
      onClick={handleClickMetroButton}
      onBpmChange={globalStateCtx.setBpm}
    />
  );
};
