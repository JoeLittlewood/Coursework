# SELinux Lab

## Question 1: Global Settings

```bash
[root@host-5-177 ~]$ getenforce
Enforcing
```

### What is the absolute pathname to the selinux directory in /sys?

```bash
/sys/fs/selinux
```

### How does the information from getenforce compare to the related enforce status value stored in /sys?

```bash
[root@host-5-177 ~]$ cat /sys/fs/selinux/enforce
1
```

### How many files and directories are actually in the top level of the SELinux directory in /sys?

```bash
[root@host-5-177 ~]$ ls /sys/fs/selinux/ | wc
     23      23     215
```

## Question 2: Basic Labels

```bash
[root@host-5-177 ~]$ cd ..
[root@host-5-177 /]$ ls
1  bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
[root@host-5-177 /]$ find -name "rsyslogd"
./usr/sbin/rsyslogd
```

### What is the SELinux label of this executable rsyslogd file?

```bash
[root@host-5-177 /]$ ls -Z /usr/sbin/rsyslogd
-rwxr-xr-x. root root system_u:object_r:syslogd_exec_t:s0 /usr/sbin/rsyslogd
```

### The daemon rsyslogd uses /etc/rsyslog.conf as its configuration file. What is the SELinux label of the rsyslogd configuration file?

```bash
[root@host-5-177 /]$ ls -Z /etc/rsyslog.conf
-rw-r--r--. root root system_u:object_r:syslog_conf_t:s0 /etc/rsyslog.conf
```

### Given that rsyslogd is running currently, what is the label of the process. Use the list of running processes to discover this.

```bash
[root@host-5-177 /]$ ps -C rsyslogd -o pid= # Find PID
  994
[root@host-5-177 /]$ ps Z -p 994 # See security info for PID 994
LABEL                             PID TTY      STAT   TIME COMMAND
system_u:system_r:syslogd_t:s0    994 ?        Ssl    0:00 /usr/sbin/rsyslogd -n
```

