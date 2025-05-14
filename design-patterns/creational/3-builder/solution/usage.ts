import { z } from "./schema";

const schema1 = z.string().min(3).optional();

const schema2 = z.number().min(10);
