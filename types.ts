export type Operation = ("REMOVE" | "EDIT")[];

export interface ExerciseTableRow {
  id: number;
  name: string;
  description?: string;
  guide: any;
  operation?: Operation;
}
