# Pipes

## Question 2: sort

```bash
[demo@host-5-105 ~]$ cat club_members names | sort > s1
[demo@host-5-105 ~]$ cat s1
Colin Colon
Hilary Heart
Jim Brown       8    467-8743  22
Jim Roberts     17   728-8295  9
Joyce Murray    7    235-1432  13
Pam Murray      4    657-4324  18
Pat Pancreas
Seth Spleen
```

## Question 3: reverse sort

```bash
[demo@host-5-105 ~]$ cat club_members names | sort -r > s2
[demo@host-5-105 ~]$ cat s2
Seth Spleen
Pat Pancreas
Pam Murray      4    657-4324  18
Joyce Murray    7    235-1432  13
Jim Roberts     17   728-8295  9
Jim Brown       8    467-8743  22
Hilary Heart
Colin Colon
```

## Question 4: sort on a field

```bash
[demo@host-5-105 ~]$ cat club_members | sort -nk5 > s3
[demo@host-5-105 ~]$ cat s3
Jim Roberts     17   728-8295  9
Joyce Murray    7    235-1432  13
Pam Murray      4    657-4324  18
Jim Brown       8    467-8743  22
```

## Question 5: sort with field separator

```bash
[demo@host-5-105 ~]$ cat /etc/passwd | sort -nt":" -k3 > s4
[demo@host-5-105 ~]$ cat s4
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
sync:x:5:0:sync:/sbin:/bin/sync
shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown
halt:x:7:0:halt:/sbin:/sbin/halt
...
```

## Question 6: using grep

```bash
[demo@host-5-105 ~]$ cat /usr/share/dict/words | grep ".wta."
cowtail
crawtae
newtake
plowtail
sparrowtail
swallowtail
swallowtailed
swallowtails
tewtaw
yellowtail
yellowtails
```

## Question 7: count with grep

```bash
[demo@host-5-105 ~]$ cat /usr/share/dict/words | grep ".*x.*" | wc
  12249   12249  133734
```

## Question 8: negative grep

```bash
[demo@host-5-105 ~]$ cat /etc/passwd | grep "nologin" -nv > s5
[demo@host-5-105 ~]$ cat s5
1:root:x:0:0:root:/root:/bin/bash
6:sync:x:5:0:sync:/sbin:/bin/sync
7:shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown
8:halt:x:7:0:halt:/sbin:/sbin/halt
38:alice:x:1000:1000:Alice:/home/alice:/bin/bash
48:demo:x:1001:2700::/home/demo:/bin/bash
```

## Question 9: grep and ls

```bash
[demo@host-5-105 ~]$ ls -l /etc | grep "Aug" > s6
```

## Question 10: ls grep and sort

```bash
[demo@host-5-105 ~]$ ls -l /etc | grep "Jun" | sort -nrk5 -k9b > s7 # b stops the initial reverse (-r) command not apply to the alphabetical sort.
[demo@host-5-105 ~]$ cat s7
-rw-r--r--.  1 root root   670293 Jun  7  2013 services
-rw-r--r--.  1 root root     8892 Jun 10  2014 nanorc
-rw-r--r--.  1 root root     6545 Jun  7  2013 protocols
-rw-r--r--.  1 root root     6300 Jun 10  2014 pnm2ppa.conf
-rw-r--r--.  1 root root     5171 Jun  9  2014 man_db.conf
-rw-r--r--.  1 root root     4760 Jun  9  2014 enscript.cfg
-rw-r--r--.  1 root root     2872 Jun 10  2014 pinforc
-rw-r--r--.  1 root root     2620 Jun 10  2014 mtools.conf
-rw-r--r--.  1 root root     1787 Jun 10  2014 request-key.conf
-rw-r--r--.  1 root root     1518 Jun  7  2013 aliases
-rw-r--r--.  1 root root     1362 Jun 10  2014 pbm2ppa.conf
-rw-r--r--.  1 root root      942 Jun  7  2013 inputrc
-rw-r-----.  1 root named     931 Jun 21  2007 named.rfc1912.zones
-rw-r--r--.  1 root root      841 Jun  7  2013 csh.login
-rw-r--r--.  1 root root      460 Jun  7  2013 hosts.deny
-rw-r--r--.  1 root root      451 Jun  9  2014 crontab
-rw-r--r--.  1 root root      370 Jun  7  2013 hosts.allow
-rw-r--r--.  1 root root      233 Jun  7  2013 printcap
-rw-r--r--.  1 root root      158 Jun  7  2013 hosts
-rw-r--r--.  1 root root       20 Jun 24  2014 fprintd.conf
-rw-r--r--.  1 root root        9 Jun  7  2013 host.conf
drwxr-xr-x.  2 root root        6 Jun  9  2014 cron.monthly
drwxr-xr-x.  2 root root        6 Jun  9  2014 cron.weekly
drwxr-xr-x.  2 root root        6 Jun 10  2014 popt.d
drwxr-xr-x.  2 root root        6 Jun 11  2014 terminfo
-rw-r--r--.  1 root root        0 Jun  7  2013 exports
-rw-r--r--.  1 root root        0 Jun  7  2013 motd
-rw-r--r--.  1 root root        0 Jun 10  2014 wvdial.conf
```

## Question 11: find root files

