-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 25, 2024 at 12:09 AM
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
-- Database: `nodejs`
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
  `priority` varchar(255) NOT NULL,
  `allocated_to` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `rbstatus` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `addtask`
--

INSERT INTO `addtask` (`id`, `cname`, `cur_datetime`, `camp_name`, `camp_from`, `blast_count`, `asset_name`, `asset_link`, `tact`, `blast_type`, `blast_date`, `blast_time`, `rb_type`, `rb_assetname`, `rb_assetlink`, `rb_date`, `rb_time`, `rballocated_to`, `priority`, `allocated_to`, `status`, `rbstatus`) VALUES
(1, '5', '2024-01-24 20:17:35', 'w8-e-blast', 'shetal', 100, 'w-8-eblast', 'skdfjkfj.ww.erer', 'e_blast', 'E-blast', '2024-01-25', '02:16:00', '', '', '', '', '', '', 'Rush', '97', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `campaign`
--

CREATE TABLE `campaign` (
  `id` int(11) NOT NULL,
  `campaign_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 81, 1),
(2, 81, 4),
(3, 81, 4),
(4, 81, 26),
(5, 81, 1),
(6, 81, 1),
(7, 81, 1),
(8, 81, 6),
(9, 81, 7),
(10, 82, 1),
(11, 82, 1),
(12, 82, 1),
(13, 82, 1),
(14, 84, 5),
(15, 89, 7),
(16, 97, 1),
(17, 97, 2),
(18, 97, 1),
(19, 97, 1);

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `state_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1=Active | 0=Inactive'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `client_tbl`
--

CREATE TABLE `client_tbl` (
  `client_id` int(11) NOT NULL,
  `client_name` varchar(255) NOT NULL,
  `client_status` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `client_tbl`
--

INSERT INTO `client_tbl` (`client_id`, `client_name`, `client_status`) VALUES
(5, 'TGIF', '');

-- --------------------------------------------------------

--
-- Table structure for table `comment_tbl`
--

CREATE TABLE `comment_tbl` (
  `comment_id` int(11) NOT NULL,
  `camp_id` int(11) NOT NULL,
  `comment` varchar(250) NOT NULL,
  `rb_comment` varchar(300) NOT NULL,
  `admin_files` varchar(300) NOT NULL,
  `admin_rb_file` varchar(255) NOT NULL,
  `webinar_comment` varchar(200) NOT NULL,
  `webinar_files` varchar(255) NOT NULL,
  `user_ebcomment` varchar(255) NOT NULL,
  `user_ebfiles` varchar(255) NOT NULL,
  `user_rbcomment` varchar(255) NOT NULL,
  `user_rbfiles` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comment_tbl`
--

INSERT INTO `comment_tbl` (`comment_id`, `camp_id`, `comment`, `rb_comment`, `admin_files`, `admin_rb_file`, `webinar_comment`, `webinar_files`, `user_ebcomment`, `user_ebfiles`, `user_rbcomment`, `user_rbfiles`) VALUES
(1, 1, 'EB Files', '', '1Password_LOGO.png,Daily-report-rajat-soni.xlsx', '', '', '', 'hellloserer', 'Microsoft-CPL-Jan-Mar-2024-Q1-PMG-ABM-Migrate and Secure-SMC-ENT-Embedded Form-CEMA-Asset Matrix.xlsm,Microsoft-CPL-Oct-Dec-2023-Q4-PMG-ABM-Migrate and Secure-SMC-ENT-CEMA-Privacy Language Guidance Doc.xlsm', '', ''),
(2, 2, 'webinar', '', '1_The  New Perimeter- Access Management in a Hybrid World.pdf,1_The  New Perimeter- Access Management in a Hybrid World.docx', '', 'hellos webinar', 'Daily-report-rajat-soni.xlsx', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1=Active | 0=Inactive'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `country_state_city`
--

CREATE TABLE `country_state_city` (
  `id` int(11) NOT NULL,
  `country` varchar(250) NOT NULL,
  `state` varchar(250) NOT NULL,
  `city` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_table`
--

CREATE TABLE `customer_table` (
  `customer_id` int(11) NOT NULL,
  `customer_first_name` varchar(200) NOT NULL,
  `customer_last_name` varchar(200) NOT NULL,
  `customer_email` varchar(300) NOT NULL,
  `customer_gender` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `files_tbl`
--

CREATE TABLE `files_tbl` (
  `id` int(11) NOT NULL,
  `camp_id` varchar(255) NOT NULL,
  `admin_files` varchar(255) NOT NULL,
  `user_files` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `files_tbl`
--

INSERT INTO `files_tbl` (`id`, `camp_id`, `admin_files`, `user_files`) VALUES
(1, '27', 'admin_files-1695070002472-3120045-JM-DroneDeploy-1.pdf.pdf', ''),
(2, '27', 'admin_files-1695073585798-3120045-JM-DroneDeploy-CA-1.pdf', '');

-- --------------------------------------------------------

--
-- Table structure for table `login_tbl`
--

CREATE TABLE `login_tbl` (
  `login_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(11) NOT NULL,
  `user_password` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `node_ajax`
--

CREATE TABLE `node_ajax` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `age` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `node_ajax`
--

INSERT INTO `node_ajax` (`id`, `first_name`, `last_name`, `age`, `gender`) VALUES
(14, 'Marah', 'Meyers', 'Qui voluptas consequ', 'Female'),
(15, 'Mohan', 'Govind', '26', 'Male'),
(16, 'undefined', 'undefined', 'undefined', 'undefined'),
(17, 'undefined', 'undefined', 'undefined', 'undefined'),
(18, 'undefined', 'undefined', 'undefined', 'undefined'),
(19, 'undefined', 'undefined', 'undefined', 'undefined'),
(20, 'undefined', 'undefined', 'undefined', 'undefined'),
(21, 'Madona', 'Hudson', 'Cillum exercitatione', 'Female');

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
(6, 'Sheetal', 'gipap21997@mliok.com', 5);

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `id` int(11) NOT NULL,
  `country_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1=Active | 0=Inactive'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`id`, `country_id`, `name`, `status`) VALUES
(1, 1, 'New York', 1),
(2, 1, 'Los Angeles', 1),
(3, 2, 'British Columbia', 1),
(4, 2, 'Torentu', 1);

-- --------------------------------------------------------

--
-- Table structure for table `taskassign`
--

CREATE TABLE `taskassign` (
  `assignid` int(11) NOT NULL,
  `camp_id` int(11) NOT NULL,
  `blst_type` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `email`) VALUES
(1, 'test', 'test', 'test@test.com'),
(2, 'test', 'test', 'test@test.com'),
(3, 'test', 'test', 'test@test.com');

-- --------------------------------------------------------

--
-- Table structure for table `user_login`
--

CREATE TABLE `user_login` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `user_session_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user_login`
--

INSERT INTO `user_login` (`user_id`, `user_email`, `user_password`, `user_session_id`) VALUES
(1, 'johnsmith@gmail.com', 'password', ''),
(2, 'peterparker@gmail.com', 'password', '');

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
(69, 'Rajashri', 'Fagare', 'rajashri@gmail.com', '9921139938', 'rajashri', 'Apple@23', 'Apple@23', '2023-09-01 16:58:56', 'admin'),
(97, 'Rajat', 'soni', 'rj@gmail.com', '9935265860', 'rajat', 'Rajat@12', 'Rajat@12', '2024-01-24 16:58:32', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addtask`
--
ALTER TABLE `addtask`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `campaign`
--
ALTER TABLE `campaign`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `camp_info_tbl`
--
ALTER TABLE `camp_info_tbl`
  ADD PRIMARY KEY (`camp_info_id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `country_state_city`
--
ALTER TABLE `country_state_city`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_table`
--
ALTER TABLE `customer_table`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `files_tbl`
--
ALTER TABLE `files_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login_tbl`
--
ALTER TABLE `login_tbl`
  ADD PRIMARY KEY (`login_id`);

--
-- Indexes for table `node_ajax`
--
ALTER TABLE `node_ajax`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sender_tbl`
--
ALTER TABLE `sender_tbl`
  ADD PRIMARY KEY (`sender_id`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `taskassign`
--
ALTER TABLE `taskassign`
  ADD PRIMARY KEY (`assignid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_login`
--
ALTER TABLE `user_login`
  ADD PRIMARY KEY (`user_id`);

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
-- AUTO_INCREMENT for table `campaign`
--
ALTER TABLE `campaign`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `camp_info_tbl`
--
ALTER TABLE `camp_info_tbl`
  MODIFY `camp_info_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client_tbl`
--
ALTER TABLE `client_tbl`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `comment_tbl`
--
ALTER TABLE `comment_tbl`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `country_state_city`
--
ALTER TABLE `country_state_city`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_table`
--
ALTER TABLE `customer_table`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `files_tbl`
--
ALTER TABLE `files_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `login_tbl`
--
ALTER TABLE `login_tbl`
  MODIFY `login_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `node_ajax`
--
ALTER TABLE `node_ajax`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `sender_tbl`
--
ALTER TABLE `sender_tbl`
  MODIFY `sender_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `taskassign`
--
ALTER TABLE `taskassign`
  MODIFY `assignid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_login`
--
ALTER TABLE `user_login`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_tbl`
--
ALTER TABLE `user_tbl`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
