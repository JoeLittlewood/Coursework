# Networked Services - 1.1

> 26/11/2019

----

- [Networked Services - 1.1](#networked-services---11)
  - [Disks and Partitions](#disks-and-partitions)
    - [Disks](#disks)
    - [Partitions](#partitions)
    - [Common Partitions](#common-partitions)
    - [Logical Volume Manager](#logical-volume-manager)
    - [Partition Format](#partition-format)
      - [Block Identifiers](#block-identifiers)
    - [Disk Usage](#disk-usage)
  - [Linux Boot process](#linux-boot-process)

----

## Disks and Partitions

### Disks

In Linux, a disk is often a SATA disk and is identified by `/dev/sda` - lowest numbered SCSI device. `/dev/sdb` - next lowest SCSI device. The CDROM drive, Which is also a bloack storage device, frequently has a name `/dev/sr0`. For convienience, `/dev/cdrom` is often a soft link to the actual cdrom device.

```bash
$ ls -l /dev/cdrom
lrwxrwxrwx. 1 root root 3 Sep 25 13:10 /dev/cdrom -> sr0
```

### Partitions

Partitioning is when a disk is slit into multiple chunks. These chunks are known as partitions. Partitions can be primary or secondary - This is paertially a hang over for when DOS could only handle four partitions.

### Common Partitions

At a very minimum, a linux box has "/", the partition that holds the main directory tree; "/boot", a partition that stay close to the start of the disk structure designated to be easily accessible form a veriety of BIOS configurations and disk formats, used for bootstrapping; and "swap" an area for holding virtual memory which has been swapped out of memory.

Options include "/home", to keep user and system files physically separate and "/var", as some feel that "/var" is changed at a higher rate than other partitions and thus there may be more security in formatting it separately.

### Logical Volume Manager

If you want to change your partitions after installing, then you are
doing something very risky…

- It is possible to destroy every partition by damaging the partition table.
- Often the current partitions use 100% of the disk, so repartitioning to make something bigger means shrinking other partitions.
- Formatted partitions don’t like being shrunk, and need to be compressed and migrated before being shrunk.
- LVM and other tools tries to make this simpler, by adding dynamic run-time controls to partition management.

```bash
$ lvdisplay

--- Logical volume ---
LV Path /dev/centos_lvm/root
LV Name root
VG Name centos_lvm
LV UUID xnNIQ2-ct1m-UqaR-BkjO-GrNI-FUwt-e2ciYM
LV Size 6.51 GiB
```

Create a new partition in an LVM:

```bash
$ lvcreate –L 2G –n newstuff centos_lvm
```

Shrink an existing partition:

```bash
$ lvreduce –L-1G –n mypartition centos_lvm
```

Add a new harddrive

```bash
$ vgextend centos_lvm /dec/sdb1
```

To make resizing work, you still have to carefully resize the partition format, but at least there is no danger in deleing all the partitions accidentally.

### Partition Format

When you format a partition for use then it gets given a block identifier to identify each partition. In the past you had to identify partitions by their number and device name. for example partition 2 on sda being "/dev/sda2". A better way to identify partitions is by their block id, this way, if they get moved then yuo can still identify a partion easily, reliably and consistently.

#### Block Identifiers

```bash
$ blkid

/dev/sda1: UUID="f3b744e4-e754-4842-93d1-43b06de64b66" TYPE="xfs"
/dev/sda2: UUID="kIogiH-f548-AELA-NMVK-sbr7-9u7j-2K6MDz" TYPE="LVM2_member"
/dev/sdb1: UUID="971d09b6-8ce8-49c7-9ec9-16b0155f42cf" TYPE="swap"
/dev/mapper/centos_lvm-root: UUID="b66fdf9b-16f0-4648-9663-536881db0ab1" TYPE="xfs“
```

When the system boots the fstab file tells the kernel what file systems to load.

```bash
$ cat /etc/fstab 

/dev/mapper/centos_lvm-root / xfs defaults 1 1
UUID=f3b744e4-e754-4842-93d1-43b06de64b66 /boot xfs defaults 1 2
UUID=971d09b6-8ce8-49c7-9ec9-16b0155f42cf swap swap defaults 0 0
```

```bash
$ df

Filesystem 1K-blocks Used Available Use% Mounted on
/dev/mapper/centos_lvm-root 6813696 4100528 2713168 61% /
devtmpfs 241940 0 241940 0% /dev
tmpfs 250952 80 250872 1% /dev/shm
tmpfs 250952 4752 246200 2% /run
tmpfs 250952 0 250952 0% /sys/fs/cgroup
/dev/sda1 508588 136588 372000 27% /boot
```

> “df –h” is also useful, translating bytes in MB or GB as appropriate…

### Disk Usage

If you want to find out how much disk space a directory is using, the "du" command does this easily.

```bash
$ du -s /usr/lib
477464 /usr/lib
$ du -sh /usr/lib
467M /usr/lib
```

> “-s” is useful, otherwise it tells you about all subdirectories too.
> “-h” puts it into human readable form.

## Linux Boot process