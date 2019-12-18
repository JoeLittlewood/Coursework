# End of week quiz 3

## Question 1

The Apache web server uses by default a heavyweight forking process model. Other process models also exist. Reflect on the implications of switching to a process model which uses a lightweight threaded model in a single heavyweight process for Apache.

> Lightweight process models do not offer inter-thread memory protection, or other security measures which protect processes from each other. Thus errors or hacking from one thread could affect another. It does however offer the possibility of higher performance.

## Question 2

An apache configuration file currently has no mod_rewrite commands. The following is added to the correct virtual host area

RewriteEngine on
RewriteCond %{HTTP_HOST}  magic.org$ [NC]
RewriteRule .*            http://magic.uk/ [L,R=permanent]
What would the results be of handling the following URLs? Briefly explain your answers. You will score 0 if you do not include an explanation.

   a) http://magic.org.uk/test1.html 

   b) http://webmagic.ORG/test2.html 

> A) HOST does not match so no rewrite, B) everything matches due to NC.

## Question 3

Write a .htaccess file to stop 146.176.10.10 and any IPs in the range 10.0.1.0 to 10.0.1.255 from accessing your website.

```bash
<RequireAll>

require not ip 146.176.10.10

require not ip 10.0.1.0/24

</RequireAll>
```

## Question 4

Below is a line from a webserver logfile and relates to the virtual host linuxzoo.net:

70.227.105.100 - - [15/Oct/2008:04:45:29 +0100] "GET /here.html HTTP/1.1" 404 200 "http://linuxzoo.net/index.html" "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)"

What is (a) the error code, (b) the address of the client machine making the request, (c) the transfer size, and (d) the page requested.

> (a) 404
> (b) 70.227.105.100
> (c) 200
> (d) /here.html

## Question 5

Consider the following mod_rewrite rules:

RewriteEngine On

RewriteCond ${HTTP_HOST} linuxzoo.net

RewriteCond ${REQUEST_URI} test

RewriteRule (.*) http://host1.com/$1

RewriteRule /mine/(.*) http://host2.com/$1



What would happen if a browser request was processed by these rules, given the urls:

(a) http://www.linuxzoo.net/retest.html

(b) http://www.napier.ac.uk/test.html

Explain your answer or you will score 0.

> (a) Matches the first rewritecond, as there are no anchors. Similarly for condition 2. As both match the first rewriterule is done, redirecting the request to http://host1.com/retest.html
> (b) No match to first cond, but does match second cond. However, both conditions are ANDed together, so first rewriterule is passed over. Second rule does not match, so the original URL is left unchanged.

## Question 6

Discuss why:

`Options -Indexes`

may provide an element of security in an Apache webserver configuration.

> This option stops the web browsers being able to see a directory listing if the browser provides a URL which is a directory in the document root. By blocking this, users will not be able to see the names of files and directories in the document root, and thus entries they should not be able to know about will not be easily identified. Instead, the user would have to use guesswork to find files which were not part of the navigation tree of the site. Such files may include password information, development code, logs, etc, and so hiding them has some benefit.

## Question 7

In an Apache weblog, discuss what sort of benefit can be obtained in terms of marketing from the referrer field?

> The referrer field indicates the webpage on which a browser user was on when they clicked a link which took them to the site related to this weblog. This effectively indicates how the user came to this site. Seeding links to the site across other webpages is common when trying to improve the popularity of a site, and may be done as part of search engine optimisation (SEO). Knowing which locations are effective and which are poor sources of users helps to guide where best to advertise links, and to better understand client demographics.