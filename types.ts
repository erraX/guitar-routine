export type Operation = ("REMOVE" | "EDIT")[];

export interface ExerciseTableRow {
  id: number;
  name: string;
  description?: string;
  link?: string;
}

export enum TrainingStatus {
  STOPPED = "STOPPED",
  RUNNING = "RUNNING",
  PAUSED = "PAUSED",
}

export interface TraineringRecord {
  exerciseId: number;
  exerciseName: string;
  duration: number;
  bpm: number;
  groups: number;
  restDuration: number;
};