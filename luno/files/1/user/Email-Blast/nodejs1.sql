-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 06, 2024 at 10:45 PM
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
-- Table structure for table `addtask`
--

CREATE TABLE `addtask` (
  `id` int(11) NOT NULL,
  `cname` varchar(255) NOT NULL,
  `cur_datetime` timestamp NOT NULL DEFAULT current_timestamp(),
  `camp_name` varchar(255) NOT NULL,
  `camp_from` varchar(255) NOT NULL,
  `blast_count` int(11) NOT NULL,
  `geo` varchar(255) NOT NULL,
  `asset_name` varchar(255) NOT NULL,
  `asset_link` varchar(255) NOT NULL,
  `tact` varchar(255) NOT NULL,
  `blast_type` varchar(255) NOT NULL,
  `blast_date` varchar(255) NOT NULL,
  `blast_time` time NOT NULL,
  `rb_type` varchar(255) NOT NULL,
  `rb_assetname` varchar(255) NOT NULL,
  `rb_assetlink` varchar(255) NOT NULL,
  `rb_date` varchar(255) NOT NULL,
  `rb_time` varchar(255) NOT NULL,
  `rballocated_to` varchar(255) NOT NULL,
  `rb_geo` varchar(255) NOT NULL,
  `priority` varchar(255) NOT NULL,
  `allocated_to` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `rbstatus` int(11) NOT NULL DEFAULT 0,
  `mg_geo` varchar(255) NOT NULL,
  `mgasset_name` varchar(255) NOT NULL DEFAULT '',
  `mgasset_link` varchar(255) NOT NULL DEFAULT '',
  `mgallocated_to` varchar(255) NOT NULL,
  `mg_date` varchar(255) NOT NULL DEFAULT '',
  `mg_time` varchar(255) NOT NULL DEFAULT '',
  `mg_status` varchar(255) NOT NULL DEFAULT '0',
  `rb_mg_geo` varchar(255) NOT NULL,
  `rb_mgasset_name` varchar(255) NOT NULL,
  `rb_mgasset_link` varchar(255) NOT NULL,
  `rb_mgallocated_to` varchar(255) NOT NULL,
  `rb_mg_date` varchar(255) NOT NULL,
  `rb_mg_time` varchar(255) NOT NULL,
  `rb_mg_status` varchar(255) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `addtask`
--

INSERT INTO `addtask` (`id`, `cname`, `cur_datetime`, `camp_name`, `camp_from`, `blast_count`, `geo`, `asset_name`, `asset_link`, `tact`, `blast_type`, `blast_date`, `blast_time`, `rb_type`, `rb_assetname`, `rb_assetlink`, `rb_date`, `rb_time`, `rballocated_to`, `rb_geo`, `priority`, `allocated_to`, `status`, `rbstatus`, `mg_geo`, `mgasset_name`, `mgasset_link`, `mgallocated_to`, `mg_date`, `mg_time`, `mg_status`, `rb_mg_geo`, `rb_mgasset_name`, `rb_mgasset_link`, `rb_mgallocated_to`, `rb_mg_date`, `rb_mg_time`, `rb_mg_status`) VALUES
(1, '2', '2024-03-06 17:07:08', 'w-8-new', 'sheetal', 100, 'AS', 'sdkfjsdkfj.eb-blast', 'eb-blast.com', 'e_blast', 'RBMake-Good', '2024-03-07', '00:03:00', 'Reminder-Blast', 'hello rbadmin', 'rbadmin.com', '2024-03-08', '00:25:00', '2', 'AS', 'Medium', '2', 1, 1, 'AS', 'sdfsdf make good', 'makegood.com', '2', '2024-03-07', '00:02:00', '1', 'AL,AD', 'ksdjfkjk rb_make_good', 'rb_goood_make.com', '2', '2024-03-08', '00:03:00', '0');

-- --------------------------------------------------------

--
-- Table structure for table `camp_info_tbl`
--

CREATE TABLE `camp_info_tbl` (
  `camp_info_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `camp_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `camp_info_tbl`
--

INSERT INTO `camp_info_tbl` (`camp_info_id`, `user_id`, `camp_id`) VALUES
(1, 6, 1),
(2, 7, 3),
(3, 2, 4),
(4, 2, 1),
(5, 2, 1),
(6, 2, 1),
(7, 2, 1),
(8, 2, 1),
(9, 2, 1),
(10, 2, 2),
(11, 2, 3),
(12, 2, 3),
(13, 2, 1),
(14, 2, 1),
(15, 2, 2),
(16, 2, 4),
(17, 2, 3),
(18, 2, 5),
(19, 2, 21),
(20, 2, 20),
(21, 2, 19),
(22, 2, 18),
(23, 2, 1),
(24, 2, 1),
(25, 1, 0),
(26, 1, 0),
(27, 1, 0),
(28, 1, 0),
(29, 2, 1),
(30, 2, 1),
(31, 2, 1),
(32, 2, 1),
(33, 2, 1),
(34, 2, 1),
(35, 2, 1),
(36, 2, 1),
(37, 2, 1),
(38, 2, 1),
(39, 2, 1),
(40, 2, 1),
(41, 2, 1),
(42, 2, 1),
(43, 2, 1),
(44, 2, 1),
(45, 2, 1),
(46, 2, 2),
(47, 2, 2),
(48, 2, 2),
(49, 2, 2),
(50, 2, 2),
(51, 2, 2),
(52, 2, 2),
(53, 2, 2),
(54, 2, 2),
(55, 2, 1),
(56, 2, 1),
(57, 2, 2),
(58, 2, 1),
(59, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `client_tbl`
--

CREATE TABLE `client_tbl` (
  `client_id` int(11) NOT NULL,
  `client_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `webinar_files` varchar(255) NOT NULL DEFAULT '',
  `eb_mg_files` varchar(222) NOT NULL,
  `eb_mg_msg` varchar(255) NOT NULL,
  `rb_mg_files` varchar(222) NOT NULL,
  `rb_mg_msg` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comment_tbl`
--

INSERT INTO `comment_tbl` (`comment_id`, `camp_id`, `comment`, `rb_comment`, `admin_files`, `admin_rb_file`, `webinar_comment`, `user_ebcomment`, `user_ebfiles`, `user_rbcomment`, `user_rbfiles`, `webinar_files`, `eb_mg_files`, `eb_mg_msg`, `rb_mg_files`, `rb_mg_msg`) VALUES
(1, 1, 'hello eb', 'hello reminder blast', 'LP-2023-Q3-ServiceNow-Telecom-Media-and-Tech-old.png', 'error_log', '', 'hello eb i am here', 'emailFunc.php', 'hello rb user', 'Servicenow - Proof.png', '', 'email.html,land.html', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `sender_tbl`
--

CREATE TABLE `sender_tbl` (
  `sender_id` int(11) NOT NULL,
  `sender_name` varchar(255) NOT NULL,
  `sender_email` varchar(255) NOT NULL,
  `client_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Table structure for table `trp-fy24-q2-ukg-smb-ts`
--

CREATE TABLE `trp-fy24-q2-ukg-smb-ts` (
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
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_tbl`
--

INSERT INTO `user_tbl` (`user_id`, `first_name`, `last_name`, `email`, `phone`, `user_name`, `password`, `cnf_password`, `date`, `role`) VALUES
(1, 'Admin', 'admin', 'admin@gmail.com', '9966332255', 'admin', 'Admin@12', 'Admin@12', '2024-02-08 23:44:26', 'Admin'),
(2, 'user', 'user', 'user@gmail.com', '9988774455', 'User', 'User@12', 'User@12', '2024-02-09 17:15:58', 'user');

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
-- Indexes for table `trp-fy24-q2-ukg-smb-ts`
--
ALTER TABLE `trp-fy24-q2-ukg-smb-ts`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `camp_info_tbl`
--
ALTER TABLE `camp_info_tbl`
  MODIFY `camp_info_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `client_tbl`
--
ALTER TABLE `client_tbl`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `comment_tbl`
--
ALTER TABLE `comment_tbl`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sender_tbl`
--
ALTER TABLE `sender_tbl`
  MODIFY `sender_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `trp-fy24-q2-ukg-smb-ts`
--
ALTER TABLE `trp-fy24-q2-ukg-smb-ts`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_tbl`
--
ALTER TABLE `user_tbl`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
