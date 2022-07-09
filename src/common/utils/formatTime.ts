import { padLeftString } from './padString';

export const formatTime = (seconds: number) => {
  // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
  let _seconds = seconds;
  const secondsNumber = String(_seconds % 60);
  _seconds = Math.floor(seconds / 60);
  const minutesNumber = String(_seconds % 60);
  _seconds = Math.floor(_seconds / 60);
  const hoursNumber = String(Math.min(99, _seconds % 60));
  return `${padLeftString(hoursNumber, 2, '0')}:${padLeftString(minutesNumber, 2, '0')}:${padLeftString(secondsNumber, 2, '0')}`;
};
