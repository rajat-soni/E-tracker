-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 08, 2023 at 11:39 PM
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
-- Database: `lp-fy24-q4-salesforce-smb-ts`
--

-- --------------------------------------------------------

--
-- Table structure for table `lp-fy24-q4-salesforce-smb-ts`
--

CREATE TABLE `lp-fy24-q4-salesforce-smb-ts` (
  `id` int(50) NOT NULL,
  `q1` varchar(500) DEFAULT NULL,
  `q2` varchar(1000) DEFAULT NULL,
  `q3` varchar(1000) DEFAULT NULL,
  `q4` varchar(1000) DEFAULT NULL,
  `q5` varchar(1000) DEFAULT NULL,
  `q6` varchar(1000) DEFAULT NULL,
  `q7` varchar(1000) DEFAULT NULL,
  `q8` varchar(1000) DEFAULT NULL,
  `q9` varchar(1000) DEFAULT NULL,
  `q10` varchar(1000) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `date_time` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `email_id` varchar(200) DEFAULT NULL,
  `cq1` varchar(1000) DEFAULT NULL,
  `cq2` varchar(1000) DEFAULT NULL,
  `cq3` varchar(1000) DEFAULT NULL,
  `cq4` varchar(1000) DEFAULT NULL,
  `asset` varchar(5000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `lp-fy24-q4-salesforce-smb-ts`
--
ALTER TABLE `lp-fy24-q4-salesforce-smb-ts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `lp-fy24-q4-salesforce-smb-ts`
--
ALTER TABLE `lp-fy24-q4-salesforce-smb-ts`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
