## Access Patterns:

1. **Get all food entries for a user**:

```
PK: USER#<UserId>
SK begins_with: FOODENTRY#
```

2. **Add a new food entry for a user**:

```
PK: USER#<UserId>
SK: FOODENTRY#<DateTime>
```

3. **Get all food entries for a specific date across all users (Admin)**:

```
GSI1PK: FOODENTRIES
GSI1SK: <DateTime>
```

4. **Get/Update User profile**:

```
PK: USER#<UserId>
SK: PROFILE#<UserId>
```

5. **Get global entry count for a specific date**:

```
PK: AGGREGATION#ENTRIES
SK: <Date>
```

6. **Get aggregated calorie count for a user for a specific date**:

```
PK: AGGREGATION#CALORIES#<UserId>
SK: <Date>
```

7. **Get the list of days where a user exceeds their calorie DailyCalorieLimit**:

```
PK: AGGREGATION#CALORIES#<UserId>
SK: <Date>  // Filter by TotalCalories > DailyCalorieLimit of the user
```

## Entities:

- **User**: Represents both regular users and admins.
- **Food Entry**: Represents a food item consumed by a user.
- **Aggregations**: Represents aggregated data for admin reporting.

## DynamoDB Table: CalorieAppTable

| Entity Type            | Partition Key (PK)              | Sort Key (SK)          | Attributes                                                              | GSI1PK (Partition Key) | GSI1SK (Sort Key) |
| ---------------------- | ------------------------------- | ---------------------- | ----------------------------------------------------------------------- | ---------------------- | ----------------- |
| User                   | USER#\<UserId\>                 | PROFILE#\<UserId>      | Role (Admin/User), DailyCalorieLimit, Other user-specific attributes... | -                      | -                 |
| Food Entry             | USER#\<UserId\>                 | FOODENTRY#\<DateTime\> | Date, FoodName, Calories, PhotoS3Key                                    | FOODENTRY              | \<Date\>          |
| Aggregation (Entries)  | AGGREGATION#ENTRIES             | \<Date\>               | Count (Number of entries for that day)                                  | -                      | -                 |
| Aggregation (Calories) | AGGREGATION#CALORIES#\<UserId\> | \<Date\>               | TotalCalories (Total calories for that day)                             | -                      | -                 |
