export type Operation = ("REMOVE" | "EDIT")[];

export interface ExerciseTableRow {
  id: number;
  name: string;
  description?: string;
  link?: string;
}

export enum TrainingStatus {
  STOPPED = "STOPPED",
  TRAINING = "TRAINING",
  RESTING = "RESTING",
  TRAINING_PAUSED = "TRAINING_PAUSED",
  REST_PAUSED = "REST_PAUSED",
}

export interface TraineringRecord {
  exerciseId: number;
  exerciseName: string;
  duration: number;
  bpm: number;
  groups: number;
  restDuration: number;
};