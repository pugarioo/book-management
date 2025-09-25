# This is the main branch

## Initialize the Containers

### Run command

docker-compose up -d --build

## Switch to the development branch

### Run command

git checkout development

### Check current branch

git status <br>
Note: It must show that you are in the development branch

## Switch to the feature branch

### Each feature must have its own branch. ex. feature/add-book

### Create branch using the command

git branch -b feature/branch-name"

### Check current branch

git status <br>
Note: It must show that you are in the feature/branch-name branch

## 📚 Books Database Setup Instructions

Follow the steps below to set up the `books_db` database and the `books` table.

### 1. Create the Database

### Use the PhpMyAdmin

CREATE DATABASE books_db;

### 2. Create the table

### Use the PhpMyAdmin

CREATE TABLE books (
book_id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255) NOT NULL,
author VARCHAR(255) NOT NULL,
year YEAR,
category VARCHAR(100),
status ENUM('available', 'borrowed') DEFAULT 'available'
);

## After these setup, start developing
