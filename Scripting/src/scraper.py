# ─── WEB SCRAPER - PYTHON SCRIPT ────────────────────────────────────────────────
# ─── JOE L ──────────────────────────────────────────────────────────────────────
# ─── 40417692 ───────────────────────────────────────────────────────────────────
'''
A webscraper that, when ran, will scarpe details from a web page. The details it
collects are as follows:
    - The title
    - Any email addresses
    - Any phone numbers
    - Any hyperlinks
    - Any files
    - Any md5 hashes
    - Any images

The script will then attempt to download the files and store them in /web_contents/files,
download the images and store them in web_contents/ scarper_images and dictionary attack
the md5 hashes.

All web content found will be listed in web_contents/contents.txt.

This script should only be ran in Python version 3.6.
'''
import urllib.request
import urllib
import re
import os
import sys
import hashlib


# ────────────────────────────────────────────────────────────────────────────────
# ─── HASH CRACK FUNCTION ────────────────────────────────────────────────────────
# ────────────────────────────────────────────────────────────────────────────────
def dictCrack(hash_extract, f):

    # List of common passwords.
    dic = ['123', '1234', '12345', '123456', '1234567', '12345678',
    'password', 'qwerty', 'abc', 'abcd', 'abc123', '111111',
    'monkey', 'arsenal', 'letmein', 'trustno1', 'dragon',
    'baseball', 'superman', 'iloveyou', 'starwars',
    'montypython', 'cheese', '123123', 'football', 'batman']

    # Uses hashlib to md5 hash the list of common passwords.
    hashes = [hashlib.md5(each_line.encode('utf-8')).hexdigest() for each_line in dic]

    # dict1 is a dictionary that is created from the passwords and hashes zipped together.
    dict1 = dict(zip(dic, hashes))

    # A rainbow table is created from this.
    rainbow = {hashes:dic for dic, hashes in dict1.items()}

    # Match the password to the hash that has been extracted from the website.
    passwdFound = rainbow.get(hash_extract)

    # Write to console "Password recovered" if password has been found.
    if passwdFound:
        f.write('[+] Password recovered: %s\n' % passwdFound)
    else:
        f.write('[-] Password not recovered\n')


# ────────────────────────────────────────────────────────────────────────────────
# ─── FILE DOWNLOAD FUNCTION ─────────────────────────────────────────────────────
# ────────────────────────────────────────────────────────────────────────────────
def fileDownload(files, url):

    fileCounter = 0
    fileLinkCounter = 0
    fileLinkList = []

    print(f'[*] Downloading files...')

    # Picks out the absolute links from the files list.
    for line in files:
        fLink = re.compile(r'http[s]{0,1}://.*')  # Regex - Finds all "HTTP or HTTPS" links.
        fileLink = fLink.findall(line)
        if fileLink: 
            fileLinkList.append(fileLink)

    # Downloads absolute links found from files list.
    for fileLink in fileLinkList:
        fListStrip = str(fileLinkList[fileLinkCounter]).strip('[\'\']')
        files.remove(fListStrip)  # Removes absolute file links from files list.
        try:
            urllib.request.urlretrieve(fListStrip, "web_contents/files/file%s.pdf" % fileLinkCounter)
        except:
            print(f'[!] ERROR! Problem downloading file. Continuing...')
        fileLinkCounter += 1

    # Downloads relative file links from files list.
    while fileCounter < len(files):
        urlFile = (str(url) + files[fileCounter])
        try:
            urllib.request.urlretrieve(urlFile, "web_contents/files/file%s.pdf" % fileLinkCounter)
        except:
            print(f'[!] ERROR!: Problem downloading: {urlFile}')
            print(f'[*] Continuing...')
        fileCounter += 1


# ────────────────────────────────────────────────────────────────────────────────
# ─── IMAGE DOWNLOAD FUNCTION ────────────────────────────────────────────────────
# ────────────────────────────────────────────────────────────────────────────────
def imageDownload(images, url):

    imgCounter = 0
    linkCounter = 0
    linkList = []

    print(f'[*] Downloading images...')

    # For every line in images, this function separates the absolute file paths from the 
    # relative file paths.
    for line in images:
        iLink = re.compile(r'http[s]{0,1}://.*')  # Uses regex to separate absolute file paths.
        imgLink = iLink.findall(line)
        if imgLink: 
            linkList.append(imgLink)

    for link in linkList:

        # linklist is a list so this lone strips the [' '] from the string in order to run properly.
        lListStrip = str(linkList[linkCounter]).strip('[\'\']')
        images.remove(lListStrip) # Removes absolute file paths from images list. 
        try:
            urllib.request.urlretrieve(lListStrip, "web_contents/scraper_images/link%s.jpg" % linkCounter)
        except(FileNotFoundError):
            print(f'[!] ERROR!: Image folder does not exist. Creating folder...')
            os.mkdir('web_contents/scraper_images')
        linkCounter += 1

    # Downloads the relative files by concatinating them to the URL and downloading them like above.
    while imgCounter < len(images):
        urlImage = (str(url) + images[imgCounter])
        try:
            urllib.request.urlretrieve(urlImage, "web_contents/scraper_images/img%s.jpg" % imgCounter)
        except:
            print(f'[!] ERROR!: Problem downloading: {urlImage}')
            print(f'[*] Continuing...')
        imgCounter += 1


# ────────────────────────────────────────────────────────────────────────────────
# ─── TITLE - REGEX ──────────────────────────────────────────────────────────────
# ────────────────────────────────────────────────────────────────────────────────
def title(htmltext, f):
    
    # Regex used to find the title. Relies on the HTML tags to find this.
    t = re.compile(r'<title.*>\s*(.*)\s*?</title>', re.I)
    titles = t.findall(htmltext)
    i = 0

    # If any titles are found, print the title to the .txt document and write to 
    # console how many were found. (Should only be one)
    if titles:
        for title in titles:
            # f strings were introduced into python 3.6 as a way of printing strings to the console.
            print(f'[+] Title: {titles[i]}')
            f.write("[Title] %s\n" % titles)
            i += 1
    else:
        f.write('[+] Title: None')


# ────────────────────────────────────────────────────────────────────────────────
# ─── EMAILS - REGEX ─────────────────────────────────────────────────────────────
# ────────────────────────────────────────────────────────────────────────────────
def emails(htmltext, f):

    # Regex to find email addresses in the HTML text. Relies on the email being in a ___@___.___ format.
    e = re.compile(r'([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)', re.I)
    emails = e.findall(htmltext)

    # If any emails are found, print the emails found to the .txt document and write to 
    # console how many were found.
    if emails:
        print(f'[+] {len(emails)} emails found.')
        f.write("\n[Email] %s emails found:\n" % len(emails))
        for emails_extract in emails:
            f.write("[+] %s\n" % emails_extract)
    else:
        print(f'[+] {len(emails)} emails found.')


# ────────────────────────────────────────────────────────────────────────────────
# ─── PHONE NUMBERS - REGEX ──────────────────────────────────────────────────────
# ────────────────────────────────────────────────────────────────────────────────
def phoneNumbers(htmltext, f):

    # Regex to find all phone numbers.
    p = re.compile(r'(\+44[\s(\d)-]*[\d]+)', re.I)
    phone = p.findall(htmltext)

    # If any Phone numbers are found, print the numbers found to the .txt document and write to 
    # console how many were found.
    if phone:
        print(f'[+] {len(phone)} phone numbers found.')
        f.write("\n[Tel] %s phone numbers found:\n" % len(phone))
        for phone_extract in phone:
            f.write("[+] %s\n" % phone_extract)
    else:
        print(f'[+] {len(phone)} phone numbers found.')


# ────────────────────────────────────────────────────────────────────────────────
# ─── HYPERLINK - REGEX ──────────────────────────────────────────────────────────
# ────────────────────────────────────────────────────────────────────────────────
def hyperlink(htmltext, f):

    # Regex to find all hyperlinks. Relies on hyperlink beginning with HTTP or HTTPS.
    h = re.compile(r'href="(http[s]{0,1}://.*)"', re.I)
    link = h.findall(htmltext)

    # If any hyperlinks are found, print the links found to the .txt document and write to 
    # console how many were found.
    if link:
        print(f'[+] {len(link)} hyperlinks found.')
        f.write("\n[Hyperlink] %s hyperlinks found:\n" % len(link))
        for link_extract in link:
            f.write("[+] %s\n" % link_extract)
    else:
        print(f'[+] {len(link)} hyperlinks found.')


# ────────────────────────────────────────────────────────────────────────────────
# ─── HYPERLINK - REGEX ──────────────────────────────────────────────────────────
# ────────────────────────────────────────────────────────────────────────────────
def files(htmltext, f, url):

    # Regex to find all files in the html text. Relies on the file ending with
    # either of the following formats: .docx, .doc, .pdf, .php or .txt.
    fi = re.compile(r'href="(.+[.docx|.pdf|.php|.doc|.txt]+)"', re.I)
    files = fi.findall(htmltext)

    # If any files are found, print the files found to the .txt document and write to 
    # console how many were found.
    # Proceed to run the filesDownload function to download the files.
    if files:
        print(f'[+] {len(files)} file links found')
        f.write("\n[Files] %s file links found:\n" % len(files))
        for files_extract in files:
            f.write("[+] %s\n" % files_extract)
        fileDownload(files, url)
    else:
        print(f'[+] {len(files)} file links found.')


# ────────────────────────────────────────────────────────────────────────────────
# ─── HASHES - REGEX ─────────────────────────────────────────────────────────────
# ────────────────────────────────────────────────────────────────────────────────
def hashes(htmltext, f):

    # Regex to find all hashes. Relies on the hash being an md5 hash, 32 characters long
    # and in hex format.
    s = re.compile(r'[a-f0-9]{32}', re.I)
    hashes = s.findall(htmltext)

    # If any hashes are found, print the hashes found to the .txt document and write to 
    # console how many were found.
    # Proceed to run the dictCrack function to crack the hashes with a dictionary attack.
    if hashes:
        print(f'[+] {len(hashes)} hashes found.')
        print(f'[*] Cracking hashes...')
        f.write("\n[Hashes] %s images found:\n" % len(hashes))
        for hash_extract in hashes:
            f.write("[+] %s\n" % hash_extract)
            dictCrack(hash_extract, f)
    else:
        print(f'[+] {len(hashes)} hashes found.')


# ────────────────────────────────────────────────────────────────────────────────
# ─── IMAGES - REGEX ─────────────────────────────────────────────────────────────
# ────────────────────────────────────────────────────────────────────────────────
def images(htmltext, url, f):

    # Regex to find all images in text file. Relies on the <img> HTML tag.
    img = re.compile(r'<img src="([\$-_\.\+!\*\'(),\w]*)"', re.I)
    images = img.findall(htmltext)

    # If any images are found, print the images found to the .txt document and write to 
    # console how many were found.
    # Proceed to run the imagesDownload function to download the images.
    if images:
        print(f'[+] {len(images)} images found.')
        f.write("\n[Images] %s images found.\n" % len(images))
        for img_extract in images:
            f.write("[+] %s\n" % img_extract)
        imageDownload(images, url)
    else:
        print(f'[+] {len(images)} images found.')


# ────────────────────────────────────────────────────────────────────────────────
# ─── RUN REGEX FUNCTIONS ────────────────────────────────────────────────────────
# ────────────────────────────────────────────────────────────────────────────────
def regex(url, f):

    # a funstion purley for running the functions in order.
    htmlfile = urllib.request.urlopen(url)
    htmltext = htmlfile.read().decode("utf-8")
    title(htmltext, f)
    emails(htmltext, f)
    phoneNumbers(htmltext, f)
    hyperlink(htmltext, f)
    files(htmltext,f, url)
    hashes(htmltext, f)
    images(htmltext, url, f)


# ────────────────────────────────────────────────────────────────────────────────
# ─── MAIN ───────────────────────────────────────────────────────────────────────
# ────────────────────────────────────────────────────────────────────────────────
def main():
    
    # URL to be used:
    url = input("Please input the URL: ")

    # Checks if directories exist, if not then create them.
    # Multiple try and exepts as I wouldn't want a directory to be skipped past.
    try:
        os.mkdir('web_contents')
    except(FileExistsError):
        pass
    try:
        os.mkdir('web_contents/scraper_images')
    except(FileExistsError):
        pass
    try:
        os.mkdir('web_contents/files')
    except(FileExistsError):
        pass
    
    # Creates the path in which to find the contents.txt file.
    path = "web_contents/contents.txt"

    # Opens file and runs all other functions.
    f = open(path, 'w+')
    print(f'\nRunning...\n')

    try:
        regex(url, f)
        print(f'\nOperation Completed.\n')
    except:
        print(f'[!] ERROR!: Invalid URL, please try again...')


if __name__ == '__main__':
    main()
