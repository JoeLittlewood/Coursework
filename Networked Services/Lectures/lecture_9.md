# Networked Services - lecture 9

> Joe L, 40417692

----

## SMTP

Email is sent between source and destination using a simple protocol. SMTP is the basic protocol used: `Simple Mail Transport Protocol`. SMTP deals mostly with simple email without attatchments. Atatchment emails uses ESMTP: `Extended or Enhanced SMTP`.

- Very simple protocol.
- Text based.
- You can send email using TELNET.
- Easy to forge an email...

### telnet grussell.org 25

```bash
Connected to grussell.org (10.10.5.5).
Escape character is '^]'.
220 grussell.org ESMTP Sendmail 8.12.11/8.12.11; Sun, 14
Nov 200819:01:01 GMT
> helo pc236b.napier.ac.uk
250 grussell.org Hello pc236b.napier.ac.uk [10.4.5.6],
pleased to meet you
> mail from: g.russell@napier.ac.uk
250 2.1.0 g.russell@napier.ac.uk … Sender ok
> rcpt to: me@grussell.org
250 2.1.5 me@grussell.org.. Recipient ok
> data
354 Enter mail, end with “.” on a line by itself
> From: "Santa" claws@northpole.com
> To: Gordon Russell <me@grussell.org>
> Date: Tue, 15 Jan 2008 16:02:43 -0500
> Subject: SMTP
Hello gordon.
I am Santa
> .
250 Ok: queued as 5555
> QUIT
221 Bye
```

## Envelope and Headers

The email information about from and to supplied using SMTP (except the contents of the DATA command) makes up what is known as the Message Envelope. The from, to, and other initial information in the email itself is known as the email header. The email instructions in the envelope DOES NOT have to match that in the email headers. This is useful when, for instance, dealing with email mailing lists: The envelope directs it to you, but the headers state it is actually to "the name of the email group".

Envelope says who the email is coming from and who it is being sent to. This can be anyone.

## Forged emails

Note that the envelope from was:

```bash
mail from: g.russell@napier.ac.uk
```

The data FROM was:

```bash
From: "Santa" claws@northpole.com
```

This is perfectly valid. It will be delivered.
The envelope is used through the delivery process, but it is discarded when it is finally delivered to the recipient. The final recipient cannot recover the information in the envelope. However, the headers can give useful information.

## Email headers

```bash
From g.russell@napier.ac.uk Sun Nov 15 11:12:21 2009
Received: from pc236b.napier.ac.uk [10.2.4.5]
by grussell.org (8.18.11) id PDQ666
Sun Nov 15 11:12:20 2008 -0000
Received: (gor@localhost)
by pc236b.napier.ac.uk (8.18.11) id LXY123
Sun Nov 15 11:12:16 2008 -0000
Date: Sun Nov 15 11:12:15 2008 -0000
From: g.russell@napier.ac.uk
To: me@grussell.org
Message-Id: <20041115111215.LXY123@pc236b.napier.ac.uk>
Subject: Wow

Message body is here. This is the message.
```

From "Date" down is the data added by the original sender. As the email moves from machine to machine, extra information is added to the data.

```bash
From g.russell@napier.ac.uk Sun Nov 15 11:12:21 2009
Received: from pc236b.napier.ac.uk [10.2.4.5]
by grussell.org (8.18.11) id PDQ666
Sun Nov 15 11:12:20 2008 -0000
Received: (gor@localhost)
by pc236b.napier.ac.uk (8.18.11) id LXY123
Sun Nov 15 11:12:16 2008 -0000
```

## Recieved

```bash
Received: from pc236b.napier.ac.uk [10.2.4.5]
by grussell.org (8.18.11) id PDQ666
Sun Nov 15 11:12:20 2008 -0000
Received: (gor@localhost)
by pc236b.napier.ac.uk (8.18.11) id LXY123
Sun Nov 15 11:12:16 2008 -0000
```

The first "hop" the email went through was at pc236b. The email was written by someone on that machine. Sendmail handled that hop, version 8.18.11.

```bash
Received: from pc236b.napier.ac.uk [10.2.4.5]
by grussell.org (8.18.11) id PDQ666
Sun Nov 15 11:12:20 2008 -0000
Received: (gor@localhost)
by pc236b.napier.ac.uk (8.18.11) id LXY123
Sun Nov 15 11:12:16 2008 -0000
```

The second "hop" the email went through was at grussell.org. It recieved the email from a server with ip 10.2.4.5. Pc236b and 10.2.4.5 should be the same thing. It took 4 seconds to be delivered between servers. Sendmail handled that hop, version 8.18.11

## Spotting forged emails

"You are looking for "funnies" in the headers.

- Dates and times that go backwards (taking into account the timezone).
- Hops which don't match up.
- Strange strings in the hop data.
- DATA and hop data which makes no sense.
- HOP routes which sound strange (like a bank delivering emails via yahoo).

## MX Records

- When you email “linuxzoo.net” the delivery process will look for a MX record for linuxzoo.net.
- If it doesn’t find one, email is directed to the A record.
- If it finds a MX record, email id delivered to the machine described in the MX record.
- This allows a whole domain to delegate email reception to one or more key servers, without having to have email servers on every single possible host.

----

## Linux email

## MUA, MTA and MDA

Email in linux is controlled via three tyoes of services:

1. MUA - Mail User Agent
2. MTA - Mail Transfer Agent
3. MDA - Mail Delivery Agent

### MUA

The email "client".
Users use the Mail User Agent to read and send emails. It takes email messages which have been delivered to a particular user's mailbox and displays them to the user. It takes new messages and passes these to the MTA for delivery. Examples include mutt, mail, and pine.

### MTA

The Mail Transfer Agent is the mail equivalent to an IP router. It takes messages given by an MUA or another MTA, and depending on the dlivery address passes them onto another MTA orto an MDA for delivery. Examples include sendmail, qmail, and postfix. Each MTA hop inserts its own data at the start of the email data section.

### MDA

The MDA or Mail Delivery Agent takes email messages from the MTA and delivers it to a particular user or to a MTA. Once delivered it is held until an MUA for that user reads the email. Ecamples include mail and procmail for local delivery, and sendmail itself for network delivery.

#### Example

Lets consider an example of g.russell@napier.ac.uk delivering an
email to me@grussell.org.

1. g.russell MUA on pc236b.napier.ac.uk send the email to the MTA (sendmail) on localhost.
2. The localhost MTA looks up the MX record for grussell.org.
3. The record indicates that email is delivered to grussell.org itself.
4. Sendmail uses its MDA (SMTP) agent to deliver the email to the MTA on grussell.org.
5. The MTA on grussell.org looks at the destination user (me) and decides that this is a local user.
6. It uses its local delivery agent MDA (procmail) to put this email into the user’s mailbox.
7. The email is stored in /var/spool/mail/me.
8. Next time “me” logs into grussell.org, the email will be waiting for him.
