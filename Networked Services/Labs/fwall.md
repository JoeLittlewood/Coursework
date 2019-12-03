# firewall lab

## firewall file

```bash
#!/bin/bash
#
iptables -F INPUT
iptables -F OUTPUT
iptables -F FORWARD
iptables -P INPUT DROP
iptables -P OUTPUT ACCEPT
iptables -P FORWARD DROP


iptables -A INPUT -p icmp --icmp-type echo-request -m limit --limit 1/second -j ACCEPT
iptables -A INPUT -p icmp --icmp-type echo-request -j LOG
iptables -A INPUT -p icmp --icmp-type echo-request -j DROP



#
# Accept ongoing connections
iptables -A INPUT -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
#
# For your own safety, stop users logging in from other VMs
#
iptables -A INPUT -m conntrack --ctstate NEW -m tcp -p tcp --dport 22 ! -s 10.0.0.0/16 -j ACCEPT
iptables -A INPUT -m conntrack --ctstate NEW -m tcp -p tcp --dport 23 ! -s 10.0.0.0/16 -j ACCEPT

#
# Your changes go after here.
#
iptables -A INPUT -p tcp -i ens3 --dport 80 -j DROP
iptables -A INPUT -p tcp -s 20.0.0.0/24 -i ens3 -j DROP

iptables -A FORWARD -j REJECT
```

## firewall2 file

```bash
#!/bin/bash
#
iptables -F INPUT
iptables -F OUTPUT
iptables -F FORWARD
iptables -P INPUT DROP
iptables -P OUTPUT DROP
iptables -P FORWARD DROP
#


iptables -A INPUT -m conntrack --ctstate NEW,ESTABLISHED -p tcp --dport telnet ! -s 10.200.0.1 -j REJECT


#
iptables -A INPUT  -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
iptables -A OUTPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
#
# --- Put a rule here if you want to be inserting at the start of INPUT
#
# ---
#
# Make sure ssh and telnet stay working, and that users on
# other VMs cannot log in.
#
iptables -A INPUT -m conntrack --ctstate NEW -p tcp --dport ssh ! -s 10.0.0.0/16 -j ACCEPT
iptables -A INPUT -m conntrack --ctstate NEW -p tcp --dport telnet ! -s 10.0.0.0/16 -j ACCEPT
#

iptables -A OUTPUT -m conntrack --ctstate NEW -p tcp --dport 80 -d 10.200.0.1 -j ACCEPT

iptables -A FORWARD -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
iptables -A FORWARD -m conntrack --ctstate NEW -p tcp --dport 80 -d 192.168.1.5 -o eth9 -j ACCEPT
iptables -A FORWARD -m conntrack --ctstate NEW -p icmp --icmp-type echo-request -d 192.168.1.5 -o eth9 -j ACCEPT
```