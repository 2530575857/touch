/*
Navicat MySQL Data Transfer

Source Server         : 本地mySQL
Source Server Version : 50556
Source Host           : localhost:3306
Source Database       : an_jv_ke

Target Server Type    : MYSQL
Target Server Version : 50556
File Encoding         : 65001

Date: 2018-06-27 18:03:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin_table`
-- ----------------------------
DROP TABLE IF EXISTS `admin_table`;
CREATE TABLE `admin_table` (
  `ID` varchar(32) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `b_house` bit(1) NOT NULL,
  `b_ad` bit(1) NOT NULL,
  `b_link` bit(1) NOT NULL,
  `b_broker` bit(1) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_table
-- ----------------------------
INSERT INTO `admin_table` VALUES ('8b6d5837d19f4fbeb2d2f63989dc9125', 'bbk', 'e10adc3949ba59abbe56e057f20f883e', '', '', '', '');

-- ----------------------------
-- Table structure for `admin_token_table`
-- ----------------------------
DROP TABLE IF EXISTS `admin_token_table`;
CREATE TABLE `admin_token_table` (
  `ID` varchar(32) NOT NULL,
  `admin_ID` varchar(32) NOT NULL,
  `expires` int(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_token_table
-- ----------------------------
INSERT INTO `admin_token_table` VALUES ('072b28ebcd524050a50a3359e2b53aad', '8b6d5837d19f4fbeb2d2f63989dc9125', '1530007435');
INSERT INTO `admin_token_table` VALUES ('0791686e034c47b49761f2b11c1b0da6', '1', '1530004117');
INSERT INTO `admin_token_table` VALUES ('0bb5b5c8111d4fab9dc628abfb564890', '1', '1530004513');
INSERT INTO `admin_token_table` VALUES ('0c417b4f83c64f7ba2f773dae192f017', '8b6d5837d19f4fbeb2d2f63989dc9125', '1530088809');
INSERT INTO `admin_token_table` VALUES ('1095170656af4e92a700469a87fac55c', '1', '1530006002');
INSERT INTO `admin_token_table` VALUES ('227610b158e34c6db04211d47c639d89', '1', '1530005956');
INSERT INTO `admin_token_table` VALUES ('24f94d4db94a4404b328fc9412185fcb', '8b6d5837d19f4fbeb2d2f63989dc9125', '1530088799');
INSERT INTO `admin_token_table` VALUES ('2bb2d2531ccc4cf3964acbb91f6af9c4', '8b6d5837d19f4fbeb2d2f63989dc9125', '1530088970');
INSERT INTO `admin_token_table` VALUES ('3089e3e3884d4f18bd58297707fae572', '1', '1530006798');
INSERT INTO `admin_token_table` VALUES ('3e6f19dbd0df4cb680c85a8130fe4ac3', '8b6d5837d19f4fbeb2d2f63989dc9125', '1530006886');
INSERT INTO `admin_token_table` VALUES ('43841d5d42894d28b8ef8ef959939500', '1', '1530071910');
INSERT INTO `admin_token_table` VALUES ('464698916bbd486c93b57f7fe3c477a6', '1', '1530063700');
INSERT INTO `admin_token_table` VALUES ('529c82a762f141bc912689e34784ef57', '1', '1530004681');
INSERT INTO `admin_token_table` VALUES ('549061c0a6ce4182b8cb2bf6891951bb', '1', '1530006086');
INSERT INTO `admin_token_table` VALUES ('5649add652bb4910ad81ba46b773b05d', '1', '1530063902');
INSERT INTO `admin_token_table` VALUES ('56b64c9eb64f4098a3c71c42939ebbb1', '1', '1530005276');
INSERT INTO `admin_token_table` VALUES ('5737203751c34e11961ba04bb9759a72', '1', '1530005704');
INSERT INTO `admin_token_table` VALUES ('5799efae97444a7a800f6dde805833e9', '1', '1530065129');
INSERT INTO `admin_token_table` VALUES ('68f395df87344156b929bd931c2e5cfc', '1', '1530073131');
INSERT INTO `admin_token_table` VALUES ('6f5e793a6ebf49eca589d51063b35af2', '8b6d5837d19f4fbeb2d2f63989dc9125', '1530072952');
INSERT INTO `admin_token_table` VALUES ('81529d872ad8462d86bda8e6c1119277', '1', '1530003974');
INSERT INTO `admin_token_table` VALUES ('8180b911a6c54352ba88cf08ed8696b5', '8b6d5837d19f4fbeb2d2f63989dc9125', '1530088779');
INSERT INTO `admin_token_table` VALUES ('84c7c08103244b2791b61a30e570739c', '8b6d5837d19f4fbeb2d2f63989dc9125', '1530006867');
INSERT INTO `admin_token_table` VALUES ('89033a66ed0f4404a8790f7b1a3866a9', '1', '1530005669');
INSERT INTO `admin_token_table` VALUES ('8f4a44511b414daa86ed4a4379cc079e', '8b6d5837d19f4fbeb2d2f63989dc9125', '1530072822');
INSERT INTO `admin_token_table` VALUES ('8fd71e0f835849d1817865e7dce0f5b3', '8b6d5837d19f4fbeb2d2f63989dc9125', '1530065905');
INSERT INTO `admin_token_table` VALUES ('92d5195655e341168692768efdd383be', '8b6d5837d19f4fbeb2d2f63989dc9125', '1530088833');
INSERT INTO `admin_token_table` VALUES ('9c72ce93130640d3bfa3fb3546f96c12', '1', '1530004056');
INSERT INTO `admin_token_table` VALUES ('9d734ed9f69b4bf194b4718c9731c17f', '1', '1530005402');
INSERT INTO `admin_token_table` VALUES ('a2ee805ec3674633a76366823e72dff8', '8b6d5837d19f4fbeb2d2f63989dc9125', '1530072333');
INSERT INTO `admin_token_table` VALUES ('ad573061c6214b83b76b537e9b21cbfc', '1', '1530005378');
INSERT INTO `admin_token_table` VALUES ('b59eb292cf7d41dfa9749e219ecf18db', '1', '1530072226');
INSERT INTO `admin_token_table` VALUES ('b8730b2a7c3a4200b3ee3c2033705460', '1', '1530005341');
INSERT INTO `admin_token_table` VALUES ('ba00a2800bf345b8886aae46e4ee3764', '8b6d5837d19f4fbeb2d2f63989dc9125', '1530071282');
INSERT INTO `admin_token_table` VALUES ('c67ec111f2ea4825b6deec4c6db54e90', '1', '1530005732');
INSERT INTO `admin_token_table` VALUES ('ca9b576067154982bf6219e6f48dc0db', '8b6d5837d19f4fbeb2d2f63989dc9125', '1530064018');
INSERT INTO `admin_token_table` VALUES ('d783a2e716c74ee0bee8b5d937120cc0', '1', '1530004424');
INSERT INTO `admin_token_table` VALUES ('de94ddf9cd4f493dbecd38a3f21d112c', '1', '1530064514');
INSERT INTO `admin_token_table` VALUES ('f8fdfee415ff456f88a09a97a8fda3eb', '8b6d5837d19f4fbeb2d2f63989dc9125', '1530067966');
INSERT INTO `admin_token_table` VALUES ('fdb0b7fd3788480292d47f55cc4984b6', '1', '1530005494');

-- ----------------------------
-- Table structure for `house_table`
-- ----------------------------
DROP TABLE IF EXISTS `house_table`;
CREATE TABLE `house_table` (
  `ID` varchar(32) NOT NULL,
  `admin_ID` varchar(32) NOT NULL,
  `title` varchar(255) NOT NULL,
  `sub_title` varchar(255) NOT NULL,
  `position_main` varchar(255) NOT NULL,
  `position_second` varchar(255) NOT NULL,
  `ave_price` varchar(30) NOT NULL,
  `area_min` varchar(10) NOT NULL,
  `area_max` varchar(10) NOT NULL,
  `tel` int(11) NOT NULL,
  `sale_time` int(11) NOT NULL,
  `submit_time` int(11) NOT NULL,
  `building_type` varchar(255) NOT NULL,
  `main_img_path` varchar(255) NOT NULL,
  `main_img_real_path` varchar(255) NOT NULL,
  `img_paths` text NOT NULL,
  `img_real_paths` text NOT NULL,
  `property_types` text NOT NULL,
  `property_img_paths` text NOT NULL,
  `property_img_real_paths` text NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `admin_ID` (`admin_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of house_table
-- ----------------------------
INSERT INTO `house_table` VALUES ('79364d986e83472087e0ddee3c7f5ac8', '8b6d5837d19f4fbeb2d2f63989dc9125', '经开区', '很好的', '宇宙', '河东', '50', '1', '100', '0', '1528243200', '1528934400', '耗子啊', '8899b18b9bdad711dd3a241d9324a292', 'uploads\\8899b18b9bdad711dd3a241d9324a292', '9bb763312646053d69ac40f682c7e182,ec2004488e57c8a665376d3c0d0c5135,338f7350802d83a29dfe86e19b794854', 'uploads\\9bb763312646053d69ac40f682c7e182,uploads\\ec2004488e57c8a665376d3c0d0c5135,uploads\\338f7350802d83a29dfe86e19b794854', '10', '40a325e04e487a046a754c0111851562', 'uploads\\40a325e04e487a046a754c0111851562');
INSERT INTO `house_table` VALUES ('ed561e2ef3c2424097a19afa921e9c8f', '8b6d5837d19f4fbeb2d2f63989dc9125', '金发三', '很好的', '南川', 'bbk', '14000', '1', '100', '120', '1528329600', '1529020800', '豪宅', '9f9ac672b757dadb74d0395f4c9ce01b', 'uploads9f9ac672b757dadb74d0395f4c9ce01b', 'cdb3d5890f532add7d9c05cde02aa371', 'uploadscdb3d5890f532add7d9c05cde02aa371', '3', '5f9704cf3c68b582cdc24dc0a2bccbec', 'uploads5f9704cf3c68b582cdc24dc0a2bccbec');
