import { Schema } from "./schema";

const schema1 = new Schema({
  type: "string",
  min: 3,
  isOptional: true,
});

const schema2 = new Schema({
  type: "number",
  min: 10,
  isOptional: false,
});
