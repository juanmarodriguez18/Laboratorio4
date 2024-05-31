-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: instrumentosdb
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria_instrumento`
--

DROP TABLE IF EXISTS `categoria_instrumento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria_instrumento` (
  `Id` bigint NOT NULL,
  `Denominacion` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_instrumento`
--

LOCK TABLES `categoria_instrumento` WRITE;
/*!40000 ALTER TABLE `categoria_instrumento` DISABLE KEYS */;
INSERT INTO `categoria_instrumento` VALUES (1,'Cuerda'),(2,'Viento'),(3,'Percusión'),(4,'Teclado'),(5,'Electrónico');
/*!40000 ALTER TABLE `categoria_instrumento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instrumento`
--

DROP TABLE IF EXISTS `instrumento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instrumento` (
  `instrumento_id` int NOT NULL AUTO_INCREMENT,
  `instrumento` varchar(255) DEFAULT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `modelo` varchar(20) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `costo_envio` varchar(50) DEFAULT NULL,
  `cantidad_vendida` int DEFAULT NULL,
  `descripcion` text,
  `categoria_id` bigint DEFAULT NULL,
  PRIMARY KEY (`instrumento_id`),
  KEY `fk_idCategoria` (`categoria_id`),
  CONSTRAINT `fk_idCategoria` FOREIGN KEY (`categoria_id`) REFERENCES `categoria_instrumento` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instrumento`
--

LOCK TABLES `instrumento` WRITE;
/*!40000 ALTER TABLE `instrumento` DISABLE KEYS */;
INSERT INTO `instrumento` VALUES (1,'Mandolina Instrumento Musical Stagg Sunburst','Stagg','M20','https://i.postimg.cc/4dQphswN/nro10.jpg',2450.00,'G',28,'Estas viendo una excelente mandolina de la marca Stagg, con un sonido muy dulce, tapa aros y fondo de tilo, y diapasón de palisandro. Es un instrumento acústico (no se enchufa) de cuerdas dobles (4 pares) con la caja ovalada y cóncava, y el mástil corto. Su utilización abarca variados ámbitos, desde rock, folk, country y ensambles experimentales.',1),(2,'Pandereta Pandero Instrumento Musical ','DyM ventas','32 sonajas','https://i.postimg.cc/prVzf41Q/nro9.jpg',325.00,'150',10,'1 Pandereta - 32 sonajas metálicas. Más de 8 años vendiendo con 100 % de calificaciones POSITIVAS y clientes satisfechos !! ',3),(3,'Triangulo Musical 24 Cm Percusion','LBP','24','https://i.postimg.cc/CxRC6yMm/nro8.jpg',260.00,'250',3,'Triangulo Musical de 24 Centímetros De Acero. ENVIOS POR CORREO O ENCOMIENDA: Se le deberán adicionar $40 en concepto de Despacho y el Costo del envío se abonará al recibir el producto en Terminal, Sucursal OCA o Domicilio',3),(4,'Bar Chimes Lp Cortina Musical 72 Barras ','FM','LATIN','https://i.postimg.cc/3RTgRdXc/nro7.jpg',2250.00,'G',2,'BARCHIME CORTINA MUSICAL DE 25 BARRAS LATIN CUSTOM. Emitimos factura A y B',3),(5,'Shekeres. Instrumento. Música. Artesanía. ','Azalea Artesanías','Cuentas de madera','https://i.postimg.cc/tJ9trY7x/nro6.jpg',850.00,'300',5,'Las calabazas utilizadas para nuestras artesanías son sembradas y cosechadas por nosotros, quienes seleccionamos el mejor fruto para garantizar la calidad del producto y ofrecerle algo creativo y original.',3),(6,'Antiguo Piano Aleman Con Candelabros. ','Neumeyer','Stratus','https://i.postimg.cc/8zxR2yjD/nro3.jpg',17000.00,'2000',0,'Buen dia! Sale a la venta este Piano Alemán Neumeyer con candelabros incluidos. Tiene una talla muy bonita en la madera. Una pieza de calidad.',4),(7,'Guitarra Ukelele Infantil Grande 60cm','GUITARRA','UKELELE','https://i.postimg.cc/nccGBjy8/nro4.jpg',500.00,'G',5,'Material: Plástico smil madera 4 Cuerdas longitud: 60cm, el mejor regalo para usted, su familia y amigos, adecuado para 3-18 años de edad',1),(8,'Teclado Organo Electronico Musical Instrumento 54 Teclas ','GADNIC','T01','https://i.postimg.cc/8cwdxNrn/nro2.jpg',2250.00,'G',1375,'Organo Electrónico GADNIC T01. Display de Led. 54 Teclas. 100 Timbres / 100 Ritmos. 4 1/2 octavas. 8 Percusiones. 8 Canciones de muestra. Grabación y reproducción. Entrada para Micrófono. Salida de Audio (Auriculares / Amplificador). Vibrato. Sustain Incluye Atril Apoya partitura y Micrófono. Dimensiones: 84,5 x 32,5 x 11 cm',5),(9,'Instrumentos De Percusión Niños Set Musical Con Estuche ','KNIGHT','LB17','https://i.postimg.cc/mZSSPN6N/nro1.jpg',2700.00,'300',15,'Estas viendo un excelente y completísimo set de percusion para niños con estuche rígido, equipado con los instrumentos mas divertidos! De gran calidad y sonoridad. Ideal para jardines, escuelas primarias, musicoterapeutas o chicos que se quieran iniciar en la música de la mejor manera. Es un muy buen producto que garantiza entretenimiento en cualquier casa o reunión, ya que esta equipado para que varias personas al mismo tiempo estén tocando un instrumento.',3),(10,'Batería Musical Infantil Juguete Niño 9 Piezas Palillos ','Bateria','Infantil','https://i.postimg.cc/k58QqxbS/nro5.jpg',850.00,'250',380,'DESCRIPCIÓN: DE 1 A 3 AÑOS. EL SET INCLUYE 5 TAMBORES, PALILLOS Y EL PLATILLO TAL CUAL LAS FOTOS. SONIDOS REALISTAS Y FÁCIL DE MONTAR. MEDIDAS: 40X20X46 CM',3),(11,'Guitarra electrica','Fender','Stratocaster','https://101db.com.ar/13761-large_default/guitarra-electrica-fender-squier-sonic-stratocaster-2-tonos-sunburst-mastil-de-arce.jpg',2500.00,'600',10,'Una guitarra eléctrica icónica',1),(19,'Mesa Mezcladora Dj','Pioneer','g554','https://st1.novomusica.com/60891-thickbox_default/denon-prime4.jpg',8500.00,'300',8,'Excelente Mesa Mezcladora para Dj',5);
/*!40000 ALTER TABLE `instrumento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `fecha_pedido` date NOT NULL,
  `total_pedido` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (5,'2024-04-24',100.50),(6,'2024-05-13',3035.00),(7,'2024-05-13',0.00),(8,'2024-05-13',17000.00),(9,'2024-05-13',5025.00),(10,'2024-05-13',8150.00),(11,'2024-05-13',22750.00),(12,'2024-05-13',17500.00),(13,'2024-05-13',19710.00),(14,'2024-05-13',18350.00),(15,'2024-05-13',2450.00),(16,'2024-05-13',2450.00),(17,'2024-05-13',2775.00),(18,'2024-05-13',2775.00),(19,'2024-05-13',3035.00),(20,'2024-05-13',3035.00),(21,'2024-05-13',3675.00),(22,'2024-05-14',24200.00),(23,'2024-05-14',57350.00),(24,'2024-05-14',40435.00),(25,'2024-05-19',48985.00),(26,'2024-05-19',585.00),(27,'2024-05-19',3035.00),(28,'2024-05-28',2775.00),(29,'2024-05-29',2450.00),(30,'2024-05-30',6550.00),(31,'2024-05-30',130850.00),(32,'2024-05-30',85000.00),(33,'2024-05-30',29000.00),(34,'2023-01-01',100.00),(35,'2023-01-02',150.00),(36,'2023-01-03',120.00),(37,'2023-01-04',200.00),(38,'2023-01-05',180.00),(39,'2023-01-06',90.00),(40,'2023-01-07',110.00),(41,'2023-01-08',130.00),(42,'2023-01-09',170.00),(43,'2023-01-10',250.00),(44,'2023-02-01',180.00),(45,'2023-02-02',220.00),(46,'2023-02-03',150.00),(47,'2023-02-04',190.00),(48,'2023-02-05',210.00),(49,'2023-02-06',140.00),(50,'2023-02-07',170.00),(51,'2023-02-08',200.00),(52,'2023-02-09',230.00),(53,'2023-02-10',260.00),(54,'2023-03-01',200.00),(55,'2023-03-02',250.00),(56,'2023-03-03',180.00),(57,'2023-03-04',210.00),(58,'2023-03-05',230.00),(59,'2023-03-06',160.00),(60,'2023-03-07',190.00),(61,'2023-03-08',220.00),(62,'2023-03-09',260.00),(63,'2023-03-10',280.00),(64,'2023-04-01',220.00),(65,'2023-04-02',260.00),(66,'2023-04-03',200.00),(67,'2023-05-01',300.00),(68,'2023-05-02',280.00),(69,'2023-05-03',320.00),(70,'2023-05-04',270.00),(71,'2023-05-05',310.00),(72,'2023-05-06',290.00),(73,'2023-05-07',330.00),(74,'2023-05-08',260.00),(75,'2023-06-01',350.00),(76,'2023-06-02',380.00),(77,'2023-06-03',360.00),(78,'2023-06-04',390.00),(79,'2023-06-05',370.00),(80,'2023-06-06',400.00),(81,'2023-06-07',380.00),(82,'2023-06-08',410.00),(83,'2023-06-09',370.00),(84,'2023-06-10',420.00),(85,'2023-06-11',390.00),(86,'2023-06-12',430.00),(87,'2023-06-13',400.00),(88,'2023-06-14',440.00),(89,'2023-06-15',410.00),(90,'2023-07-01',450.00),(91,'2023-07-02',480.00),(92,'2023-07-03',470.00),(93,'2023-07-04',490.00),(94,'2023-07-05',460.00),(95,'2023-07-06',500.00),(96,'2023-07-07',480.00),(97,'2023-07-08',510.00),(98,'2023-07-09',490.00),(99,'2023-07-10',520.00),(100,'2023-07-11',500.00),(101,'2023-07-12',530.00),(102,'2023-07-13',510.00),(103,'2023-07-14',540.00),(104,'2023-07-15',520.00),(105,'2023-07-16',550.00),(106,'2023-07-17',530.00),(107,'2023-07-18',560.00),(108,'2023-07-19',540.00),(109,'2023-07-20',570.00),(110,'2023-08-01',580.00),(111,'2023-08-02',560.00),(112,'2023-08-03',590.00),(113,'2023-08-04',570.00),(114,'2023-08-05',600.00),(115,'2023-08-06',580.00),(116,'2023-08-07',610.00),(117,'2023-08-08',590.00),(118,'2023-08-09',620.00),(119,'2023-08-10',600.00),(120,'2023-08-11',630.00),(121,'2023-08-12',610.00),(122,'2024-05-30',5650.00),(123,'2024-05-30',2450.00),(124,'2024-05-30',58350.00);
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido_detalle`
--

DROP TABLE IF EXISTS `pedido_detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido_detalle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `pedido_id` bigint DEFAULT NULL,
  `instrumento_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pedido_id` (`pedido_id`),
  KEY `instrumento_id` (`instrumento_id`),
  CONSTRAINT `pedido_detalle_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedido` (`id`),
  CONSTRAINT `pedido_detalle_ibfk_2` FOREIGN KEY (`instrumento_id`) REFERENCES `instrumento` (`instrumento_id`)
) ENGINE=InnoDB AUTO_INCREMENT=185 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_detalle`
--

LOCK TABLES `pedido_detalle` WRITE;
/*!40000 ALTER TABLE `pedido_detalle` DISABLE KEYS */;
INSERT INTO `pedido_detalle` VALUES (1,3,5,1),(3,1,6,1),(4,1,6,2),(5,1,6,3),(6,1,8,6),(7,1,9,1),(8,1,9,2),(9,1,9,4),(10,1,10,7),(11,1,10,8),(12,2,10,9),(13,2,11,1),(14,1,11,5),(15,1,11,6),(16,1,12,6),(17,1,12,7),(18,1,13,1),(19,1,13,3),(20,1,13,6),(21,1,14,5),(22,1,14,6),(23,1,14,7),(24,1,15,1),(25,1,16,1),(26,1,17,1),(27,1,17,2),(28,1,18,1),(29,1,18,2),(30,1,19,1),(31,1,19,2),(32,1,19,3),(33,1,20,1),(34,1,20,2),(35,1,20,3),(36,1,21,2),(37,1,21,10),(38,1,21,11),(39,5,22,1),(40,4,22,2),(41,4,22,5),(42,6,22,7),(43,5,22,10),(44,4,23,8),(45,1,23,10),(46,2,23,11),(47,5,23,19),(48,1,24,1),(49,1,24,3),(50,1,24,2),(51,1,24,5),(52,1,24,4),(53,1,24,6),(54,1,24,7),(55,1,24,8),(56,1,24,9),(57,1,24,10),(58,1,24,11),(59,1,24,19),(60,3,25,1),(61,3,25,2),(62,1,25,3),(63,1,25,4),(64,1,25,5),(65,1,25,6),(66,2,25,7),(67,1,25,8),(68,1,25,9),(69,1,25,10),(70,2,25,11),(71,1,25,19),(72,1,26,3),(73,1,26,2),(74,1,27,1),(75,1,27,2),(76,1,27,3),(77,1,28,1),(78,1,28,2),(79,1,29,1),(80,1,30,7),(81,1,30,9),(82,1,30,10),(83,1,30,11),(84,1,31,10),(85,1,31,11),(86,15,31,19),(87,5,32,6),(88,5,33,11),(89,3,33,10),(90,1,33,9),(91,5,33,8),(92,5,34,1),(93,3,34,2),(94,2,34,3),(95,4,34,4),(96,6,34,5),(97,3,34,6),(98,5,34,7),(99,2,34,8),(100,4,34,9),(101,7,34,10),(102,4,44,2),(103,3,44,3),(104,5,44,4),(105,2,44,5),(106,6,44,6),(107,4,44,7),(108,3,44,8),(109,5,44,9),(110,7,44,10),(111,4,44,11),(112,3,54,1),(113,5,54,3),(114,4,54,4),(115,3,54,5),(116,7,54,6),(117,5,54,7),(118,4,54,8),(119,6,54,9),(120,8,54,10),(121,5,54,11),(122,4,64,1),(123,3,64,2),(124,5,64,3),(125,4,67,2),(126,3,67,3),(127,5,67,4),(128,2,67,5),(129,6,67,6),(130,4,67,7),(131,3,67,8),(132,5,67,9),(133,4,75,3),(134,3,75,4),(135,5,75,5),(136,2,75,6),(137,6,75,7),(138,4,75,8),(139,3,75,9),(140,5,75,10),(141,4,75,11),(142,3,75,1),(143,6,75,2),(144,4,75,3),(145,5,75,4),(146,7,75,5),(147,4,75,6),(148,4,90,4),(149,3,90,5),(150,5,90,6),(151,2,90,7),(152,6,90,8),(153,4,90,9),(154,3,90,10),(155,5,90,11),(156,4,90,1),(157,3,90,2),(158,6,90,3),(159,4,90,4),(160,5,90,5),(161,7,90,6),(162,4,90,7),(163,3,90,8),(164,5,90,9),(165,7,90,10),(166,4,90,11),(167,6,90,1),(168,4,110,2),(169,3,110,3),(170,5,110,4),(171,2,110,5),(172,6,110,6),(173,4,110,7),(174,3,110,8),(175,5,110,9),(176,7,110,10),(177,4,110,11),(178,6,110,1),(179,1,122,4),(180,4,122,5),(181,1,123,1),(182,1,124,4),(183,6,124,5),(184,3,124,6);
/*!40000 ALTER TABLE `pedido_detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(255) DEFAULT NULL,
  `clave` varchar(255) NOT NULL,
  `rol` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombreUsuario` (`nombre_usuario`),
  CONSTRAINT `usuario_chk_1` CHECK ((`rol` in (_utf8mb4'Admin',_utf8mb4'Operador',_utf8mb4'Visor')))
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'admin','$2a$10$D9QcO.A2y9UVi1QzVv5OeORFwSzEzA1cFGTg8D2Kn1TgphcfvV/O2','Admin'),(2,'operador','$2a$10$7QVXGx5ZDDjJ5vsm9DP6EO1ISptXt/ptQdF0fD2TxZTcXe1Oa9S9y','Operador'),(3,'visor','$2a$10$IGXn9bPdMJ14DDh8EJv0xuCwA0xY8iZbQ.OWZxPsoYrygIuDJd3fO','Visor'),(4,'pepe','pepeloco','Admin'),(5,'juanito22sd3','$2a$12$N3eOW0tXtQa8RcrOiTDZAuJkLlA2qAs9nCaDn5kovgCqDihe3Pat6','admin'),(6,'juanitotomba18','$2a$12$ZFVY0Ttr29KSbbx/mq5qBu8y8S8cPYFnt.WT5lJTTUKZfzLq0kOiW','Admin'),(7,'juanmatombino18','$2a$12$Rw81Rvc/1IexjwuB5RodeO7hfyKcsUCMdFyi.nBzH4dM66WrQaZ0K','Admin'),(8,'Juanma123','$2a$12$uHWCrQBRyiIT1.XOcKxGCuYLSLoj92swHDoY/EfM0cP.h5zmkJyfy','Admin'),(9,'juanitomba12','$2a$12$OGEyq8MoD2RmggxlxoW.ROSg.mbGCKgA3HkjG4cTmh0ucCAdaKruy','Visor'),(10,'jejejoja12','$2a$12$pvKPgUPMh0TeI/KlG3jscOQ5J.X6v/f9NLjlMrEtTe4N1laEWhwIC','Visor'),(11,'Pepegrillo','$2a$12$Ws7kELT9FB8EwX1O1WMulO2lnTARzsP66udn9QCgv0PzdWPk7An.i','Admin'),(12,'Operador123','$2a$12$lXSJDowFe.T86D.KJikU7.Wqr3GOsKg7loB.xqrIGhAlgCGIEJrQ6','Operador'),(13,'Visor123','$2a$12$78B832FKw65Fl8/LChcWUuiLar.OFjjfFVCKe5pvNzn3wOCWbpxje','Visor'),(14,'Administrador123','$2a$12$F5m2Y6vx1fc6yENOlVUJEu6URtE2.S4CkHwAvdQ87e95G9qqDvJx2','Admin'),(15,'Pepegrillo123','$2a$12$XteR9Q78T9KnppaRGc3YAuSxhNoxPzscTVxmM5Og4MF1F/Vbthsty','Visor'),(16,'Gerardo123','$2a$12$f78jvpvENjzZ8Spv8Pas/uA6JlThwX.Ql92A9PFx6py/Nwqls5bvq','Admin');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-30 22:36:39
