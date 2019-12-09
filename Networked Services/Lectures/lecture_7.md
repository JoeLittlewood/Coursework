# Networked services - Lecture 7

> Joe L, 40417692

----

- [Networked services - Lecture 7](#networked-services---lecture-7)
  - [Apache](#apache)

----

## Apache

## Server architectures

In most designs of server, you either use:

- threading model
- forking model
- asynchronous architecture

A threaded model needs special OS support to provide lightweight threads.

Forking means that each new request which arrives is handeled by a whole process. This is the traditional Apache way.

Asynchronous. Some web servers exist with this model, where one process handles everything with complex IO code. Good for fast processing of simple web pages. See NGINX.

Hybrid - Using more than one design simultaneously.

### Traditinal forking model

```bash
StartServers            8
MinSpareServers         5
MaxSpareServers         10
MaxClients              768
MaxConnectionsPerChild  4000
```

### Worker threaded forking model

```bash
StartServers            2
MaxRequestWorkers       150
MinSpareThreads         25
MaxSpareThreads         75
ThreadsPerChild         25
MaxConnectionsPerChild  0
```

## Important files

```bash
/etc/httpd/conf/http.conf # The main conf file.
/etc/httpd/conf.d/*.conf # Where your configuration changes go.
```

> Remember when changing the configurations it is only reread on a server reload or restart.Errors and other details are logged by default in /var/log/httpd/ as access_log, error_log, as suexec.log.

## Reload or restart

Reload is the best option to use. With a reload, apache checks your configuration file, and switches to it only ifcontinues with no errors. if it has errors, it keeps using old configuration. This allows you to reconfigure a server with no downtime. Restart shuts down then starts the server.

> Look in the error log for help  (e.g. /var/log/httpd/error_log), or syslog (e.g. /var/log/messages).

Remember to use the service command for this:

```bash
systemctl start|stop|reload|restart|status httpd.service
```

You can easily make errors in the config file. You can check for errors using:

```bash
httpd -t
```

## Mimic a Browser

To understand how a server is running, it is sometimes useful to make requests at the keyboard of a server and see the results as text. Telnet can do this, so long as you have learned some basic HTTP commands.

The two important ones are:

```bash
- HEAD # Give information on a page.
- GET # Give me the whole page.
```

- In HTTP 1.1 we can use virtual hosts.
- This allows multiple hosts to share a single server.
- Each host has a different name.
- The name of the host you want to answer a query is given as part of a page request.
- This is only supported in HTTP 1.1 and beyond.

## VirtualHosts

- The sharing of a single IP to provide multiple hostnames is well supported in Apache.
- The part of the conf file which handles this is called <VirtualHost>
- Each part holds a list of hostnames it can handle
- The first host found in the file is always considered the default, so if no VirtualHost section matches the first block is done instead.

```bash
<VirtualHost *:80>
ServerAdmin me@grussell.org
DocumentRoot /home/gordon/public_html
ServerName grussell.org
ServerAlias www.grussell.org grussell.org.uk
ErrorLog logs/gr-error_log
CustomLog logs/gr-access_log combined
</VirtualHost>
```

## public_html

- Where apache runs on a server used by many different servers, it would be useful for each user to be able to build their own web pages which the server could serve.
- But the virtualhost configuration takes only a single document root, and each user has their own directories in /home.
- You could make the root /home
  - All of the files in /home would be accessible, not just web pages.
  - It’s a bit disgusting…
- Instead, apache supports web pages appearing in a users home directory, under the subdirectory public_html.

## public_html access

- Urls of the form
  - http://linuxzoo.net/~gordon/file.html
- Refer to
  - /home/gordon/public_html/file.html
- This feature must first be switched on in httpd.conf.
- To activate it, find the line
  - UserDir disable
- Then either delete the line, or put “#” (the comment character) in front of it.
- Then find the following line and delete the ‘#’ character.
  - #UserDir public_html
- Remember to reload the server.

## Linuxzoo tutorials

Each time you book a linuxzoo machine, you will likely get a different IP and hostname. Each time you come in, check your hostname with "hostname".

```bash
$ hostname
host-5-5.linuxzoo.net
```

In this example, virtual hosts vm-5-5.linuxzoo.net, as well as host-5-5 and web-5-5 will be proxied to your machine.

## web access from the prompt

The prompt is fast and convenient for admin purposes, but when you are debugging http sometimes "telnet" is not sufficient. There are a few other tools you can use at the prompt.

- elinks
- lwp-request
- wget

However, there is no simple replacement for actually using a real browser to check your pages.

```bash
$ elinks http://linuxzoo.net
```

## Copy http to your directory

```bash
lwp-request http://linuxzoo.net > file.html # The data is obtained and then printed to the screen. In this case that is redirected to file.html
wget http://linuxzoo.net
```

```bash
$ wget http://linuxzoo.net
--19:20:11-- http://linuxzoo.net/
Resolving linuxzoo.net... 146.176.166.1
Connecting to linuxzoo.net|146.176.166.1|:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 4785 (4.7K) [text/html]
Saving to: `index.html'
100%[=======================================>] 4,785 --.-K/s in 0s
19:20:11 (304 MB/s) - `index.html' saved [4785/4785]
```

## SELinux and Apache

SELinux secures apache, and SELinux security of files in public_html
is by default quite strong.

Check if SELinux allows files to be published from public_html by:

- getsebool httpd_read_user_content
- If this is 0 then publishing files is forbidden.

Set SELinux to allow public_html publishing using:

- setsebool -P httpd_read_user_content 1.
- This may take 20 or more seconds. Be patient.
- The setting will be forgotten if you get a new image in the linuxzoo interface.

SELinux requires the file security (shown by ls –Z) to be:

- unconfined_u:object_r:httpd_user_content_t:s0
- However this should happen automatically provided you create files in public_html
- You can set the type of say filename.html (but remember you should not have to) using:
  - chcon –t httpd_user_content_t filename.html

----

## mod_rewrite

## URL rewriting

A useful module in apache is mod_rewrite. This allows us to change URLs dynamically. This can be useful to, for example:

- Change URL of aliases in a domain so that they always give the name you want.
- Support directories and files being moved without breaking bookmarked URLs.
- Provide a veriety of proxying methods.

## URL parts.

URL:

– http://linuxzoo.net/mystuff/file.html

This is made up of:

- Protocol: “http”
- Hostname: “linuxzoo.net”
- Path: “/mystuff/file.html”

In URL rewriting, you often only get to operate on part of a URL in any one instruction, so take care you know which bit you want to use.

## Methods

- mod_rewrite has many functions…
- The key functions are:
  - RewriteCondition – an IF statement
  - RewriteRule – an action (doit) statement.
- These can be placed almost anywhere in the apache configuration files.
- We will concentrate on their use in VirtualHost areas of httpd.conf.
- To work, the area must also have: 
  - RewriteEngine on

## rewriteRule

Basic for of this rule is:

`RewriteRule URL-PATH New-PATH`

For instance, you have moved /dvd1.iso into subdirectory /dvd...

`RewriteRule /dvd1.iso /dvd/dvd1.iso`

The first parameter is a Regular Expression.
This is an "internal" rewrite. In this case only Apache knows the changed location, and from the browser's point of view the file appears to still be /dvd1.iso.

## Regular expressions

- The match comparison is a regular expression.
- Useful aspects of regular expressions include:
- Text matching:

Character | Description
--- | ---
. | Any single Character
[chars] | One of the characters in chars
[^chars] | None of the characters in chars

Quantifiers | Description
--- | ---
? | 0 or 1 of the preceding text
\* | 0 or N of the preceding text
\+ | 1 or N of the preceding text

Grouping

`(text)`

> A text group - Can mark the border of an alternative or for RHS reference as $N.

## Anchors and Escaping

Anchors:

^ | Start URL
--- | ---
$ | End of the URL

Escaping:

\char | Allows you to use a character as the “char”. For instance, \^ is the ^ character and not the start of the URL.
--- | ---

## Back references

$N corresponds to a group from the URL match.
For example, rewrite any URL ending in .txt to .html one could write:

```bash
RewriteRule     (.*)\.txt       $1.html
```

