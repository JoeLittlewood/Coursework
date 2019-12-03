# Networked Services - lecture 5

> Joe L, 40417692

----

- [Networked Services - lecture 5](#networked-services---lecture-5)
  - [Essential Firewalls](#essential-firewalls)
  - [Corporate Firewalls](#corporate-firewalls)
  - [Linux Firewalls](#linux-firewalls)
  - [Packet Information](#packet-information)
    - [IP](#ip)
    - [TCP](#tcp)
  - [IPtables](#iptables)
  - [Chains](#chains)
    - [Chain names](#chain-names)
  - [Filter table](#filter-table)
  - [A chain](#a-chain)
  - [Tests](#tests)
  - [Actions](#actions)
  - [Some tests:](#some-tests)
  - [Default Policy](#default-policy)
    - [Setting the policy](#setting-the-policy)
  - [Editing Firewalls](#editing-firewalls)
- [Stateful Firewalls](#stateful-firewalls)
  - [SSH server example](#ssh-server-example)
  - [SSH client example](#ssh-client-example)
  - [sport and dport](#sport-and-dport)
  - [Stateful Rules](#stateful-rules)
  - [Stateful Rules](#stateful-rules-1)
  - [/proc/net/nf_conntrack](#procnetnfconntrack)
  - [IPtable rules based on network state](#iptable-rules-based-on-network-state)
  - [DROP or REJECT](#drop-or-reject)
  - [Basic client machine](#basic-client-machine)
  - [Add a rule to permit ping:](#add-a-rule-to-permit-ping)
  - [Rate Limiting](#rate-limiting)
  - [Add a rule to permit safe ping](#add-a-rule-to-permit-safe-ping)
  - [Monitor safe ping](#monitor-safe-ping)
  - [Impact of Policy DROP and ACCEPT](#impact-of-policy-drop-and-accept)

----

## Essential Firewalls

Firewalls are the implementation of Management Policy plus proactive security methods. Management Policy can include:

- Network services allowed to run and under what conditions.
- Client access to external resources.
- Quality of Service.
- Security and maintaining availability.

## Corporate Firewalls

- Cisco ASA
- Cisco router ACLs
- Linux Router iptables

- ASA syntax is strange, yet ASA solutions are popular!
- ACLs are weak for policy implementations.
- iptables is powerful but uncommon.

## Linux Firewalls

Security issues which Linux firewalls can deal with:

- Denial of service
- Differences between external and internal users
- Hiding local-only services
- Traffic management
- Virus and hacking protection
- Implementing management policy

Rules are needed in terms of packets arriving, leaving and passing through.

## Packet Information

### IP

Decisions can be made about packets based on their IP header:

- Packets from 10.0.0.1 are to be trusted
- Packets sent to 10.1.1.1 should be blocked
- ICMP protocol packets should be blocked
- etc

### TCP

Decisions can be made about TCP based on their TCP header:

- Packets sent to port 80 (http requests) should be allowed
- Packets sent from port 57890 should be blocked
- SYN packets with FIN (an invalid combination) should be blocked.
- etc.

## IPtables 

Since Kernal 2.4, the standard firewall configuration is iptables. It implements its rules through many "tables":

- Filter – handles standard “firewall” things
- NAT – rewriting of source/destination IPs
- Mangle – specialised hacking of packet info
- RAW – low-level modifications to packets

Most firewalls only need to be involved with the filter table.

## Chains

Within each table is a number of chains. Think of each table as continuing different types of rules you might want to use. Think of the chains as defining when a packet will have those rules applied to them. Some packets only go to some chains and not others. 

### Chain names

Some chain names you might see are

- PREROUTING
- INPUT
- OUTPUT
- FORWARD
- POSTROUTING

## Filter table

In the filter table a packet will only go through one chain. Packets created within the computer go through OUTPUT. Packets which need to be routed from one eth device to another eth device go through FORWARD. Packets recieved by the computer for processing locally go through INPUT.

## A chain

Each chain is made up of zero or more rules. A rule is a set of tests and an action. If the tests are all true then the action is performed. If the tests are all true then the action is performed. If a test is partially or completely false then the next rule is looked at instead.

## Tests

Each rule has zero or more tests. There are many tests possible, such as:

- Is this TCP?
- Is this from 10.0.0.5?
- Is this from por 22?
- Is this going to port 23?
- Is this going to 50.0.0.1?
- Am I recieving packets faster than 10 per second?
- Which interface is it going out on?

## Actions

If all tests are true then the action is carried out. Some actions are terminating, meaning that once they are done no more rules are looked at. A few actions are non-terminating. This is useful if you want to say print a message if the test is true, but continue on with the next rule anyway.

Example actions are:

- DROP – delete a packet immediately and terminate
- ACCEPT – the packet is good and terminate
- REJECT – delete the packet and terminate, but send back an ICMP message to the sender
- LOG – print to syslog a message and move onto the next rule.

## Some tests:

```bash
- Is this TCP ?                 -p tcp
- Is this from 10.0.0.5?        -s 10.0.0.5
- Is this from port 22?         --sport 22
- Is this going to port 23?     --dport 23
- Is this going to ip 50.0.0.1? -d 50.0.0.1
- Is this going out on eth0?    -o eth0
- Is this coming in from eth0?  -i eth0
```

## Default Policy

With default "ACCEPT", all packet are accepted unless you have a rule to DROP or REJECT them.

With defualt "DROP", all packets are DROPPED unless you have a rule to ACCEPT them.

### Setting the policy

```bash
$ iptables –P INPUT ACCEPT 
$ iptables –P OUTPUT ACCEPT
$ iptables –P FORWARD DROP
```

> This is a typical unsecured machine configuration. Typical machines only have 1 eth device, so don’t forward. Otherwise, all packets are allowed.
> Better to have INPUT DROP and have the ACCEPT rules, but remember INPUT DROP without rules then drops everything!

```bash
$ iptables –P INPUT DROP
```

## Editing Firewalls

ip table does allow you to edit firewalls dynamically, however this is very problematic and difficult. Instead, I recommend putting all your rules in a file and running that file to change the firewall. This allows you to use your favourite editor to write the firewall. At the start of the file, delete all current firewall rules in each table using "-F".

```bash
$ touch firewall
$ chmod +x firewall
$ vi firewall
/sbin/iptables -F INPUT
/sbin/iptables -F OUTPUT
/sbin/iptables -F FORWARD

# Set the default policies for the chains
/sbin/iptables -P INPUT DROP
/sbin/iptables -P OUTPUT ACCEPT
/sbin/iptables -P FORWARD DROP
```

To load these rules do

```bash
$ ./firewall
```

However, don’t do that yet. The default is DROP for INPUT. Without more rules you will be kicked out of the server never to return…
This is bad if the server is 5 minutes walk away. But if it is 500miles away you are in trouble!
This type of firewall is INGRESS ONLY. No rules for going out (OUTPUT/EGRESS). Kind of like the XP firewall…

----

# Stateful Firewalls

## SSH server example

- Allow Someone to SSH and TELNET into your machine.

```bash
# Standard stateless INGRESS FILTER RULES, then
iptables –t FILTER –A INPUT –p tcp --dport 22 –j ACCEPT
iptables –A INPUT –p tcp --dport 23 –j ACCEPT
```

## SSH client example

- Allow local machine to SSH and TELNET to other machines:

```bash
# Standard stateless INGRESS FILTER RULES, then
iptables –t FILTER –A INPUT –p tcp --sport 22 –j ACCEPT
iptables –A INPUT –p tcp --sport 23 –j ACCEPT
```

- When you SSH elsewhere, your first packet goes out on the OUTPUT chain to dport 22 on that remote machine. However the reply comes FROM dport 22 on that remote machine to your computer via the INPUT change.

```bash
iptables –t FILTER –A INPUT –p tcp --sport 22 –j ACCEPT
```

So this rule intends to allow the reply to be ACCEPTed where it relates to someone on the local machine using SSh to connect to a remote machine. But a hacker from any machine could just send packets with an sport 22, and these would be accepted by the firewall even thoough they are unwanted. We really need a way of knowing a packet is part of a TCP stream we actually want...

## sport and dport

Server End

```bash
$ iptables –A INPUT –p tcp --dport 22 –j ACCEPT
```

Your End:

```bash
$ iptables –A INPUT –p tcp --sport 22 –j ACCEPT
```

## Stateful Rules

If you could find out what packets are the sort of a stream and which packets are not, then you could have rules to control the first packet.

- If packet 1 then check to see if the rules say it's okay.
- If packet 2 then it must have been okay, otherwise packet 1 would hav ebeen blocked.

Linux holds a state table of packets to allow such things to be monitored.

## Stateful Rules

You can add iptables rules to detect what state a packet is in. This feature used to be called "state", but now is known as "conntrack" or Connection Tracking. 

Tracking tests available include:

- NEW – never seen the stream before
- ESTABLISHED – traffic in both directions in the stream.
- RELATED – associated with an established stream but is actually a different stream. For instance an established FTP connection may transfer each file using a new stream (active connections). Each new connection is RELATED.
- INVALID – worrying and should probably be dropped!

## /proc/net/nf_conntrack

```bash
ipv4 2 tcp 6 431978 ESTABLISHED src=146.176.164.219 dst=146.176.166.41 sport=56749 dport=22 ...
```

Here for instance a TCP stream has exchanged SYN, so is ESTABLISHED..

```bash
ipv4 2 tcp 6 81 TIME_WAIT src=10.200.0.1 dst=10.200.0.19 sport=63040 dport=80 ...
```

Streams can end up in many states. TIME_WAIT means the stream is closed, but the table remembers closed connections for a time so that left-over retransmissions can be handled properly.

## IPtable rules based on network state

If a connection has been going a while...

```bash
$ iptables -A INPUT -m conntrack --ctstate RELATED, ESTABLISHED -j ACCEPT
```

but a new incoming connection to the local SSH server need to be allowed?

```bash
$ iptables –A INPUT –m conntrack --ctstate NEW –p tcp --dport 22 –j ACCEPT
```

## DROP or REJECT

- DROP just blocks the packet.
- REJECT blocks and also sends an ICMP message to the sender saying it is blocked.
- DROP gives nothing away, and a hacker finds it difficult to get useful information about your network if packets are dropped.
- REJECT gives away information about your firewall ruleset. With DROP and IP, where packets are lossy, some protocols may retransmit a packet which you have dropped thinking it has been lost. This means dealing with the same packet again and again. 
- A good rule: intranet traffic should be REJECT, internet traffic should be DROP.
- Note you can only ACCEPT or DROP in a policy, but you can REJECT in a rule.

Example:

Allow someone to SSH into your machine, provided their IP is 10.0.0.1.

```bash
# Standard stateful INGRESS FILTER RULES, then
iptables –A INPUT –p tcp --dport 22 –s 10.0.0.1 –j ACCEPT
```

Allow someone to SSH into your machine, provided their IP is between 10.0.0.1 and 10.0.0.255.

```bash
iptables –A INPUT –p tcp --dport 22 –s 10.0.0.1/24 –j ACCEPT
```

## Basic client machine

Allow local machine to SSH only to 10.0.0.1. You have been asked to use only the INPUT chain and leave the OUTPUT as ACCEPT. 

```bash
# Standard stateful INGRESS FILTER RULES, then BEFORE RELATED/ESTABLISHED
iptables –A INPUT –p tcp --sport ssh ! –s 10.0.0.1 –j DROP # exclamation mark means "not"
```

## Add a rule to permit ping:

```bash
# Add to the end of the file
iptables –A INPUT –p icmp --icmp-type echo-request –j ACCEPT
```

## Rate Limiting

- You can do statistics on connections and use that in the rules.
- The “limit” module allows you to make checks to see how times per second a particular rule is run.
- For instance, it is nice to handle PINGs, but if you were asked to handle too many they perhaps it is ok to ignore some of those?
- It uses the “limit” module, and the test is “--limit” and a rate, such as 3/second, 5/minute, etc.
- Exceeding the rate is FALSE, and within the limit is TRUE.

## Add a rule to permit safe ping

Anyone can ping this machine, but i will only respond if the ping requests are slower than 2 per second.

```bash
# Add to the end of the file, but before RELATED/ESTABLISHED
iptables –A INPUT –p icmp --icmp-type echo-request -m limit --limit 2/second –j ACCEPT
```

## Monitor safe ping

Anyone can ping this machine, but I will only respond if the ping requests are slower than 2 per second. Faster than that gets a logged message.

```bash
# Add to the end of the file, but before RELATED/ESTABLISHED.
iptables –A INPUT –p icmp --icmp-type echo-request -m limit --limit 2/second –j ACCEPT
iptables –A INPUT –p icmp --icmp-type echo-request –j LOG
```

## Impact of Policy DROP and ACCEPT

```bash
iptables -P INPUT ACCEPT
iptables –A INPUT –p icmp --icmp-type echo-request -m limit --limit 2/second –j ACCEPT
iptables –A INPUT –p icmp --icmp-type echo-request -m limit --limit 10/minute –j LOG
iptables -P INPUT ACCEPT
iptables –A INPUT –p icmp --icmp-type echo-request -m limit --limit 2/second –j ACCEPT
iptables –A INPUT –p icmp --icmp-type echo-request -m limit --limit 10/minute –j LOG
iptables –A INPUT –p icmp --icmp-type echo-request –j DROP
```

