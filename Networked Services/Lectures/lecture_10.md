# Networked Services - lecture 10

> Joe L, 40417692

----

## Cache Poisoning

In 2008 there were plenty of security issues. One of the big ones was to do with DNS Cache Poisoning. Also known as the kaminsky DNS Vulnerability. A easy-to-read summary is at: http://www.unixwiz.net/techtips/iguide-kaminsky-dnsvuln.html. As you know, your DNS queries are probably cached in your ISP Nameserver. DNS Queries themselves are usually just a single packet, and the reply is probably a single UDP packet too.

## Messing up the cache

Messing up the cache. If you know that the nameserver had just sent a query for "linuxzoo.net", you could send a forged reply BEFORE the real reply was sent. In the forgery you could put in your own NS, A records, or glue. If your reply was recieved before the real one, then the real reply would be ignored. So a hacker asks a nameserver to look up linuxzoo.net, then fires in a forged reply.

## Transaction ID

The people who come up with DNS must have thought there would be a problem, so put in a Transaction ID in each query. The ID of the query must match the ID in the reply in order for it to be accepted. So to fake a reply you have to produce the right ID.

### Faking the ID

There are 2 approaches to this:

- On some nameservers the ID is simlpy incremented by one each time. So a hacker get the system to lookup something involving an authoritive nameserver they control, capture the packet and its ID. Then they ask for “linuxzoo.net” and forge a reply with the ID+1 (and +2, +3, and a few more just in case they missed a query).
- Better systems use a random ID. To forge that you need to try and guess the ID.

### Guessing the ID

If youre lucky, you can send 50 forged guesses before the real answer is recieved. The ID is only 16 bits in size. 1 in 2^16/50 of being right. That's actually not bad odds. Previously the thought was that you only get one shot at this hack, as after that the right answer is in the cache so there is no more queries and thus no reply to forge...

## The twist

