# Intro 1

## Question 2: cal

`cal 31 12 2002`

```bash
    December 2002
Mo Tu We Th Fr Sa Su
                   1
 2  3  4  5  6  7  8
 9 10 11 12 13 14 15
16 17 18 19 20 21 22
23 24 25 26 27 28 29
30 31
```

## Question 3: cal year

`cal 2005 > yearfile`

## Question 4: ls

`ls -al /home/demo`

```bash
total 32
drwx------. 5 demo tutorial 4096 Nov 27 14:17 .
drwxr-xr-x. 4 root root       29 Nov 27 14:02 ..
-rw-r--r--. 1 demo tutorial   18 Dec  6  2016 .bash_logout
-rw-r--r--. 1 demo tutorial  193 Dec  6  2016 .bash_profile
-rw-r--r--. 1 demo tutorial  231 Dec  6  2016 .bashrc
-rw-r--r--. 1 demo tutorial 4082 Nov 27 14:18 bigfile
drwxr-xr-x. 3 demo tutorial   17 Nov 27 14:02 .cache
drwxr-xr-x. 3 demo tutorial   17 Nov 27 14:02 .config
drwxr-xr-x. 4 demo tutorial   37 Sep  8  2014 .mozilla
-rw-r--r--. 1 demo tutorial  174 Nov 27 14:11 thismonth
-rw-r--r--. 1 demo tutorial 1954 Nov 27 14:15 thisyear
-rw-r--r--. 1 demo tutorial 1954 Nov 27 14:15 yearfile2
```

## Question 5: file size

`ls -alh /home/demo`

```bash
total 32K
drwx------. 5 demo tutorial 4.0K Nov 27 14:17 .
drwxr-xr-x. 4 root root       29 Nov 27 14:02 ..
-rw-r--r--. 1 demo tutorial   18 Dec  6  2016 .bash_logout
-rw-r--r--. 1 demo tutorial  193 Dec  6  2016 .bash_profile
-rw-r--r--. 1 demo tutorial  231 Dec  6  2016 .bashrc
-rw-r--r--. 1 demo tutorial 4.0K Nov 27 14:18 bigfile
drwxr-xr-x. 3 demo tutorial   17 Nov 27 14:02 .cache
drwxr-xr-x. 3 demo tutorial   17 Nov 27 14:02 .config
drwxr-xr-x. 4 demo tutorial   37 Sep  8  2014 .mozilla
-rw-r--r--. 1 demo tutorial  174 Nov 27 14:11 thismonth
-rw-r--r--. 1 demo tutorial 2.0K Nov 27 14:15 thisyear
-rw-r--r--. 1 demo tutorial 2.0K Nov 27 14:15 yearfile2
```

## Question 6: append

```bash
cal > thismonth
date >> thismonth
```

## Question 7: copying

```bash
cp yearfile yearfile2
cp yearfile yearfile3
```

## Question 8: moving

`mv yearfile3 thisyear`

## Question 9: deleting

`rm yearfile`

## Question 10: big concat

```bash
cat thismonth > bigfile
cat yearfile2 >> bigfile
cat thisyear >> bigfile
```