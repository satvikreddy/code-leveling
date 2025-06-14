## Intro

Consider an api that validates user input before processing it.

- [usage.ts](usage.ts): how we can use the schema validation class to process request data
- [schema.ts](schema.ts): implementation of schema validation

Focus on the usage rather than the implementation of schema.

## Problem

Well, the schema validator works but it is not very readable. We can do better.

## Solution

How do you explain your pizza customization? You tell each attribute in a sequence. For example:

- Thin crust
- Extra cheese
- No onions

It is like constructing an object - brick by brick. We can do the same for our schema validation.

- [builder-usage.ts](builder-usage.ts) – the same examples with the builder
- [schema-builder.ts](schema-builder.ts) – implementation of the builder

## Compare

[usage.ts](usage.ts) vs [builder-usage.ts](builder-usage.ts)

Notice how much more natural the builder looks! The builder version is shorter, easier to scan, and scales nicely when the schema grows.

We just used the "Builder" pattern.

🥱 Boring definition: Builder is a creational design pattern that lets you construct complex objects step by step and produce different representations of them using the same construction code.

## Did you know?

The popular npm package [zod](https://www.npmjs.com/package/zod) (30M+ weekly downloads) uses the builder pattern to build its schema. Zod is loved for its ease of use.

🌱 Lesson Complete!

[Next pattern: Prototype →](/learn/design-patterns-using-typescript/3-prototype)
