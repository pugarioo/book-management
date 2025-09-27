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

    git branch feature/branch-name development
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

### Use this command to generate dummy data
    INSERT INTO books (title, author, year, category, status)
    VALUES
    ('To Kill a Mockingbird', 'Harper Lee', 1960, 'Fiction', 'available'),
    ('1984', 'George Orwell', 1949, 'Dystopian', 'available'),
    ('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 'Classic', 'available'),
    ('Pride and Prejudice', 'Jane Austen', 1813, 'Romance', 'borrowed'),
    ('Moby Dick', 'Herman Melville', 1851, 'Adventure', 'available'),
    ('The Catcher in the Rye', 'J.D. Salinger', 1951, 'Fiction', 'available'),
    ('Brave New World', 'Aldous Huxley', 1932, 'Dystopian', 'borrowed'),
    ('The Hobbit', 'J.R.R. Tolkien', 1937, 'Fantasy', 'available'),
    ('Fahrenheit 451', 'Ray Bradbury', 1953, 'Dystopian', 'available'),
    ('Crime and Punishment', 'Fyodor Dostoevsky', 1866, 'Philosophical Fiction', 'available');

## After these setup, start developing
