import { z } from "./schema-builder";

// string, min length 3, optional
const schema1 = z.string().min(3).optional();

// number, min value 10, required
const schema2 = z.number().min(10);

schema1.parse("hello"); // ✅
schema1.parse("hi"); // ❌

schema2.parse(10); // ✅
schema2.parse(9); // ❌
