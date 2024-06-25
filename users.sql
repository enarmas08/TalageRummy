-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 25 juin 2024 à 18:15
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `rummy_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `created_at`) VALUES
(3, 'ahmed', '$2a$05$1im4fTtnGSqK6JWDBD88xue28mcGJaixri7TguVqKDvqsabjH.M8O', 'louisduf230@gmail.com', '2024-06-22 18:41:10'),
(4, 'samrane', '$2a$05$luq73aqT71neYy90WGXj2uskmkQNJ.Y/kT9FRWS/3t/HR8u2GpTPO', 'samrane.youssef@gmail.com', '2024-06-22 18:42:38'),
(5, 'yasser', '$2a$05$noyYdpFafYNbs79cwKiiRuL5bNVp2DhqUaR.noKSeJVbPHqNwgIXW', 'louisduf230@gmail.com', '2024-06-25 15:49:24'),
(6, 'youness', '$2a$05$FaOawOvtN8fi4Xhk45ruhO7t4Q60kQd3zW9AYwBF2VSLCzNv.NF6e', 'louisdsuf230@gmail.com', '2024-06-25 15:50:34'),
(7, 'youness', '$2a$05$mcut7KLmisZCMZayKsjeY.0SvC9d/RbSHvHvMM3yzPQkvGUrBWbrW', 'louisdsuf230@gmail.com', '2024-06-25 15:51:21'),
(8, 'Fatima Zahra', '$2a$05$eZA6XVV4GIds9UBxHF3Juu.Fy1YNpeOsVGilLSnQ8QoG/wArxNqg2', 'samrane.youssef@gmail.com', '2024-06-25 15:51:40');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
