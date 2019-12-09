# Networked Services - Admin Lab

## Question 1: Partitions and LVM

Use sfdisk with block units and find out the partitions which exist in /dev/sda. How many blocks are in the first partition?

```bash
[root@host-5-233 ~]$ sfdisk -lu B /dev/sda
```

512000

## Question 1b

Use the pvdisplay command of LVM to discover what physical volume (i.e. which partition) is being managed by LVM. What is the partition being used (PV Name) and what is the volume group name (VG Name)?

```bash
[root@host-5-233 ~]$ pvdisplay
  --- Physical volume ---
  PV Name               /dev/sda2
  VG Name               centos_lvm
  PV Size               6.51 GiB / not usable 3.00 MiB
  Allocatable           yes (but full)
  PE Size               4.00 MiB
  Total PE              1666
  Free PE               0
  Allocated PE          1666
  PV UUID               kIogiH-f548-AELA-NMVK-sbr7-9u7j-2K6MDz
```

## Question 1c

Use lvdisplay to discover information about the VG Name found in the previous question. What is the first LV Path which is using the volume group discovered in the previous question?

```bash
[root@host-5-233 ~]$ lvdisplay centos_lvm
  --- Logical volume ---
  LV Path                /dev/centos_lvm/root
  LV Name                root
  VG Name                centos_lvm
  LV UUID                xnNIQ2-ct1m-UqaR-BkjO-GrNI-FUwt-e2ciYM
  LV Write Access        read/write
  LV Creation host, time host-19-17.linuxzoo.net, 2014-09-08 09:08:59 +0100
  LV Status              available
  # open                 1
  LV Size                6.51 GiB
  Current LE             1666
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     8192
  Block device           253:0
```

## Question 1d

Using the path discovered in the previous question, look at this path in the /dev directory using a long listing ls command. Assuming this is in fact a soft link, what is the ABSOLUTE device name which this link is pointing to?

```bash
[root@host-5-233 ~]$ ls -l /dev/centos_lvm/root
lrwxrwxrwx. 1 root root 7 Dec  6 09:19 /dev/centos_lvm/root -> ../dm-0
```

## Question 1e

For mounting this logical volume, the current method is NOT to use the volume name, or even the device it points to. Instead the device mapper is used, which can support different layers (such as encryption on top of something else). This can be found in /dev/mapper.

Look in /dev/mapper, and find the soft link which points to the device file identified in the previous question. What is the relative name of this link? So if the link was /dev/mapper/gordon, the answer wanted here is "gordon".

```bash
[root@host-5-233 ~]$ ls -alt /dev/mapper
total 0
drwxr-xr-x. 20 root root    3220 Dec  6 09:19 ..
lrwxrwxrwx.  1 root root       7 Dec  6 09:19 centos_lvm-root -> ../dm-0
crw-------.  1 root root 10, 236 Dec  6 09:19 control
drwxr-xr-x.  2 root root      80 Dec  6 09:19 .
```

## Question 1f

Look in the fstab mount table. Find the line which mounts this partition via the mapper device. Where is this partition mounted?

```bash
[root@host-5-233 ~]$ cat /etc/fstab

#
# /etc/fstab
# Created by anaconda on Mon Sep  8 08:09:05 2014
#
# Accessible filesystems, by reference, are maintained under '/dev/disk'
# See man pages fstab(5), findfs(8), mount(8) and/or blkid(8) for more info
#
/dev/mapper/centos_lvm-root /                       xfs     defaults        1 1
UUID=f3b744e4-e754-4842-93d1-43b06de64b66 /boot                   xfs     defaults        1 2
UUID=971d09b6-8ce8-49c7-9ec9-16b0155f42cf swap                    swap    defaults        0 0
```

## Question 1g

One can also mount things using the filesystem block id (which is the UUID shown in fstab). What block id could you use instead of the mapper mount in this case? It is in a format like ffffff-ffff-fffff-fffff-ffffffffff.

```bash
[root@host-5-233 ~]$ blkid /dev/mapper/centos_lvm-root
/dev/mapper/centos_lvm-root: UUID="b66fdf9b-16f0-4648-9663-536881db0ab1" TYPE="xfs"
```

## Question 1h

Recall that you discovered the device file in /dev which the LVM mapper entry was soft linked to. What was the major and minor number of this device?

```bash
[root@host-5-233 ~]$ ls -l /dev/dm-0
brw-rw----. 1 root disk 253, 0 Dec  6 11:40 /dev/dm-0
```

## Question 1i

Somewhere in the /proc filesystem there is a file which tells you how much swap space has been allocated to the computer. Find that file and then find out how big in bytes the swap space is. Hint: the information that you require is located within the /proc directory within a file .

```bash
[root@host-5-233 ~]$ cat /proc/swaps
Filename                                Type            Size    Used    Priority
/dev/sdb1                               partition       2103484 2584    -1
```

## Question 2a: Processes and Services

What is the process id of rsyslogd? Hint: remember the 'ps aux' command?

```bash
[root@host-5-233 ~]$ ps aux | grep rsyslogd
root       993  0.0  0.8 215680  4236 ?        Ssl  11:41   0:00 /usr/sbin/rsyslogd -n
root      1727  0.0  0.1 112652   924 pts/0    S+   11:45   0:00 grep --color=auto rsyslogd
```

## Question 2b

Kill rsyslogd using the kill command.

```bash
kill 993
```

## Question 2c

Using systemctl, get the status of the rsyslog service. What is the full path to the systemd configuration file which controls the rsyslog serice?

```bash
[root@host-5-233 ~]$ systemctl status rsyslog
● rsyslog.service - System Logging Service
   Loaded: loaded (/usr/lib/systemd/system/rsyslog.service; enabled; vendor preset: enabled)
   Active: active (running) since Fri 2019-12-06 11:41:01 GMT; 6min ago
 Main PID: 993 (rsyslogd)
   CGroup: /system.slice/rsyslog.service
           └─993 /usr/sbin/rsyslogd -n

Dec 06 11:41:01 host-5-233.linuxzoo.net systemd[1]: Starting System Logging Service...
Dec 06 11:41:01 host-5-233.linuxzoo.net systemd[1]: Started System Logging Service.
```

## Question 2d

Look at this configuration file. Find the line which configures the environmental variables of rsyslog (EnvironmentFile). Ignoring the "=" or the "=-" if it exists, what is the environment file for this service?

