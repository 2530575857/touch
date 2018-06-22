/*
Navicat MySQL Data Transfer

Source Server         : 本地mySQL
Source Server Version : 50556
Source Host           : localhost:3306
Source Database       : an_jv_ke

Target Server Type    : MYSQL
Target Server Version : 50556
File Encoding         : 65001

Date: 2018-06-22 16:48:49
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
  `property_img__real_paths` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of house_table
-- ----------------------------
INSERT INTO `house_table` VALUES ('96699e61f0d64eb0a3785a857b8215b3', '1', '东岳公园旁碧桂园翡翠城双拼别墅6室3厅3卫共三层带大露台', '碧桂园双拼别墅 ', '璧山', '永嘉大道115号', '5000000', '120', '200', '110110110', '957110400', '957140400', '别墅', '/static_img/fc01d4a2f93749368cb6d9215d0352cd.jpg', 'D:\\svn\\trunk\\anjvke\\nuber6_1\\uploads\\fc01d4a2f93749368cb6d9215d0352cd.jpg', '/static_img/9f017bf159724670b41739682e819a3a.jpg,/static_img/d36a75e245d044c782abd5445d5ba38f.jpg,/static_img/e0f2d1238087487ba83cd2034dfa9107.jpg,/static_img/fc01d4a2f93749368cb6d9285d0352cd.jpg', 'D:\\svn\\trunk\\anjvke\\nuber6_1\\upload\\9f017bf159724670b41739682e819a3a.jpg,\r\nD:\\svn\\trunk\\anjvke\\nuber6_1\\uploads\\d36a75e245d044c782abd5445d5ba38f.jpg,\r\nD:\\svn\\trunk\\anjvke\\nuber6_1\\uploads\\e0f2d1238087487ba83cd2034dfa9107.jpg,\r\nD:\\svn\\trunk\\anjvke\\nuber6_1\\uploads\\fc01d4a2f93749368cb6d9285d0352cd.jpg', '6室3厅3卫', '/static_img/9f017bf159724670b41739682e819a3a.jpg', 'D:\\svn\\trunk\\anjvke\\nuber6_1\\upload\\9f017bf159724670b41739682e819a3a.jpg');
