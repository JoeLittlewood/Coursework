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
