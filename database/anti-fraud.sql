/*
 Navicat MySQL Data Transfer

 Source Server         : 192.168.133.128
 Source Server Type    : MySQL
 Source Server Version : 80026
 Source Host           : 192.168.133.128:3306
 Source Schema         : anti-fraud

 Target Server Type    : MySQL
 Target Server Version : 80026
 File Encoding         : 65001

 Date: 19/08/2021 16:55:25
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_alarm
-- ----------------------------
DROP TABLE IF EXISTS `t_alarm`;
CREATE TABLE `t_alarm`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '警情id',
  `alarmNo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '警情编号',
  `alarmCategory` int NULL DEFAULT NULL COMMENT '警情类别\r\n0 其他\r\n1 反诈一哥',
  `alarmProp` int NULL DEFAULT NULL COMMENT '警情性质\r\n\r\n0报警\r\n1协助侦查\r\n2举报\r\n3咨询',
  `crimeCity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '案发地点',
  `crimeAddress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '详细地址',
  `informantName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '报案人姓名',
  `informantIdCard` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '报案人身份证号',
  `informantGender` int NULL DEFAULT NULL COMMENT '报案人性别\r\n0 男\r\n1 女',
  `informantAge` int NULL DEFAULT NULL COMMENT '报案人年龄段\r\n0 不详\r\n1 0-20\r\n2 21-30\r\n3 31-40\r\n4 41-50\r\n5 50岁以上',
  `informantMobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '报案人手机',
  `informantJob` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '报案人职业',
  `informantBankAccount` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '报案人银行账号',
  `informantAddress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '报案人住址',
  `informantOtherConcact` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '报案人其他联系方式',
  `suspectsAccountOrganization` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '嫌疑人所属机构',
  `suspectsAccount` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '嫌疑人账号',
  `suspectsMobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '嫌疑人涉案电话',
  `suspectsWebSite` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '嫌疑人涉案网址',
  `suspectsOtherConcact` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '嫌疑人其他联系方式',
  `fraudAmount` double NULL DEFAULT NULL COMMENT '涉案金额',
  `alarmDescribe` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '警情描述',
  `inputer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '录入人',
  `reviewer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '审核人',
  `alarmStatus` int NULL DEFAULT NULL COMMENT '警情状态 0 待审核、1 审核通过 2 审核不通过',
  `affix` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '附件',
  `alarmAuditOption` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '审核意见 通过  拒绝',
  `rejectReason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '拒绝原因',
  `crimeTime` int NULL DEFAULT NULL COMMENT '案发时间',
  `isDelete` int NULL DEFAULT NULL COMMENT '是否删除',
  `createTime` int NULL DEFAULT NULL COMMENT '创建时间',
  `updateTime` int NULL DEFAULT NULL COMMENT '更新时间',
  `orgId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户机构Id',
  `yiGeId` int NULL DEFAULT NULL COMMENT '一哥Id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_alarm
-- ----------------------------

-- ----------------------------
-- Table structure for t_alarm_category
-- ----------------------------
DROP TABLE IF EXISTS `t_alarm_category`;
CREATE TABLE `t_alarm_category`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '警情类别ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '警情类别名称',
  `createTime` int NULL DEFAULT NULL COMMENT '创建时间',
  `updateTime` int NULL DEFAULT NULL COMMENT '更新时间',
  `isDelete` int(1) UNSIGNED ZEROFILL NULL DEFAULT NULL COMMENT '是否上次',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_alarm_category
-- ----------------------------
INSERT INTO `t_alarm_category` VALUES (1, '反诈一哥', 1629215024, 1629251752, 0);
INSERT INTO `t_alarm_category` VALUES (2, '贷款, 代办信用卡类', 1629215024, 1629215024, 0);
INSERT INTO `t_alarm_category` VALUES (3, '刷单返利类', 1629215024, 1629215024, 0);
INSERT INTO `t_alarm_category` VALUES (4, '冒充电商物流客服类', 1629215024, 1629215024, 0);
INSERT INTO `t_alarm_category` VALUES (5, '虚拟购物，服务类', 1629215024, 1629215024, 0);
INSERT INTO `t_alarm_category` VALUES (6, '杀猪盘类', 1629215024, 1629215024, 0);
INSERT INTO `t_alarm_category` VALUES (7, '冒充公检法及政府机关类', 1629215024, 1629215024, 0);
INSERT INTO `t_alarm_category` VALUES (8, '冒充领导，熟人等特定身份类', 1629215024, 1629215024, 0);
INSERT INTO `t_alarm_category` VALUES (9, '网络游戏产品虚假交易类', 1629215024, 1629215024, 0);
INSERT INTO `t_alarm_category` VALUES (10, '网络婚恋，交友类（非杀猪盘）', 1629215024, 1629215024, 0);
INSERT INTO `t_alarm_category` VALUES (11, '虚拟征信类', 1629215024, 1629215024, 0);
INSERT INTO `t_alarm_category` VALUES (12, '冒充军警购物类', 1629215024, 1629215024, 0);
INSERT INTO `t_alarm_category` VALUES (13, '其他类型', 1629215024, 1629215024, 0);

-- ----------------------------
-- Table structure for t_bank
-- ----------------------------
DROP TABLE IF EXISTS `t_bank`;
CREATE TABLE `t_bank`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '银行协查id',
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '操作账号',
  `bankId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '所属银行Id',
  `accountType` int NULL DEFAULT NULL COMMENT '账户性质\r\n0 嫌疑人一级账号\r\n1 嫌疑人二级账号\r\n2 受害人账户',
  `stopPaymentAmount` double NULL DEFAULT NULL COMMENT '止付金额',
  `operate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '执行操作\r\n0 查询\r\n1 锁定\r\n2 冻结\r\n3 挂失\r\n4 管控',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '备注',
  `status` int NULL DEFAULT NULL COMMENT '状态 0待反馈  1 已反馈',
  `isDelete` int NULL DEFAULT NULL COMMENT '是否删除',
  `createTime` int NULL DEFAULT NULL COMMENT '创建时间',
  `updateTime` int NULL DEFAULT NULL COMMENT '更新时间',
  `alarmId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '警情ID',
  `alarmNo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '警情编号',
  `affix` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `crimeTime` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_bank_alarmId`(`alarmId`) USING BTREE,
  INDEX `fk_bank_bankId`(`bankId`) USING BTREE,
  CONSTRAINT `fk_bank_alarmId` FOREIGN KEY (`alarmId`) REFERENCES `t_alarm` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_bank_bankId` FOREIGN KEY (`bankId`) REFERENCES `t_organization` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_bank
-- ----------------------------

-- ----------------------------
-- Table structure for t_bankcard
-- ----------------------------
DROP TABLE IF EXISTS `t_bankcard`;
CREATE TABLE `t_bankcard`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '银行卡id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '银行卡名字',
  `prefix` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '银行卡前缀',
  `bankId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '所属银行ID',
  `isDelete` int(1) UNSIGNED ZEROFILL NULL DEFAULT NULL COMMENT '是否删除',
  `createTime` int NULL DEFAULT NULL COMMENT '创建时间',
  `updateTime` int NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_bankcard_bankId`(`bankId`) USING BTREE,
  CONSTRAINT `fk_bankcard_bankId` FOREIGN KEY (`bankId`) REFERENCES `t_organization` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_bankcard
-- ----------------------------
INSERT INTO `t_bankcard` VALUES ('09fcbf291b7c4099b191bdfc442e1284', '普卡', '622588', '4e2343c0909f448aa4d3736671b811a7', 0, 1627382430, 1627382430);
INSERT INTO `t_bankcard` VALUES ('4537ed62ceab4168a7719b6dcff30eee', '普卡', '621483', '4e2343c0909f448aa4d3736671b811a7', 0, 1627382430, 1627382430);
INSERT INTO `t_bankcard` VALUES ('678a828dd59844c1b325465b94a07a76', '金卡(IC卡)', '621485', '4e2343c0909f448aa4d3736671b811a7', 0, 1627382430, 1627382430);
INSERT INTO `t_bankcard` VALUES ('69ec11ef417c4d84969ffae31a9ea26b', '金卡(VISA国际借记卡)', '468203', '4e2343c0909f448aa4d3736671b811a7', 0, 1627382430, 1627382430);
INSERT INTO `t_bankcard` VALUES ('8a9e9221bceb4e769c4e4ac430181c17', '金卡(银联)', '622609', '4e2343c0909f448aa4d3736671b811a7', 0, 1627382430, 1627382430);
INSERT INTO `t_bankcard` VALUES ('af9d02d7fdce46df88d81ba95d037bba', '中银都市卡', '622760', '84ed36b3a5b346dfbd4ede17f82389d4', 0, 1627382430, 1627382430);
INSERT INTO `t_bankcard` VALUES ('aff7892775d540cca9b857b338c5f951', '普卡', '622580', '4e2343c0909f448aa4d3736671b811a7', 0, 1627382430, 1627382430);
INSERT INTO `t_bankcard` VALUES ('c8b4728d1a9d4d60a02e4cac278df372', '金卡(MasterCard国际借记卡)', '512425', '4e2343c0909f448aa4d3736671b811a7', 0, 1627382430, 1627382430);
INSERT INTO `t_bankcard` VALUES ('d92da200d0de4a65b835cf175b919882', '普卡', '955550', '4e2343c0909f448aa4d3736671b811a7', 0, 1627377735, 1627377735);

-- ----------------------------
-- Table structure for t_file
-- ----------------------------
DROP TABLE IF EXISTS `t_file`;
CREATE TABLE `t_file`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '文件id',
  `filename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '文件名',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '文件类型',
  `size` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '文件大小',
  `createBy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `isDelete` int NULL DEFAULT NULL COMMENT '是否删除',
  `createTime` int NULL DEFAULT NULL COMMENT '创建时间',
  `updateTime` int NULL DEFAULT NULL COMMENT '更新时间',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 56 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_file
-- ----------------------------

-- ----------------------------
-- Table structure for t_mobile
-- ----------------------------
DROP TABLE IF EXISTS `t_mobile`;
CREATE TABLE `t_mobile`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '电话查控id',
  `suspectsMobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '嫌疑人电话',
  `informantMobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '受害人电话',
  `stopPaymentAmount` double NULL DEFAULT NULL COMMENT '止付金额',
  `crimeTime` int NULL DEFAULT NULL COMMENT '案发时间',
  `status` int NULL DEFAULT NULL COMMENT '处理状态 0 待反馈 1 已反馈',
  `alarmDescribe` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '警情描述 ',
  `operate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '执行操作\r\n0 限制呼入\r\n1 停话服务\r\n2 其它',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '备注',
  `isDelete` int NULL DEFAULT NULL COMMENT '是否删除',
  `createTime` int NULL DEFAULT NULL COMMENT '创建时间',
  `updateTime` int NULL DEFAULT NULL COMMENT '更新时间',
  `alarmId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '警情Id',
  `alarmNo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '警情编号',
  `affix` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_mobile_alarm_id`(`alarmId`) USING BTREE,
  CONSTRAINT `fk_mobile_alarm_id` FOREIGN KEY (`alarmId`) REFERENCES `t_alarm` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_mobile
-- ----------------------------

-- ----------------------------
-- Table structure for t_organization
-- ----------------------------
DROP TABLE IF EXISTS `t_organization`;
CREATE TABLE `t_organization`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '机构id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '机构名称',
  `type` int NULL DEFAULT NULL COMMENT '机构类型\r\n0 警方\r\n1 银行\r\n2 电话运营商\r\n3 网站运营商\r\n4 支付宝\r\n5 微信\r\n6 其它',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '机构代码',
  `isDelete` int(1) UNSIGNED ZEROFILL NULL DEFAULT NULL COMMENT '是否删除 0 未删除 1删除',
  `createTime` int NULL DEFAULT NULL COMMENT '创建时间',
  `updateTime` int NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_organization
-- ----------------------------
INSERT INTO `t_organization` VALUES ('36071d2d3a9f462f93937ca8897dcb65', '支付宝', 4, 'ALIPAY', 0, 1627720602, 1627720602);
INSERT INTO `t_organization` VALUES ('4338e620b3a94c3e87188d0f7374bfd3', '湖州市公安局', 0, 'HZGA', 0, 1627293362, 1627293362);
INSERT INTO `t_organization` VALUES ('43a68eca3a8947b5b5074301f784bb2d', '宁波银行', 1, 'NBYH', 0, 1628952534, 1628952534);
INSERT INTO `t_organization` VALUES ('4ad8fbe403a04a0db88ac9534f253a12', '建设银行', 1, 'JSYH', 0, 1628952534, 1628952534);
INSERT INTO `t_organization` VALUES ('4e2343c0909f448aa4d3736671b811a7', '招商银行', 1, 'CMB', 0, 1627226869, 1627269398);
INSERT INTO `t_organization` VALUES ('4f17d6fb12e34f078af2fc9aa77ed3cd', '交通银行', 1, 'JTYH', 0, 1629125508, 1629125508);
INSERT INTO `t_organization` VALUES ('6867e10c811842c083fd6a3a2d46f9a5', '微信支付', 5, 'WEPAY', 0, 1627720602, 1627720602);
INSERT INTO `t_organization` VALUES ('7f9457dfe6e44e679923cdeab828d849', '邮政储蓄银行', 1, 'YZCXYH', 0, 1629125508, 1629125508);
INSERT INTO `t_organization` VALUES ('81fd02b5a3cd428093839a2978b1e20f', '阿里云', 3, 'ALICLOUD', 0, 1628851469, 1628851469);
INSERT INTO `t_organization` VALUES ('84ed36b3a5b346dfbd4ede17f82389d4', '中国银行', 1, 'CB', 0, 1627226869, 1627226869);
INSERT INTO `t_organization` VALUES ('917f6908dedd411c938bdc9e2aa3c265', '中国联通', 2, 'CHU', 0, 1628851469, 1628851469);
INSERT INTO `t_organization` VALUES ('a3526bbeef2a4b3d9d0237f38e6f2ae6', '华为云', 3, 'HUWEICLOUD', 0, 1628851469, 1628851469);
INSERT INTO `t_organization` VALUES ('a9fe52a048b0442eb1f14d903b2e224c', '浙江省公安厅', 0, 'ZJSGA', 0, 1627226869, 1627293362);
INSERT INTO `t_organization` VALUES ('b05eb4928e7548d0a873859e87d958d7', '安吉县公安局', 0, 'AJGA', 0, 1627295288, 1627295288);
INSERT INTO `t_organization` VALUES ('bcd82238c51a4ff5bf960a1eb01adbc3', '中国电信', 2, 'CTCC', 0, 1628851469, 1628851469);
INSERT INTO `t_organization` VALUES ('c915a7dcee4146b2a3deb9a7b307ea63', '工商银行', 1, 'GSYG', 0, 1628952534, 1628952534);
INSERT INTO `t_organization` VALUES ('cc75562d4ce1498d8553426fdf5b4f82', '农业银行', 1, 'NYYH', 0, 1629125508, 1629125508);
INSERT INTO `t_organization` VALUES ('d746ff6438ad4fc483c8f04189d879f2', '中国农业银行', 1, 'ABC', 0, 1627226869, 1627226869);
INSERT INTO `t_organization` VALUES ('deacfc0911d740b1a689f929ea6de858', '南浔区公安局', 0, 'NXGA', 0, 1627295288, 1627295288);
INSERT INTO `t_organization` VALUES ('e452d7ef231e410285ed9a20e3ca2639', '吴兴区公安局', 0, 'WXGA', 0, 1627295288, 1627295288);
INSERT INTO `t_organization` VALUES ('ea89f13ca57e4f859ea0895cf2f6f1f1', '德清县公安局', 0, 'DQGA', 0, 1627295288, 1627295288);
INSERT INTO `t_organization` VALUES ('ed7334c98fcd43c6b0d47a595ec21287', '腾讯云', 3, 'TENCENTCLOUD', 0, 1628851469, 1628851469);
INSERT INTO `t_organization` VALUES ('edda27fd388f447f8436e7abc2af8535', '长兴县公安局', 0, 'CXGA', 0, 1627295288, 1627295288);
INSERT INTO `t_organization` VALUES ('f9498f6e31344f1c8d735b29fd119508', '中国移动', 2, 'CMCC', 0, 1628851469, 1628851469);

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user`  (
  `id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户id',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户密码',
  `mobile` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户角色\r\n\r\nadmin:  管理员\r\nreceiver:  市局接警员\r\nreceiver2: 县区接警员\r\noperator: 银行操作员\r\noperator2: 电话操作员\r\noperator3: 网站操纵员\r\noperator4: 虚拟账户操纵员\r\n',
  `orgId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '机构Id',
  `isDelete` int(1) UNSIGNED ZEROFILL NULL DEFAULT NULL COMMENT '是否删除\r\n\r\n0 未删除\r\n1 删除',
  `createTime` int NULL DEFAULT NULL COMMENT '创建时间',
  `updateTime` int NULL DEFAULT NULL COMMENT '更新时间',
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '昵称',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_user_organizationId`(`orgId`) USING BTREE,
  CONSTRAINT `fk_user_organizationId` FOREIGN KEY (`orgId`) REFERENCES `t_organization` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('24c352c133904b40a244398e901d3ed3', 'robot', 'robot1234', '15715860123', 'receiver', '4338e620b3a94c3e87188d0f7374bfd3', 1, 1629038857, 1629038857, '机器人');
INSERT INTO `t_user` VALUES ('3824a88baa7c44eea3834aceefd29af8', 'tomcat', 'tomcat1234', '13878766787', 'operator4', '36071d2d3a9f462f93937ca8897dcb65', 0, 1628938388, 1629133576, '汤姆凯特');
INSERT INTO `t_user` VALUES ('41519cd5142341c284937f80b9f1dece', 'wangrui', 'wangrui1234', '13867463432', 'operator3', 'a3526bbeef2a4b3d9d0237f38e6f2ae6', 0, 1627703499, 1628859316, '王睿');
INSERT INTO `t_user` VALUES ('44ceb38621464e68abf633b0c873fee5', 'dehua', 'dehua1234', '15715860123', 'receiver', '4338e620b3a94c3e87188d0f7374bfd3', 0, 1627296023, 1629190787, '小德华');
INSERT INTO `t_user` VALUES ('454b9304951548768d9ac08de29021dc', 'mayun', 'mayun1234', '13858176433', 'operator', '4e2343c0909f448aa4d3736671b811a7', 0, 1627703499, 1629190787, '小云');
INSERT INTO `t_user` VALUES ('97fda8d29aa44a65ad1bee0693e7f984', 'ataola', '123456', '13858179999', 'admin', 'a9fe52a048b0442eb1f14d903b2e224c', 0, 1627129285, 1627129285, '阿涛啦');
INSERT INTO `t_user` VALUES ('dbe9839a0c0c4c37812e9f62059371e4', 'jiahui', 'jiahui1234', '15715860123', 'receiver2', 'b05eb4928e7548d0a873859e87d958d7', 0, 1627296163, 1629190787, '小家辉');
INSERT INTO `t_user` VALUES ('eacfafc6716a4e61ac22b1944e737974', 'chaowei', 'chaowei1234', '13858172345', 'operator2', 'f9498f6e31344f1c8d735b29fd119508', 0, 1627703499, 1629190787, '小朝伟');

-- ----------------------------
-- Table structure for t_virtual
-- ----------------------------
DROP TABLE IF EXISTS `t_virtual`;
CREATE TABLE `t_virtual`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '虚拟账户查控id',
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '操作账户',
  `organization` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '所属机构',
  `stopPaymentAmount` double NULL DEFAULT NULL COMMENT '止付金额',
  `operate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '操作',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '描述',
  `status` int NULL DEFAULT NULL COMMENT '状态 0 待反馈 1 已反馈',
  `isDelete` int NULL DEFAULT NULL COMMENT '是否删除',
  `createTime` int NULL DEFAULT NULL COMMENT '创建时间',
  `updateTime` int NULL DEFAULT NULL COMMENT '更新时间',
  `alarmId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '警情Id',
  `alarmNo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '警情编号',
  `crimeTime` int NULL DEFAULT NULL,
  `affix` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_virtual_alarmId`(`alarmId`) USING BTREE,
  CONSTRAINT `fk_virtual_alarmId` FOREIGN KEY (`alarmId`) REFERENCES `t_alarm` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_virtual
-- ----------------------------

-- ----------------------------
-- Table structure for t_website
-- ----------------------------
DROP TABLE IF EXISTS `t_website`;
CREATE TABLE `t_website`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '网站查控id',
  `website` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '涉案网址',
  `stopPaymentAmount` double NULL DEFAULT NULL,
  `operate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '执行操作\r\n0 禁用网站\r\n1 限制访问',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '备注',
  `status` int NULL DEFAULT NULL COMMENT '状态 0  待反馈 1 已反馈',
  `isDelete` int NULL DEFAULT NULL COMMENT '是否删除',
  `createTime` int NULL DEFAULT NULL COMMENT '创建时间',
  `updateTime` int NULL DEFAULT NULL COMMENT '更新时间',
  `alarmId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '警情Id',
  `alarmNo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '警情编号',
  `affix` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `crimeTime` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_website_alarmId`(`alarmId`) USING BTREE,
  CONSTRAINT `fk_website_alarmId` FOREIGN KEY (`alarmId`) REFERENCES `t_alarm` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_website
-- ----------------------------

-- ----------------------------
-- Table structure for t_weather
-- ----------------------------
DROP TABLE IF EXISTS `t_weather`;
CREATE TABLE `t_weather`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'ID',
  `date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '原始数据日期',
  `high` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '最高温度',
  `low` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '最低温度',
  `wendu` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '温度',
  `fengli` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '风力',
  `fengxiang` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '风向',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '类型',
  `ganmao` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '感冒指数',
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '城市',
  `weatherDate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '天气日期',
  `createTime` int NULL DEFAULT NULL COMMENT '创建时间',
  `updateTime` int NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_weather
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
