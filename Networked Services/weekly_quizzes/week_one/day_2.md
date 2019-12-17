# Daily quiz - Day 2

## Question 1

What might you find in /bin?

> The correct answer is: Non-system executables

## Question 2

Why might you not want to use an LVM partition for / ?

> The correct answer is: Adds some overheads potentially reducing performance.

## Question 3

What command lists the block identifiers for all block devices available?

> The correct answer is: blkid

## Question 4

What command tells you, in a human readable form, how much disk space is being used by /home/gordon?

> The correct answer is: du -sh /home/gordon

## Question 5

How does a Linux kernel, during the boot process, discover the right drivers to access the / partition?

> The correct answer is: It uses a prebuilt ramdisk containing the drivers needed.

## Question 6

You want to start a service called sshd.service each time you boot. How would you do that in systemd?

> The correct answer is: systemctl enable sshd.service

## Question 7

Using System V runlevels, consider the following information:

```bash
ls -l /etc/rd5.d/*sshd
lrwxrwxrwx. 1 root root 17 Sep  8 13:06 K55sshd -> ../init.d/sshd
```

What does this mean when the machine is rebooted?

> The correct answer is: Stop running sshd with priority 55

## Question 8

If a user deletes their .bashrc file, where is the best place to locate a copy of the default version of this file?

> The correct answer is: /etc/skel/.bashrc

## Question 9

If you want to make sure all users execute something every time they log in, where would the best place be to put that?

> The correct answer is: In a script in /etc/profile.d

## Question 10

Consider the following:

```bash
$ ls -l /proc/21019
lr-x------. 1 gordon gordon 64 Mar 14 17:24 0 -> /tmp/test.dat
lrwx------. 1 gordon gordon 64 Mar 14 17:24 1 -> /dev/pts/0
lrwx------. 1 gordon gordon 64 Mar 14 17:24 2 -> /dev/pts/0
```

Which command could possibly have created the first entry in the listing?

> The correct answer is: cat < test.dat