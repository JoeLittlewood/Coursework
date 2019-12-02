# Essentials

## Question 1: ls

```bash
[demo@host-5-177 ~]$ ls / | wc
     20      20      87
```

## Question 2: Edit

```bash
[root@host-5-177 demo] echo "Welcome" > /etc/motd
```

## Question 3: uid

```bash
[root@host-5-177 demo] cat /etc/passwd | grep "operator"
operator:x:11:0:operator:/root:/sbin/nologin
```

## Question 4: owner

```bash
[root@host-5-177 demo] ls -l /var/cache/ | grep "httpd"
drwx------. 3 apache apache   18 Nov 14  2016 httpd
```

## Question 5: permissions

```bash
[root@host-5-177 ~] ls -l / | sort -k9
total 36
-rw-r--r--.   1 root root     0 Mar  9  2017 1
lrwxrwxrwx.   1 root root     7 Mar  9  2017 bin -> usr/bin
dr-xr-xr-x.   4 root root  4096 Mar  9  2017 boot
drwxr-xr-x.  20 root root  3220 Nov 29 12:18 dev
drwxr-xr-x. 144 root root 12288 Nov 29 12:18 etc
drwxr-xr-x.   4 root root    29 Nov 27 14:02 home
lrwxrwxrwx.   1 root root     9 Mar  9  2017 lib64 -> usr/lib64
lrwxrwxrwx.   1 root root     7 Mar  9  2017 lib -> usr/lib
drwxr-xr-x.   2 root root     6 Nov  5  2016 media
drwxr-xr-x.   2 root root     6 Nov  5  2016 mnt
drwxr-xr-x.   3 root root    15 Nov  5  2016 opt
dr-xr-xr-x. 162 root root     0 Nov 29 12:18 proc
dr-xr-x---.   5 root root  4096 Nov  5  2016 root
...
```

## Question 6: more permissions

```bash
[root@host-5-177 ~] chmod 755 /var/log/httpd/
```

