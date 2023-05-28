import { useReducer } from "react";
import { TrainingStatus } from "@types";

export interface TrainingState {
  status: TrainingStatus;
  totalGroups: number;
  trainedGroups: number;
  duration: number;
  totalRestGroups: number;
  restDuration: number;
  bpm: number;
  trainingCountdownRunning: boolean;
  trainingCountdownTimeLeft: number;
  restCountdownRunning: boolean;
  restCountdownTimeLeft: number;
}

const initialTrainingState: TrainingState = {
  status: TrainingStatus.STOPPED,
  totalGroups: 0,
  trainedGroups: 0,
  duration: 0,
  totalRestGroups: 0,
  restDuration: 0,
  bpm: 0,
  trainingCountdownRunning: false,
  trainingCountdownTimeLeft: 0,
  restCountdownRunning: false,
  restCountdownTimeLeft: 0,
};

type TrainingAction =
  | {
      type: "START_TRAINING";
      bpm: number;
      totalGroups: number;
      duration: number;
      restDuration: number;
      totalRestGroups: number;
    }
  | { type: "SET_TRAINING_COUNTDOWN", timeLeft: number }
  | { type: "SET_REST_COUNTDOWN", timeLeft: number }
  | { type: "STOP_TRAINING" }
  | { type: "PAUSE_TRAINING" }
  | { type: "PAUSE_REST" }
  | { type: "START_NEW_TRAINING_GROUP" }
  | { type: "RESUME_TRAINING" }
  | { type: "RESUME_REST" }
  | { type: "COMPLETE_TRAINING" }
  | { type: "START_REST" }
  | { type: "COMPLETE_REST" }
  | { type: "RESET" };

const trainingReducer = (
  state: TrainingState,
  action: TrainingAction
): TrainingState => {
  switch (action.type) {
    case "START_TRAINING":
      return {
        ...state,
        status: TrainingStatus.TRAINING,
        bpm: action.bpm,
        totalGroups: action.totalGroups,
        duration: action.duration,
        restDuration: action.restDuration,
        totalRestGroups: action.totalRestGroups,
        trainedGroups: 0,
        trainingCountdownRunning: true,
        trainingCountdownTimeLeft: action.duration,
      };
    case "STOP_TRAINING":
      return {
        ...state,
        status: TrainingStatus.STOPPED,
        trainingCountdownRunning: false,
        restCountdownRunning: false,
      };
    case "START_NEW_TRAINING_GROUP":
      return {
        ...state,
        status: TrainingStatus.TRAINING,
        trainingCountdownRunning: true,
        trainingCountdownTimeLeft: state.duration,
      };
    case "PAUSE_TRAINING":
      return {
        ...state,
        status: TrainingStatus.TRAINING_PAUSED,
        trainingCountdownRunning: false,
      };
    case "RESUME_TRAINING":
      return {
        ...state,
        status: TrainingStatus.TRAINING,
        trainingCountdownRunning: true,
      };
    case "COMPLETE_TRAINING":
      return {
        ...state,
        trainedGroups: state.trainedGroups + 1,
        trainingCountdownRunning: false,
      };
    case "SET_TRAINING_COUNTDOWN":
      return {
        ...state,
        trainingCountdownTimeLeft: action.timeLeft,
      };
    case "SET_REST_COUNTDOWN":
      return {
        ...state,
        restCountdownTimeLeft: action.timeLeft,
      };
    case "START_REST":
      return {
        ...state,
        status: TrainingStatus.RESTING,
        restCountdownRunning: true,
        restCountdownTimeLeft: state.restDuration,
      };
    case "PAUSE_REST":
      return {
        ...state,
        status: TrainingStatus.REST_PAUSED,
        restCountdownRunning: false,
      };
    case "RESUME_REST":
      return {
        ...state,
        status: TrainingStatus.RESTING,
        restCountdownRunning: true,
      };
    case "COMPLETE_REST":
      return {
        ...state,
        restCountdownRunning: false,
      };
    case "RESET":
      return initialTrainingState;
    default:
      throw new Error("Invalid action type");
  }
};

export const useTrainingState = () => {
  return useReducer(trainingReducer, initialTrainingState);
};