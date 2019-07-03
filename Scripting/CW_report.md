# CSN08714 2018-9 TR2 - Scripting for Cybersecurity and Networks
## Table of Contents

- [CSN08714 2018-9 TR2 - Scripting for Cybersecurity and Networks](#csn08714-2018-9-tr2---scripting-for-cybersecurity-and-networks)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Structure](#structure)
  - [Regex](#regex)
  - [Exception Handling](#exception-handling)
  - [Automated preparation of the downloads directory](#automated-preparation-of-the-downloads-directory)
  - [Dependency Diagram](#dependency-diagram)
  - [Functional Requirments](#functional-requirments)
  - [Code](#code)
  - [Screenshots](#screenshots)

## Introduction

## Structure

## Regex

## Exception Handling

## Automated preparation of the downloads directory

## Dependency Diagram

## Functional Requirments

**1. All output from the script must be written to a txt file, using suitable sub headings and structure.**

Throughout my various functions I write strings to the contents.txt file. In my main function I first create the path, then I open the file for writing and reading before writing to the file the contents in hich i have parsed from the HTML text.

```python
path = "web_contents/contents.txt"

f = open(path, 'w+')

f.write("[+] %s\n" % x)
```

**2. Read the source code of a Webpage for which you are given the URL. This must be specified as a variable so it can easily be passed to parsing functions and replaced by another URL.**

For this, I use the following code to pass my URL as a variable so that it can be used throughout my code in various functions.

```python
url = input("Please input the URL: ")
```

**3. Parse the webpage content to extract the URLs of all page hyperlinks on the page. This should output a list of all the unique hyperlinks found and a summary that states "x hyperlinks found". Both absolute and relative links should be extracted.**

This was the first function that started a trend throughout all the web scraping functions. They all work very similarly but differ when it comes to the regex used.

The regex in this function focuses on a key part of HTML documents - the attributes. It looks for the "href" attribute and selects all the text that follows it.

```python
def hyperlink(htmltext, f):

    h = re.compile(r'href="(http[s]{0,1}://.*)"', re.I)
    link = h.findall(htmltext)

    if link:
        print(f'[+] {len(link)} hyperlinks found.')
        f.write("\n[Hyperlink] %s hyperlinks found:\n" % len(link))
        for link_extract in link:
            f.write("[+] %s\n" % link_extract)
    else:
        print(f'[+] {len(link)} hyperlinks found.')
```

**4. Parse the webpage content to extract the filenames of all image files, docx and pdf files linked on the webpage. This should output separate lists of all the image files and documents found and a summary stating how many were found. Both absolute and relative links should be extracted.**

I was able to download the images fairly efficiently and effectively but struggled when it came to the documents. This was mainly due to the varied range of popular file formats used in HTML 5.

```python
def images(htmltext, url, f):

    img = re.compile(r'<img src="([\$-_\.\+!\*\'(),\w]*)"', re.I)
    images = img.findall(htmltext)

    if images:
        print(f'[+] {len(images)} images found.')
        f.write("\n[Images] %s images found.\n" % len(images))
        for img_extract in images:
            f.write("[+] %s\n" % img_extract)
        imageDownload(images, url)
    else:
        print(f'[+] {len(images)} images found.')

def files(htmltext, f, url):

    fi = re.compile(r'href="(.+[.docx|.pdf|.php|.doc|.txt]+)"', re.I)
    files = fi.findall(htmltext)

    if files:
        print(f'[+] {len(files)} file links found')
        f.write("\n[Files] %s file links found:\n" % len(files))
        for files_extract in files:
            f.write("[+] %s\n" % files_extract)
        fileDownload(files, url)
    else:
        print(f'[+] {len(files)} file links found.')
```

**5. Parse the webpage content to extract all email addresses included on the page. This should output a nicely formatted list of all the unique email addresses found and a summary that states "x email addresses found". Ideally, you should distinguish addresses found in "mailto:" fields from those included in free text.**

The email addresses are fairly easy to extract so long as they follow the '__@\__.com/.co.uk' format.

```python
def emails(htmltext, f):

    e = re.compile(r'([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)', re.I)
    emails = e.findall(htmltext)

    if emails:
        print(f'[+] {len(emails)} emails found.')
        f.write("\n[Email] %s emails found:\n" % len(emails))
        for emails_extract in emails:
            f.write("[+] %s\n" % emails_extract)
    else:
        print(f'[+] {len(emails)} emails found.')
```

**6. Parse the webpage content to extract all phone numbers shown on the page. This should output a list of all the unique numbers found and a summary that states "x phone numbers found". Phone numbers of all common formats should be extracted.**

**7. The webpage may contain md5 hashes of passwords hidden in the source code. Extract these and output them in a suitable format. After you have found hashes, attempt to crack them. Use a separate function / module for this. For this you need a word list of common passwords - you may use the one given as part of an earlier lab, or one of the more comprehensive lists available online. The output should list each hash found and next to it the cracked password or "no matching password found".**

## Code

## Screenshots