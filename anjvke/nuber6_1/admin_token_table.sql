/*
Navicat MySQL Data Transfer

Source Server         : 本地mySQL
Source Server Version : 50556
Source Host           : localhost:3306
Source Database       : an_jv_ke

Target Server Type    : MYSQL
Target Server Version : 50556
File Encoding         : 65001

Date: 2018-06-22 17:46:29
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin_token_table`
-- ----------------------------
DROP TABLE IF EXISTS `admin_token_table`;
CREATE TABLE `admin_token_table` (
  `ID` varchar(32) NOT NULL,
  `admin_ID` varchar(32) NOT NULL,
  `expires` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_token_table
-- ----------------------------
