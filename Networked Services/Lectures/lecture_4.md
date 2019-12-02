# Networked services 2.1

> 02/12/19

----

- [Networked services 2.1](#networked-services-21)
  - [SELinux](#selinux)
  - [Modes of opperation](#modes-of-opperation)
  - [Permissive mode](#permissive-mode)
  - [Security Concepts](#security-concepts)
  - [Domain](#domain)
  - [Type](#type)
  - [MLS](#mls)
  - [SELinux Users](#selinux-users)
  - [Unconfined](#unconfined)
  - [Roles](#roles)
  - [Default Roles](#default-roles)
  - [Example: Apache Deamon](#example-apache-deamon)
  - [Allow](#allow)
  - [SELinux ports](#selinux-ports)
  - [Transitions](#transitions)
  - [Booleans](#booleans)

----

## SELinux

Linux by default uses Discretionary Access Control (DAC) for it's security model. DAC is based on UID or GID and uses file access controls based on RWX (Read, Write, Execute).

DAC has some issues:

- If permission is granted to a user then this is independent of user behaviour. So for instance if a good process was hacked in some way, it can continue to access what it could before even if it was operating in a different way.
- ACLs are time consuming to maintain
- Grant and revoke of permissions requires finding all the files related to the change
- Cannot easily stay negative statements, i.e. what are you not allowed to access.
- Non file-based permissions are tricky to manage… e.g. what ports can be opened by a process, what permissions do child processes have, or what processes can a process talk to.

SELinux was originally developed by the National Security Agency (NSA). It is an implementation of the Flask operating system security architecture. SELinux implements Mandatory Access Control (MAC). MAC is a centrally managed security policy based on objectives. Ultimately the idea is to give processes “least privilege”, i.e. only exactly what that process needs to get the job done. Each file is given an SELinux label, using xattr. Basically, SELinux holds rules about what process labels can do to each file label.

## Modes of opperation

SELinux can be run in Enforcing mode, Permissive Mode and Disabled. SELinux can also operate in a few types of enforcment; Strict, Targeted, Minimum and mls.

## Permissive mode

Often seen in advice "Run in permissive mode to fix this"...

Permissive mode does not enforce the rules but does report when it would usually stop an action. There is a danger however that while in permissive mode the file labels could be changed intoa  state that is not wanted.

> If a process tried to create a file but choses the wrong file label, permissive mode will allow this to happen.
> If you then return to enforcing mode, the new file will have the wrong label.

```bash
cat /sys/fs/selinux/enforce
# 1 indicates currently enforcing, 0 otherwise.
getenforce # Reports “Enforcing” if enforcing…
setenforce 0 # Changes mode to permissive
setenforce 1 # Changes mode to enforcing
```

It is usually best to fix problems without leaving enforcing mode, but people find this difficult.

You can create the file `/.autorelabel` then reboot. 

- On next boot the whole filesystem will be relabelled with the default labels for each file.
- Default labels may not be what you want, and may override legitimate changes, but labels will now be at least strictly correct.
- So if on boot default is enforcing, then at least the labels will work (e.g. the system should be bootable).

## Security Concepts

Subjects

- The thing performing an action In linux these are processes.
- Since processes are related to users, users can be considered subjects too.

Access

- What access is permitted, such as read, write, append, delete, open, change.

Object

- The resource on which the action applies.

Subjects use Access on objects.

## Domain

In SELinux, a label assigned to a process is called a domain.

```bash
$ ps -Zx | grep sshd
# SELinux_user:SELinux_role:SELinux_type:SELinux_mls
system_u:system_r:sshd_t:s0-s0:c0.c1023 2141 ? Ss 0:00 /usr/sbin/sshd
```

## Type

A type is a label for an object, such as a file.

```bash
$ ls -Z /etc/ssh/ssh_host_ecdsa_key
system_u:object_r:sshd_key_t:s0 /etc/ssh/ssh_host_ecdsa_key
```

When making decisions about an action, SELinux considers the domain and the type, but also the class. An object class is the description about what sort of object it is. For instance, a file, a directory, a soft link, etc. This allows for fine grained decision making.

## MLS

Sensitivity is the fourth field in the domain or type:

```bash
system_u:system_r:sshd_t:s0-s0:c0.c1023
```

The fourth field has two concepts: sensitivity and category.

- Sensitivity is equivalent to document classifcations like internal, secret, top secret etc., represented by a number.
- Category relates to concepts like department names are project titles. Again these are represented as a number.

MLS information can be written in a number of ways:

```bash
system_u:system_r:sshd_t:s0-s2:c0.c1023 # Sensitivity of s0 to s2 and all categories from c0 to c1023
system_u:system_r:sshd_t:s0 # Sensitivity of s0 and a default categories from c0
system_u:system_r:sshd_t:s0:c5,c9,c44 # Sensitivity of s0 and membership of categories c5,c9, and c44.
```

- If a process has all the categories of the object (or more), and a sensitivity equal to or more than the object, then it is said to dominate. Known as dom.
- If a process has some (at least 1) but not all of the categories, and a sensitivity equal to or less than the object, then it is said to be dominated. Known as domby.
- Process has the same sensitivity and categories as the object. Known as eq.
- Process has categories which have nothing in common with the object it is said to be incompatible. Known as incomp.

## SELinux Users

Domains have an SELinux user entry. This provides functionality which relates to something users cannot change themselves. Each Linux user is in reality  an SELinux user, based on mapping.

```bash
$ semanage login -l

Login Name      SELinux User        MLS/MCS Range
Service

__default__     unconfined_u        s0-s0:c0.c1023 *
root            unconfined_u        s0-s0:c0.c1023 *
system_u        system_u            s0-s0:c0.c1023 *
```

## Unconfined

Unconfined in SELinux indicates that SELinux will not enforce any rules in policing the interactions. In effect, if a user is unconfined, they operate largely as if SELinux is disabled. Generally, if a user or process becomes unconfined, then there should be no way back for the process later to become "confined".

## Roles

Roles in SELinux are what actually carry permissions for users

```bash
$ semanage users –l

SELinux User        ...         SELinux Roles
root                            staff_r sysadm_r system_r unconfined_r
staff_u                         staff_r sysadm_r system_r unconfined_r
system_u                        system_r unconfined_r
unconfined_u                    system_r unconfined_r
user_u                          user_r
```

## Default Roles

Role | Description
--- | ---
user_r | End user role meant to be assigned to users with interactive logon privileges to the system, but without additional role requirements.
staff_r | End user role meant to be assigned to users who also need to transition to other roles. The staff_r role by itself isn't much more privileged than user_r except that it is allowed to do role transitions.
sysadm_r | Powerful role for generic system administration.
system_r | System role meant for daemons and system services.

## Example: Apache Deamon

The apache deamon, httpd:

```bash
$ ps auxZ | grep httpd
system_u:system_r:httpd_t:s0 /usr/sbin/httpd
```

> When Apache wants to log errors, it writes it to /var/log/httpd/error_log

```bash
$ ls –Z /var/log/httpd/error_log
-rw-r--r--. system_u:object_r:httpd_log_t:s0 error_log
```

## Allow

For httpd_t access httpd_log_t, it needs a rule to allow this: 

```bash
$ sesearch --allow --source httpd_t –-target
httpd_log_t --class file

allow httpd_t httpd_log_t : file { lock append open …} ;
```

## SELinux ports

SELinux also has rules about what types can open which network ports. Again for httpd, it would naturally want to use port 80.

```bash
$ sesearch -s httpd_t -c tcp_socket -AC -p name_bind
allow httpd_t http_port_t : tcp_socket name_bind ;

$ semanage port -l | grep http_port_t
http_port_t tcp 80, 81, 443, ...
```

## Transitions

Processes can move from one type to another by executing a program of that new type.

- For example, the init process which starts all daemons has type init_t.
- You may wish to run a command in /etc/init.d so that you end up running that daemon unconfined.
- In this case a special type exists, unconfined_service_t, which has no transitions back to a confined state.

To find the right type:

```bash
$ sesearch -T -s init_t | grep unconfined
type_transition init_t bin_t : process unconfined_service_t;
type_transition init_t usr_t : process unconfined_service_t;
```

So if the file /etc/init.d/oracle has either bin_t or usr_t, the process will become type unconfined_service_t.

```bash
$ ls -Z /etc/init.d/oracle
-rwxr-x---. system_u:object_r:bin_t:s0      oracle
```

## Booleans

Some rules are considered part of the base rules. However, other rules can be switched on or off using booleans.

- Adding more rules usually means adding more ways to access something
- More access could mean less security
- So you should only enable Booleans when they are actually needed.

So for instance, to enable httpd to read stuff in /home/*, this feature needs to be switched on:

```bash
$ setsebool –P httpd_enable_homedirs 1
```

httpd_enable_homedirs can be explored using sesearch.
You can discover the type of /home/demo:

```bash
$ ls –Z /home/demo
unconfined_u:object_r:user_home_dir_t:s0 vmd
$ sesearch --allow -s httpd_t -b httpd_enable_homedirs
…
allow httpd_t user_home_dir_t : lnk_file { read getattr } ;
…
```
