# Lecture 1

> Joe L, 40417692

----

## Contents

- [Lecture 1](#lecture-1)
  - [Contents](#contents)
  - [Java Introduction](#java-introduction)
  - [Java development](#java-development)
    - [[1] .JAVA](#1-java)
    - [[2] JDK and .CLASS files](#2-jdk-and-class-files)
    - [[3] Java Virtual Machine (JVM)](#3-java-virtual-machine-jvm)
  - [Write once](#write-once)
  - [Objects](#objects)
    - [Object orientation](#object-orientation)
    - [Objects in Java](#objects-in-java)
  - [Integrated Development Environments](#integrated-development-environments)
    - [Eclipse](#eclipse)
      - [Projects and workspaces](#projects-and-workspaces)

----

## Java Introduction

Java is a general purpose programming language, it is not meant for just one purpose. It can be used to write desktop applications, web applications, server applications or mobile applications. One of the most common current uses for Java is to write mobile applications for Android devices.
Java was released in 1995 by Sun Microsystems. The language uses control systems that are similar to C and C++. This is known as a C-like syntax. therefore the basic elements of Java will be familiar to those who have used C or C++. Java, however, does not compile into machine code, it instead compiles into `.Class` files that contain Java Byte Code which can then be executed by a Java Virtual Machine or **"JVM"**.

## Java development

### [1] .JAVA

> The programmer writes Java code using an editor, the code is saved in text files with the extension .JAVA.

The programmer can use the simplest text editor to write Java. This module we will use the Eclipse Integrated Development Environment to edit our files.

### [2] JDK and .CLASS files

> The Java compiler within the Java Development Kit (JDK) is used to to compile the .JAVA files into .CLASS files.

The JDK is freely available to download, it contains various tools including the Java compiler as well as libraries for I/O, data structures etc.

The compiler can be executed from the command line using environments such as DOS or Linux using the `javac` command.

### [3] Java Virtual Machine (JVM)

> The byte code contained within the .CLASS files can then be executed by running on a JVM.

Assuming that the java files compiled without errors the .CLASS files that contain the programme can now be executed. From a command line the JAVA command can be used to execute the .CLASS files.

For Android applications a tool is provided that adds the .CLASS files to the .APK application package for deployment.

## Write once

In theory we can produce our .CLASS file using a JDK on any platform such as Windows and run it successfully on any other platform that has a JVM, such as MAC. This saves having to produce multiple versions of applications however it does not work in practice when the platforms are very different. An application compiled with the Windows JDK will run on Windows, Linux or OS X. An application compiled on Windows may not run on Android, as Android needs specific features to allow the application to run on a mobile device.

## Objects

Java is an Object Oriented Language (OO). Object Orientation is a programming paradigm that seeks to build systems from software objects. An object contains data fields known as attrributes. and methods (code). The attributes and methods will relate to the same *entity*.

An object contains related data and methods. Many objects model entities that exist in the real world, for example, an object can be used to model a bank account - it would contain data such as the account number and balance. it would contain methods to perform actions such as crediting and debiting the account and printing a statement.

### Object orientation

In an object oriented system we build objects and bring them together to build a system. This has number of advantages such as:

- The division of a large system int objects can make it easier to understand.
- Objects can be related to real-life objects, making the transition from real-world problems to software easier and more understandable.
- Objects can be re-used in multiple systems.

### Objects in Java

All Java software is made up of Classes. A class is source code that defines an object. The class is a collection of variables and code. All java code is contained within a class. Each class in a java system should have it's own source file (.JAVA). It is possible to have more than one class in a .JAVA file but only in very specific circumstances.

----

## Integrated Development Environments

- Typical features of an IDE include
- Code editors
- Organisation of work into projects
- Automated compilation
- Add-ins for automating GUI building and testing

### Eclipse

Eclipse is an open source IDE based around Java development. Plugins can be added to extend it to support most other languages. 

#### Projects and workspaces

All Java code with eclipse