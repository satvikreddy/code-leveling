## Intro

Suppose we want to validate user input in a flexible way, such as checking if a string is at least a certain length, or a number is above a minimum value. We want to be able to easily build up these validation rules step by step.

## Problem

There are few problems in [`usage`](./problem/usage.ts)

- Not very readable as each validation is a property in an object. This object can get very big and confusing easily.
- Doing any form of ordered (step by step) validation is hard.

## Solution

Use the builder pattern to construct validation schemas in a readable, step-by-step way. Each method call adds a rule, and the final schema can be used to validate input.

- [`usage.ts`](./solution/usage.ts): Easy to use and read via chainable style.
