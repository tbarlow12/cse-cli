export interface SprintConfig {
  startDate: string;
  lengthOfSprintInDays: number;
  daysBetweenSprints: number;
  numberOfSprints: number;
  sprintNamePattern?: string;
  sprintIndexStart?: number;
}
