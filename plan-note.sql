-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Фев 09 2017 г., 12:55
-- Версия сервера: 10.1.9-MariaDB
-- Версия PHP: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `plan-note`
--

-- --------------------------------------------------------

--
-- Структура таблицы `list`
--

CREATE TABLE `list` (
  `id` int(10) UNSIGNED NOT NULL,
  `type_id` int(10) UNSIGNED NOT NULL,
  `title` char(100) NOT NULL,
  `text` varchar(20000) NOT NULL,
  `order_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `list`
--

INSERT INTO `list` (`id`, `type_id`, `title`, `text`, `order_id`) VALUES
(1, 3, 'Training', 'No pain - no gain', 1),
(2, 3, '2\nlines', 'TEXT', 2),
(3, 2, 'Example', '123', 1),
(4, 2, 'English', 'https://audio-class.ru/articles/english-fast.php\nhttp://englex.ru/how-to-start-learning-english/\nhttps://ororo.tv/ru\nhttps://show-english.com/\nhttp://wordmemo.ru/\nhttp://www.bbc.co.uk/radio\n', 2),
(5, 2, 'PHP', 'http://php.net\nhttps://www.hackerrank.com', 3),
(6, 3, 'TITLE', 'TEXT', 3),
(7, 4, 'Agenda', '1. \n2.\n3.\n...', 1),
(8, 4, 'Plan for a year', '1. Find a job\n2. Find a nice girl\n3...', 2),
(9, 4, 'Mini goals', '1. buy shorts\n2. buy chocolate\n3...', 3);

-- --------------------------------------------------------

--
-- Структура таблицы `list_clone`
--

CREATE TABLE `list_clone` (
  `id` int(10) UNSIGNED NOT NULL,
  `type_id` int(10) UNSIGNED NOT NULL,
  `title` char(100) NOT NULL,
  `text` varchar(20000) NOT NULL,
  `order_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `list_clone`
--

INSERT INTO `list_clone` (`id`, `type_id`, `title`, `text`, `order_id`) VALUES
(1, 1, 'TITLE', 'TEXT', 1),
(2, 2, 'TITLE', 'TEXT', 1),
(3, 2, 'TITLE', 'TEXT', 2),
(4, 3, 'TITLE', 'TEXT', 1),
(5, 3, 'TITLE', 'TEXT', 2),
(6, 3, 'TITLE', 'TEXT', 3),
(7, 4, 'TITLE', 'TEXT', 1),
(8, 4, 'TITLE', 'TEXT', 2),
(9, 4, 'TITLE', 'TEXT', 3),
(10, 4, 'TITLE', 'TEXT', 4);

-- --------------------------------------------------------

--
-- Структура таблицы `list_remove`
--

CREATE TABLE `list_remove` (
  `id` int(10) UNSIGNED NOT NULL,
  `type_id` int(10) UNSIGNED NOT NULL,
  `title` char(100) NOT NULL,
  `text` varchar(20000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `types`
--

CREATE TABLE `types` (
  `id` int(10) UNSIGNED NOT NULL,
  `type` char(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `type`
--

INSERT INTO `types` (`id`, `type`) VALUES
(1, 'Mentality'),
(2, 'Professionalism'),
(3, 'Physical'),
(4, 'Goals');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `list`
--
ALTER TABLE `list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_id` (`type_id`);

--
-- Индексы таблицы `list_remove`
--
ALTER TABLE `list_remove`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `type`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `list`
--
ALTER TABLE `list`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT для таблицы `list_remove`
--
ALTER TABLE `list_remove`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `types`
--
ALTER TABLE `types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `list`
--
ALTER TABLE `list`
  ADD CONSTRAINT `list_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
