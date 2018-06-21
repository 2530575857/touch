/*
Navicat MySQL Data Transfer

Source Server         : 本地mySQL
Source Server Version : 50556
Source Host           : localhost:3306
Source Database       : an_jv_ke

Target Server Type    : MYSQL
Target Server Version : 50556
File Encoding         : 65001

Date: 2018-06-21 17:46:36
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
