type ItemType = "chest-plate" | "sword";

type ItemDbData = {
  id: string;
  userId: string;
  type: ItemType;
};

export type { ItemDbData, ItemType };
