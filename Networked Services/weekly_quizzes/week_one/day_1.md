# Daily Test

## Question 1

Consider the layout you get from an ls -l command:

-rwxr-xr-x. 1 gordon gordon  128 Mar 15  2013 index.html
With this in mind, and using grep with ls -l and any other commands you think fit, write a one line set of piped commands to find the owner of any files or directories in the current directory which have rwx permissions for other.

> The correct answer is: ls -l | grep ".......rwx" | cut -f3 -d" "

## Question 2

Find the login shell for "gordon" using grep and cut.

Here is a snip from the appropriate file

apache:x:48:48:Apache:/var/www:/sbin/nologin

> The correct answer is: None of these answers

## Question 3

Where are the passwords stored for changing between different groups?

> The correct answer is: /etc/gshadow

## Question 4

Consider the following:

```bash
$ tail –3 /etc/group
gdm:x:1:
dovecot:x:2:
mysql:x:3:
```

```bash
$ cat /etc/passwd
root:x:0:1:root:/root:/bin/bash
bin:x:1:2:bin:/bin:/sbin/nologin
daemon:x:2:3:daemon:/sbin:/sbin/nologin
```

If a file is owned by uid 1, gid 2, what are the textual names of the owner and group?

> The correct answer is: bin,dovecot

## Question 5

Examine some of the lines of the following file, named "demo":

gordon,r,200
petra,l,120
gill,j,100

This file shows how many miles each member of staff lives from work. Now, write a 1 line linux command using pipes which will show only the mile column, restricted to those staff members with the surname "l". The query should not show any other rows, and only the miles information. Choose the answer which is accurate under all conditions, and if more than 1 answer is accurate choose the shortest answer.

> The correct answer is: grep ",l," demo | cut -d "," -f 3

## Question 6

Run a command which shows which users have the group called "friends" as secondary groups. If more than one answer is correct then choose the one which is most accurate, and if more than one is most accurate choose the shortest of those.

> The correct answer is: grep -E '^friends:' /etc/group | cut -d ":" -f 4

## Question 7

Consider the following command chain:

```bash
$ touch file
$ ls -l file
-rw-r--r--. 1 root root 0 Mar 14 16:09 file
$ chown bin.users file
$ chgrp root file
$ ls -l file
```

Assuming the users and groups exist and there are no errors, what is the output of the last command?

> The correct answer is: -rw-r--r--. 1 bin root 0 Mar 14 16:09 file

## Question 8

A file has permissions rwxr-x-w-. What is the numeric octal value of this?

> The correct answer is: 752

## Question 9

Consider the following command chain:

```bash
$ chmod 234 file
$ chmod og+r,u-x file
```

What is the symbolic value of the permissions for file?

> The correct answer is: --w-rwxr--

## Question 10

Consider the following commands:

chmod 420 file
chmod ug+w file
chmod o+w file

What umask would be needed so that the command "touch file1" or "mkdir dir1" would create a file or directory with the same permissions as "file".

> The correct answer is: 155