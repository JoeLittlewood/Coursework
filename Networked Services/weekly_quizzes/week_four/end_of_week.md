# End of week quiz 4

## Question 1

Consider the following email and its associated headers.

```bash
From user@gmail.com Sun Nov 15 11:12:30 2018
Received: from freemail.ru [160.150.1.4]
   by gmail.com (8.22.15) id PDQ666
   Sun Nov 15 11:12:21 2018 -0000
Received: (payments@hmrc.gov.uk)
   by host4454.hmrc.gov.uk (8.22.11) id LXY123
   Sun Nov 15 21:12:00 2018 +1000
Date: Sun Nov 15 11:12:21 2018
From: payments@hmrc.gov.uk
To: user@gmail.com
Message-Id: <20181115111215.LXY123@hmrc345677111>
Subject: You are overdue for your tax
You have been detected buying ripple currency, making a
profit, and not declaring this as income. Please click the
link below and supply a credit card to make the payment
immediately
http://hmrc.gov.uk@thegardenshop.co.uk/finaldemand.html

```

Discuss the validity of this email in terms of the its headers.

> There is a mismatch between hop 1 and hop2. Hop1 could be plausible for HMRC, but the email actually appears to originate from a free email server in russia, and suggests the first hop might have been inserted by the original sender. It is also unclear why HMRC emails might need to traverse such a far away timezone.

## Question 2

In terms of email delivery, how does an MTA node know where to send an email? In your explanation, you should use the following example:

Email envelope:

helo host1.com
mail from: me@host2.com
rcpt to: me@host3.com

> As the rept to is host3.com, the MTA would look up the MX record of host3.com, and try the entries from lowest priority to highest. For each entry, the hostname could be translated from the MX record into an A record, and then the email would be sent there. If there were no MX records, then the A record of host3.com would be used instead.

## Question 3

Your /etc/aliases file has been updated by your junior aministrator, but it does not seem to be working correctly. When an email is sent to  "group", the email is rejected with an error.

```bash
test: gordon,andrew@gmail.com
group: test,brian
group2: /dev/null
```

Discuss the most likely reason why the error may be occurring.

> Maybe the junior has not yet rebuild the aliases.db file by running newaliases?

## Question 4

Consider the following scenario

```bash
$ cat /etc/aliases
email1: jim,john
brian: peter,email1
$ cat /home/jim/.forward
\brian
```

There is no .forward defined for either john or peter.

> Email to email1 would go to both jim and john, but jim has a .forward for brian. As brian is escaped as \brian, no alias lookup will take place and instead email will be delivered as if brian is a local user.
> In short, the email will go to john and brian.

## Question 5

In a sendmail configuration for mysite.net, you are aware of the following genericstable information

```bash
bill    bill@asecuritysite.com
brain brian@napier.ac.uk
```

Then bill sends email out via this server, what happens?

> As the email leaves the server, the from address is rewritten from bill@mysite.net to bill@asecuritysite.com

## Question 6

For fighting email spam, a company as set up a database of the domain names associated with emails containing fake news articles. The intention is that domains on the list should be blocked from sending emails. Discuss the effectiveness of this idea.

> As domain and hostnames can be easily faked, this would only be useful if the IP number of the sender also matched the A record of that domain's email server, or is somehow validated in some other way such as SPF. Otherwise the spammers would just randomly choose domain names, and innocent domain owners could be blocked.

## Question 7

A company is concerned that social engineering might be employed to obtain passwords from employees. Briefly discuss 2 possible options in tackling or mitigating this issue.

1. Training for users
2. Passwords based on biometrics
3. logins based on something other than passwords
4. two factor logins
5. login anomaly detection, e.g. spotting logins from new locations.
6. Social engineering monitoring to detect when staff discuss things which may result in them being targeted for attacks.

## Question 8

In a Denial of Service attack, discuss how an attack multiplier works and why it is important to perform an effective attack.

> An attack multiplier increases the traffic size in comparison to the original attack traffic. So, if an attacker sends a 10 byte message, the multiplier would be 100 if the attack becomes an 1000 byte message by the time it arrives at the target.
> Multipliers allow sources with bandwidth much lower than the target to perform an effective attack.

## Question 9

Discuss the risks involved in keeping a production server up to date with the latest patches?

> It is possible that patches will stop the server working properly, leading to server down time. It is also possible that the servers need to be rebooted for the patches to take effect, which again can lead to downtime due to patching issues, as well as machines which may have problems which only come to light when their power is cycled (such as hardware faults or a reliance on non-persistent data).