# Networked Services  - Lecture 6

> Joe L, 40417692

----

- [Networked Services - Lecture 6](#networked-services---lecture-6)
  - [DNS](#dns)
    - [Basics](#basics)
    - [Terminology](#terminology)
      - [Zone](#zone)
      - [Namserver](#namserver)
      - [Authoritative Nameserver](#authoritative-nameserver)
      - [Recursive Name server](#recursive-name-server)
      - [Resolver](#resolver)
      - [Delegation](#delegation)
      - [Resource Record (RR)](#resource-record-rr)
    - [WHOIS](#whois)
    - [DNS Distributed Database](#dns-distributed-database)
    - [Manual lookups](#manual-lookups)
    - [Reverse Lookup](#reverse-lookup)
  - [Linux DNS configuration](#linux-dns-configuration)
    - [Resolver in Linux](#resolver-in-linux)
    - [/etc/hosts](#etchosts)
    - [Your own nameserver](#your-own-nameserver)
    - [Nameserver daemons](#nameserver-daemons)
    - [What is a chroot](#what-is-a-chroot)
    - [SELinux protection](#selinux-protection)
    - [RNDC](#rndc)
    - [Generate the key](#generate-the-key)
    - [Master and slave](#master-and-slave)

----

## DNS

### Basics

DNS - Domain Name Service

Translates between machine names and IP.
Two main types:

- Forward (domain to IP translation)
- Reverse (IP to domain translation)

### Terminology

#### Zone

- A collection of hostnames and their IPs

#### Namserver

- The server which responds to DNS queries. A question could be "Give me the IP of "grussell.org".

#### Authoritative Nameserver

- The server which has all the information for a zone stored locally.

#### Recursive Name server

- If the nameserver is not authoritative for a zone, it is willing to go and ask other nameservers until it has asked an authoritative nameserver for the answer on your behalf. It then tells you the answer to your query.

#### Resolver

- The part of an OS which sends the DNS questions to nameservers. It’s a library which other programs will use. For instance, “ping grussell.org” would ask the resolver to “resolve” grussell.org. It goes on to ask a nameserver for the answer.

#### Delegation

- Sometimes a server does not know how to answer a query, but knows a server that can. The process of delegation effectively says that another server is delegated to answer your query, and you need to speak to them instead.

#### Resource Record (RR)

- Part of an answer to a query. An answer could be the IP for grussell.org, but there are other resource records (e.g. for email delivery and delegation).

### WHOIS

When you register a domain, you have to give information to the registrar. This includes a contact name, address, and other contact details. You also have to give at least 2 authoritative nameservers.

```bash
$ whois napier.ac.uk

Registered For:
Napier University

Servers:
dns0.napier.ac.uk 146.176.1.5
dns1.napier.ac.uk 146.176.2.5

Registrant Address:
Napier University
C&IT
219 Colinton Road~Edinburgh
```

### DNS Distributed Database

By way of an example, consider the following:

`$ ping www.napier.ac.uk`

The resolver in Linux is asked to find out the ip for www.napier.ac.uk. The resolver contacts it's local recursive nameserver and send it a DNS query. The resource record needed to translate a domain name into an IP is known as an "A" record.

### Manual lookups

If we are running our own DNS servers, or just having trouble making the resolver work, we can make our own queries using "dig".

```bash
$ whois napier.ac.uk

Domain servers in listed order:

dns0.napier.ac.uk 146.176.1.5
dns1.napier.ac.uk 146.176.2.5
```

```bash
$ dig www.napier.ac.uk @dns0.napier.ac.uk

www.napier.ac.uk.       86400   IN  A   146.176.222.174

;; AUTHORITY SECTION:
napier.ac.uk.           86400   IN  NS  dns0.napier.ac.uk.
napier.ac.uk.           86400   IN  NS  dns1.napier.ac.uk.

;; ADDITIONAL SECTION:
dns0.napier.ac.uk.      86400   IN  A   146.176.1.5
dns1.napier.ac.uk.      86400   IN  A   146.176.2.5
```

### Reverse Lookup

Reverse is working out that given 146.176.222.174, the host is www.napier.ac.uk. A special domain name is used for IP Domain Name translation. The domain is the IP in reverse, ending with "IN-ADDR.ARPA". You need to take the first 3 elements of the IP first to find the right server, then query that server with the full IP. The resource record of reverse DNS is PTR.

```bash
> dig 222.176.146.IN-ADDR.ARPA

…
;; AUTHORITY SECTION:
222.176.146.IN-ADDR.ARPA. 86400 IN SOA dns0.napier.ac.uk.
root.central.napier.ac.uk. 200808271 28800 7200 604800 86400

> dig 174.222.176.146.IN-ADDR.ARPA @dns0.napier.ac.uk -t any

…
;; ANSWER SECTION:
174.222.176.146.IN-ADDR.ARPA. 86400 IN PTR www.napier.ac.uk.
```

----

## Linux DNS configuration

### Resolver in Linux

You know how DNS forward and reverse works. But you do not have to do all the repeated queries yourself. The resolver looks after all the lookups.

As an example, consider a command.

```bash
$ ping www.linuxzoo.net
```

> The computer needs to find the IP number...

### /etc/hosts

This file is the simplest lookup. It is called the "host" resolution. The file has lines like:

`127.0.0.1      localhost.localdomain localhost`

It is IP, then hostname, then aliases for the host. Its fast and simple, but only lists machines you edit yourself into the file. It is good for "Kickstarting" finding key machines.

```bash
$ cat /etc/resolv.conf

search linuxzoo.net net
nameserver 10.200.0.1
```

### Your own nameserver

You might want to run your own nameserver if:

- You perform lookups frequently and want to cache the queries locally.
- You want to query the root servers directly without having to talk via the nameserver.
- You want to add your own entries to DNS.
  - You run your own domain and want to control your DNS entries directly.
  - you have local IPs and want to name them on your own network.

### Nameserver daemons

The most popular is "named". It is installed on the UML simulations and it is part of the bind9 distribution. It is popular, but other services are available.

- Common systems are often targetting for hacking attacks.
- NAMED is often cited as a security problem.
- It needs to be patched often.
- It should be secured using addition security technology.
  - It can be run in a chroot.
  - It can use SELinux if available.
  - It can use both! In our labs we will use SELinux security.

### What is a chroot

Many Linux services can be run "chroot". This gives a new "/" directory just for that service. It contains only minimum files and directories and the contents of which are owned by a different user than the one who owns the service. The service should not be executed as root. Service runs as a user who does nothing else but run that service. Hack the service and you are stuck in a directory with little contents, you can change very little, with a user which can do nothing... if possible, always run services in a chroot.

### SELinux protection

In our experiments we will not be using a chroot for additional security. Instead we will use SELinux. This gives the kernel a set of rules which named must obey, including what files can be opened and what sort of network connections can be made. Fortunately this is all pre-configured in Fedora and thus completely invisible to us as administrators.

### RNDC

RNDC allows you to administer NAMED remotely. Obviously this has to happen with some security. RNDC uses signed key to validate its security credentials. In a non-chroot solution this needs only to be stored in `/etc/rndc.key`. If you are using a chroot it must also be copied to `/var/etc/rndc.key`.

### Generate the key

In a normal installation, you should generate your own key. In linuxzoo, you get the key generated automatically. This is a good thing, as generating the key in linuxzoo turns out to be problematic. DON'T.

However, if you want to generate your own key then:

```bash
$ rndc-confgen –a –b 128 –r keyboard
```

> -b 128 – Sets the bits to 128 (fast but weak)
> -r keyboard – Random keys require “entropy”. Normally done with /dev/random, but in UML this does not work well. This option asks you to type randomly for a while, and use your keyboard rhythm to generate the random number!
> The only time you want to do this in linuxzoo is if you deleted the key file!

### Master and slave

There are two distinct types of zone. Master; has the zone definitions and you can edit that information if you wish. Slave; Copies the zone definition automatically from the master. Their copy is read only, so you cannot edit the records on a slave.

Slave nameservers are needed to give DNS higher reliability and redundancy. You edit on a master and the change is copied to all your slaves. Slave configuration is not considered further here. The master is often called a PRIMARY, and any slaves called SECONDARIES. These names are badly abused, so stick with master/slave.

```bash
zone "." IN {
    type hint;
    file "named.ca";
};

# This tells the daemon to use the root servers listed in named.ca 
# to resolve things not solved by other entries. This can be 
# considered the “default”

options {
    directory "/var/named";
    forward only;
};

# Nothing exciting in this part.
# Note that in linuxzoo, DNS requests to the roots
# (or anywhere else) are intercepted my the linuxzoo
# filewall and redirected to 10.200.0.1.
# This keeps the load on the root servers down, and
# makes it harder for people to use linuxzoo to hack
# the planet…
# Also allows my name service to falsify records –
# needed to make things work right in the UMLs.

zone "localhost" IN {
    type master;
    file "localhost.zone";
    allow-update { none; };
};

# The file localhost.zone gives forward resolving for the domain
# “localhost”.

zone "0.0.127.in-addr.arpa" IN {
    type master;
    file "named.local";
    allow-update { none; };
};

# The named.local file give reverse lookups for the 127.0.0.0/24 IP
# range.
```

