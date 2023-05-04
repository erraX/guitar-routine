export type Operation = ("REMOVE" | "EDIT")[];

export interface ExerciseTableRow {
  id: number;
  name: string;
  description?: string;
  link?: string;
  operation?: Operation;
}
