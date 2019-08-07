# Section One - SELECT Statements (60 Points)

## Setup

run:

```sh
$ sudo mysql -u joe -p -h db-cw.tk

MariaDB [(none)]> Enter password.

MariaDB [(none)]> USE joe;
```

----

## Table of Contents

- [Section One - SELECT Statements (60 Points)](#Section-One---SELECT-Statements-60-Points)
  - [Setup](#Setup)
  - [Table of Contents](#Table-of-Contents)
  - [1. **Trip 73440.** How many items were transported during trip 73440? ✔](#1-Trip-73440-How-many-items-were-transported-during-trip-73440-%E2%9C%94)
  - [2. **Singleton.** Find the trip in which only a single item was transported. ✔](#2-Singleton-Find-the-trip-in-which-only-a-single-item-was-transported-%E2%9C%94)
  - [3. **Gavin Brandon.** Which company did Gavin Brandon deliver to between the 24th and 25th of April? ✔](#3-Gavin-Brandon-Which-company-did-Gavin-Brandon-deliver-to-between-the-24th-and-25th-of-April-%E2%9C%94)
  - [4. **Long haul.** Which driver was responsible for the longest trip? ✔](#4-Long-haul-Which-driver-was-responsible-for-the-longest-trip-%E2%9C%94)
  - [5. **Peak district.** Find the town where we do the most business – ie the one where the largest number of items are picked up and delivered. ✔](#5-Peak-district-Find-the-town-where-we-do-the-most-business-%E2%80%93-ie-the-one-where-the-largest-number-of-items-are-picked-up-and-delivered-%E2%9C%94)
  - [6. **Least used.** Find the five trucks that are least used during the six months covered by the data. Order by the number of trips they were used on. ✔](#6-Least-used-Find-the-five-trucks-that-are-least-used-during-the-six-months-covered-by-the-data-Order-by-the-number-of-trips-they-were-used-on-%E2%9C%94)
  - [7. **Customer satisfaction.** Each month the company emails the five customers with the highest number of pickups (not manifest items) to check they are happy with the service. List the top five customers for June. ✔](#7-Customer-satisfaction-Each-month-the-company-emails-the-five-customers-with-the-highest-number-of-pickups-not-manifest-items-to-check-they-are-happy-with-the-service-List-the-top-five-customers-for-June-%E2%9C%94)
  - [8. **Gently does it.** Which drivers have never transported anything fragile? (NB Results are abbreviated) ✔](#8-Gently-does-it-Which-drivers-have-never-transported-anything-fragile-NB-Results-are-abbreviated-%E2%9C%94)
  - [9. **Travelling light.** Usually, the sequence of pickups and deliveries has to be carefully managed so as not to exceed the vehicle’s capacity. However, if the total weight of manifest items for the whole trip does not exceed the limit, these checks can be skipped. How many trips can proceed without checking? ✔](#9-Travelling-light-Usually-the-sequence-of-pickups-and-deliveries-has-to-be-carefully-managed-so-as-not-to-exceed-the-vehicles-capacity-However-if-the-total-weight-of-manifest-items-for-the-whole-trip-does-not-exceed-the-limit-these-checks-can-be-skipped-How-many-trips-can-proceed-without-checking-%E2%9C%94)
  - [10. **Average number of trips.** What is the average number of trips in each month? Order the results by month.](#10-Average-number-of-trips-What-is-the-average-number-of-trips-in-each-month-Order-the-results-by-month)
  - [11. **Dangerous driving.** For all trips where hazardous good were transported, find the percentage of each category of item in the manifest.Sort in descending order of the percentage of hazardous items. (NB results are abbreviated)](#11-Dangerous-driving-For-all-trips-where-hazardous-good-were-transported-find-the-percentage-of-each-category-of-item-in-the-manifestSort-in-descending-order-of-the-percentage-of-hazardous-items-NB-results-are-abbreviated)

----

## 1. **Trip 73440.** How many items were transported during trip 73440? ✔

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

## 2. **Singleton.** Find the trip in which only a single item was transported. ✔

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

## 3. **Gavin Brandon.** Which company did Gavin Brandon deliver to between the 24th and 25th of April? ✔

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

## 4. **Long haul.** Which driver was responsible for the longest trip? ✔

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

## 5. **Peak district.** Find the town where we do the most business – ie the one where the largest number of items are picked up and delivered. ✔

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

## 6. **Least used.** Find the five trucks that are least used during the six months covered by the data. Order by the number of trips they were used on. ✔

**Answer:**

```sql
SELECT model.make,
    model.model,
    vehicle.registration,
    COUNT(*) trips
FROM vehicle INNER JOIN model, trip
WHERE model.model = vehicle.model
    AND vehicle.vehicle_id = trip.vehicle_id
GROUP BY vehicle.registration
ORDER BY trips
LIMIT 5;
```

**Output:**

```sql
+--------+--------------+--------------+-------+
| make   | model        | registration | trips |
+--------+--------------+--------------+-------+
| Scania | P94 4x2      | WY51OLV      |    17 |
| DAF    | FTGCF85.460V | PY12 ZYA     |    18 |
| Scania | R270 6x2     | BD08AOG      |    18 |
| DAF    | FTGCF85.460E | PY58 UHF     |    18 |
| DAF    | FTGCF85.460V | PY61 RNV     |    18 |
+--------+--------------+--------------+-------+
```

----

## 7. **Customer satisfaction.** Each month the company emails the five customers with the highest number of pickups (not manifest items) to check they are happy with the service. List the top five customers for June. ✔

**Answer:**

```sql
SELECT customer.reference, customer.company_name, COUNT(DISTINCT trip.trip_id) pickups
FROM manifest JOIN customer, trip
WHERE customer.reference = manifest.pickup_customer_ref
    AND manifest.trip_id = trip.trip_id
    AND trip.departure_date
        BETWEEN '2012-06-01' AND '2012-06-30'
GROUP BY manifest.pickup_customer_ref
ORDER BY pickups DESC, customer.reference ASC
LIMIT 5;
```

**Output:**

```sql
+-----------+------------------------+---------+
| reference | company_name           | pickups |
+-----------+------------------------+---------+
|         3 | Trochiline Services    |       9 |
|        99 | Temerarious & Co       |       9 |
|       264 | Byssiferous Industrial |       9 |
|       283 | Contemper Retail       |       9 |
|         7 | Noumenalism Plc        |       8 |
+-----------+------------------------+---------+
```

----

## 8. **Gently does it.** Which drivers have never transported anything fragile? (NB Results are abbreviated) ✔

**Answer:**

```sql
SELECT DISTINCT driver.first_name, driver.last_name
FROM driver JOIN trip, manifest
WHERE driver.employee_no = trip.employee_no
    AND trip.trip_id = manifest.trip_id
    AND manifest.category != 'B';
```

**Output:**

```sql
+------------+---------------+
| first_name | last_name     |
+------------+---------------+
| Elan       | Eslie         |
| Ryan       | Molian        |
| Durant     | Kewzick       |
| Dirk       | Inde          |
| Barry      | Thayre        |
| Benedict   | Brawley       |
| Cecil      | Chellingworth |
| Clifton    | Dufore        |
| Henry      | Cobelli       |
| Philip     | Slaight       |
| Langley    | O\'Canavan    |
| Leonardo   | Charlet       |
| Rudyard    | Basillon      |
| Gareth     | Cruickshank   |
| Igor       | Woodruffe     |
| Ernst      | A\'field      |
| Eden       | Blackbrough   |
| Dexter     | Shevell       |
| Rodger     | Puddefoot     |
| Blake      | Heyball       |
| Neil       | Parlott       |
| Frederick  | Sambidge      |
| Sunreet    | Balderstone   |
| Amon       | Pavluk        |
| Oscar      | Nutten        |
| Shakir     | Johansson     |
| Eamon      | O\'Looney     |
| Angelo     | Brydon        |
| Morgan     | Bohills       |
| Crispin    | Cleobury      |
| Salim      | Danton        |
| Akram      | Milnes        |
| Solomon    | Gorhardt      |
| Waldo      | Jannequin     |
| Eamon      | Darko         |
| Anson      | Donnan        |
| Gavin      | Brandon       |
| Reginald   | Barlas        |
| Doug       | Vango         |
| Vivian     | Robak         |
| Daniel     | Miliffe       |
| Seth       | Nappin        |
| Edgar      | Strank        |
| Lee        | Rookledge     |
| Ahmed      | Leer          |
| Finlay     | Berzin        |
| Tristan    | Crumbie       |
| Angelo     | Duchart       |
| Nadir      | Millbank      |
| Graeme     | McCrainor     |
| Solomon    | Alessandrucci |
| Desdemona  | Dublin        |
| Rex        | Akrigg        |
| Durant     | Dankersley    |
| Albert     | Phillimore    |
| Norris     | Vasyutichev   |
+------------+---------------+

```

----

## 9. **Travelling light.** Usually, the sequence of pickups and deliveries has to be carefully managed so as not to exceed the vehicle’s capacity. However, if the total weight of manifest items for the whole trip does not exceed the limit, these checks can be skipped. How many trips can proceed without checking? ✔

**Answer:**

```sql
SELECT COUNT(*)
FROM
(
    SELECT trip.trip_id, SUM(manifest.weight) weight
    FROM manifest
    JOIN trip
    ON manifest.trip_id = trip.trip_id
    GROUP BY trip.trip_id
) as total
INNER JOIN
(
    SELECT trip.trip_id, ABS(model.gvw - model.kerb) maximum_weight
    FROM model
    JOIN trip, vehicle
    WHERE trip.vehicle_id = vehicle.vehicle_id
        AND vehicle.model = model.model
    ORDER BY trip_id
) as maximum
WHERE total.trip_id = maximum.trip_id
AND NOT total.weight > maximum.maximum_weight;

```

**Output:**

```sql
+----------+
| COUNT(*) |
+----------+
|      341 |
+----------+
```

----

## 10. **Average number of trips.** What is the average number of trips in each month? Order the results by month.

**Answer:**

```sql
SELECT DATE_FORMAT(`departure_date`,'%M') as trip_month, COUNT(trip_id) as trips FROM trip WHERE departure_date BETWEEN '2012-01-01' AND '2012-01-31' GROUP BY trip_month;
```

**Output:**

```sql

```

----

## 11. **Dangerous driving.** For all trips where hazardous good were transported, find the percentage of each category of item in the manifest.Sort in descending order of the percentage of hazardous items. (NB results are abbreviated)

**Answer:**

```sql
SELECT DATE_FORMAT(`departure_date`,'%M') as trip_month, COUNT(trip_id) as trips FROM trip WHERE departure_date BETWEEN '2012-01-01' AND '2012-01-31' GROUP BY trip_month;
```

**Output:**

```sql

```

----
