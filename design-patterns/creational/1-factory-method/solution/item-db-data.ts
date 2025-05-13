export type ItemType = "chest-plate" | "sword";

export interface ItemDbData {
  id: string;
  userId: string;
  type: ItemType;
}
