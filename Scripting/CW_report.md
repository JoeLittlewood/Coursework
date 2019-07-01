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



**5. Parse the webpage content to extract all email addresses included on the page. This should output a nicely formatted list of all the unique email addresses found and a summary that states "x email addresses found". Ideally, you should distinguish addresses found in "mailto:" fields from those included in free text.**

**6. Parse the webpage content to extract all phone numbers shown on the page. This should output a list of all the unique numbers found and a summary that states "x phone numbers found". Phone numbers of all common formats should be extracted.**

**7. The webpage may contain md5 hashes of passwords hidden in the source code. Extract these and output them in a suitable format. After you have found hashes, attempt to crack them. Use a separate function / module for this. For this you need a word list of common passwords - you may use the one given as part of an earlier lab, or one of the more comprehensive lists available online. The output should list each hash found and next to it the cracked password or "no matching password found".**

## Code

## Screenshots