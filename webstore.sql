-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 27. 10:36
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `webstore`
--
CREATE DATABASE IF NOT EXISTS `webstore` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `webstore`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetroleclaims`
--

CREATE TABLE `aspnetroleclaims` (
  `Id` int(11) NOT NULL,
  `RoleId` varchar(255) NOT NULL,
  `ClaimType` longtext DEFAULT NULL,
  `ClaimValue` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetroles`
--

CREATE TABLE `aspnetroles` (
  `Id` varchar(255) NOT NULL,
  `Name` varchar(256) DEFAULT NULL,
  `NormalizedName` varchar(256) DEFAULT NULL,
  `ConcurrencyStamp` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `aspnetroles`
--

INSERT INTO `aspnetroles` (`Id`, `Name`, `NormalizedName`, `ConcurrencyStamp`) VALUES
('d29e64e1-f118-4d0b-b99d-5cc961bf337c', 'Admin', 'ADMIN', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserclaims`
--

CREATE TABLE `aspnetuserclaims` (
  `Id` int(11) NOT NULL,
  `UserId` varchar(255) NOT NULL,
  `ClaimType` longtext DEFAULT NULL,
  `ClaimValue` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserlogins`
--

CREATE TABLE `aspnetuserlogins` (
  `LoginProvider` varchar(255) NOT NULL,
  `ProviderKey` varchar(255) NOT NULL,
  `ProviderDisplayName` longtext DEFAULT NULL,
  `UserId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserroles`
--

CREATE TABLE `aspnetuserroles` (
  `UserId` varchar(255) NOT NULL,
  `RoleId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `aspnetuserroles`
--

INSERT INTO `aspnetuserroles` (`UserId`, `RoleId`) VALUES
('adc60f8e-94e6-4411-abd2-b1827ce06c74', 'd29e64e1-f118-4d0b-b99d-5cc961bf337c');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetusers`
--

CREATE TABLE `aspnetusers` (
  `Id` varchar(255) NOT NULL,
  `UserName` varchar(256) DEFAULT NULL,
  `NormalizedUserName` varchar(256) DEFAULT NULL,
  `Email` varchar(256) DEFAULT NULL,
  `NormalizedEmail` varchar(256) DEFAULT NULL,
  `EmailConfirmed` tinyint(1) NOT NULL,
  `PasswordHash` longtext DEFAULT NULL,
  `SecurityStamp` longtext DEFAULT NULL,
  `ConcurrencyStamp` longtext DEFAULT NULL,
  `PhoneNumber` longtext DEFAULT NULL,
  `PhoneNumberConfirmed` tinyint(1) NOT NULL,
  `TwoFactorEnabled` tinyint(1) NOT NULL,
  `LockoutEnd` datetime DEFAULT NULL,
  `LockoutEnabled` tinyint(1) NOT NULL,
  `AccessFailedCount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `aspnetusers`
--

INSERT INTO `aspnetusers` (`Id`, `UserName`, `NormalizedUserName`, `Email`, `NormalizedEmail`, `EmailConfirmed`, `PasswordHash`, `SecurityStamp`, `ConcurrencyStamp`, `PhoneNumber`, `PhoneNumberConfirmed`, `TwoFactorEnabled`, `LockoutEnd`, `LockoutEnabled`, `AccessFailedCount`) VALUES
('adc60f8e-94e6-4411-abd2-b1827ce06c74', 'zoli01', 'ZOLI01', 'zoli01@kkszki.hu', 'ZOLI01@KKSZKI.HU', 0, 'AQAAAAIAAYagAAAAEHyVL6LavQz4UKo0DXInX3zeOKrn0XpEAcGtWxx/Val/i+qOBvBxmkV+Z0UDagRaZg==', 'YR7LEZ2Y4MWNAACUICTXCWY3OR7YK4RG', '9169fc71-d60e-4b1f-998c-d04b2503c22d', NULL, 0, 0, NULL, 1, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetusertokens`
--

CREATE TABLE `aspnetusertokens` (
  `UserId` varchar(255) NOT NULL,
  `LoginProvider` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Value` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `categories`
--

CREATE TABLE `categories` (
  `Id` int(11) NOT NULL,
  `CategoryName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `categories`
--

INSERT INTO `categories` (`Id`, `CategoryName`) VALUES
(1, 'Button'),
(2, 'Connectors'),
(3, 'Moduls'),
(4, 'Equipments');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `products`
--

CREATE TABLE `products` (
  `Id` int(11) NOT NULL,
  `Name` varchar(20) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `Price` int(11) DEFAULT NULL,
  `CategoryId` int(11) DEFAULT NULL,
  `Picture` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `products`
--

INSERT INTO `products` (`Id`, `Name`, `Description`, `Price`, `CategoryId`, `Picture`) VALUES
(1, 'Start button', '19 mm-es LED indítógomb engine start felirattal.\r\nLED színek: piros és zöld.\r\nHáz színe: fekete\r\nMagasfejű verzió.\r\nMax áram: 3A.\r\n', 3000, 1, 'http://pro2025.nhely.hu/img/start_button.png'),
(2, 'Horn button', '19 mm-es LED dudagomb duda piktogrammal.\r\nLED színek: piros és zöld.\r\nHáz színe: fekete\r\nMagasfejű verzió.\r\nMax áram: 3A.', 3000, 1, 'http://pro2025.nhely.hu/img/horn_button.png'),
(3, 'ACC button', '19 mm-es LED gyújtás gomb villám piktogrammal.\r\nLED színek: piros és zöld.\r\nHáz színe: fekete\r\nMagasfejű verzió.\r\nMax áram: 3A.', 3000, 1, 'http://pro2025.nhely.hu/img/acc_button.png'),
(4, 'Cooling fan button', '19 mm-es LED hűtőventillátor gomb ventillátor piktogrammal.\r\nLED színek: piros és zöld.\r\nHáz színe: fekete\r\nMagasfejű verzió.\r\nMax áram: 3A.', 3000, 1, 'http://pro2025.nhely.hu/img/cooling_fan_button.png'),
(5, 'Heater fan button', '19 mm-es LED fűtés gomb fűtés piktogrammal.\r\nLED színek: piros és zöld.\r\nHáz színe: fekete\r\nMagasfejű verzió.\r\nMax áram: 3A.', 3000, 1, 'http://pro2025.nhely.hu/img/heater_fan_button.png'),
(6, 'Parking light button', '19 mm-es LED helyzetjelző gomb helyzetjelző piktogrammal.\r\nLED színek: piros és zöld.\r\nHáz színe: fekete\r\nMagasfejű verzió.\r\nMax áram: 3A.\r\n', 3000, 1, 'http://pro2025.nhely.hu/img/parking_light_button.png'),
(7, 'Low beam button', '19 mm-es LED tompított gomb tompított piktogrammal.\r\nLED színek: piros és zöld.\r\nHáz színe: fekete\r\nMagasfejű verzió.\r\nMax áram: 3A.', 3000, 1, 'http://pro2025.nhely.hu/img/low_beam_button.png'),
(8, 'High beam button', '19 mm-es LED reflektor gomb reflektor piktogrammal.\r\nLED színek: piros és zöld.\r\nHáz színe: fekete\r\nMagasfejű verzió.\r\nMax áram: 3A.', 3000, 1, 'http://pro2025.nhely.hu/img/high_beam_button.png'),
(9, 'Lightbar button', '19 mm-es LED lámpasor gomb dupla fényszóró piktogrammal.\r\nLED színek: piros és zöld.\r\nHáz színe: fekete\r\nMagasfejű verzió.\r\nMax áram: 3A.\r\n', 3000, 1, 'http://pro2025.nhely.hu/img/lightbar_button.png'),
(10, 'Hazard light button', '19 mm-es LED vészvillogó gomb vészvillogó piktogrammal.\r\nLED színek: piros és zöld.\r\nHáz színe: fekete\r\nMagasfejű verzió.\r\nMax áram: 3A.', 3000, 1, 'http://pro2025.nhely.hu/img/hazard_light_button.png'),
(11, 'Co-driver light butt', '19 mm-es LED navigátor lámpa gomb lámpa piktogrammal.\r\nLED színek: piros és zöld.\r\nHáz színe: fekete\r\nMagasfejű verzió.\r\nMax áram: 3A.', 3000, 1, 'http://pro2025.nhely.hu/img/co_driver_lamp_button.png'),
(12, '6,3 mm plug female', '6,3 mm széles hőálló acél-nikkel saru.', 170, 2, ''),
(13, 'Button socket', NULL, 1200, NULL, 'http://pro2025.nhely.hu/img/button_socket.png'),
(14, 'DT connector 2 pin', 'AWG 16-14 folytonos terhelés 13 A pinenként.\r\nVízállóság IP68.\r\nKábel-kábel kapcsolat.\r\nPárban kapható (anya-apa).\r\n', 1500, 2, ''),
(15, 'DT connector 3 pin', 'AWG 16-14 folytonos terhelés 13 A pinenként.\r\nVízállóság IP68.\r\nKábel-kábel kapcsolat.\r\nPárban kapható (anya-apa).\r\n', 1500, 2, ''),
(16, 'DT connector 4 pin', 'AWG 16-14 folytonos terhelés 13 A pinenként.\r\nVízállóság IP68.\r\nKábel-kábel kapcsolat.\r\nPárban kapható (anya-apa).\r\n', 2700, 2, ''),
(17, 'Dt connector 6 pin', 'AWG 16-14 folytonos terhelés 13 A pinenként.\r\nVízállóság IP68.\r\nKábel-kábel kapcsolat.\r\nPárban kapható (anya-apa).\r\n', 3500, 2, ''),
(18, 'DT csatlakozó 8 pin', 'AWG 16-14 folytonos terhelés 13 A pinenként.\r\nVízállóság IP68.\r\nKábel-kábel kapcsolat.\r\nPárban kapható (anya-apa).\r\n', 4500, 2, ''),
(19, 'DT connector 12 pin', 'AWG 16-14 folytonos terhelés 13 A pinenként.\r\nVízállóság IP68.\r\nKábel-kábel kapcsolat.\r\nPárban kapható (anya-apa).\r\n', 6000, 2, ''),
(20, 'DT pin male', '10 db / csomag.', 4600, 2, ''),
(21, 'DT pin female', '10 db / csomag.', 4600, 2, ''),
(22, 'EDC_0', 'Bemutatjuk (a jelenleg prototípus) Energiaelosztó Áramkörünket, amelyet kifejezetten motorsport járművek számára terveztünk. Ez a modul 18 relével rendelkezik, biztosított bemeneti és kimeneti csatlakozásokkal, beleértve 6 biztosított be-/kimenetet, amelyeket egyetlen „Gyújtás” bemenet aktivál, valamint 3 negatív vezérlésű bemenetet, amelyek saját kimenetekkel rendelkeznek. Emellett 9 pozitív vezérlésű bemenet található hozzájuk tartozó kimenetekkel. A modul tartalmaz továbbá 3 bemenetet és kimenetet kizárólag a biztosíték funkcióra, lehetőséget adva három különböző típusú biztosíték befogadására. A rendszer egy M8 akkumulátor bemenettel, valamint relékhez és visszajelző LED-ekhez szükséges földelő csatlakozásokkal van ellátva, az összes csatlakozás 6,3 mm-es hím csatlakozóval történik az áramköri lap oldaláról.\r\nTerhelhetőség: 120 A', 70000, 3, ''),
(23, 'EDC_0 holder', 'EDC_0-hez tartozó modultartó.', 3000, 4, ''),
(24, 'Button box', '19 mm-es nyomógombokhoz tartozó doboz.\r\n11 gomb befogadására alkalmas.\r\n4 db állítható rozsdamentes lábbal.\r\nEgyedi igény esetén lépj kapcsolatba velünk.', 8000, 4, ''),
(25, 'Button holder for st', '3 küllős 90 mm mélységű sportkormányhoz.\r\n3-3 gomb, melyek küllőre szerelhetőek.\r\nPárban kapható.\r\nEgyedi igény esetén lépj velünk kapcsolatba.', 6000, 4, '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `__efmigrationshistory`
--

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `__efmigrationshistory`
--

INSERT INTO `__efmigrationshistory` (`MigrationId`, `ProductVersion`) VALUES
('20250324082239_CreateDB', '8.0.14');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `aspnetroleclaims`
--
ALTER TABLE `aspnetroleclaims`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_AspNetRoleClaims_RoleId` (`RoleId`);

--
-- A tábla indexei `aspnetroles`
--
ALTER TABLE `aspnetroles`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `RoleNameIndex` (`NormalizedName`);

--
-- A tábla indexei `aspnetuserclaims`
--
ALTER TABLE `aspnetuserclaims`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_AspNetUserClaims_UserId` (`UserId`);

--
-- A tábla indexei `aspnetuserlogins`
--
ALTER TABLE `aspnetuserlogins`
  ADD PRIMARY KEY (`LoginProvider`,`ProviderKey`),
  ADD KEY `IX_AspNetUserLogins_UserId` (`UserId`);

--
-- A tábla indexei `aspnetuserroles`
--
ALTER TABLE `aspnetuserroles`
  ADD PRIMARY KEY (`UserId`,`RoleId`),
  ADD KEY `IX_AspNetUserRoles_RoleId` (`RoleId`);

--
-- A tábla indexei `aspnetusers`
--
ALTER TABLE `aspnetusers`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `UserNameIndex` (`NormalizedUserName`),
  ADD KEY `EmailIndex` (`NormalizedEmail`);

--
-- A tábla indexei `aspnetusertokens`
--
ALTER TABLE `aspnetusertokens`
  ADD PRIMARY KEY (`UserId`,`LoginProvider`,`Name`);

--
-- A tábla indexei `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `CategoryId` (`CategoryId`);

--
-- A tábla indexei `__efmigrationshistory`
--
ALTER TABLE `__efmigrationshistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `aspnetroleclaims`
--
ALTER TABLE `aspnetroleclaims`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `aspnetuserclaims`
--
ALTER TABLE `aspnetuserclaims`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `categories`
--
ALTER TABLE `categories`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `products`
--
ALTER TABLE `products`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `aspnetroleclaims`
--
ALTER TABLE `aspnetroleclaims`
  ADD CONSTRAINT `FK_AspNetRoleClaims_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `aspnetroles` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `aspnetuserclaims`
--
ALTER TABLE `aspnetuserclaims`
  ADD CONSTRAINT `FK_AspNetUserClaims_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `aspnetuserlogins`
--
ALTER TABLE `aspnetuserlogins`
  ADD CONSTRAINT `FK_AspNetUserLogins_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `aspnetuserroles`
--
ALTER TABLE `aspnetuserroles`
  ADD CONSTRAINT `FK_AspNetUserRoles_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `aspnetroles` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_AspNetUserRoles_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `aspnetusertokens`
--
ALTER TABLE `aspnetusertokens`
  ADD CONSTRAINT `FK_AspNetUserTokens_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`CategoryId`) REFERENCES `categories` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
