# Intro 2

## Question 2: Create a directory structure

```bash
mkdir work
mkdir letters
mkdir scripts
mkdir ./work/progs
mkdir ./work/tutorial
mkdir ./work/misc
```

## Question 3: cp

```bash
cp /etc/group ./work/misc/
cp /etc/vimrc ./work/misc/
```

## Question 4: Relative move

```bash
cd ./work/misc/
mv ./vimrc ../progs/
```

## Question 5: rename

`cp ../../bigfile ../tutorial/bigfile2`

## Question 6: cp

```bash
cd ..
cp /home/demo/work/tutorial/bigfile2 /home/demo/scripts/
```

## Question 7: tilde

```bash
cat /etc/passwd | grep sql
mysql:x:27:27:MariaDB Server:/var/lib/mysql:/sbin/nologin
```

## Question 8: case and space

```bash
cd /home/demo
mkdir Gordon
mkdir gordon
mkdir "My Documents"
```