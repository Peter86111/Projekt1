-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 13. 17:42
-- Kiszolgáló verziója: 10.4.20-MariaDB
-- PHP verzió: 7.3.29

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
-- Tábla szerkezet ehhez a táblához `categories`
--

CREATE TABLE `categories` (
  `Id` int(11) NOT NULL,
  `CategoryName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `IndexPicture` blob NOT NULL,
  `Picture` mediumblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `products`
--

INSERT INTO `products` (`Id`, `Name`, `Description`, `Price`, `CategoryId`, `IndexPicture`, `Picture`) VALUES
(1, 'Start button', '19 mm-es LED indítógomb engine start felirattal.\r\nLED színek: piros és zöld.\r\nHáz színe: fekete\r\nMagasfejű verzió.\r\nMax áram: 3A.\r\n', 3000, 1, '', ''),
(2, 'Horn button', '19 mm-es LED dudagomb duda piktogrammal.\r\nLED színek: piros és zöld.\r\nHáz színe: fekete\r\nMagasfejű verzió.\r\nMax áram: 3A.', 3000, 1, '', ''),
(3, 'ACC button', '19 mm-es LED gyújtás gomb villám piktogrammal.\r\nLED színek: piros és zöld.\r\nHáz színe: fekete\r\nMagasfejű verzió.\r\nMax áram: 3A.', 3000, 1, '', ''),
(4, 'Cooling fan button', '19 mm-es LED hűtőventillátor gomb ventillátor piktogrammal.\r\nLED színek: piros és zöld.\r\nHáz színe: fekete\r\nMagasfejű verzió.\r\nMax áram: 3A.', 3000, 1, '', ''),
(5, 'Heater fan button', '19 mm-es LED fűtés gomb fűtés piktogrammal.\r\nLED színek: piros és zöld.\r\nHáz színe: fekete\r\nMagasfejű verzió.\r\nMax áram: 3A.', 3000, 1, '', ''),
(6, 'Parking light button', '19 mm-es LED helyzetjelző gomb helyzetjelző piktogrammal.\r\nLED színek: piros és zöld.\r\nHáz színe: fekete\r\nMagasfejű verzió.\r\nMax áram: 3A.\r\n', 3000, 1, '', ''),
(7, 'Low beam button', '19 mm-es LED tompított gomb tompított piktogrammal.\r\nLED színek: piros és zöld.\r\nHáz színe: fekete\r\nMagasfejű verzió.\r\nMax áram: 3A.', 3000, 1, '', ''),
(8, 'High beam button', '19 mm-es LED reflektor gomb reflektor piktogrammal.\r\nLED színek: piros és zöld.\r\nHáz színe: fekete\r\nMagasfejű verzió.\r\nMax áram: 3A.', 3000, 1, '', ''),
(9, 'Lightbar button', '19 mm-es LED lámpasor gomb dupla fényszóró piktogrammal.\r\nLED színek: piros és zöld.\r\nHáz színe: fekete\r\nMagasfejű verzió.\r\nMax áram: 3A.\r\n', 3000, 1, '', ''),
(10, 'Hazard light button', '19 mm-es LED vészvillogó gomb vészvillogó piktogrammal.\r\nLED színek: piros és zöld.\r\nHáz színe: fekete\r\nMagasfejű verzió.\r\nMax áram: 3A.', 3000, 1, '', ''),
(11, 'Co-driver light butt', '19 mm-es LED navigátor lámpa gomb lámpa piktogrammal.\r\nLED színek: piros és zöld.\r\nHáz színe: fekete\r\nMagasfejű verzió.\r\nMax áram: 3A.', 3000, 1, '', ''),
(12, '6,3 mm plug female', '6,3 mm széles hőálló acél-nikkel saru.', 170, 2, '', ''),
(13, 'Button socket', NULL, 1200, NULL, '', ''),
(14, 'DT connector 2 pin', 'AWG 16-14 folytonos terhelés 13 A pinenként.\r\nVízállóság IP68.\r\nKábel-kábel kapcsolat.\r\nPárban kapható (anya-apa).\r\n', 1500, 2, '', ''),
(15, 'DT connector 3 pin', 'AWG 16-14 folytonos terhelés 13 A pinenként.\r\nVízállóság IP68.\r\nKábel-kábel kapcsolat.\r\nPárban kapható (anya-apa).\r\n', 1500, 2, '', ''),
(16, 'DT connector 4 pin', 'AWG 16-14 folytonos terhelés 13 A pinenként.\r\nVízállóság IP68.\r\nKábel-kábel kapcsolat.\r\nPárban kapható (anya-apa).\r\n', 2700, 2, '', ''),
(17, 'Dt connector 6 pin', 'AWG 16-14 folytonos terhelés 13 A pinenként.\r\nVízállóság IP68.\r\nKábel-kábel kapcsolat.\r\nPárban kapható (anya-apa).\r\n', 3500, 2, '', ''),
(18, 'DT csatlakozó 8 pin', 'AWG 16-14 folytonos terhelés 13 A pinenként.\r\nVízállóság IP68.\r\nKábel-kábel kapcsolat.\r\nPárban kapható (anya-apa).\r\n', 4500, 2, '', ''),
(19, 'DT connector 12 pin', 'AWG 16-14 folytonos terhelés 13 A pinenként.\r\nVízállóság IP68.\r\nKábel-kábel kapcsolat.\r\nPárban kapható (anya-apa).\r\n', 6000, 2, '', ''),
(20, 'DT pin male', '10 db / csomag.', 4600, 2, '', ''),
(21, 'DT pin female', '10 db / csomag.', 4600, 2, '', ''),
(22, 'EDC_0', 'Bemutatjuk (a jelenleg prototípus) Energiaelosztó Áramkörünket, amelyet kifejezetten motorsport járművek számára terveztünk. Ez a modul 18 relével rendelkezik, biztosított bemeneti és kimeneti csatlakozásokkal, beleértve 6 biztosított be-/kimenetet, amelyeket egyetlen „Gyújtás” bemenet aktivál, valamint 3 negatív vezérlésű bemenetet, amelyek saját kimenetekkel rendelkeznek. Emellett 9 pozitív vezérlésű bemenet található hozzájuk tartozó kimenetekkel. A modul tartalmaz továbbá 3 bemenetet és kimenetet kizárólag a biztosíték funkcióra, lehetőséget adva három különböző típusú biztosíték befogadására. A rendszer egy M8 akkumulátor bemenettel, valamint relékhez és visszajelző LED-ekhez szükséges földelő csatlakozásokkal van ellátva, az összes csatlakozás 6,3 mm-es hím csatlakozóval történik az áramköri lap oldaláról.\r\nTerhelhetőség: 120 A', 70000, 3, '', ''),
(23, 'EDC_0 holder', 'EDC_0-hez tartozó modultartó.', 3000, 4, '', ''),
(24, 'Button box', '19 mm-es nyomógombokhoz tartozó doboz.\r\n11 gomb befogadására alkalmas.\r\n4 db állítható rozsdamentes lábbal.\r\nEgyedi igény esetén lépj kapcsolatba velünk.', 8000, 4, '', ''),
(25, 'Button holder for st', '3 küllős 90 mm mélységű sportkormányhoz.\r\n3-3 gomb, melyek küllőre szerelhetőek.\r\nPárban kapható.\r\nEgyedi igény esetén lépj velünk kapcsolatba.', 6000, 4, '', '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `Id` int(11) NOT NULL,
  `userName` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Role` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexek a kiírt táblákhoz
--

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
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

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
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`CategoryId`) REFERENCES `categories` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
