import { BacklogItemType } from "./backlogItemType";

export interface BacklogItem {
  name: string;
  type: BacklogItemType;
  id?: string;
  description?: string;
  children?: BacklogItem[];
  acceptanceCriteria?: string[];
  assignedTo?: string;
}
