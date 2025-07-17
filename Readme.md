# Game Store API

This is an Express.js server application implementing a backend API for a Game Store platform. It manages users, games, categories, platforms, and cards (user-generated content), using MongoDB with Mongoose for data persistence.

---

## Features

- User authentication and role management (`user`, `admin`, `moderator`)
- CRUD operations for games, categories, platforms, and cards
- Support for likes on games and cards by users
- Soft-delete functionality for users with automatic expiration (TTL)
- Secure password hashing with bcrypt

---

## Project Structure

- **Models:** Defines Mongoose schemas and models for the entities in the system.
- **Controllers:** Handle API logic (not shown here).
- **Routes:** API endpoints (not shown here).

---

## Mongoose Schemas Overview

### User Schema (`user`)

- `username`: unique string, min length enforced.
- `email`: unique string, min length enforced.
- `password`: hashed string, min length enforced.
- `role`: user role, one of `user`, `admin`, or `moderator`.
- `tokenVersion`: for token invalidation, defaults to 1.
- Soft-delete flags:
  - `isDeleted` (boolean)
  - `deletedAt` (date) — used with TTL index to auto-remove users.
- Passwords are hashed automatically before saving.

---

### Game Schema (`game`)

- `title`: unique string, min length enforced.
- `description`: optional string.
- `price`: required number.
- `releaseDate`: date.
- `imageUrl`: required string, min length enforced.
- `categories`: array of references to `Category` documents.
- `platforms`: array of references to `Platform` documents.
- `author`: reference to the `User` who created the game.
- `likes`: array of references to `User` documents who liked the game.
- Uses collation for case-insensitive unique checks.

---

### Category Schema (`category`)

- `name`: unique string, required.
- `description`: optional string.
- Uses collation for case-insensitive unique checks.

---

### Platform Schema (`platform`)

- `name`: unique string, required.
- `manufacturer`: optional string.
- Uses collation for case-insensitive unique checks.

---

### Card Schema (`card`)

- `title`: required string, min length enforced.
- `description`: optional string.
- `price`: optional number.
- `imageUrl`: required string, min length enforced.
- `author`: reference to `User` who created the card.
- `likes`: array of references to `User` documents who liked the card.
- Timestamps for creation and updates.

---

# 📚 `Get all data from collection` — Query, Filter, Sort & Pagination

This method provides a flexible way to **filter**, **search**, **sort**, and **paginate** Mongoose documents dynamically via query parameters.

---

## ✅ How It Works

- Parses incoming query parameters (`req.query`).
- Supports **pagination**, **sorting**, and **dynamic filters**.
- Filters can match strings via `$regex` or apply numeric limits (`priceLimit`).
- Runs **2 parallel queries**:
  - One for data (`find`)
  - One for total count (`countDocuments`)

---

## 📌 Supported Query Parameters

| Parameter     | Type   | Example        | Description                                            |
| ------------- | ------ | -------------- | ------------------------------------------------------ |
| `page`        | Number | `1`            | Current page number. Default: `1`                      |
| `limit`       | Number | `10`           | Items per page. Default: `10`                          |
| `sortBy`      | String | `createdAt`    | Field to sort by. Default: `createdAt`                 |
| `order`       | String | `asc` / `desc` | Sort direction. Default: `desc`                        |
| Any other key | String | `?title=cat`   | Filter by matching field using case-insensitive regex. |
| `priceLimit`  | Number | `20`           | Filter numeric fields with `$lte` operator.            |

---

## ✅ Example Queries

- **Basic search**

  ```http
  GET /api/games?title=RPG
  GET /api/cards?category=Funny

  GET /api/cards
  ?limit=10&page=3&order=asc&sortBy=createdAt `default queries`
  ?priceLimit=100 `only for collections with price prop`
  ?{propName}=banana `match by regex propery that include banana`
  ```

## Installation

```bash
git clone <repository-url>
cd <project-folder>
npm install
```
