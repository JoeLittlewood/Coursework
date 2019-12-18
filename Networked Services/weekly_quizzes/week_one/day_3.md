# Daily Quiz - Day 3

## Question 1

Consider the output shown below:

```bash
$ ip –s link show ens3
RX: bytes  packets  errors  dropped overrun mcast
    44073      425      2       0       0       0
TX: bytes  packets  errors  dropped carrier collsns
    71632      336      0       0       0       0
```

What do "errors" represent here?

> The correct answer is: Failure in the cyclic redundancy check

## Question 2

Given the network ip 146.176.166.32/28, how many hosts can be allocated IP numbers in that network?

> The correct answer is: 14

## Question 3

Consider the following:

```bash
$ ip route show table main
default via 10.0.32.22 dev ens3  proto static  metric 1024
10.0.32.16/29 dev ens3  proto kernel  scope link  src 10.0.19.17
10.0.32.0/23 dev ens2  proto kernel  scope link  src 10.0.19.17
```

If a packet needs to go to 10.0.33.1, what happens to it?

> The correct answer is: ens2

## Question 4

How does software-based routing compare to the ASIC routing you might find in a commercial router?

> The correct answer is: Software routing in linux should result in less dropped packets.

## Question 5

You are given a network IP 10.0.1.0/25. Partition this into blocks so that each block can hold 31 hosts. What is the network number of the second block?

> The correct answer is: 10.0.1.64/26

## Question 6

You have been given a network 12.0.0.0/24. You need to partition this into 3 networks holding 30 machines each, plus one network holding 14, plus 3 more networks to connect each router using /30 networks. What is the address of the last of the /30 networks?

> 3 networks @ 30 (round to 32) machines:
> 12.0.0.0/27
> 12.0.0.32/27
> 12.0.0.64/27
> 1 network @ 14 (round to 16) machines:
> 12.0.0.96/28
> 3 networks @ 4 machines:
> 12.0.0.112/30
> 12.0.0.116/30
> 12.0.0.120/30
> The correct answer is: 12.0.0.120/30

## Question 7

Consider the output shown below:

```bash
$ cat /proc/net/arp
IP address       HW type     Flags       HW address            Mask     Device
192.168.255.1    0x1         0x2         d4:ae:52:ad:9d:a5     *        eno1
192.168.255.5    0x1         0x2         00:0c:21:00:05:90     *        eno2
```

Also consider the following:

```bash
$ ip route show
default via 192.168.255.1 dev eno1  proto static  metric 100
192.168.255.0/24 dev eno1  proto kernel  scope link  src 192.168.255.6
```

Now if you were to do "ping 192.168.0.5", what changes would you expect to see in the arp table?

> The correct answer is: Nothing changing in the arp table

## Question 8

Consider the following output:

```bash
$ netstat -aln | grep :22
tcp        0      0 0.0.0.0:22            0.0.0.0:*             LISTEN
tcp        0      0 192.168.1.68:22       192.168.1.1:15238     ESTABLISHED
```

What does this indicate?

> The correct answers are: There is an sshd server waiting for connections, There is a currently active incoming ssh session