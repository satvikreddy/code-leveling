type SchemaParams = {
  type: "string" | "number";
  min?: number;
  isOptional?: boolean;
};

export class Schema {
  constructor(private params: SchemaParams) {}

  parse(input: unknown) {
    const { type, min, isOptional } = this.params;

    if (isOptional && (input === undefined || input === null)) {
      return input;
    }

    if (type === "string") {
      if (typeof input !== "string") {
        throw new Error("Expected a string");
      }
      if (min !== undefined && input.length < min) {
        throw new Error(`String must have at least ${min} characters`);
      }
      return input;
    }

    if (type === "number") {
      if (typeof input !== "number") {
        throw new Error("Expected a number");
      }
      if (min !== undefined && input < min) {
        throw new Error(`Number must be at least ${min}`);
      }
      return input;
    }

    throw new Error("Invalid schema type");
  }
}
