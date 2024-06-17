-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： sql.freedb.tech
-- 產生時間： 2024 年 06 月 07 日 14:08
-- 伺服器版本： 8.0.36-0ubuntu0.22.04.1
-- PHP 版本： 8.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `freedb_VT6003CEM`
--

-- --------------------------------------------------------

--
-- 資料表結構 `dogs`
--

CREATE TABLE `dogs` (
  `ID` int NOT NULL,
  `name` varchar(32) NOT NULL,
  `breed` varchar(32) NOT NULL,
  `age` int NOT NULL,
  `gender` varchar(32) NOT NULL,
  `size` varchar(32) NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `location` varchar(128) NOT NULL,
  `dateAdded` datetime DEFAULT CURRENT_TIMESTAMP,
  `dateModified` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `imageurl` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `a_status` tinyint(1) DEFAULT '1',
  `userID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `dogs`
--

INSERT INTO `dogs` (`ID`, `name`, `breed`, `age`, `gender`, `size`, `description`, `location`, `dateAdded`, `dateModified`, `imageurl`, `a_status`, `userID`) VALUES
(1, 'Carry', 'toy poodle', 2, 'male', 'small', '', 'Tuen Mun', '2024-06-03 04:55:28', '2024-06-03 13:12:10', 'https://images.dog.ceo/breeds/poodle-toy/n02113624_1063.jpg', 1, 1),
(3, 'Orange', 'Toy Poodle', 4, 'male', 'medium', 'very cute', 'Tsuen Wan', '2024-06-03 07:09:53', '2024-06-03 12:39:34', 'https://images.dog.ceo/breeds/poodle-toy/n02113624_4349.jpg', 1, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `favs`
--

CREATE TABLE `favs` (
  `id` bigint UNSIGNED NOT NULL,
  `dogid` int NOT NULL,
  `userid` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `favs`
--

INSERT INTO `favs` (`id`, `dogid`, `userid`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2024-06-04 04:54:51', '2024-06-04 04:54:51'),
(2, 3, 1, '2024-06-04 05:15:10', '2024-06-04 05:15:10'),
(4, 1, 2, '2024-06-04 16:01:23', '2024-06-04 16:01:23');

-- --------------------------------------------------------

--
-- 資料表結構 `msgs`
--

CREATE TABLE `msgs` (
  `id` int NOT NULL,
  `dogid` int NOT NULL,
  `userid` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `messagetxt` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `ID` int NOT NULL,
  `firstName` varchar(32) DEFAULT NULL,
  `lastName` varchar(32) DEFAULT NULL,
  `username` varchar(16) NOT NULL,
  `userRole` varchar(32) NOT NULL,
  `about` text,
  `dateRegistered` datetime DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(32) DEFAULT NULL,
  `passwordSalt` varchar(16) DEFAULT NULL,
  `email` varchar(64) NOT NULL,
  `avatarURL` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`ID`, `firstName`, `lastName`, `username`, `userRole`, `about`, `dateRegistered`, `password`, `passwordSalt`, `email`, `avatarURL`) VALUES
(1, 'Carol', 'Chan', 'carol', 'admin', 'carol chan', '2024-06-01 16:50:27', '123456789', NULL, 'carol@example.com', NULL),
(2, NULL, NULL, 'Ken', 'user', NULL, '2024-06-02 16:56:46', 'Ken123', NULL, 'Ken123@example.com', ' '),
(3, NULL, NULL, 'Man', 'admin', NULL, '2024-06-02 17:00:17', 'Man123', NULL, 'Man@example.com', ' '),
(4, NULL, NULL, 'sato', 'admin', NULL, '2024-06-03 05:31:37', 'sato123', NULL, 'sato@example.com', ' ');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `dogs`
--
ALTER TABLE `dogs`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `userID` (`userID`);

--
-- 資料表索引 `favs`
--
ALTER TABLE `favs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `NoDuplicateFav` (`dogid`,`userid`),
  ADD KEY `fk_userid` (`userid`);

--
-- 資料表索引 `msgs`
--
ALTER TABLE `msgs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dogid` (`dogid`),
  ADD KEY `userid` (`userid`),
  ADD KEY `username` (`username`);

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `dogs`
--
ALTER TABLE `dogs`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `favs`
--
ALTER TABLE `favs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `msgs`
--
ALTER TABLE `msgs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `dogs`
--
ALTER TABLE `dogs`
  ADD CONSTRAINT `dogs_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`ID`);

--
-- 資料表的限制式 `favs`
--
ALTER TABLE `favs`
  ADD CONSTRAINT `fk_dogid` FOREIGN KEY (`dogid`) REFERENCES `dogs` (`ID`),
  ADD CONSTRAINT `fk_userid` FOREIGN KEY (`userid`) REFERENCES `users` (`ID`);

--
-- 資料表的限制式 `msgs`
--
ALTER TABLE `msgs`
  ADD CONSTRAINT `msgs_ibfk_1` FOREIGN KEY (`dogid`) REFERENCES `dogs` (`ID`),
  ADD CONSTRAINT `msgs_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`ID`),
  ADD CONSTRAINT `msgs_ibfk_3` FOREIGN KEY (`username`) REFERENCES `users` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
