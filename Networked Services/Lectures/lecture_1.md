# Networked Services: 1.1

> 25/11/2019

----

- [Networked Services: 1.1](#networked-services-11)
  - [Linux](#linux)
    - [Why Linux?](#why-linux)
    - [Recommended Literature](#recommended-literature)
    - [Areas covered](#areas-covered)
    - [Assessments](#assessments)
    - [Linux Zoo](#linux-zoo)
  - [Linux Basics](#linux-basics)
    - [Redirection and Pipes](#redirection-and-pipes)
    - [Command parameters and flags](#command-parameters-and-flags)
    - [Man pages](#man-pages)
    - [Links](#links)
      - [Hardlinks](#hardlinks)
      - [Softfile](#softfile)
    - [Users](#users)
      - [UID (User ID)](#uid-user-id)
      - [GID (Group ID)](#gid-group-id)
      - [User details](#user-details)
      - [Extracting information](#extracting-information)
    - [Permissions](#permissions)
      - [Chmod](#chmod)
        - [Permissions table](#permissions-table)
        - [Examples:](#examples)
    - [Processes](#processes)
      - [State codes](#state-codes)
      - [Process Relationships](#process-relationships)
      - [/proc](#proc)
      - [Deamons](#deamons)
        - [Syslog](#syslog)
  - [Labs](#labs)
    - [Intro 1](#intro-1)
      - [Question 2: cal](#question-2-cal)
      - [Question 3: cal year](#question-3-cal-year)
      - [Question 4: ls](#question-4-ls)
      - [Question 5: file size](#question-5-file-size)
      - [Question 6: append](#question-6-append)
      - [Question 7: copying](#question-7-copying)
      - [Question 8: moving](#question-8-moving)
      - [Question 9: deleting](#question-9-deleting)
      - [Question 10: big concat](#question-10-big-concat)
    - [Intro 2](#intro-2)
      - [Question 2: Create a directory structure](#question-2-create-a-directory-structure)
      - [Question 3: cp](#question-3-cp)
      - [Question 4: Relative move](#question-4-relative-move)
      - [Question 5: rename](#question-5-rename)
      - [Question 6: cp](#question-6-cp)
      - [Question 7: tilde](#question-7-tilde)
      - [Question 8: case and space](#question-8-case-and-space)
    - [Wildcards](#wildcards)
      - [Question 2: Wild copy](#question-2-wild-copy)
      - [Question 3: Duplicate thismonth](#question-3-duplicate-thismonth)
      - [Question 4: Copy and rename](#question-4-copy-and-rename)
      - [Question 5: Square Brackets](#question-5-square-brackets)
      - [Question 6: rm](#question-6-rm)
      - [Question 7: Hard link](#question-7-hard-link)
      - [Question 8: Soft link](#question-8-soft-link)
      - [Question 9: Soft link - Absolute](#question-9-soft-link---absolute)

----

## Linux

### Why Linux?

- Linux is a powerful server platform.
- 60% of the server market.
- Considered to be more powerful and secure than windows distributions.

### Recommended Literature

> - UNIX SYSTEM ADMINISTRATION HANDBOOK: Third Edition – EVI NEMETH et all Prentice Hall, ISBN 0-13-020601-6
> - “Linux System Administration Handbook
> - Apache and DNS is best read online.

### Areas covered

- Basic Unix / command prompt - revision
- Linux user and network administration
- Network Security
- Linux-based DNS
- Apache Web Server administration.
- Hacking Techniques
- Email
- SELinux

### Assessments

One practical exam and one written exam.

- Practical Exam:
  - 90 minute linux configuration.
  - Make specific changes to a linux distribution.
  - In Linuxzoo.
  - 50% of module mark.

- Written Exam:
  - 90 minutes.
  - 20 short-answer exam in moodle.
  - 50% of module mark.

### Linux Zoo

https://linuxzoo.net/

Username: 40417692@live.napier.ac.uk

'Join Queue' -> 'Switch On'

Username: root
Password: secure

----

## Linux Basics

Linux is a file-based system. Everything is in either a file or directory. Here are some directories stored in '/':

- /bin : This contains commands a user can run, like ‘ls’, but which might be needed during boot.
- /boot: Things needed during the boot process
- /dev : This contains devices, like the mouse.
- /home : This is where users store their files.
- /tmp : Temporary storage for users and the system
- /var : System files which can change.
- /etc : System config files which don’t change
- /lib and /lib64: Where all the system libraries live
- /proc : Files which represent the running system (like processes).
- /sbin : Commands which only an administrator would want.
- /usr : Commands which are never needed during bootup.

### Redirection and Pipes

```bash
Command > File # Send output to file.
Command < File # Take input for command from file.
Command | Command # Pipe output from command to another command.
```

### Command parameters and flags

Some commands change behaviours with different parameters. If a parameter relates to a file then it is called a "parameter". However if the parameter changes the bahaviour of a program then it is called a "flag".

Flag Example:

```bash
$ ncal

    November 2019
Mo     4 11 18 25
Tu     5 12 19 26
We     6 13 20 27
Th     7 14 21 28
Fr  1  8 15 22 29
Sa  2  9 16 23 30
Su  3 10 17 24

$ ncal -S

    November 2019
Su     3 10 17 24
Mo     4 11 18 25
Tu     5 12 19 26
We     6 13 20 27
Th     7 14 21 28
Fr  1  8 15 22 29
Sa  2  9 16 23 30

```

### Man pages

Manual pages can be used to see how a command is used and what parameters can be used in combination with it.

### Links

#### Hardlinks

```bash
$ ln hardfile_link path/to/hardfile
```

#### Softfile

```bash
$ ln -s path/to/softfile_link path/to/softfile
```

---- 

### Users

#### UID (User ID)

A user ID particularly identifies a user.

#### GID (Group ID)

A group ID particularly identifies a group of users. A group can allow users to share files between members while protecting the file from being read by members not in that group.

#### User details

User details are stored in four files.

```bash
/etc/passwd # General user details.
/etc/shadow # User passwords.
/etc/group # The user's groups.
/etc/gshadow # The group's passwords.

$ cat /etc/passwd

root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
...

$ cat /etc/shadow

root:!:17995:0:99999:7:::
daemon:*:17973:0:99999:7:::
bin:*:17973:0:99999:7:::
sys:*:17973:0:99999:7:::
sync:*:17973:0:99999:7:::
games:*:17973:0:99999:7:::
man:*:17973:0:99999:7:::
lp:*:17973:0:99999:7:::
...
```

#### Extracting information

You can use regular expressions to extract information from files. For example:

```bash
$ grep "^a" /etc/passwd # Returns all users beginning with "a".
adm:x:3:4:adm:/var/adm:/sbin/nologin
apache:x:48:48:Apache:/var/www:/sbin/nologin
andrew:x:501:500:Andrew Cumming:/home/andrew:/bin/bash
```

Extract only the usernames with cut:

```bash
$ grep "^a" /etc/passwd | cut -d":" -f1 # -d = delimeter (":"). The user name is in field 1 so "-f1" is used.
adm
apache
andrew
```

### Permissions

There are three permissions:

> -r = Read
> -w = Write
> -x = Execute

Three permission levels:

> -u = User
> -g = Group
> -o = Other

#### Chmod

Syntax:

```bash
$ chmod <new permissions> <file>
```

Example:

```bash
$ touch tmp/test
$ ls -l tmp/test
-rw-r--r--. 1 root root 0 Sep 23 15:47 /tmp/test

$ chmod og+wx /tmp/test
$ ls -l /tmp/test
-rw-rwxrwx. 1 root root 0 Sep 23 15:47 /tmp/test
```

Same as:

```bash
$ chmod 677 /tmp/test
$ ls -l /tmp/test
-rw-rwxrwx. 1 root root 0 Sep 23 15:47 /tmp/test
```

##### Permissions table

| Octal | Binary | Perms | Octal | Binary | Perms |
| --- | --- | --- | --- | --- | --- |
| 7 | 111 | rwx | 3 | 011 | -wx |
| 6 | 110 | rw- | 2 | 010 | -w- |
| 5 | 101 | r-x | 1 | 001 | --x |
| 4 | 100 | r-- | 0 | 000 | --- |

##### Examples:

```bash
-rwxr-x-r-x == 755
-r-x------ == 600
-rwxrwxrwx == 777
```

### Processes

Processes are running programs, they ahve their own ID. Some processes are part of the file system and can be found however some processes are 'speacial' and cannot be found - these are usually described [brackets]. The INIT process is the boss process in linux.

#### State codes

Standard Codes

- `D` uninterruptible sleep (usually I/O)
- `R` runnable (on run queue)
- `S` sleeping
- `T` traced or stopped
- `W` paging
- `X` dead
- `Z` a defunct ("zombie") process

Additional Codes

- `W` has no resident pages
- `<` high-priority process
- `N` low-priority task (nice)
- `L` has pages locked into memory (for real-time and custom IO)

#### Process Relationships

Proccesses from trees of parentage. All processes have a parent "INIT". If a process starts another process the new process has a parent of the old process.

$ pstree
```bash
systemd─┬─ModemManager───2*[{ModemManager}]
        ├─NetworkManager─┬─dhclient
        │                └─2*[{NetworkManager}]
        ├─2*[abrt-watch-log]
        ├─abrtd
        ├─accounts-daemon───2*[{accounts-daemon}]
        ├─acpid
        ├─alsactl
        ├─at-spi-bus-laun─┬─dbus-daemon───{dbus-daemon}
        │                 └─3*[{at-spi-bus-laun}]
        ├─at-spi2-registr───2*[{at-spi2-registr}]
        ├─atd
        ├─auditd─┬─audispd─┬─sedispatch
        │        │         └─{audispd}
        │        └─{auditd}
        ├─avahi-daemon───avahi-daemon
        ├─caribou───2*[{caribou}]
        ├─chronyd
        ├─colord───2*[{colord}]
        ├─2*[dbus-daemon───{dbus-daemon}]
        ├─dbus-launch
        ├─dconf-service───2*[{dconf-service}]
        ├─dnsmasq───dnsmasq
        ├─gdm─┬─Xorg
        │     ├─gdm-session-wor─┬─gnome-session─┬─gnome-settings-───4*[{gnome-settings-}]
        │     │                 │               ├─gnome-shell─┬─ibus-daemon─┬─ibus-dconf───3*[{ibus-dconf}]
        │     │                 │               │             │             ├─ibus-engine-sim───2*[{ibus-engine-sim}]
        │     │                 │               │             │             └─2*[{ibus-daemon}]
        │     │                 │               │             └─6*[{gnome-shell}]
        │     │                 │               └─3*[{gnome-session}]
        │     │                 └─2*[{gdm-session-wor}]
        │     └─3*[{gdm}]
        ├─goa-daemon───3*[{goa-daemon}]
        ├─goa-identity-se───3*[{goa-identity-se}]
        ├─gssproxy───5*[{gssproxy}]
        ├─gvfs-afc-volume───3*[{gvfs-afc-volume}]
        ├─gvfs-goa-volume───2*[{gvfs-goa-volume}]
        ├─gvfs-gphoto2-vo───2*[{gvfs-gphoto2-vo}]
        ├─gvfs-mtp-volume───2*[{gvfs-mtp-volume}]
        ├─gvfs-udisks2-vo───2*[{gvfs-udisks2-vo}]
        ├─gvfsd───2*[{gvfsd}]
        ├─ibus-x11───2*[{ibus-x11}]
        ├─ksmtuned───sleep
        ├─libvirtd───15*[{libvirtd}]
        ├─lsmd
        ├─lvmetad
        ├─master─┬─pickup
        │        └─qmgr
        ├─mission-control───3*[{mission-control}]
        ├─packagekitd───2*[{packagekitd}]
        ├─polkitd───5*[{polkitd}]
        ├─pulseaudio───{pulseaudio}
        ├─rpc.idmapd
        ├─rpc.mountd
        ├─rpc.statd
        ├─rpcbind
        ├─rsyslogd───2*[{rsyslogd}]
        ├─rtkit-daemon───2*[{rtkit-daemon}]
        ├─smartd
        ├─sshd───sshd───sshd───bash───pstree
        ├─systemd-journal
        ├─systemd-logind
        ├─systemd-udevd
        ├─tuned───4*[{tuned}]
        ├─udisksd───4*[{udisksd}]
        ├─upowerd───2*[{upowerd}]
        └─wpa_supplicant
```

#### /proc

Processes are represnted as files in /proc. They appear as a directory with the PID of the process. They have things in the directory that define the process in question.

#### Deamons

A Deamon is a process that starts when you boot which runs in the background. Not all things started when booting stays running - They set something up and then die. Deamons usually have a name which ends with a 'd'.

##### Syslog

Syslogd helps other deamons record what is going on in a file.

----

## Labs

### Intro 1

#### Question 2: cal

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

#### Question 3: cal year

`cal 2005 > yearfile`

#### Question 4: ls

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

#### Question 5: file size

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

#### Question 6: append

```bash
cal > thismonth
date >> thismonth
```

#### Question 7: copying

```bash
cp yearfile yearfile2
cp yearfile yearfile3
```

#### Question 8: moving

`mv yearfile3 thisyear`

#### Question 9: deleting

`rm yearfile`

#### Question 10: big concat

```bash
cat thismonth > bigfile
cat yearfile2 >> bigfile
cat thisyear >> bigfile
```

----

### Intro 2

#### Question 2: Create a directory structure

```bash
mkdir work
mkdir letters
mkdir scripts
mkdir ./work/progs
mkdir ./work/tutorial
mkdir ./work/misc
```

#### Question 3: cp

```bash
cp /etc/group ./work/misc/
cp /etc/vimrc ./work/misc/
```

#### Question 4: Relative move

```bash
cd ./work/misc/
mv ./vimrc ../progs/
```

#### Question 5: rename

`cp ../../bigfile ../tutorial/bigfile2`

#### Question 6: cp

```bash
cd ..
cp /home/demo/work/tutorial/bigfile2 /home/demo/scripts/
```

#### Question 7: tilde

```bash
cat /etc/passwd | grep sql
mysql:x:27:27:MariaDB Server:/var/lib/mysql:/sbin/nologin
```

#### Question 8: case and space

```bash
cd /home/demo
mkdir Gordon
mkdir gordon
mkdir "My Documents"
```

----

### Wildcards

#### Question 2: Wild copy

```bash
cd /home/demo
cp *file* ./work/
ls ./work/
bigfile  misc  progs  tutorial  yearfile2
```

#### Question 3: Duplicate thismonth

```bash
cp thismonth letters/let1.doc
cd letters/
cp let1.doc let2.doc
cp let1.doc let3.doc
```

#### Question 4: Copy and rename

```bash
cp let?.doc /home/demo/work/misc/
mv /home/demo/work/misc/let1.doc /home/demo/work/misc/rpt1.doc
mv /home/demo/work/misc/let2.doc /home/demo/work/misc/rpt2.doc
mv /home/demo/work/misc/let3.doc /home/demo/work/misc/rpt3.doc
```

#### Question 5: Square Brackets

```bash
mv /home/demo/work/misc/*[23]* /home/demo/scripts/
ls /home/demo/scripts/
bigfile2  rpt2.doc  rpt3.doc
```

#### Question 6: rm

```bash
rm /home/demo/scripts/r* -i
rm: remove regular file ‘/home/demo/scripts/rpt2.doc’? yes
rm: remove regular file ‘/home/demo/scripts/rpt3.doc’? yes
```

#### Question 7: Hard link

```bash
ln /home/demo/bigfile biglink
ls -l

total 8
-rw-r--r--. 2 demo tutorial 4082 Nov 27 14:18 biglink # The number 2 means this is a hard link.
-rw-r--r--. 1 demo tutorial 1982 Nov 27 14:33 vimrc
```

#### Question 8: Soft link

```bash
ln -s ../../thismonth mylink
ls -l

total 8
-rw-r--r--. 2 demo tutorial 4082 Nov 27 14:18 biglink
lrwxrwxrwx. 1 demo tutorial   15 Nov 27 15:15 mylink -> ../../thismonth # Notice the "l" in the permissions.
-rw-r--r--. 1 demo tutorial 1982 Nov 27 14:33 vimrc
```

#### Question 9: Soft link - Absolute

```bash
ln -s /home/demo/thismonth mylink2
ls -l

total 8
-rw-r--r--. 2 demo tutorial 4082 Nov 27 14:18 biglink
lrwxrwxrwx. 1 demo tutorial   15 Nov 27 15:15 mylink -> ../../thismonth
lrwxrwxrwx. 1 demo tutorial   20 Nov 27 15:26 mylink2 -> /home/demo/thismonth
-rw-r--r--. 1 demo tutorial 1982 Nov 27 14:33 vimrc
```