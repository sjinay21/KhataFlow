# Phase 1: Database Design Plan

## Overview
The MongoDB database will use a clean, normalized structure suitable for personal finance, avoiding deep nesting where unnecessary while maintaining strict user ownership.

## 1. Users
- **Purpose**: Manage authentication and account details.
- **Why it is needed**: To secure user data and handle login.
- **Important Fields**: `email`, `passwordHash`, `name`, `createdAt`.
- **Field Types**: String, Date.
- **Required fields**: `email`, `passwordHash`.
- **Optional fields**: `name`.
- **Default values**: `createdAt` defaults to now.
- **Validation rules**: Unique email, valid email format.
- **Relationship with the user**: N/A (this is the user).
- **Relationships with other data**: Parent of all other collections.
- **Ownership and privacy rules**: Private, passwords hashed.
- **Timestamps**: Yes.
- **Possible indexes**: `email` (unique).
- **Embedded or referenced**: Referenced by all other models.
- **Required for first version**: Yes (Phase 3).
- **Risks and trade-offs**: None.

## 2. Financial Profiles
- **Purpose**: Store the user's base salary, city, housing type, and planning preferences.
- **Why it is needed**: For the "Plan My Money" feature baseline.
- **Important Fields**: `userId`, `monthlySalary`, `otherIncome`, `city`, `dependents`, `housingType`.
- **Field Types**: ObjectId, Number, String.
- **Required fields**: `userId`, `monthlySalary`.
- **Optional fields**: `otherIncome`, `city`, etc.
- **Default values**: `otherIncome` = 0.
- **Validation rules**: Non-negative values (0 or greater).
- **Relationship with the user**: 1-to-1 with User.
- **Ownership and privacy rules**: Private to user.
- **Timestamps**: Yes.
- **Possible indexes**: `userId` (unique).
- **Embedded or referenced**: Referenced (separate collection).
- **Required for first version**: Yes (Phase 4).

## 3. Income Information
- **Decision**: Embedded inside `Financial Profiles` or `Budgets` since KhataFlow focuses on simple monthly planning rather than complex multi-stream ledger accounting.
- **Required for first version**: Yes.

## 4. Planned Budgets
- **Purpose**: Snapshot of the user's financial plan for a specific month.
- **Important Fields**: `userId`, `month` (e.g., '2026-09'), `totalIncome`, `plannedCategories` (Array), `plannedSavings`.
- **Field Types**: ObjectId, String, Number, Array of Objects.
- **Required fields**: `userId`, `month`, `totalIncome`.
- **Validation rules**: Valid month format, non-negative values for categories and savings.
- **Relationship with the user**: 1-to-Many with User.
- **Ownership and privacy rules**: Private to user.
- **Timestamps**: Yes.
- **Possible indexes**: `{ userId: 1, month: 1 }` (unique compound index).
- **Embedded or referenced**: Referenced (separate collection). Categories are embedded.
- **Required for first version**: Yes (Phase 4).

## 5. Expense Records
- **Purpose**: Track individual transactions.
- **Important Fields**: `userId`, `amount`, `category`, `date`, `paymentMethod`, `description`, `notes`.
- **Field Types**: ObjectId, Number, String, Date.
- **Required fields**: `userId`, `amount`, `category`, `date`.
- **Validation rules**: Required strictly positive values for amount (zero is not meaningful), required valid date.
- **Relationship with the user**: 1-to-Many with User.
- **Timestamps**: Yes.
- **Possible indexes**: `userId`, `date`.
- **Embedded or referenced**: Referenced (separate collection to allow infinite growth).
- **Required for first version**: Yes (Phase 5).

## 6. Expense Categories
- **Decision**: Store a predefined list as constants/seed data first. If custom categories are allowed, create a `categories` collection with `userId` and `name`.
- **Open Decision**: Will users define their own categories, or do we use a fixed system list?

## 7. Payment Methods
- **Decision**: Store as string enums on the Expense record (e.g., 'CASH', 'UPI', 'CARD') to keep the database simple, avoiding unnecessary collections.

## 8. Financial Goals
- **Purpose**: Track long-term savings goals.
- **Important Fields**: `userId`, `goalName`, `targetAmount`, `alreadySavedAmount`, `targetDate`, `priority`, `status`.
- **Field Types**: ObjectId, String, Number, Date.
- **Required fields**: `userId`, `goalName`, `targetAmount`.
- **Validation rules**: targetAmount must be strictly positive. For a new active goal, the target date should normally be today or in the future. Past target dates must be handled safely as expired or historical goals rather than causing application or database errors. (Possible states: Active, Completed, Expired, Archived).
- **Relationship with the user**: 1-to-Many with User.
- **Timestamps**: Yes.
- **Possible indexes**: `userId`.
- **Required for first version**: Yes (Phase 7).

## 9. Local Estimate Data
- **Decision**: Store in a `cityCostPresets` collection for querying, or directly in a JSON configuration file if the dataset is small and static.
- **Open Decision**: Store in DB vs JSON config file.

## 10. Monthly Reporting Calculations
- **Decision**: Calculated dynamically on the backend using aggregations on the `expenses` and `budgets` collections. Do not store pre-calculated reports to avoid state mismatch.

## General Rules
- **Data Isolation**: Every collection (except global constants) MUST have a `userId` field.
- **Timestamps**: All schemas will have `{ timestamps: true }` enabling `createdAt` and `updatedAt`.
- **References vs Embedding**: Expenses are separate documents (referenced by user) because they will grow indefinitely. Categories within a budget can be embedded to freeze the snapshot.
