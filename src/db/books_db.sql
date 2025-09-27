-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Sep 27, 2025 at 02:30 PM
-- Server version: 8.0.43
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `books_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `book_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `year` int DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `status` enum('available','borrowed') DEFAULT 'available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`book_id`, `title`, `author`, `year`, `category`, `status`) VALUES
(1, 'To Kill a Mockingbird', 'Harper Lee', 1960, 'Fiction', 'available'),
(2, '1984', 'George Orwell', 1949, 'Dystopian', 'available'),
(3, 'The Great Gatsby', 'F. Scott Fitzgerald', 1925, 'Classic', 'available'),
(4, 'Pride and Prejudice', 'Jane Austen', 1813, 'Romance', 'available'),
(5, 'Moby Dick', 'Herman Melville', 1851, 'Adventure', 'available'),
(6, 'The Catcher in the Rye', 'J.D. Salinger', 1951, 'Fiction', 'available'),
(7, 'Brave New World', 'Aldous Huxley', 1932, 'Dystopian', 'available'),
(8, 'The Hobbit', 'J.R.R. Tolkien', 1937, 'Fantasy', 'available'),
(9, 'Fahrenheit 451', 'Ray Bradbury', 1953, 'Dystopian', 'available'),
(10, 'Crime and Punishment', 'Fyodor Dostoevsky', 1866, 'Philosophical Fiction', 'available');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transaction_id` int NOT NULL,
  `book_id` int NOT NULL,
  `book_title` varchar(255) NOT NULL,
  `date_borrowed` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_returned` timestamp NULL DEFAULT NULL,
  `status` enum('completed','pending') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`book_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `book_id` (`book_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `book_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
