# Networked services 1.2

> 27/11/2019

----

- [Networked services 1.2](#networked-services-12)
  - [End System Networking](#end-system-networking)
    - [Linux Networking](#linux-networking)
    - [Default networking](#default-networking)
      - [Localhost](#localhost)
      - [The local host network device](#the-local-host-network-device)
    - [The network device](#the-network-device)
    - [Ethernet Errors](#ethernet-errors)
    - [Interface selection](#interface-selection)
  - [Linux as a Router](#linux-as-a-router)
    - [Configuration](#configuration)
    - [The netmask](#the-netmask)
    - [VLSM](#vlsm)
    - [VLSM for minimum hosts](#vlsm-for-minimum-hosts)
      - [Broken VLSM](#broken-vlsm)
    - [P2P netmask](#p2p-netmask)

----

## End System Networking

### Linux Networking

Linux is a capable networking platform as it runs many server applications. So it is often seen as a prime platform for server applications. It has extensive level 2 and level 3 networking support. It supports multiple netowrking connections.

In this course the old network commands, such as ifconfig and route, are deprecated. They may be removed from linux distributions at any time. This has been replaced by "IP" command.

### Default networking

Linux is a system that needs networking to work correctly. Even a system with no network has networking. The basic network is the loopback network. Every computer has an IP on the loopback network named localhost.

> telnet localhost
> telnet 127.0.0.1
> ping localhost

#### Localhost

> IP = 127.0.0.1

It operates as a true network and anything which can be done on a network in linux can operate on a localhost network.  Linux operates a priority networking system, and localhost has the highest priority. If a packet can be delivered using localhost then it will always be delivered with localhost.

#### The local host network device

"lo" is often thought of as a localhost network device. It is rarely actually implemented as a /dev device. However, all commands which expect a network device will take a lo as a device name. it is handled internally in the kernel.

```bash
$ ip link show lo

1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue
state UNKNOWN mode DEFAULT
link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
```

- LOOPBACK - It’s a loopback device.
- UP – The network is running at layer 2
- LOWER_UP – Active at layer 1
- qdisk – Queueing discipline – How queued things are processed

### The network device

In many systems `/dev/eth*` is the ethernet network device. In such systems with only one network connection, /dev/eth0 is the standard device name. Some distributions are sometimes renaming eth0..n to reflect the hardware bus number of the device.

A basic network needs:

- IP number of the host
- Netmask for the network
- Gateway IP for the gateway
- Broadcast address

The modern way to specify an IPv4 is the normal IP
number and a /n value informing you of the netmask.

`10.0.1.20/24`

This indicates:

- An IP of 10.0.1.20
- A netmask of the first 24 bits (255.255.255.0)
- Sensibly a broadcast of 10.0.1.255
- Sensibly a gateway of 10.0.1.254

```bash
$ ip link show ens3
2: ens3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc
pfifo_fast state UP mode DEFAULT qlen 1000
link/ether 00:0c:11:00:13:90 brd ff:ff:ff:ff:ff:ff
```

- At layer 2, it supports broadcast and multicast.
- Queuing defaults to a prioritised fifo queuing discipline.
- The mac address is 00:0c:11:00:13:90

```bash
$ ip addr show ens3

2: ens3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc
pfifo_fast state UP qlen 1000
link/ether 00:0c:11:00:13:90 brd ff:ff:ff:ff:ff:ff
inet 10.0.19.17/29 brd 10.0.19.23 scope global
dynamic ens3
valid_lft 863827sec preferred_lft 863827sec
inet6 fe80::20c:11ff:fe00:1390/64 scope link
valid_lft forever preferred_lft forever
```

```bash
$ ip –s link show ens3

2...
RX: bytes packets errors dropped overrun mcast
44073 425 0 0 0 0
TX: bytes packets errors dropped carrier collsns
71632 336 0 0 0 0
```

### Ethernet Errors

Ethernet errors are difficult to find out the exact meanings, but is likely that:

- Errors – CRC Error in packet
- Dropped – Kernel buffers overflowed
- Overruns – Card buffer overflowed
- Frame – Frame length not a multiple of 8 bits
- Carrier – Probably a fault in the card
- Collisions – tx collided with another frame

### Interface selection

The `ip` command describes how each devicxe should be used. The selection of the interface, and the rules as to what interface is used for each packet, are stored in routing table. Linux has an advanced rule-based routing table. It is possible to have a large number of routing tables.

```bash
$ ip rule show

0: from all lookup local
32766: from all lookup main
32767: from all lookup default
```

> Rules point to programs, which are like subroutines in a program.
> The number is the priority.
> In this case table local is first, then main, then default. If the network packet is handled in a particular table, it is not passed on to any other tables. 

```bash
$ ip route show table local

broadcast 10.0.19.16 dev ens3 proto kernel scope link src 10.0.19.17
local 10.0.19.17 dev ens3 proto kernel scope host src 10.0.19.17
broadcast 10.0.19.23 dev ens3 proto kernel scope link src 10.0.19.17
broadcast 127.0.0.0 dev lo proto kernel scope link src 127.0.0.1
local 127.0.0.0/8 dev lo proto kernel scope host src 127.0.0.1
local 127.0.0.1 dev lo proto kernel scope host src 127.0.0.1
broadcast 127.255.255.255 dev lo proto kernel scope link src 127.0.0.1
```

> All packets are tested on the local table first.
> If a packet is handled using what we know about a link, then make the obvious choice.

```bash
$ ip route show table main

default via 10.0.19.22 dev ens3 proto static metric 1024
10.0.19.16/29 dev ens3 proto kernel scope link src
10.0.19.17
```

> For an end network PC, packets are either for the local network or must be forwarded to the gateway. 
> Rules move from most specific to least specific.
> Destination in 10.0.19.16/29, send directly via ens3
> Other detination?: ask 10.0.19.22 to forward the packet.

----

## Linux as a Router

If linux has more than one connection, it can perform layer 3 routing just like a cisco router. Cisco routers often have only 2 or 3 network connections and it is easy to build a PC to replicate this. Cisco argues that their routers are far superior.

Physically, Cisco routers have ASICs that make routing fast, with various hardware to cache decisions and process data. Physical routers may need other things, like services, firewalls, IDS and IPS, and advanced traffic management features.

### Configuration

Multiple networks are no different from single network configurations. You need "ip address" for each interface. You need a route for each interface and you also need one default route.

Adding an IP address to a interface:

```bash
$ ip addr add 10.0.50.10/24 broadcast 10.0.50.255 dev eth0
$ ip route append 10.0.50.0/24 dev eth0
$ ip addr add 10.0.1.254/24 broadcast 10.0.1.255 dev eth1
$ ip route append 10.0.1.0/24 dev eth1
$ ip route append default via 10.0.50.254
```

```bash
$ ip route show

10.0.50.0/24 dev eth0 scope link
10.0.1.0/24 dev eth1 scope link
default via 10.0.50.254 dev eth0
```

### The netmask

- The netmask can be any size from /0 to /32.
- Perhaps you considered only /8, /16, /24 masks.
- These are fixed-length masks, matching the IP type (like Class A, B, etc).
- Complex networks use variable-length subnet masks.

### VLSM

VLSM: "Variable Length Subnet Masks"

Used to subdivide the host part of the network into smaller pieces. Each subdivision has it's own network. So if you need to run 2 networks but only have 10.1.1.0/24, you can create 2 networks as:

- 10.1.1.0/25
- 10.1.1.128/25

Remember the first and last host is reserved for "network" and "broadcast". Thus you cannot use 10.1.1.0, 10.1.1.127 or 10.1.1.128 for host addresses.

VLSM is borrowing bits. A problem may be that you need to split a network into 5 smaller networks. You cannot split a network into a number thta is not a power of 2, so 8 networks will need to be created.

8 needs three bits in binary (000-111) is 8 combinations. So borrow 3 bits from /24 to make it /27. The new network numbers are:
- | -
--- | ---
10.10.10.0/27 | 10.10.10.32/27
10.10.10.64/27 | 10.10.10.96/27
10.10.10.128/27 | 10.10.10.160/27
10.10.10.192/27 | 10.10.10.224/27

### VLSM for minimum hosts

Sometimes you have a problem that states that you need n hosts. Consider the example of 10.1.1.0/24, where you need to divide your network into as many subnets as possible, where each subnet can hold at least 10 hosts. Increase 10 by 2, then increase to the next power of 2. Making it 16. 16 needs 4 bits (0000-1111 is 16 combinations) Take 32-4, giving 28, network is 10.1.1.0/28.

#### Broken VLSM

Some Legacy systems don't understand VLSM. Sometimes called the "subnet zero problem". This leads to 2 points of confusion, concerning the first and last network. Take car with legacy systems such as RIP.

### P2P netmask

A point to point network is a little weird.

- 10.0.0.14/32
- Netmask 255.255.255.255
- Broadcast 10.0.0.255
- Gateway is likely to still be 10.0.0.254

The gateway IP can be reused multiple times ona P2P network without problems.

