import { Schema } from "./schema";

// string, min length 3, optional
const schema1 = new Schema({
  type: "string",
  min: 3,
  isOptional: true,
});

// number, min value 10, required
const schema2 = new Schema({
  type: "number",
  min: 10,
  isOptional: false,
});

schema1.parse("hello"); // ✅
schema1.parse("hi"); // ❌

schema2.parse(10); // ✅
schema2.parse(9); // ❌
