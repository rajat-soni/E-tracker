-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 07, 2024 at 08:07 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs1`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment_tbl`
--

CREATE TABLE `comment_tbl` (
  `comment_id` int(11) NOT NULL,
  `camp_id` int(11) NOT NULL,
  `comment` varchar(250) NOT NULL DEFAULT '',
  `rb_comment` varchar(300) NOT NULL DEFAULT '',
  `admin_files` varchar(300) NOT NULL DEFAULT '',
  `admin_rb_file` varchar(255) NOT NULL DEFAULT '',
  `webinar_comment` varchar(200) NOT NULL DEFAULT '',
  `user_ebcomment` varchar(255) NOT NULL DEFAULT '',
  `user_ebfiles` varchar(255) NOT NULL DEFAULT '',
  `user_rbcomment` varchar(255) NOT NULL DEFAULT '',
  `user_rbfiles` varchar(255) NOT NULL DEFAULT '',
  `webinar_files` varchar(255) NOT NULL DEFAULT '',
  `eb_mg_files` varchar(222) NOT NULL,
  `eb_mg_msg` varchar(255) NOT NULL,
  `rb_mg_files` varchar(222) NOT NULL,
  `rb_mg_msg` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment_tbl`
--
ALTER TABLE `comment_tbl`
  ADD PRIMARY KEY (`comment_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment_tbl`
--
ALTER TABLE `comment_tbl`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
