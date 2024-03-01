-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 22, 2024 at 11:28 PM
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
(1, '1', '2024-02-21 17:51:25', 'Test 1', 'Sheetal', 200, '', 'Test 1', 'Test 1', 'e_blast', 'Make-Good', '2024-02-10', '23:53:00', 'Make-Good', '', '', '', '', '', '', 'Rush', '83', 0, 0, '', 'MG asset', 'MG Asset', '83', '2024-02-01', '00:03:00', '0', '', '', '', 'undefined', '', '', '0'),
(2, '2', '2024-02-22 19:56:21', 'Test 22', 'Sheetal', 200, '', 'Test 22', 'Test 22', 'e_blast', 'E-blast', '2024-02-24', '00:03:00', '', '', '', '', '', '', '', 'Low', '83', 0, 0, '', '', '', '', '', '', '0', '', '', '', '', '', '', '0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addtask`
--
ALTER TABLE `addtask`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addtask`
--
ALTER TABLE `addtask`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
