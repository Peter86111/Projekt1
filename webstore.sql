-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 05. 19:49
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

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
('d29e64e1-f118-4d0b-b99d-5cc961bf337c', 'Admin', 'ADMIN', NULL),
('e4f37f91-84d6-42c0-a28e-c0d34e2ddbf0', 'User', 'USER', NULL);

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
('2314fffb-afa6-4115-9cca-7765281bbbde', 'd29e64e1-f118-4d0b-b99d-5cc961bf337c'),
('b48bcb3b-b90e-4fb3-8b96-8fc70f036731', 'e4f37f91-84d6-42c0-a28e-c0d34e2ddbf0');

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
('2314fffb-afa6-4115-9cca-7765281bbbde', 'Taurus8602', 'TAURUS8602', 'molnarp1@kkszki.hu', 'MOLNARP1@KKSZKI.HU', 0, 'AQAAAAIAAYagAAAAEEVQxPSCwTvCpsnajSPZhpXzP8/PNGTn0ArhI0XOUVHFUULqXcU7NNcH8LE1lSVafQ==', 'EVOSOHGMXCEH65ZQTX5DMPKFNAG6COID', 'e6b888db-50f1-4e09-9c58-304dd750a453', NULL, 0, 0, NULL, 1, 0),
('b48bcb3b-b90e-4fb3-8b96-8fc70f036731', 'Zoltan2004', 'ZOLTAN2004', 'molnarp1@kkszki.hu', 'MOLNARP1@KKSZKI.HU', 0, 'AQAAAAIAAYagAAAAEKpAafWvRiKBrd+0zuxwVvJHhK4hUcLowXALCHhgwyMEtIgsiNgDj30C5OulIQXRXA==', '4ZOS5L4B3MGKJHKQRNRUFAXLCTR6IGV7', 'd9f77d80-4f2b-438f-87be-264ddc78d7cc', NULL, 0, 0, NULL, 1, 0);

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
(1, 'Start gomb', '19 mm-es LED indítógomb engine start felirattal. LED színek: piros és zöld. Ház színe: fekete Magasfejű verzió. Max áram: 3A.', 3000, 1, 'http://pro2025.nhely.hu/img/start_button.png'),
(2, 'Duda gomb', '19 mm-es LED dudagomb duda piktogrammal. LED színek: piros és zöld. Ház színe: fekete Magasfejű verzió. Max áram: 3A.', 3000, 1, 'http://pro2025.nhely.hu/img/horn_button.png'),
(3, 'Gyújtás gomb', '19 mm-es LED gyújtás gomb villám piktogrammal. LED színek: piros és zöld. Ház színe: fekete Magasfejű verzió. Max áram: 3A.', 3000, 1, 'http://pro2025.nhely.hu/img/acc_button.png'),
(4, 'Hűtőventillátor gomb', '19 mm-es LED hűtőventillátor gomb ventillátor piktogrammal. LED színek: piros és zöld. Ház színe: fekete Magasfejű verzió. Max áram: 3A.', 3000, 1, 'http://pro2025.nhely.hu/img/cooling_fan_button.png'),
(5, 'Fűtés gomb', '19 mm-es LED fűtés gomb fűtés piktogrammal. LED színek: piros és zöld. Ház színe: fekete Magasfejű verzió. Max áram: 3A.', 3000, 1, 'http://pro2025.nhely.hu/img/heater_fan_button.png'),
(6, 'Helyzetjelző gomb', '19 mm-es LED helyzetjelző gomb helyzetjelző piktogrammal. LED színek: piros és zöld. Ház színe: fekete Magasfejű verzió. Max áram: 3A.', 3000, 1, 'http://pro2025.nhely.hu/img/parking_light_button.png'),
(7, 'Tompított gomb', '19 mm-es LED tompított gomb tompított piktogrammal. LED színek: piros és zöld. Ház színe: fekete Magasfejű verzió. Max áram: 3A.', 3000, 1, 'http://pro2025.nhely.hu/img/low_beam_button.png'),
(8, 'Reflektor gomb', '19 mm-es LED reflektor gomb reflektor piktogrammal. LED színek: piros és zöld. Ház színe: fekete Magasfejű verzió. Max áram: 3A.', 3000, 1, 'http://pro2025.nhely.hu/img/high_beam_button.png'),
(9, 'Lámpasor gomb', '19 mm-es LED lámpasor gomb dupla fényszóró piktogrammal. LED színek: piros és zöld. Ház színe: fekete Magasfejű verzió. Max áram: 3A.', 3000, 1, 'http://pro2025.nhely.hu/img/lightbar_button.png'),
(10, 'Vészvillogó gomb', '19 mm-es LED vészvillogó gomb vészvillogó piktogrammal. LED színek: piros és zöld. Ház színe: fekete Magasfejű verzió. Max áram: 3A.', 3000, 1, 'http://pro2025.nhely.hu/img/hazard_light_button.png'),
(11, 'Navigátorlámpa gomb', '19 mm-es LED navigátor lámpa gomb lámpa piktogrammal. LED színek: piros és zöld. Ház színe: fekete Magasfejű verzió. Max áram: 3A.', 3000, 1, 'http://pro2025.nhely.hu/img/co_driver_lamp_button.png'),
(12, '6,3 mm saru', '6,3mm Hőálló saru AMP acél-nikkel  Hőálló saru kategória', 170, 4, 'http://pro2025.nhely.hu/img/63mmsaru.png'),
(13, 'Gombcsatlakozó', 'Pin-ek száma: 5 Kábelek hossza: 14cm Vezetékek jelölése: 20AWG Feszültség max: 300V Áramerősség max: 20A', 1200, 2, 'http://pro2025.nhely.hu/img/button_socket.png'),
(14, 'DT csatlakozó 2 pin', 'AWG 16-14 folytonos terhelés 13 A pinenként. Vízállóság IP68. Kábel-kábel kapcsolat. Párban kapható (anya-apa).', 1500, 2, 'http://pro2025.nhely.hu/img/dt2.jpg'),
(15, 'DT csatlakozó 3 pin', 'AWG 16-14 folytonos terhelés 13 A pinenként. Vízállóság IP68. Kábel-kábel kapcsolat. Párban kapható (anya-apa).', 1500, 2, 'http://pro2025.nhely.hu/img/dt3.jpg'),
(16, 'DT connector 4 pin', 'AWG 16-14 folytonos terhelés 13 A pinenként. Vízállóság IP68. Kábel-kábel kapcsolat. Párban kapható (anya-apa).', 2700, 2, 'http://pro2025.nhely.hu/img/dt4.jpg'),
(17, 'Dt csatlakozó 6 pin', 'AWG 16-14 folytonos terhelés 13 A pinenként. Vízállóság IP68. Kábel-kábel kapcsolat. Párban kapható (anya-apa).', 3500, 2, 'http://pro2025.nhely.hu/img/dt6.jpg'),
(18, 'DT csatlakozó 8 pin', 'AWG 16-14 folytonos terhelés 13 A pinenként. Vízállóság IP68. Kábel-kábel kapcsolat. Párban kapható (anya-apa).', 4500, 2, 'http://pro2025.nhely.hu/img/dt8.jpg'),
(19, 'DT csatlakozó 12 pin', 'AWG 16-14 folytonos terhelés 13 A pinenként. Vízállóság IP68. Kábel-kábel kapcsolat. Párban kapható (anya-apa).', 6000, 2, 'http://pro2025.nhely.hu/img/dt12.jpg'),
(20, 'DT pin apa', 'Anyaga: nikkel', 4600, 2, 'http://pro2025.nhely.hu/img/dtplugm.jpg'),
(21, 'DT pin anya', 'Anyaga: nikkel', 4600, 2, 'http://pro2025.nhely.hu/img/dtplugfemale.jpg'),
(22, 'EDC_0', 'Bemutatjuk (a jelenleg prototípus) Energiaelosztó Áramkörünket, amelyet kifejezetten motorsport járművek számára terveztünk. Ez a modul 18 relével rendelkezik, biztosított bemeneti és kimeneti csatlakozásokkal, beleértve 6 biztosított be-/kimenetet, amelyeket egyetlen „Gyújtás” bemenet aktivál, valamint 3 negatív vezérlésű bemenetet, amelyek saját kimenetekkel rendelkeznek. Emellett 9 pozitív vezérlésű bemenet található hozzájuk tartozó kimenetekkel. A modul tartalmaz továbbá 3 bemenetet és kimenetet kizárólag a biztosíték funkcióra, lehetőséget adva három különböző típusú biztosíték befogadására. A rendszer egy M8 akkumulátor bemenettel, valamint relékhez és visszajelző LED-ekhez szükséges földelő csatlakozásokkal van ellátva, az összes csatlakozás 6,3 mm-es hím csatlakozóval történik az áramköri lap oldaláról. Terhelhetőség: 120 A', 70000, 3, 'http://pro2025.nhely.hu/img/edc.jpg'),
(23, 'EDC_0 tartó', 'EDC_0-hez tartozó modultartó.', 3000, 4, 'http://pro2025.nhely.hu/img/edcholder.jpg'),
(24, 'Gombtartó doboz', '19 mm-es nyomógombokhoz tartozó doboz. 11 gomb befogadására alkalmas. 4 db állítható rozsdamentes lábbal. Egyedi igény esetén lépj kapcsolatba velünk.', 8000, 4, 'http://pro2025.nhely.hu/img/buttonbox.png'),
(25, 'Gombtartó kormányhoz', '3 küllős 90 mm mélységű sportkormányhoz. 3-3 gomb, melyek küllőre szerelhetőek. Párban kapható. Egyedi igény esetén lépj velünk kapcsolatba.', 6000, 4, 'http://pro2025.nhely.hu/img/kormany.png');

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
