SET NAMES UTF8;
DROP DATABASE IF EXISTS la_mall;
CREATE DATABASE la_mall CHARSET=UTF8;
USE la_mall;

#用户表
CREATE TABLE la_user{
	uid TINYINT PRIMARY KEY AUTO_INCREMENT,
	uname VARCHAR(20) NOT NULL, #用户名
	upwd VARCHAR(20) NOT NULL,
	user_name VARCHAR(20), #真实姓名
	email VARCHAR(50),
	telephone VARCHAR(11)
};
INSERT INTO la_user VALUES('1', 'dingding', '123456', '叮当猫', '545697789@qq.com', '13255588896');

#菜单管理
CREATE TABLE la_menu_list{
	menu_name VARCHAR(10) NOT NULL,
	menu_content VARCHAR(300) NOT NULL,
	strength_seller, #实力商家
	create_time DATE, #创建时间
	create_by VARCHAR(20) #创建人
};

#爆款特卖
CREATE TABLE la_top_seller{
	id INT PRIMARY KEY AUTO INCREMENT,
	title VARCHAR(30),
	ad_img VARCHAR(10), #图片地址
	create_time DATE, #创建时间
	create_by VARCHAR(20) #创建人
} ;

#楼层管理


#商品