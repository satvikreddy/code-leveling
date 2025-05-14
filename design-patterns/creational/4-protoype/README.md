## Intro

You're building an app that supports multiple UI themes (light, dark, high-contrast, etc.). Each theme has several properties.

## Problem

`problem/usage.ts`

- Each theme only changes a few properties from defaultTheme but we are having to create a new object by passing all properties.

**Solution**

What if the class exposes a clone method which copies every property from base object, unless we explicitly pass the props that change.

`solution/usage.ts`
