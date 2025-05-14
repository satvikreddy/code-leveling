type BaseSchema<T, Builder> = {
  min(value: number): Builder;
  optional(): Builder;
  parse(input: unknown): T | undefined;
};

class StringSchema implements BaseSchema<string, StringSchema> {
  private _min?: number;
  private _optional = false;

  min(value: number): StringSchema {
    this._min = value;
    return this;
  }

  optional(): StringSchema {
    this._optional = true;
    return this;
  }

  parse(input: unknown) {
    if (this._optional && (input === undefined || input === null)) {
      return undefined;
    }
    if (typeof input !== "string") {
      throw new Error("Expected a string");
    }
    if (this._min !== undefined && input.length < this._min) {
      throw new Error(`String must have at least ${this._min} characters`);
    }
    return input;
  }
}

class NumberSchema implements BaseSchema<number, NumberSchema> {
  private _min?: number;
  private _optional = false;

  min(value: number): NumberSchema {
    this._min = value;
    return this;
  }

  optional(): NumberSchema {
    this._optional = true;
    return this;
  }

  parse(input: unknown) {
    if (this._optional && (input === undefined || input === null)) {
      return undefined;
    }
    if (typeof input !== "number") {
      throw new Error("Expected a number");
    }
    if (this._min !== undefined && input < this._min) {
      throw new Error(`Number must be at least ${this._min}`);
    }
    return input;
  }
}

export const z = {
  string: () => new StringSchema(),
  number: () => new NumberSchema(),
};
