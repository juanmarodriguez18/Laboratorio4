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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (5,'2024-04-24',100.50),(6,'2024-05-13',3035.00),(7,'2024-05-13',0.00),(8,'2024-05-13',17000.00),(9,'2024-05-13',5025.00),(10,'2024-05-13',8150.00),(11,'2024-05-13',22750.00),(12,'2024-05-13',17500.00),(13,'2024-05-13',19710.00),(14,'2024-05-13',18350.00),(15,'2024-05-13',2450.00),(16,'2024-05-13',2450.00),(17,'2024-05-13',2775.00),(18,'2024-05-13',2775.00),(19,'2024-05-13',3035.00),(20,'2024-05-13',3035.00),(21,'2024-05-13',3675.00);
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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_detalle`
--

LOCK TABLES `pedido_detalle` WRITE;
/*!40000 ALTER TABLE `pedido_detalle` DISABLE KEYS */;
INSERT INTO `pedido_detalle` VALUES (1,3,5,1),(3,1,6,1),(4,1,6,2),(5,1,6,3),(6,1,8,6),(7,1,9,1),(8,1,9,2),(9,1,9,4),(10,1,10,7),(11,1,10,8),(12,2,10,9),(13,2,11,1),(14,1,11,5),(15,1,11,6),(16,1,12,6),(17,1,12,7),(18,1,13,1),(19,1,13,3),(20,1,13,6),(21,1,14,5),(22,1,14,6),(23,1,14,7),(24,1,15,1),(25,1,16,1),(26,1,17,1),(27,1,17,2),(28,1,18,1),(29,1,18,2),(30,1,19,1),(31,1,19,2),(32,1,19,3),(33,1,20,1),(34,1,20,2),(35,1,20,3),(36,1,21,2),(37,1,21,10),(38,1,21,11);
/*!40000 ALTER TABLE `pedido_detalle` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-13 22:48:51
