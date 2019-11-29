# Permissions

## Question 2: Octal Code

```bash
[demo@host-5-105 ~]$ ls -l /home/demo/bigfile
-rw-r--r--. 2 demo tutorial 4082 Nov 27 14:18 /home/demo/bigfile
```

## Question 3: Other Permissions

```bash
[demo@host-5-105 ~]$ ls -l /home/demo/bigfile
-rw-r--r--. 2 demo tutorial 4082 Nov 27 14:18 /home/demo/bigfile #Other is read only.
```

## Question 4: Remove read and execute

```bash
[demo@host-5-105 ~]$ ls -l
total 16
-rw-r--r--. 2 demo tutorial 4082 Nov 27 14:18 bigfile
drwxr-xr-x. 2 demo tutorial    6 Nov 27 14:41 gordon
drwxr-xr-x. 2 demo tutorial    6 Nov 27 14:41 Gordon
drwxr-xr-x. 2 demo tutorial   51 Nov 27 15:00 letters
drwxr-xr-x. 2 demo tutorial    6 Nov 27 14:41 My Documents
drwxr-xr-x. 2 demo tutorial   21 Nov 27 15:09 scripts # <--------------------
-rw-r--r--. 1 demo tutorial  174 Nov 27 14:11 thismonth
-rw-r--r--. 1 demo tutorial 1954 Nov 27 14:15 thisyear
drwxr-xr-x. 5 demo tutorial   74 Nov 27 14:57 work
-rw-r--r--. 1 demo tutorial 1954 Nov 27 14:15 yearfile2
[demo@host-5-105 ~]$ chmod 255 scripts/
[demo@host-5-105 ~]$ ls -l
total 16
-rw-r--r--. 2 demo tutorial 4082 Nov 27 14:18 bigfile
drwxr-xr-x. 2 demo tutorial    6 Nov 27 14:41 gordon
drwxr-xr-x. 2 demo tutorial    6 Nov 27 14:41 Gordon
drwxr-xr-x. 2 demo tutorial   51 Nov 27 15:00 letters
drwxr-xr-x. 2 demo tutorial    6 Nov 27 14:41 My Documents
d-w-r-xr-x. 2 demo tutorial   21 Nov 27 15:09 scripts # <--------------------
-rw-r--r--. 1 demo tutorial  174 Nov 27 14:11 thismonth
-rw-r--r--. 1 demo tutorial 1954 Nov 27 14:15 thisyear
drwxr-xr-x. 5 demo tutorial   74 Nov 27 14:57 work
-rw-r--r--. 1 demo tutorial 1954 Nov 27 14:15 yearfile2
```

## Question 5: Impact of no rx

```bash
[demo@host-5-105 ~]$ ls scripts/
ls: cannot open directory scripts/: Permission denied
```

## Question 6: Add read

```bash
[demo@host-5-105 ~]$ chmod 655 scripts/
[demo@host-5-105 ~]$ ls -l
total 16
-rw-r--r--. 2 demo tutorial 4082 Nov 27 14:18 bigfile
drwxr-xr-x. 2 demo tutorial    6 Nov 27 14:41 gordon
drwxr-xr-x. 2 demo tutorial    6 Nov 27 14:41 Gordon
drwxr-xr-x. 2 demo tutorial   51 Nov 27 15:00 letters
drwxr-xr-x. 2 demo tutorial    6 Nov 27 14:41 My Documents
drw-r-xr-x. 2 demo tutorial   21 Nov 27 15:09 scripts
-rw-r--r--. 1 demo tutorial  174 Nov 27 14:11 thismonth
-rw-r--r--. 1 demo tutorial 1954 Nov 27 14:15 thisyear
drwxr-xr-x. 5 demo tutorial   74 Nov 27 14:57 work
-rw-r--r--. 1 demo tutorial 1954 Nov 27 14:15 yearfile2
```

## Question 7: Impact of no x

```bash
[demo@host-5-105 ~]$ ls -l scripts/
ls: cannot access scripts/bigfile2: Permission denied
total 0
?????????? ? ? ? ?            ? bigfile2
[demo@host-5-105 ~]$ cd scripts/
-bash: cd: scripts/: Permission denied
```

## Question 8: Add execute

```bash
[demo@host-5-105 ~]$ chmod 755 scripts/
[demo@host-5-105 ~]$ ls -l
total 16
-rw-r--r--. 2 demo tutorial 4082 Nov 27 14:18 bigfile
drwxr-xr-x. 2 demo tutorial    6 Nov 27 14:41 gordon
drwxr-xr-x. 2 demo tutorial    6 Nov 27 14:41 Gordon
drwxr-xr-x. 2 demo tutorial   51 Nov 27 15:00 letters
drwxr-xr-x. 2 demo tutorial    6 Nov 27 14:41 My Documents
drwxr-xr-x. 2 demo tutorial   21 Nov 27 15:09 scripts # <------------------
-rw-r--r--. 1 demo tutorial  174 Nov 27 14:11 thismonth
-rw-r--r--. 1 demo tutorial 1954 Nov 27 14:15 thisyear
drwxr-xr-x. 5 demo tutorial   74 Nov 27 14:57 work
-rw-r--r--. 1 demo tutorial 1954 Nov 27 14:15 yearfile2
```

## Question 9: umask

Umask is just the reverse of the permissions.

So if I wanted -rwx r-x --x (-111 101 001) then i just reverse the binary.

Making it 000010110 or 026 in decimal.
