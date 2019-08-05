# Section One - SELECT Statements (60 Points)

----

- [Section One - SELECT Statements (60 Points)](#Section-One---SELECT-Statements-60-Points)
  - [1. **Trip 73440.** How many items were transported during trip 73440?](#1-Trip-73440-How-many-items-were-transported-during-trip-73440)
  - [2. **Singleton.** Find the trip in which only a single item was transported.](#2-Singleton-Find-the-trip-in-which-only-a-single-item-was-transported)
  - [3. **Gavin Brandon.** Which company did Gavin Brandon deliver to between the 24th and 25th of April?](#3-Gavin-Brandon-Which-company-did-Gavin-Brandon-deliver-to-between-the-24th-and-25th-of-April)
  - [4. **Long haul.** Which driver was responsible for the longest trip?](#4-Long-haul-Which-driver-was-responsible-for-the-longest-trip)
  - [5. **Peak district.** Find the town where we do the most business – ie the one where the largest number of items are picked up and delivered.](#5-Peak-district-Find-the-town-where-we-do-the-most-business-%E2%80%93-ie-the-one-where-the-largest-number-of-items-are-picked-up-and-delivered)
  - [6. **Least used.** Find the five trucks that are least used during the six months covered by the data. Order by the number of trips they were used on.](#6-Least-used-Find-the-five-trucks-that-are-least-used-during-the-six-months-covered-by-the-data-Order-by-the-number-of-trips-they-were-used-on)

----

## 1. **Trip 73440.** How many items were transported during trip 73440?

**Answer:**

```sql
SELECT COUNT(*) Items FROM manifest WHERE trip_id = 73440;
```

**Output:**

```sql
+-------+
| Items |
+-------+
|    19 |
+-------+
```

----

## 2. **Singleton.** Find the trip in which only a single item was transported.

**Answer:**

```sql
SELECT trip_id FROM manifest GROUP BY trip_id HAVING (count(trip_id) = 1);
```

**Output:**

```sql
+---------+
| trip_id |
+---------+
|   73738 |
+---------+
```

----

## 3. **Gavin Brandon.** Which company did Gavin Brandon deliver to between the 24th and 25th of April?

**Answer:**

```sql
SELECT company_name
FROM customer
WHERE reference = (
    SELECT DISTINCT delivery_customer_ref
    FROM manifest
    WHERE trip_id = (
        SELECT trip_id
        FROM trip
        WHERE employee_no = (
            SELECT employee_no
            FROM driver
            WHERE first_name = 'Gavin'
            AND last_name = 'Brandon')
            AND departure_date
            BETWEEN '2012-04-24 00:00:00'
            AND '2012-04-25 00:00:00'));

```

**Output:**

```sql
+--------------+
| company_name |
+--------------+
| Runnel Ltd.  |
+--------------+
```

----

## 4. **Long haul.** Which driver was responsible for the longest trip?

**Answer:**

```sql
SELECT driver.first_name,
    driver.last_name,
    DATEDIFF(trip.return_date, trip.departure_date) as days
FROM driver
INNER JOIN trip
WHERE trip.employee_no = driver.employee_no
ORDER BY days DESC
LIMIT 1;

```

**Output:**

```sql
+------------+-----------+------+
| first_name | last_name | days |
+------------+-----------+------+
| Philip     | Slaight   |   11 |
+------------+-----------+------+

```

----

## 5. **Peak district.** Find the town where we do the most business – ie the one where the largest number of items are picked up and delivered.

**Answer:**

```sql
SELECT customer.town, COUNT(*) Items
FROM manifest
INNER JOIN customer
WHERE manifest.delivery_customer_ref = customer.reference
OR manifest.pickup_customer_ref = customer.reference
GROUP BY customer.town
HAVING COUNT(*) > 1
ORDER BY COUNT(*) DESC
LIMIT 1;

```

**Output:**

```sql
+-----------+-------+
| town      | Items |
+-----------+-------+
| Gateshead |   328 |
+-----------+-------+

```

----

## 6. **Least used.** Find the five trucks that are least used during the six months covered by the data. Order by the number of trips they were used on.

**Answer:**

```sql

```

**Output:**

```sql


```

----
