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

- [Top](#Section-One---SELECT-Statements-60-Points)
  - [1. **Trip 73440.** (5 Marks) ✔](#1-Trip-73440-How-many-items-were-transported-during-trip-73440-%E2%9C%94-5-Marks)
  - [2. **Singleton.** (5 Marks) ✔](#2-Singleton-Find-the-trip-in-which-only-a-single-item-was-transported-%E2%9C%94-5-Marks)
  - [3. **Gavin Brandon.** (5 Marks) ✔](#3-Gavin-Brandon-Which-company-did-Gavin-Brandon-deliver-to-between-the-24th-and-25th-of-April-%E2%9C%94-5-Marks)
  - [4. **Long haul.** (5 Marks) ✔](#4-Long-haul-Which-driver-was-responsible-for-the-longest-trip-%E2%9C%94-5-Marks)
  - [5. **Peak district.** (5 Marks) ✔](#5-Peak-district-Find-the-town-where-we-do-the-most-business-%E2%80%93-ie-the-one-where-the-largest-number-of-items-are-picked-up-and-delivered-%E2%9C%94-5-Marks)
  - [6. **Least used.** (8 Marks) ✔](#6-Least-used-Find-the-five-trucks-that-are-least-used-during-the-six-months-covered-by-the-data-Order-by-the-number-of-trips-they-were-used-on-%E2%9C%94-8-Marks)
  - [7. **Customer satisfaction.** (8 Marks) ✔](#7-Customer-satisfaction-Each-month-the-company-emails-the-five-customers-with-the-highest-number-of-pickups-not-manifest-items-to-check-they-are-happy-with-the-service-List-the-top-five-customers-for-June-%E2%9C%94-8-Marks)
  - [8. **Gently does it.** (8 Marks) ✔](#8-Gently-does-it-Which-drivers-have-never-transported-anything-fragile-NB-Results-are-abbreviated-%E2%9C%94-8-Marks)
  - [9. **Travelling light.** (8 Marks) ✔](#9-Travelling-light-Usually-the-sequence-of-pickups-and-deliveries-has-to-be-carefully-managed-so-as-not-to-exceed-the-vehicles-capacity-However-if-the-total-weight-of-manifest-items-for-the-whole-trip-does-not-exceed-the-limit-these-checks-can-be-skipped-How-many-trips-can-proceed-without-checking-%E2%9C%94-8-Marks)
  - [10. **Average number of trips.** (8 Marks) ✔](#10-Average-number-of-trips-What-is-the-average-number-of-trips-per-driver-in-each-month-Order-the-results-by-month-%E2%9C%94-8-Marks)
  - [11. **Dangerous driving.** (12 Marks)](#11-Dangerous-driving-For-all-trips-where-hazardous-goods-were-transported-find-the-percentage-of-each-category-of-item-in-the-manifest-Sort-in-descending-order-of-the-percentage-of-hazardous-items-NB-results-are-abbreviated-12-Marks)
  - [12. **Unused trucks.** (12 marks) ✔](#12-Unused-trucks-List-the-registration-numbers-of-the-trucks-that-were-not-in-use-between-1st-and-5th-April-inclusive-%E2%9C%94-12-marks)
  - [13. **Bonus.** (12 Marks)](#13-Bonus-If-a-driver-works-more-than-22days-in-any-one-month-they-are-paid-at-a-higher-rate-for-the-extra-days-List-the-drivers-who-qualify-for-bonus-payments-for-each-month-in-the-data-and-include-the-number-of-extra-days-worked-Drivers-who-are-not-eligible-for-a-bonus-should-notbe-shownOrder-by-month-and-number-of-days-descending-12-Marks)
  - [14. **Peak week.** (12 Marks)](#14-Peak-week-Find-the-busiest-week-based-on-the-number-of-departures-and-returnsShow-the-start-date-assuming-that-a-week-starts-on-Monday-and-the-number-of-departures-and-returns-12-Marks)
  - [15. **Capacity factor.** (12 Marks)](#15-Capacity-factor-100-capacity-is-when-every-truck-is-in-use-every-day-If-some-trucks-are-idle-the-capacity-factor-is-less-than-100-What-is-the-total-capacity-factor-for-the-company-for-thetime-periodcovered-by-the-data-12-Marks)

----

## 1. **Trip 73440.** How many items were transported during trip 73440? ✔ (5 Marks)

**Answer:**

```sh
SELECT COUNT(*) Items FROM manifest WHERE trip_id = 73440;
```

**Output:**

```sh
+-------+
| Items |
+-------+
|    19 |
+-------+
```

----

## 2. **Singleton.** Find the trip in which only a single item was transported. ✔ (5 Marks)

**Answer:**

```sql
SELECT trip_id FROM manifest GROUP BY trip_id HAVING (count(trip_id) = 1);
```

**Output:**

```sh
+---------+
| trip_id |
+---------+
|   73738 |
+---------+
```

----

## 3. **Gavin Brandon.** Which company did Gavin Brandon deliver to between the 24th and 25th of April? ✔ (5 Marks)

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

```sh
+--------------+
| company_name |
+--------------+
| Runnel Ltd.  |
+--------------+
```

----

## 4. **Long haul.** Which driver was responsible for the longest trip? ✔ (5 Marks)

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

```sh
+------------+-----------+------+
| first_name | last_name | days |
+------------+-----------+------+
| Philip     | Slaight   |   11 |
+------------+-----------+------+

```

----

## 5. **Peak district.** Find the town where we do the most business – ie the one where the largest number of items are picked up and delivered. ✔ (5 Marks)

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

```sh
+-----------+-------+
| town      | Items |
+-----------+-------+
| Gateshead |   328 |
+-----------+-------+

```

----

## 6. **Least used.** Find the five trucks that are least used during the six months covered by the data. Order by the number of trips they were used on. ✔ (8 Marks)

**Answer:**

```sql
SELECT model.make,
    model.model,
    vehicle.registration,
    COUNT(*) trips
FROM vehicle INNER JOIN model, trip
WHERE model.model = vehicle.model
    AND vehicle.vehicle_id = trip.vehicle_id
GROUP BY vehicle.registration, model.make, model.model
ORDER BY trips
LIMIT 5;
```

**Output:**

```sh
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

## 7. **Customer satisfaction.** Each month the company emails the five customers with the highest number of pickups (not manifest items) to check they are happy with the service. List the top five customers for June. ✔ (8 Marks)

**Answer:**

```sql
SELECT customer.reference, customer.company_name, COUNT(DISTINCT trip.trip_id) pickups
FROM manifest JOIN customer, trip
WHERE customer.reference = manifest.pickup_customer_ref
    AND manifest.trip_id = trip.trip_id
    AND trip.departure_date
        BETWEEN '2012-06-01' AND '2012-06-30'
GROUP BY manifest.pickup_customer_ref, customer.company_name, customer.reference
ORDER BY pickups DESC, customer.reference ASC
LIMIT 5;
```

**Output:**

```sh
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

## 8. **Gently does it.** Which drivers have never transported anything fragile? (NB Results are abbreviated) ✔ (8 Marks)

**Answer:**

```sql
SELECT DISTINCT driver.first_name, driver.last_name
FROM driver JOIN trip, manifest
WHERE driver.employee_no = trip.employee_no
    AND trip.trip_id = manifest.trip_id
    AND manifest.category != 'B';
```

**Output:**

```sh
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

## 9. **Travelling light.** Usually, the sequence of pickups and deliveries has to be carefully managed so as not to exceed the vehicle’s capacity. However, if the total weight of manifest items for the whole trip does not exceed the limit, these checks can be skipped. How many trips can proceed without checking? ✔ (8 Marks)

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

```sh
+----------+
| COUNT(*) |
+----------+
|      341 |
+----------+
```

----

## 10. **Average number of trips.** What is the average number of trips per driver in each month? Order the results by month. ✔ (8 Marks)

**Answer:**

```sql
SELECT drivers.trip_month as MONTH, FORMAT(total.trips / drivers.trips, 1) as trips
FROM (
    SELECT DISTINCT MONTHNAME(`departure_date`) as trip_month, COUNT(*) as trips
            FROM trip
            INNER JOIN driver
            ON driver.employee_no = trip.employee_no
            GROUP BY trip_month
) as total
INNER JOIN (
    SELECT DISTINCT drivers_per_month.trip_month, COUNT(drivers_per_month.trip_month) as trips
    FROM (
        SELECT DISTINCT MONTHNAME(`departure_date`) as trip_month, driver.employee_no
                FROM trip
                INNER JOIN driver
                ON driver.employee_no = trip.employee_no
    ) as drivers_per_month
    GROUP BY drivers_per_month.trip_month
) as drivers
ON total.trip_month = drivers.trip_month
ORDER BY FIELD(MONTH,'January','February','March','April','May','June','July');
```

**Output:**

```sh
+----------+-------+
| MONTH    | trips |
+----------+-------+
| January  | 3.7   |
| February | 3.3   |
| March    | 3.6   |
| April    | 3.5   |
| May      | 3.5   |
| June     | 3.5   |
| July     | 1.0   |
+----------+-------+
```

----

## 11. **Dangerous driving.** For all trips where hazardous goods were transported, find the percentage of each category of item in the manifest. Sort in descending order of the percentage of hazardous items. (NB results are abbreviated) (12 Marks)

**Answer:**

```sql
SELECT total.trip_id,
    CONCAT(IFNULL(ROUND(a_count.A / total.items_per_trip * 100), 0), '%') as A,
    CONCAT(IFNULL(ROUND(b_count.B / total.items_per_trip * 100), 0), '%') as B,
    CONCAT(IFNULL(ROUND(c_count.C / total.items_per_trip * 100), 0), '%') as C
FROM (
    SELECT items.trip_id, COUNT(*) as items_per_trip
        FROM (
            SELECT manifest.trip_id, manifest.category
            FROM manifest
            JOIN (
                SELECT trip_id
                FROM manifest
                WHERE category = 'C'
            ) as hazerdous_trip
            ON hazerdous_trip.trip_id = manifest.trip_id
            ORDER BY trip_id
        ) as items
        GROUP BY items.trip_id
) as total
LEFT JOIN (
    SELECT trip_id, COUNT(*) as A
        FROM (
            SELECT manifest.trip_id, manifest.category
            FROM manifest
            JOIN (
                SELECT trip_id
                FROM manifest
                WHERE category = 'C'
            ) as hazerdous_trip
            ON hazerdous_trip.trip_id = manifest.trip_id
            ORDER BY trip_id
        ) as a_items
        WHERE a_items.category = 'A'
        GROUP BY trip_id
) as a_count ON total.trip_id = a_count.trip_id
LEFT JOIN (
    SELECT trip_id, COUNT(*) as B
        FROM (
            SELECT manifest.trip_id, manifest.category
            FROM manifest
            JOIN (
                SELECT trip_id
                FROM manifest
                WHERE category = 'C'
            ) as hazerdous_trip
            ON hazerdous_trip.trip_id = manifest.trip_id
            ORDER BY trip_id
        ) as b_items
    WHERE b_items.category = 'B'
    GROUP BY trip_id
) as b_count
ON total.trip_id = b_count.trip_id
LEFT JOIN (
    SELECT trip_id, COUNT(*) as C
        FROM (
            SELECT manifest.trip_id, manifest.category
            FROM manifest
            JOIN (
            SELECT trip_id
                FROM manifest
                WHERE category = 'C'
            ) as hazerdous_trip
            ON hazerdous_trip.trip_id = manifest.trip_id
            ORDER BY trip_id
        ) as c_items
    WHERE c_items.category = 'C'
    GROUP BY trip_id
) as c_count
ON total.trip_id = c_count.trip_id
ORDER BY c_count.C / total.items_per_trip * 100 DESC;

```

**Output:**

```sh
+---------+------+------+------+
| trip_id | A    | B    | C    |
+---------+------+------+------+
|   73832 | 44%  | 0%   | 56%  |
|   73404 | 60%  | 0%   | 40%  |
|   73773 | 63%  | 0%   | 38%  |
|   73551 | 64%  | 0%   | 36%  |
|   73013 | 67%  | 0%   | 33%  |
|   73286 | 67%  | 0%   | 33%  |
|   73382 | 67%  | 0%   | 33%  |
|   73842 | 69%  | 0%   | 31%  |
|   73353 | 69%  | 0%   | 31%  |
|   73062 | 70%  | 0%   | 30%  |
|   73745 | 70%  | 0%   | 30%  |
|   73171 | 71%  | 0%   | 29%  |
|   73611 | 57%  | 14%  | 29%  |
|   74113 | 73%  | 0%   | 27%  |
|   73779 | 74%  | 0%   | 26%  |
|   73024 | 75%  | 0%   | 25%  |
|   74083 | 77%  | 0%   | 23%  |
|   72947 | 77%  | 0%   | 23%  |
|   73100 | 81%  | 0%   | 19%  |
|   73860 | 83%  | 0%   | 17%  |
|   73431 | 83%  | 0%   | 17%  |
|   74087 | 84%  | 0%   | 16%  |
|   73022 | 85%  | 0%   | 15%  |
|   73123 | 86%  | 0%   | 14%  |
|   73960 | 88%  | 0%   | 13%  |
|   73289 | 88%  | 0%   | 13%  |
|   73757 | 88%  | 0%   | 12%  |
|   73088 | 88%  | 0%   | 12%  |
|   73032 | 88%  | 0%   | 12%  |
|   73615 | 89%  | 0%   | 11%  |
|   74101 | 91%  | 0%   | 9%   |
|   73001 | 91%  | 0%   | 9%   |
|   73451 | 93%  | 0%   | 7%   |
|   73340 | 93%  | 0%   | 7%   |
|   72944 | 67%  | 27%  | 7%   |
|   73717 | 93%  | 0%   | 7%   |
|   74013 | 94%  | 0%   | 6%   |
|   73765 | 94%  | 0%   | 6%   |
|   74024 | 94%  | 0%   | 6%   |
|   73160 | 94%  | 0%   | 6%   |
|   73504 | 78%  | 17%  | 6%   |
|   73256 | 95%  | 0%   | 5%   |
|   73957 | 95%  | 0%   | 5%   |
|   73959 | 95%  | 0%   | 5%   |
|   73194 | 95%  | 0%   | 5%   |
|   73436 | 96%  | 0%   | 4%   |
|   74059 | 96%  | 0%   | 4%   |
|   73049 | 96%  | 0%   | 4%   |
+---------+------+------+------+
```

----

## 12. **Unused trucks.** List the registration numbers of the trucks that were not in use between 1st and 5th April inclusive. ✔ (12 marks)

**Answer:**

```sql
SELECT DISTINCT all_vehicles.registration
FROM
(
    SELECT DISTINCT vehicle.registration
    FROM vehicle
    INNER JOIN trip
    ON trip.vehicle_id = vehicle.vehicle_id
) as all_vehicles
LEFT JOIN
(
    SELECT DISTINCT vehicle.registration
    FROM vehicle
    INNER JOIN trip
    ON trip.vehicle_id = vehicle.vehicle_id
    WHERE trip.departure_date <= '2012-04-01'
        AND trip.return_date BETWEEN '2012-04-01' AND '2012-04-05'
        OR trip.departure_date <= '2012-04-01' AND trip.return_date >= '2012-04-05'
        OR trip.departure_date BETWEEN '2012-04-01' AND '2012-04-05'
) as used
ON all_vehicles.registration = used.registration
WHERE used.registration IS NULL;
```

**Output:**

```sql
+--------------+
| registration |
+--------------+
| SDU 567M     |
| PY06 BYP     |
| PY61 RNU     |
| BD60BVF      |
| BD08AOF      |
+--------------+
```

----

## 13. **Bonus.** If a driver works more than 22 days in any one month, they are paid at a higher rate for the extra days. List the drivers who qualify for bonus payments for each month in the data and include the number of extra days worked. Drivers who are not eligible for a bonus should notbe shown.Order by month and number of days descending. (12 Marks)

**Answer:**

```sql
SELECT MONTHNAME(departure_date) as month,
    CONCAT(driver.first_name, ' ', driver.last_name) as Name,
    SUM(DATEDIFF(return_date, departure_date)) as Days,
    SUM(DATEDIFF(return_date, departure_date)) - 22 as 'Bonus Days'
FROM trip INNER JOIN driver ON driver.employee_no = trip.employee_no
GROUP BY Name, month
HAVING Days > '22'
ORDER BY FIELD(MONTH,'January','February','March','April','May','June','July');
```

**Output:**

```sh
+----------+-----------------------+------+------------+
| month    | Name                  | Days | Bonus Days |
+----------+-----------------------+------+------------+
| January  | Henry Cobelli         |   23 |          1 |
| January  | Igor Woodruffe        |   24 |          2 |
| February | Tristan Crumbie       |   23 |          1 |
| March    | Henry Cobelli         |   23 |          1 |
| March    | Eden Blackbrough      |   23 |          1 |
| March    | Oscar Nutten          |   27 |          5 |
| March    | Daniel Miliffe        |   26 |          4 |
| March    | Barry Thayre          |   23 |          1 |
| April    | Durant Kewzick        |   24 |          2 |
| April    | Leonardo Charlet      |   24 |          2 |
| May      | Solomon Alessandrucci |   24 |          2 |
| June     | Durant Kewzick        |   26 |          4 |
| June     | Lee Rookledge         |   28 |          6 |
+----------+-----------------------+------+------------+
```

----

## 14. **Peak week.** Find the busiest week based on the number of departures and returns. Show the start date assuming that a week starts on Monday and the number of departures and returns. (12 Marks)

**Answer:**

```sql

```

**Output:**

```sql

```

----

## 15. **Capacity factor.** 100% capacity is when every truck is in use every day. If some trucks are idle, the capacity factor is less than 100%. What is the total capacity factor for the company for the time period covered by the data? (12 Marks)

**Answer:**

```sql

```

**Output:**

```sql

```

----
