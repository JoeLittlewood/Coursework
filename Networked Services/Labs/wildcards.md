# Wildcards

## Question 2: Wild copy

```bash
cd /home/demo
cp *file* ./work/
ls ./work/
bigfile  misc  progs  tutorial  yearfile2
```

## Question 3: Duplicate thismonth

```bash
cp thismonth letters/let1.doc
cd letters/
cp let1.doc let2.doc
cp let1.doc let3.doc
```

## Question 4: Copy and rename

```bash
cp let?.doc /home/demo/work/misc/
mv /home/demo/work/misc/let1.doc /home/demo/work/misc/rpt1.doc
mv /home/demo/work/misc/let2.doc /home/demo/work/misc/rpt2.doc
mv /home/demo/work/misc/let3.doc /home/demo/work/misc/rpt3.doc
```

## Question 5: Square Brackets

```bash
mv /home/demo/work/misc/*[23]* /home/demo/scripts/
ls /home/demo/scripts/
bigfile2  rpt2.doc  rpt3.doc
```

## Question 6: rm

```bash
rm /home/demo/scripts/r* -i
rm: remove regular file ‘/home/demo/scripts/rpt2.doc’? yes
rm: remove regular file ‘/home/demo/scripts/rpt3.doc’? yes
```

## Question 7: Hard link

```bash
ln /home/demo/bigfile biglink
ls -l

total 8
-rw-r--r--. 2 demo tutorial 4082 Nov 27 14:18 biglink # The number 2 means this is a hard link.
-rw-r--r--. 1 demo tutorial 1982 Nov 27 14:33 vimrc
```

## Question 8: Soft link

```bash
ln -s ../../thismonth mylink
ls -l

total 8
-rw-r--r--. 2 demo tutorial 4082 Nov 27 14:18 biglink
lrwxrwxrwx. 1 demo tutorial   15 Nov 27 15:15 mylink -> ../../thismonth # Notice the "l" in the permissions.
-rw-r--r--. 1 demo tutorial 1982 Nov 27 14:33 vimrc
```

## Question 9: Soft link - Absolute

```bash
ln -s /home/demo/thismonth mylink2
ls -l

total 8
-rw-r--r--. 2 demo tutorial 4082 Nov 27 14:18 biglink
lrwxrwxrwx. 1 demo tutorial   15 Nov 27 15:15 mylink -> ../../thismonth
lrwxrwxrwx. 1 demo tutorial   20 Nov 27 15:26 mylink2 -> /home/demo/thismonth
-rw-r--r--. 1 demo tutorial 1982 Nov 27 14:33 vimrc
```