# Networked Services: 1.2

> 26/11/2019

----

- [Networked Services: 1.2](#networked-services-12)
  - [Disks and Partitions](#disks-and-partitions)
    - [Disks](#disks)
    - [Partitions](#partitions)
    - [Common Partitions](#common-partitions)
    - [Logical Volume Manager](#logical-volume-manager)
    - [Partition Format](#partition-format)
      - [Block Identifiers](#block-identifiers)
    - [Disk Usage](#disk-usage)
  - [Linux Boot process](#linux-boot-process)
    - [Booting to Kernel](#booting-to-kernel)
    - [Startup commands](#startup-commands)
    - [Target tree](#target-tree)
    - [Controlling services in systemd](#controlling-services-in-systemd)
    - [Make things start when you boot](#make-things-start-when-you-boot)
    - [Status](#status)
  - [user management](#user-management)
    - [Manual Creation](#manual-creation)
    - [`adduser Gordon`](#adduser-gordon)
    - [Skel files](#skel-files)
    - [`ls /etc/profile.d`](#ls-etcprofiled)

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

----

## Linux Boot process

### Booting to Kernel

From switch-on:

- PC BIOS selects a boot disk
- BIOS loads the boot block and executes it.
- This loads a stage 1 boot loader.
- Stage 1 loads stage 2 loader.
- Linux loader (e.g. Grub, lilo) runs
- Operator selects from loader menu
- Kernel loaded with device ramdisk

### Startup commands

As linux boots, it runs various system scripts. In Redhat/Centos/Fedora, this is controlled largely by systemd. Systemd forms a tree of dependencies:

- Start the network before starting sshd
- Start the firewall after the network

The internals of systemd are very complex, so best to alway use the system commands to control how systemd runs.

Systemd has only been around since 2014 and was developed by Redhat.

### Target tree

In order for systemd to speed up the process of booting then it introduces a tree of processes to tell which processes need to run in which order.

Systemd does not have run levels, these are instead called targets.

### Controlling services in systemd

There are many services in which you may want to control. These may be sshd, apache and databases. Things that are services are named "something.service", such as ssh.service. Control is via systemctl.

- Start a service: `systemctl start sshd.service`
- Stop a service: `systemctl stop sshd.service`
- Restart sshd: `systemctl restart sshd.service`
- Reload sshd: `systemctl reload sshd.service`

### Make things start when you boot

Start a service: `systemctl start sshd.service`

If you want something to run everytime you reboot then enabable it: `systemctl enable sshd.service`

Disable: `systemctl disable sshd.service`

Stop a service: `systemctl stop sshd.service`

### Status

The information about a service is stored in a few locations. You can do that yourself, but systemctl can build the info for you.
`systemctl status sshd.service`

Configuration file: `/usr/lib/systemd/system/sshd.service`

```bash
[Unit]
Description=OpenSSH server daemon
After=syslog.target network.target auditd.service
[Service]
EnvironmentFile=/etc/sysconfig/sshd
ExecStartPre=/usr/sbin/sshd-keygen
ExecStart=/usr/sbin/sshd -D $OPTIONS
ExecReload=/bin/kill -HUP $MAINPID
KillMode=process
Restart=on-failure
RestartSec=42s
[Install]
WantedBy=multi-user.target
```

----

## user management

### Manual Creation

- User entries in passwd, shadow, group and gshadow.
- Home directory in /home.
- Copy basic .files into their home directory.
- Make new user own their own directory and files.

### `adduser Gordon`

This does all the configuration for you. It copies the default.files from /etc/skel/.

```bash
.bash_logout .bash_profile .bashrc .gtkrc .kde
```

In bash, .bashrc is executed in non-login shell, and .bash_profile in a login shell.

### Skel files

These files are basic .files created for a new user. Users are free to edit these when they login. This allows them to control their own path, env and other settings. However, if you install a new package which needs something set for each user at login, editing all these copies by hand would be tiresome.

### `ls /etc/profile.d`

```bash
colorls.csh gnome-ssh-askpass.csh krb5.csh less.csh vim.csh
colorls.sh gnome-ssh-askpass.sh krb5.sh less.sh vim.sh
glib2.csh kde.csh lang.csh qt.csh which-2.sh
glib2.sh kde.sh lang.sh qt.sh
```

- If you log in with bash, all the .sh files are executed before your .files
- If you log in with csh, all the .csh files are executed before your .files
