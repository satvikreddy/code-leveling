## Intro

We have a web application that returns match score to users.

- [getMatchScore.api.ts](getMatchScore.api.ts): returns match score from cache
- [cache-service.ts](cache-service.ts): uses redis cache

## Problem

One day, we started seeing errors on our redis server `ConnectionError: Too many connections`.

Investigation:

- Everytime we instantiate Redis class from ioredis package a new redis connection is created
- Our [cache-service.ts](cache-service.ts) creates only one Redis instance but the CacheService class itself is created and used in [getMatchScore.api.ts](getMatchScore.api.ts)
- We are creating a new CacheService (which in turn creates a new connection) for every user request. This means if we have one backend server which gets 1000 requests, the server will create 1000 connections to redis 🤯

## Solution

CacheService class is used in many places in the app. First, we'll make the constructor private so that no one outside can instantiate it. Then we'll expose a static method that:

- creates and returns an instance if not already created
- else returns the created instance

If this sounds confusing, look at [cache-service-singleton.ts](cache-service-singleton.ts)

## Compare

We basically want to force only one instance of a class to be created. [compare.ts](compare.ts) makes it clear.

We just used the "Singleton" pattern.

🥱 Boring definition: Singleton is a creational design pattern that ensures a class has only one instance and provides global access to that instance.

## Did you know?

Managing singleton instances is such a common task that we have dedicated packages for it.

- Flutter has [get_it](https://pub.dev/packages/get_it)
- [NestJS](https://nestjs.com/) (not nextjs) is a framework that has built-in support for dependency injection.

🌱 Lesson Complete!

[Next pattern: Adapter →](/learn/design-patterns-using-typescript/5-adapter)
