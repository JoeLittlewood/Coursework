# DNS lab

## sillynet.zone

```bash
[root@host-5-105 named]# cat sillynet.zone
$TTL 1D
@       IN SOA  @ rname.invalid.  (
                                        0       ; serial
                                        1D      ; refresh
                                        1H      ; retry
                                        1W      ; expire
                                        3H )    ; minimum
        NS      @
        A       12.0.0.20
www     A       12.0.0.30
```

## sillynet.rev

```bash
[root@host-5-105 named]# cat sillynet.rev
$TTL 1D
@       IN SOA  @ rname.invalid. (
                                        0       ; serial
                                        1D      ; refresh
                                        1H      ; retry
                                        1W      ; expire
                                        3H )    ; minimum
        NS      sillynet.net.

20      IN      PTR     sillynet.net.
30      IN      PTR     www.sillynet.net.
```

## advanced.zone

```bash
[root@host-5-105 named]# cat advanced.zone
$TTL 1D
@       IN SOA  @ me.advanced.com.  (
                                        0       ; serial
                                        1D      ; refresh
                                        1H      ; retry
                                        1W      ; expire
                                        3H )    ; minimum
        NS      @

        A       172.16.1.1
        MX      10      mail
        MX      20      mail.offsite.com.
www     A       172.16.1.10
        A       172.16.1.11
        A       172.16.1.12
mail    A       172.16.1.1
```

## advanced.rev

```bash
[root@host-5-105 named]# cat advanced.rev
$TTL 1D
@       IN SOA  @ me (
                                        0       ; serial
                                        1D      ; refresh
                                        1H      ; retry
                                        1W      ; expire
                                        3H )    ; minimum
        NS      sillynet.net.

1       PTR     advanced.com.
10      PTR     www.advanced.com.
11      PTR     www.advanced.com.
12      PTR     www.advanced.com.
```

command to start named.conf:

`systemctl reload named.service`

command to diagnose errors:

`systemctl -l status named.service`
