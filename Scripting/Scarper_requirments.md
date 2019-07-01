# Scraper script requirments

> Joe L, 40417692

---

- [x] Grab HTML contents from URL
  - [ ] output to a text file
- [x] URL specified as a variable
- [ ] Extract following
  - [x] Hyperlinks
    - [x] State how many were found and put unique links in list
  - [x] Filenames of all images, docx and pdf files.
    - [x] List them separately and state how many were found.
  - [x] Email addresses
  - [x] Phonenumbers
  - [x] MD5 hashes
    - [ ] Attempt to crack them
- [ ] Download images and files linked, save them into a directory
- [ ] Analyse the files downloaded
- [ ] Check if any are "known bad files"
- [ ] Exception handling