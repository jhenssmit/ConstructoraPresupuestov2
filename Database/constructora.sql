-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-05-2023 a las 07:07:33
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `constructora`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elementos`
--

CREATE TABLE `elementos` (
  `id_elemento` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `elementos`
--

INSERT INTO `elementos` (`id_elemento`, `nombre`) VALUES
(1, 'Piso'),
(2, 'Techo'),
(3, 'Pared');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idElemento` int(11) NOT NULL,
  `nomMaterial` varchar(150) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precioBajoMate` decimal(10,2) NOT NULL,
  `precioMedioMate` decimal(10,2) NOT NULL,
  `precioAltoMate` decimal(10,2) NOT NULL,
  `precioBajoT` decimal(10,2) NOT NULL,
  `precioMedioT` decimal(10,2) NOT NULL,
  `precioAltoT` decimal(10,2) NOT NULL,
  `fechaEnv` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materiales`
--

CREATE TABLE `materiales` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precioBajo` decimal(10,2) NOT NULL,
  `precioMedio` decimal(10,2) NOT NULL,
  `precioAlto` decimal(10,2) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1,
  `id_elemento` int(11) NOT NULL,
  `totalBajo` decimal(10,2) NOT NULL,
  `totalMedio` decimal(10,2) NOT NULL,
  `totalAlto` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materiales`
--

INSERT INTO `materiales` (`id`, `nombre`, `cantidad`, `precioBajo`, `precioMedio`, `precioAlto`, `estado`, `id_elemento`, `totalBajo`, `totalMedio`, `totalAlto`) VALUES
(1, 'bolsa de clavos', 50, 54.00, 175.00, 225.00, 1, 1, 27.00, 87.50, 112.50),
(2, 'cementos', 2, 17.50, 17.00, 17.00, 1, 3, 0.35, 0.34, 0.34),
(3, 'calaminas', 2, 17.00, 16.00, 15.00, 1, 2, 0.34, 0.32, 0.30),
(7, 'bolsa cemento ', 2, 17.00, 18.00, 20.00, 1, 1, 0.34, 0.36, 0.40),
(8, 'jhens', 2, 17.00, 17.00, 17.00, 1, 1, 0.34, 0.34, 0.34),
(9, 'foco', 2, 17.00, 17.00, 17.00, 1, 2, 0.34, 0.34, 0.34),
(10, 'asasasasaasa', 10, 52.00, 60.00, 62.00, 1, 1, 5.20, 6.00, 6.20),
(11, 'as', 12, 12.00, 12.00, 12.00, 1, 1, 1.44, 1.44, 1.44),
(12, 'asasdasdas', 23, 23.00, 23.00, 23.00, 1, 3, 5.29, 5.29, 5.29);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `rol` varchar(150) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `rol`, `estado`) VALUES
(1, 'Administrador', 1),
(2, 'Arquitecto', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `clave` varchar(100) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `nombre`, `clave`, `id_rol`, `estado`) VALUES
(1, 'admin', 'admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 1, 1),
(2, 'jhens', 'jhens', '7e040973efd95446b9ba8cabc7da2bd0dc176da84fc0aa744e27a2d6c2259e8a', 2, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `elementos`
--
ALTER TABLE `elementos`
  ADD PRIMARY KEY (`id_elemento`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`),
  ADD KEY `idElemento` (`idElemento`);

--
-- Indices de la tabla `materiales`
--
ALTER TABLE `materiales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_elemento` (`id_elemento`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `elementos`
--
ALTER TABLE `elementos`
  MODIFY `id_elemento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `materiales`
--
ALTER TABLE `materiales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `materiales`
--
ALTER TABLE `materiales`
  ADD CONSTRAINT `materiales_ibfk_1` FOREIGN KEY (`id_elemento`) REFERENCES `elementos` (`id_elemento`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
