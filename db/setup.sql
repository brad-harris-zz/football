-- MySQL dump 10.13  Distrib 5.7.22, for Linux (x86_64)
--
-- Host: localhost    Database: football
-- ------------------------------------------------------
-- Server version	5.7.22-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `conferences`
--

DROP TABLE IF EXISTS `conferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conferences` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `league_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `league_id` (`league_id`),
  CONSTRAINT `conferences_ibfk_1` FOREIGN KEY (`league_id`) REFERENCES `leagues` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conferences`
--

LOCK TABLES `conferences` WRITE;
/*!40000 ALTER TABLE `conferences` DISABLE KEYS */;
INSERT INTO `conferences` VALUES (1,'NFC',1),(2,'AFC',1),(3,'AAC',2),(4,'ACC',2),(5,'Big 10',2),(6,'Big XII',2),(7,'Conference USA',2),(8,'Independent',2),(9,'MAC',2),(10,'Mountain West',2),(11,'Pac 12',2),(12,'SEC',2),(13,'Sun Belt',2),(14,'FCS',2),(15,'DII',2);
/*!40000 ALTER TABLE `conferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `home_team_id` int(11) DEFAULT NULL,
  `season` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `home_team_id` (`home_team_id`),
  CONSTRAINT `games_ibfk_1` FOREIGN KEY (`home_team_id`) REFERENCES `teams` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leagues`
--

DROP TABLE IF EXISTS `leagues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `leagues` (
  `id` int(11) NOT NULL,
  `name` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leagues`
--

LOCK TABLES `leagues` WRITE;
/*!40000 ALTER TABLE `leagues` DISABLE KEYS */;
INSERT INTO `leagues` VALUES (1,'NFL'),(2,'NCAA');
/*!40000 ALTER TABLE `leagues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scores`
--

DROP TABLE IF EXISTS `scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `score` int(11) DEFAULT NULL,
  `week` int(11) DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL,
  `game_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `team_id` (`team_id`),
  KEY `game_id` (`game_id`),
  CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`),
  CONSTRAINT `scores_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scores`
--

LOCK TABLES `scores` WRITE;
/*!40000 ALTER TABLE `scores` DISABLE KEYS */;
/*!40000 ALTER TABLE `scores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) DEFAULT NULL,
  `owner` varchar(32) DEFAULT NULL,
  `conference_id` int(11) DEFAULT NULL,
  `color` varchar(7) DEFAULT NULL,
  `icon` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `conference_id` (`conference_id`),
  CONSTRAINT `teams_ibfk_1` FOREIGN KEY (`conference_id`) REFERENCES `conferences` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=254 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES (1,'49ers',NULL,1,NULL,NULL),(2,'Bears',NULL,1,NULL,NULL),(3,'Buccaneers',NULL,1,NULL,NULL),(4,'Cardinals',NULL,1,NULL,NULL),(5,'Cowboys',NULL,1,NULL,NULL),(6,'Eagles',NULL,1,NULL,NULL),(7,'Falcons',NULL,1,NULL,NULL),(8,'Giants',NULL,1,NULL,NULL),(9,'Lions',NULL,1,NULL,NULL),(10,'Packers',NULL,1,NULL,NULL),(11,'Panthers',NULL,1,NULL,NULL),(12,'Rams',NULL,1,NULL,NULL),(13,'Redskins',NULL,1,NULL,NULL),(14,'Saints',NULL,1,NULL,NULL),(15,'Seahawks',NULL,1,NULL,NULL),(16,'Vikings',NULL,1,NULL,NULL),(17,'Bengals',NULL,2,NULL,NULL),(18,'Bills',NULL,2,NULL,NULL),(19,'Broncos',NULL,2,NULL,NULL),(20,'Browns',NULL,2,NULL,NULL),(21,'Chargers',NULL,2,NULL,NULL),(22,'Chiefs',NULL,2,NULL,NULL),(23,'Colts',NULL,2,NULL,NULL),(24,'Dolphins',NULL,2,NULL,NULL),(25,'Jaguars',NULL,2,NULL,NULL),(26,'Jets',NULL,2,NULL,NULL),(27,'Patriots',NULL,2,NULL,NULL),(28,'Raiders',NULL,2,NULL,NULL),(29,'Ravens',NULL,2,NULL,NULL),(30,'Steelers',NULL,2,NULL,NULL),(31,'Texans',NULL,2,NULL,NULL),(32,'Titans',NULL,2,NULL,NULL),(33,'Cincinnati',NULL,3,'#141414','/static/cincinnati.70.png'),(34,'East Carolina',NULL,3,'#6944a0','/static/east-carolina.70.png'),(35,'Houston',NULL,3,'#CC0000','/static/houston.70.png'),(36,'Memphis',NULL,3,'#0A1691','/static/memphis.70.png'),(37,'Navy',NULL,3,'#333366','/static/navy.70.png'),(38,'SMU',NULL,3,'#e51932','/static/smu.70.png'),(39,'South Florida',NULL,3,'#006747','/static/south-fla.70.png'),(40,'Temple',NULL,3,'#9e1b32','/static/temple.70.png'),(41,'Tulane',NULL,3,'#005737','/static/tulane.70.png'),(42,'Tulsa',NULL,3,'#003bb2','/static/tulsa.70.png'),(43,'Central FLorida',NULL,3,'#bba378','/static/ucf.70.png'),(44,'UConn',NULL,3,'#000066','/static/uconn.70.png'),(45,'Boston College',NULL,4,'#98002e','/static/boston-college.70.png'),(46,'Clemson',NULL,4,'#F66733','/static/clemson.70.png'),(47,'Duke',NULL,4,'#00529b','/static/duke.70.png'),(48,'Florida State',NULL,4,'#540115','/static/florida-st.70.png'),(49,'Georgia Tech',NULL,4,'#b09465','/static/georgia-tech.70.png'),(50,'Louisville',NULL,4,'#AD0000','/static/louisville.70.png'),(51,'Miami (FL)',NULL,4,'#005030','/static/miami-fl.70.png'),(52,'NC State',NULL,4,'#CC0000','/static/north-carolina-st.70.png'),(53,'North Carolina',NULL,4,'#8db9e5','/static/north-carolina.70.png'),(54,'Pittsburgh',NULL,4,'#002144','/static/pittsburgh.70.png'),(55,'Syracuse',NULL,4,'#ff5113','/static/syracuse.70.png'),(56,'Virginia',NULL,4,'#002147','/static/virginia.70.png'),(57,'Virginia Tech',NULL,4,'#660000','/static/virginia-tech.70.png'),(58,'Wake Forest',NULL,4,'#141414','/static/wake-forest.70.png'),(59,'Illinois',NULL,5,'#e0322a','/static/illinois.70.png'),(60,'Indiana',NULL,5,'#9e1b32','/static/indiana.70.png'),(61,'Iowa',NULL,5,'#141414','/static/iowa.70.png'),(62,'Maryland',NULL,5,'#e31836','/static/maryland.70.png'),(63,'Michigan',NULL,5,'#003976','/static/michigan.70.png'),(64,'Michigan State',NULL,5,'#18453B','/static/michigan-st.70.png'),(65,'Minnesota',NULL,5,'#872434','/static/minnesota.70.png'),(66,'Nebraska',NULL,5,'#cc092f','/static/nebraska.70.png'),(67,'Northwestern',NULL,5,'#512698','/static/northwestern.70.png'),(68,'Ohio State',NULL,5,'#990000','/static/ohio-st.70.png'),(69,'Penn State',NULL,5,'#002147','/static/penn-st.70.png'),(70,'Purdue',NULL,5,'#141414','/static/purdue.70.png'),(71,'Rutgers',NULL,5,'#d21034','/static/rutgers.70.png'),(72,'Wisconsin',NULL,5,'#be0f34','/static/wisconsin.70.png'),(73,'Baylor',NULL,6,'#083a27','/static/baylor.70.png'),(74,'Iowa State',NULL,6,'#A71930','/static/iowa-st.70.png'),(75,'Kansas',NULL,6,'#006ab5','/static/kansas.70.png'),(76,'Kansas State',NULL,6,'#502d7f','/static/kansas-st.70.png'),(77,'Oklahoma',NULL,6,'#B30838','/static/oklahoma.70.png'),(78,'Oklahoma State',NULL,6,'#FF6600','/static/oklahoma-st.70.png'),(79,'TCU',NULL,6,'#34297a','/static/tcu.70.png'),(80,'Texas',NULL,6,'#CC5500','/static/texas.70.png'),(81,'Texas Tech',NULL,6,'#CC0000','/static/texas-tech.70.png'),(82,'West Virginia',NULL,6,'#00447c','/static/west-virginia.70.png'),(83,'Charlotte',NULL,7,'#00693e','/static/charlotte.70.png'),(84,'Florida Atlantic',NULL,7,'#002D62','/static/fla-atlantic.70.png'),(85,'Florida International',NULL,7,'#c79d1f','/static/fiu.70.png'),(86,'Louisiana Tech',NULL,7,'#002596','/static/louisiana-tech.70.png'),(87,'Marshall',NULL,7,'#11461b','/static/marshall.70.png'),(88,'Middle Tennessee',NULL,7,'#0047aa','/static/middle-tenn.70.png'),(89,'North Texas',NULL,7,'#00622e','/static/north-texas.70.png'),(90,'Old Dominion',NULL,7,'#004879','/static/old-dominion.70.png'),(91,'Rice',NULL,7,'#003f82','/static/rice.70.png'),(92,'Southern Miss',NULL,7,'#f0bc28','/static/southern-miss.70.png'),(93,'UAB',NULL,7,'#007c60','/static/uab.70.png'),(94,'UTSA',NULL,7,'#fe7502','/static/utsa.70.png'),(95,'UTEP',NULL,7,'#eb5a0d','/static/utep.70.png'),(96,'Western Kentucky',NULL,7,'#d41a00','/static/western-ky.70.png'),(97,'Army',NULL,8,'#ccb284','/static/army.70.png'),(98,'BYU',NULL,8,'#002255','/static/byu.70.png'),(99,'Liberty',NULL,8,'#15264e','/static/liberty.70.png'),(100,'New Mexico State',NULL,8,'#882345','/static/new-mexico-st.70.png'),(101,'Notre Dame',NULL,8,'#002b5c','/static/notre-dame.70.png'),(102,'UMass',NULL,8,'#881c1c','/static/massachusetts.70.png'),(103,'Akron',NULL,9,'#00285e','/static/akron.70.png'),(104,'Ball State',NULL,9,'#d90400','/static/ball-st.70.png'),(105,'Bowling Green',NULL,9,'#4f2c1d','/static/bowling-green.70.png'),(106,'Buffalo',NULL,9,'#004179','/static/buffalo.70.png'),(107,'Central Michigan',NULL,9,'#630237','/static/central-mich.70.png'),(108,'Eastern Michigan',NULL,9,'#007c4e','/static/eastern-mich.70.png'),(109,'Kent State',NULL,9,'#002664','/static/kent-st.70.png'),(110,'Miami (OH)',NULL,9,'#d51a00','/static/miami-oh.70.png'),(111,'Northern Illinois',NULL,9,'#b42836','/static/northern-ill.70.png'),(112,'Ohio',NULL,9,'#336633','/static/ohio.70.png'),(113,'Toledo',NULL,9,'#0e2144','/static/toledo.70.png'),(114,'Western Michigan',NULL,9,'#874b00','/static/western-mich.70.png'),(115,'Air Force',NULL,10,'#0033a1','/static/air-force.70.png'),(116,'Boise State',NULL,10,'#0033a1','/static/boise-st.70.png'),(117,'Colorado State',NULL,10,'#005643','/static/colorado-st.70.png'),(118,'Fresno State',NULL,10,'#005495','/static/fresno-st.70.png'),(119,'Hawaii',NULL,10,'#015838','/static/hawaii.70.png'),(120,'Nevada',NULL,10,'#003366','/static/nevada.70.png'),(121,'New Mexico',NULL,10,'#b71234','/static/new-mexico.70.png'),(122,'San Diego State',NULL,10,'#A81933','/static/san-diego-st.70.png'),(123,'San Jose State',NULL,10,'#5492cc','/static/san-jose-st.70.png'),(124,'UNLV',NULL,10,'#cc092f','/static/unlv.70.png'),(125,'Utah State',NULL,10,'#00264a','/static/utah-st.70.png'),(126,'Wyoming',NULL,10,'#f6c028','/static/wyoming.70.png'),(127,'Arizona',NULL,11,'#003366','/static/arizona.70.png'),(128,'Arizona State',NULL,11,'#8b2346','/static/arizona-st.70.png'),(129,'Cal',NULL,11,'#00325b','/static/california.70.png'),(130,'Colorado',NULL,11,'#CFB87C','/static/colorado.70.png'),(131,'Oregon',NULL,11,'#004F27','/static/oregon.70.png'),(132,'Oregon State',NULL,11,'#e24912','/static/oregon-st.70.png'),(133,'Stanford',NULL,11,'#8C1515','/static/stanford.70.png'),(134,'UCLA',NULL,11,'#0072cf','/static/ucla.70.png'),(135,'Southern California',NULL,11,'#990000','/static/southern-california.70.png'),(136,'Utah',NULL,11,'#cc0000','/static/utah.70.png'),(137,'Washington',NULL,11,'#39275B','/static/washington.70.png'),(138,'Washington State',NULL,11,'#981e32','/static/washington-st.70.png'),(139,'Alabama',NULL,12,'#a32136','/static/alabama.70.png'),(140,'Arkansas',NULL,12,'#BE0F34','/static/arkansas.70.png'),(141,'Auburn',NULL,12,'#f58025','/static/auburn.70.png'),(142,'Florida',NULL,12,'#003488','/static/florida.70.png'),(143,'Georgia',NULL,12,'#CC0000','/static/georgia.70.png'),(144,'Kentucky',NULL,12,'#005DAA','/static/kentucky.70.png'),(145,'LSU',NULL,12,'#461D7C','/static/lsu.70.png'),(146,'Mississippi State',NULL,12,'#660000','/static/mississippi-st.70.png'),(147,'Missouri',NULL,12,'#F1B82D','/static/missouri.70.png'),(148,'Ole Miss',NULL,12,'#002663','/static/ole-miss.70.png'),(149,'South Carolina',NULL,12,'#73000A','/static/south-carolina.70.png'),(150,'Tennessee',NULL,12,'#f77f00','/static/tennessee.70.png'),(151,'Texas A&M',NULL,12,'#500000','/static/texas-am.70.png'),(152,'Vanderbilt',NULL,12,'#141414','/static/vanderbilt.70.png'),(153,'Appalachian State',NULL,13,'#d6ac00','/static/appalachian-st.70.png'),(154,'Arkansas State',NULL,13,'#c7202a','/static/arkansas-st.70.png'),(155,'Coastal Carolina',NULL,13,'#00838c','/static/coastal-caro.70.png'),(156,'Georgia Southern',NULL,13,'#000066','/static/ga-southern.70.png'),(157,'Georgia State',NULL,13,'#74a4cc','/static/georgia-st.70.png'),(158,'Louisiana',NULL,13,'#993333','/static/louisiana.70.png'),(159,'South Alabama',NULL,13,'#eb1e00','/static/south-ala.70.png'),(160,'Texas State',NULL,13,'#5a2c34','/static/texas-st.70.png'),(161,'Troy',NULL,13,'#872434','/static/troy.70.png'),(162,'UL Monroe',NULL,13,'#bc9131','/static/la-monroe.70.png'),(163,'Albany',NULL,14,'#CBAF42','/static/albany-ny.70.png'),(164,'Southeastern La.',NULL,14,'#f3b800','/static/southeastern-la.70.png'),(165,'Citadel',NULL,14,'#132e5e','/static/citadel.70.png'),(166,'Towson',NULL,14,'#d7aa01','/static/towson.70.png'),(167,'Western Illinois',NULL,14,'#663399','/static/western-ill.70.png'),(168,'Incarnate Word',NULL,15,'#d72c23','/static/incarnate-word.70.png'),(169,'Southeast Mo. St.',NULL,14,'#e03a3e','/static/southeast-mo-st.70.png'),(170,'Grambling',NULL,14,'#be9a02','/static/grambling.70.png'),(171,'Indiana State',NULL,14,'#0046ad','/static/indiana-st.70.png'),(172,'Montana State',NULL,14,'#0077bc','/static/montana-st.70.png'),(173,'Jackson State',NULL,14,'#002654','/static/jackson-st.70.png'),(174,'South Dakota',NULL,14,'#ff2310','/static/south-dakota.70.png'),(175,'South Dakota State',NULL,14,'#0039a6','/static/south-dakota-st.70.png'),(176,'UT Martin',NULL,14,'#ff6900','/static/ut-martin.70.png'),(177,'Murray State',NULL,14,'#e4bb00','/static/murray-st.70.png'),(178,'Wofford',NULL,14,'#95774c','/static/wofford.70.png'),(179,'Alabama State',NULL,14,'#f19d17','/static/alabama-st.70.png'),(180,'SFA',NULL,14,'#330066','/static/stephen-f-austin.70.png'),(181,'Villanova',NULL,14,'#003366','/static/villanova.70.png'),(182,'South Carolina St.',NULL,14,'#951123','/static/south-carolina-st.70.png'),(183,'Howard',NULL,14,'#ef3e43','/static/howard.70.png'),(184,'Montana',NULL,14,'#8b2346','/static/montana.70.png'),(185,'Southern Utah',NULL,14,'#d8240e','/static/southern-utah.70.png'),(186,'Abilene Christian',NULL,15,'#68278e','/static/abilene-christian.70.png'),(187,'Florida A&M',NULL,14,'#006b25','/static/florida-am.70.png'),(188,'UC Davis',NULL,14,'#002855','/static/uc-davis.70.png'),(189,'Furman',NULL,14,'#34327c','/static/furman.70.png'),(190,'Houston Baptist',NULL,14,'#023795','/static/houston-baptist.70.png'),(191,'NC A&T',NULL,14,'#ffb82b','/static/nc-at.70.png'),(192,'McNeese',NULL,14,'#004988','/static/mcneese-st.70.png'),(193,'Alcorn State',NULL,14,'#703690','/static/alcorn-st.70.png'),(194,'Rhode Island',NULL,14,'#004990','/static/rhode-island.70.png'),(195,'Eastern Illinois',NULL,14,'#0084be','/static/eastern-ill.70.png'),(196,'Delaware State',NULL,14,'#279fcc','/static/delaware-st.70.png'),(197,'Northern Arizona',NULL,14,'#003b76','/static/northern-ariz.70.png'),(198,'Bethune-Cookman',NULL,14,'#f5ba00','/static/bethune-cookman.70.png'),(199,'Idaho State',NULL,14,'#ff7800','/static/idaho-st.70.png'),(200,'Lehigh',NULL,14,'#653600','/static/lehigh.70.png'),(201,'Portland State',NULL,14,'#004319','/static/portland-st.70.png'),(202,'Illinois State',NULL,14,'#ca1134','/static/illinois-st.70.png'),(203,'Elon',NULL,14,'#98002e','/static/elon.70.png'),(204,'Eastern Washington',NULL,14,'#e60900','/static/eastern-wash.70.png'),(205,'Maine',NULL,14,'#6696be','/static/maine.70.png'),(206,'Wagner',NULL,14,'#336356','/static/wagner.70.png'),(207,'Northwestern St.',NULL,14,'#54209e','/static/northwestern-st.70.png'),(208,'Richmond',NULL,14,'#000066','/static/richmond.70.png'),(209,'Savannah State',NULL,14,'#f65800','/static/savannah-st.70.png'),(210,'Monmouth',NULL,14,'#002147','/static/monmouth.70.png'),(211,'Samford',NULL,14,'#003362','/static/samford.70.png'),(212,'Tennessee Tech',NULL,14,'#d7aa01','/static/tennessee-tech.70.png'),(213,'NC Central',NULL,14,'#880023','/static/nc-central.70.png'),(214,'Southern Illinois',NULL,14,'#872e3f','/static/southern-ill.70.png'),(215,'UNI',NULL,14,'#4a3394','/static/uni.70.png'),(216,'Austin Peay',NULL,14,'#C41E3A','/static/austin-peay.70.png'),(217,'Alabama A&M',NULL,14,'#a41e4c','/static/alabama-am.70.png'),(218,'Duquesne',NULL,14,'#000144','/static/duquesne.70.png'),(219,'Nicholls State',NULL,14,'#afb7ba','/static/nicholls-st.70.png'),(220,'Central Arkansas',NULL,14,'#53327d','/static/central-ark.70.png'),(221,'Texas Southern',NULL,14,'#70283e','/static/texas-southern.70.png'),(222,'Sacramento State',NULL,14,'#007441','/static/sacramento-st.70.png'),(223,'VMI',NULL,14,'#c41700','/static/vmi.70.png'),(224,'Morgan State',NULL,14,'#fc5a14','/static/morgan-st.70.png'),(225,'William & Mary',NULL,14,'#116633','/static/william-mary.70.png'),(226,'Campbell',NULL,14,'#fa9223','/static/campbell.70.png'),(227,'Mercer',NULL,14,'#e45c06','/static/mercer.70.png'),(228,'Tennessee State',NULL,14,'#003183','/static/tennessee-st.70.png'),(229,'Arkansas Pine Bluff',NULL,14,'#f29103','/static/ark-pine-bluff.70.png'),(230,'Colgate',NULL,14,'#a50334','/static/colgate.70.png'),(231,'Missouri State',NULL,14,'#491317','/static/missouri-st.70.png'),(232,'Kennesaw State',NULL,14,'#ecbb09','/static/kennesaw-st.70.png'),(233,'Eastern Kentucky',NULL,14,'#8b0341','/static/eastern-ky.70.png'),(234,'James Madison',NULL,14,'#484191','/static/james-madison.70.png'),(235,'Idaho',NULL,14,'#b58e5b','/static/idaho.70.png'),(236,'North Dakota',NULL,14,'#009A44','/static/north-dakota.70.png'),(237,'Stony Brook',NULL,14,'#990000','/static/stony-brook.70.png'),(238,'Weber State',NULL,14,'#5f3c99','/static/weber-st.70.png'),(239,'New Hampshire',NULL,14,'#002162','/static/new-hampshire.70.png'),(240,'Western NM',NULL,15,'#532d83','/static/western-nm.70.png'),(241,'Youngstown State',NULL,14,'#d41a00','/static/youngstown-st.70.png'),(242,'Prairie View A&M',NULL,14,'#803e99','/static/prairie-view.70.png'),(243,'Chattanooga',NULL,14,'#f2c100','/static/chattanooga.70.png'),(244,'Lamar University',NULL,14,'#ec2a31','/static/lamar.70.png'),(245,'Lafayette',NULL,14,'#9a122a','/static/lafayette.70.png'),(246,'Charleston Southern',NULL,14,'#17467a','/static/charleston-so.70.png'),(247,'Southern',NULL,14,'#76b2dd','/static/southern-u.70.png'),(248,'Holy Cross',NULL,14,'#4f318b','/static/holy-cross.70.png'),(249,'Fordham',NULL,14,'#a90332','/static/fordham.70.png'),(250,'East Tennesee State',NULL,14,'#041E42','/static/east-tenn-st.70.png'),(251,'Gardner-Webb',NULL,14,'#c41230','/static/gardner-webb.70.png'),(252,'Cent. Conn. St.',NULL,14,'#004385','/static/central-conn-st.70.png'),(253,'Western Carolina',NULL,14,'#d5a977','/static/western-caro.70.png');
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-21 22:41:22
