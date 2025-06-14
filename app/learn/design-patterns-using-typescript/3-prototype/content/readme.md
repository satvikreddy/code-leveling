## Intro

We're building an app that supports multiple UI themes (light, dark, high-contrast, etc). Each theme has several properties.

- [theme.class.ts](theme.class.ts): implementation of the theme class
- [usage.ts](usage.ts): how we create multiple themes

## Problem

Theme is something that we modify based on an existing theme. Typically, we want to change a few properties from the existing theme like change radius or change font family.

Creating a new theme from an old one by passing all properties is tedious.

## Solution

What if we could say, "I want everything from the light theme but change the font family to Roboto"?

This can be done by simply exposing a clone method on the theme class [solved-theme.class.ts](solved-theme.class.ts).

## Compare

[usage.ts](usage.ts) vs [solved-usage.ts](solved-usage.ts)

We just used the "Prototype" pattern.

🥱 Boring definition: Prototype is a creational design pattern that lets you copy existing objects without making your code dependent on their classes.

## Did you know?

Flutter's [ThemeData](https://api.flutter.dev/flutter/material/ThemeData-class.html) class uses the prototype pattern to create new themes. The method there is called `copyWith`.

🌱 Lesson Complete!

[Next pattern: Singleton →](/learn/design-patterns-using-typescript/4-singleton)
