# This is the development branch

## Initialize the Containers

### Run command

docker-compose up -d --build

## Create Switch to the development branch

### Run command

git branch development <br>
git checkout development

### Check current branch

git status <br>
Note: It must show that you are in the development branch

## Switch to the feature branch

### Each feature must have its own branch. ex. feature/add-book

### Create branch using the command

git branch feature/branch-name development<br>
git checkout feature/branch-name

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
    year INT(4),  -- can now store any year (e.g., 1813, 2025, etc.)
    category VARCHAR(100),
    status ENUM('available', 'borrowed') DEFAULT 'available'
    );

## After these setup, start developing
