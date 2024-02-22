-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 21, 2024 at 08:42 PM
-- Server version: 5.7.44
-- PHP Version: 8.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `extrapolate_eb_tool`
--

-- --------------------------------------------------------

--
-- Table structure for table `addtask`
--

CREATE TABLE `addtask` (
  `id` int(11) NOT NULL,
  `cname` varchar(255) NOT NULL,
  `cur_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `camp_name` varchar(255) DEFAULT NULL,
  `camp_from` varchar(255) DEFAULT NULL,
  `blast_count` int(11) NOT NULL,
  `asset_name` varchar(255) DEFAULT NULL,
  `asset_link` varchar(255) DEFAULT NULL,
  `tact` varchar(255) NOT NULL,
  `blast_type` varchar(255) DEFAULT NULL,
  `blast_date` varchar(255) DEFAULT NULL,
  `blast_time` varchar(250) DEFAULT NULL,
  `rb_type` varchar(255) DEFAULT NULL,
  `rb_assetname` varchar(255) DEFAULT NULL,
  `rb_assetlink` varchar(255) DEFAULT NULL,
  `rb_date` varchar(255) DEFAULT NULL,
  `rb_time` varchar(255) DEFAULT NULL,
  `rballocated_to` varchar(255) DEFAULT NULL,
  `priority` varchar(255) NOT NULL,
  `allocated_to` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `rbstatus` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `addtask`
--

INSERT INTO `addtask` (`id`, `cname`, `cur_datetime`, `camp_name`, `camp_from`, `blast_count`, `asset_name`, `asset_link`, `tact`, `blast_type`, `blast_date`, `blast_time`, `rb_type`, `rb_assetname`, `rb_assetlink`, `rb_date`, `rb_time`, `rballocated_to`, `priority`, `allocated_to`, `status`, `rbstatus`) VALUES
(1, '3', '2024-02-09 16:33:40', 'Alpha - Email Invite - 3121069.2 OutSystems_Email_UK/DE/FR', 'Suvendu', 19000, '[Gartner] How to build culture of continuous modernization', 'https://eu.itbusinessplus.com/whitepaper/Alpha-3121069.2-Email-OutSystems-UK-EU-1.html', 'e_blast', 'E-blast', '2024-02-12', '19:30:00', 'Reminder-Blast', 'Outsystems', 'https://staging.webtechstar.com:7777/alltask', '2024-02-13', '01:00:00', '6', 'High', '6', 1, 0),
(2, '1', '2024-02-09 18:53:16', 'TGIF', 'Sheetal', 2000, 'TGIF', 'TGIF Test 1', 'e_blast', 'E-blast', '2024-02-17', '00:03:00', '', '', '', '', '', '', 'Rush', '6', 0, 0),
(3, '4', '2024-02-09 23:18:40', 'BUILD LP 2024 Q1 Akamai Security - HEL', 'Sheetal', 100, 'BUILD LP 2024 Q1 Akamai Security - HEL', 'https://engage.biz-tech-insights.com/whitepaper/LP-2024-Q1-Akamai-Security-HEL-CS-1-edm.html', 'e_blast', 'E-blast', '2024-02-10', '05:21:00', '', '', '', '', '', '', 'Medium', '7', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `camp_info_tbl`
--

CREATE TABLE `camp_info_tbl` (
  `camp_info_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `camp_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `camp_info_tbl`
--

INSERT INTO `camp_info_tbl` (`camp_info_id`, `user_id`, `camp_id`) VALUES
(1, 6, 1),
(2, 7, 3);

-- --------------------------------------------------------

--
-- Table structure for table `client_tbl`
--

CREATE TABLE `client_tbl` (
  `client_id` int(11) NOT NULL,
  `client_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client_tbl`
--

INSERT INTO `client_tbl` (`client_id`, `client_name`) VALUES
(1, 'TGIF'),
(2, 'W8'),
(3, 'Alpha'),
(4, 'RB');

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
  `webinar_files` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comment_tbl`
--

INSERT INTO `comment_tbl` (`comment_id`, `camp_id`, `comment`, `rb_comment`, `admin_files`, `admin_rb_file`, `webinar_comment`, `user_ebcomment`, `user_ebfiles`, `user_rbcomment`, `user_rbfiles`, `webinar_files`) VALUES
(1, 1, '', 'gfg', 'PAS Alpha - Email Invite - 3121069.2 OutSystems_Email_UKDEFR.xlsx', '', '', '', '', '', '', ''),
(2, 2, 'Comment', '', 'A-managers-guide-to-performance-reviews.pdf,Onboarding-and-induction-checklist.pdf,A-managers-guide-to-performance-reviews.pdf,Onboarding-and-induction-checklist.pdf', '', '', '', '', '', '', ''),
(3, 3, '', '', '', '', '', 'hello mam ', 'Onboarding-and-induction-checklist (1).pdf,A-managers-guide-to-performance-reviews.pdf', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `sender_tbl`
--

CREATE TABLE `sender_tbl` (
  `sender_id` int(11) NOT NULL,
  `sender_name` varchar(255) NOT NULL,
  `sender_email` varchar(255) NOT NULL,
  `client_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sender_tbl`
--

INSERT INTO `sender_tbl` (`sender_id`, `sender_name`, `sender_email`, `client_id`) VALUES
(1, 'TGIF', 'tgif@gmail.com', 1),
(2, 'W8', 'w8@gmail.com', 2),
(3, 'ITBusinessPlus', 'events@itbusinessplus.com', 3),
(4, 'Sheeal', 'sheetal@gmail.com', 4);

-- --------------------------------------------------------

--
-- Table structure for table `user_tbl`
--

CREATE TABLE `user_tbl` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `cnf_password` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_tbl`
--

INSERT INTO `user_tbl` (`user_id`, `first_name`, `last_name`, `email`, `phone`, `user_name`, `password`, `cnf_password`, `date`, `role`) VALUES
(1, 'Admin', 'admin', 'admin@gmail.com', '9966332255', 'admin', 'Admin@12', 'Admin@12', '2024-02-08 23:44:26', 'Admin'),
(2, 'user', 'user', 'user@gmail.com', '9988774455', 'User', 'User@12', 'User@12', '2024-02-09 17:15:58', 'user'),
(3, 'Rajashri', 'Fagare', 'rajashri@gmail.com', '9966558877', 'rajashri', 'Admin@12', 'Admin@12', '2024-02-09 00:23:06', 'user'),
(4, 'Raj', 'Soni', 'Raj@123gmail.com', '9935526860', 'Rajat', 'Raj@12', 'Raj@12', '2024-02-09 15:39:47', 'user'),
(5, 'Snehal', 'Bhosale', 'snehal@gmail.com', '8855996677', 'snehal', 'Snehal@2024', 'Snehal@2024', '2024-02-09 16:08:02', 'user'),
(6, 'Sheetal', 'Singh', 'sgahlod@kingstechmedia.com', '9970562503', 'Sheetal', 'Sheetal@123', 'Sheetal@123', '2024-02-09 16:26:21', 'user'),
(7, 'vevik', 'deshmuk', 'vivek@gmail.com', '9935526860', 'vevik', 'Vik@12', 'Vik@12', '2024-02-09 23:13:40', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addtask`
--
ALTER TABLE `addtask`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `camp_info_tbl`
--
ALTER TABLE `camp_info_tbl`
  ADD PRIMARY KEY (`camp_info_id`);

--
-- Indexes for table `client_tbl`
--
ALTER TABLE `client_tbl`
  ADD PRIMARY KEY (`client_id`);

--
-- Indexes for table `comment_tbl`
--
ALTER TABLE `comment_tbl`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `sender_tbl`
--
ALTER TABLE `sender_tbl`
  ADD PRIMARY KEY (`sender_id`);

--
-- Indexes for table `user_tbl`
--
ALTER TABLE `user_tbl`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addtask`
--
ALTER TABLE `addtask`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `camp_info_tbl`
--
ALTER TABLE `camp_info_tbl`
  MODIFY `camp_info_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `client_tbl`
--
ALTER TABLE `client_tbl`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `comment_tbl`
--
ALTER TABLE `comment_tbl`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sender_tbl`
--
ALTER TABLE `sender_tbl`
  MODIFY `sender_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_tbl`
--
ALTER TABLE `user_tbl`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
