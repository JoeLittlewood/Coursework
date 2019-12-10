# Networked Services - Lecture 8

> Joe L, 40417692

----

## Basic Authentication

Often you might want simple usernames and passwords to control access you parts of a website. There are many approaches for this. The easiest way is to use Basic Authentication. This, when required, asks the browser to ask for a username and password for accessing protected pages. The username and password is sent as clear text for every page request made by the browser.

Use for photos etc, do not use for more secure needs such as banking.

## .htaccess

The best way to control basic authentication is via an .htaccess file in the directory to protect. To allow this the <directory> definition which includes the directory to be protected must have:

`AllowOveride AuthConfig`

## Building a password file

You have to create a file with usernames and passwords. It is a good idea if this file is not one which someone can access via URL.

```bash
$ htpasswd -c /home/gordon/password andrew
New Password: ********
Retype New Password: ********
Adding password for user andrew
```

> -c is only the first time running the command, as this creates the file too. Miss out –c after the first run.

## .htaccess

```bash
AuthType Basic
AuthName "Restricted Files"
AuthUserFile /home/gordon/password
Require user andrew
```

Authtype Digest

- This is another option, which requests the passwords in an encrypted format. It is not as widely supported as Basic.

## The password file

The password file created is just a text file. As a tect file it does not scale well...

- As more users are added the file gets bigger.
- On every page request the file has to be parsed again.

There are other formats available using hashed files. These are faster to access but more complex to manage.

## Any valid user

Require user Andrew:

- Can be changed to

Require valid-user:

- In this way any user in the password file can access the directory.

## Groups

Just as in passwd users are also in groups, you can use the same idea for apache. Create a plain text file with the following format:

`Groupname: user1 user2 user3...`

If users gordon and andrew exists, and you want them to be known as group staff...
staff: gordon andrew.

## Add to .htaccess

```bash
AuthType Basic
AuthName "By Invitation Only"
AuthUserFile /home/gordon/password
AuthGroupFile /home/gordon/groups
Require group staff
```

## Basic auth problems

- Its simple protection.
- Passwords in the clear.
- Every request need the password file lookup
- Large numbers of users difficult to manage
- Not a good idea for commercial systems
  - Yet some big sites use it!
- However, users recognise it and understand it.

## Control by IP

.htaccess can offer more control than just Basic Authentication. You can also restrict access to directories by IP. To do this you need to use variations of the "require" directive.

- Require user gordon
- Require group staff
- Require all granted
- Require all denied
- Require ip 10.0.0.1
- Require host linuxzoo.net
- Require not ip 10 172.16 192.168.200

Multiple require statement can be combined together.

- The default is that ANY can be true to allow access.

Example:

- Stop 10.0.0.1 accessing a directory…
- Edit the .htaccess in that directory:

`Require not ip 10.0.0.1`

## Combining rules

By default the rules are combined together as any. So:

```bash
Require ip 10.0.0.1
Require ip 10.0.0.2
```

Is actually:

```bash
<RequireAny>
Require ip 10.0.0.1
Require ip 10.0.0.2
</RequireAny>
```

This may make statements easier to understand.

### Other methods

- RequireAny basically ORs the
- Other directives exist
  - RequireNone: None of the directives must succeed
  - RequireAll: All of the directives must succees

So to stop 10.0.0.1 and .2…

```bash
<RequireNone>
    Require ip 10.0.0.1
    Require ip 10.0.0.2
</RequireNone>
```

example:

Given a basic authentication definition, allow user gordon, or group magic, or anyone from IP 10.0.0.50:

```bash
<RequireAny>
    Require ip 10.0.0.50
    Require group magic
    Require user gordon
</RequireAny>
```

example 2:

Given a basic authentication definition, allow user gordon from 10.0.0.1, or user jim from IP 10.0.0.50:

```bash
<RequireAny>
    <RequireAll>
        Require ip 10.0.0.50
        Require user jim
    </RequireAll>
    <RequireAll>
        Require ip 10.0.0.1
        Require user gordon
    </RequireAll>
</RequireAny>
```

----

## Log analysis

## Logs

Apache produces two types of log files:

- Error logs - Useful for debugging
- Access Logs - Excellent for monitoring how your site is being used.
  - Fun for people who have hobby sites
  - Life or death if your business relies on the web site.

## Where are the logs

- Normally they go to /var/log/httpd/access_log and error_log. In a virtual host we set them to what we liked:

```bash
<virtualHost>
...
    ErrorLog logs/gr-error_log
    CustomLog logs/gr-access_log combined
</VirtualHost>
```

## Logging in /var/log/http access file

- The normally used log format is called "combined".
- It contains significant amounts of information about each page request.
- Specifically, the log format is:

`%h %l %u %t %r %>s %b Referrer UserAgent`

- h – IP of the client
- l – useless ident info
- u – username in basic authentication
- t – time of request
- r – the request itself
- s – The response code (e.g. 200 is a successful request)
- b – size of the response page
- Referrer – who the client things told it to come here
- User Agent – identification info of the browser.

## Analysing the log

The log is useful in itself for checking the proper function of the server. However, traffic analysis is also valuable. There are a number of tools available to do this. One of the best free ones is webaliser.

### Analysis

The summer is quiet for linuxzoo. Students are enthusiastic in October... After that it settles down to "kept busy".

