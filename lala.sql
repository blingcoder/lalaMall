SET NAMES UTF8;
DROP DATABASE IF EXISTS la_mall;
CREATE DATABASE la_mall CHARSET=UTF8;
USE la_mall;

#用户表
CREATE TABLE la_user(
	uid TINYINT PRIMARY KEY AUTO_INCREMENT,
	uname VARCHAR(20) NOT NULL, #用户名
	upwd VARCHAR(20) NOT NULL,
	user_name VARCHAR(20), #真实姓名
	email VARCHAR(50),
	telephone VARCHAR(11)
);
INSERT INTO la_user VALUES('1', 'dingding', '123456', '叮当猫', '545697789@qq.com', '13255588896');

#菜单管理
CREATE TABLE la_menu_list(
	menu_name VARCHAR(10) NOT NULL,
	menu_content VARCHAR(300) NOT NULL,
	strength_seller, #实力商家
	create_time DATE, #创建时间
	create_by VARCHAR(20) #创建人
);

#爆款特卖
CREATE TABLE la_top_seller_onsale(
	id TINYINT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(30),
	price DECIMAL(7,2),
	ad_img VARCHAR(30), #图片地址
	create_time DATETIME, #创建时间
	create_by VARCHAR(20) #创建人
) ;
INSERT INTO la_top_seller_onsale VALUES('1', 'Davidoff 女士香水', '129','img/sale3.jpg', '2018-02-11', '丁丁');
INSERT INTO la_top_seller_onsale VALUES('2', '清风 原木纯品抽纸','11.9', 'img/sale2.jpg', '2018-02-16', '丁丁');
INSERT INTO la_top_seller_onsale VALUES('3', '新疆红葡萄干','9.9', 'img/sale1.jpg', '2018-02-18', '丁丁');
INSERT INTO la_top_seller_onsale VALUES('4', '雀巢特浓速溶咖啡','49.9', 'img/sale4.jpg', '2018-02-23', '丁丁');

#楼层管理
CREATE TABLE la_floor(
	id TINYINT PRIMARY KEY AUTO_INCREMENT, #楼层编号
	title VARCHAR(30), #楼层标题
	subtitle VARCHAR(50),
	right_list VARCHAR(300) #楼层top右侧链接列表
)
#楼层第一列数据
CREATE TABLE la_floor_column1(
	floor_id TINYINT, #楼层编号
	column1_link_list VARCHAR(300), #第一列链接列表
	column1_title VARCHAR(100), #第一列标题
	column1_subtitle VARCHAR(100), #第一列副标题
	column1_ad_img VARCHAR(100) #第一列图片
)
#楼层后面几列数据
CREATE TABLE la_floor_column(
	floor_id TINYINT, #楼层编号
	column_title VARCHAR(100), #列标题
	column_subtitle VARCHAR(100), #列副标题
	column_price VARCHAR(100), #列价格
	column_ad_img VARCHAR(100) #列图片
)

#商品
CREATE TABLE la_product(
	pid INT PRIMARY KEY AUTO_INCREMENT,
	family_id INT,
	title VARCHAR(100),
	discount VARCHAR(100),
	onsale_price DECIMAL(10,2),
	origin_price DECIMAL(10,2),
	month_sold INT,
	total_sold INT,
	total_comments_num INT,
	taste VARCHAR(200),
	package VARCHAR(200),
	storage INT,
	pro_param VARCHAR(1024)，
	detail_pics VARCHAR(1024)
)
INSERT INTO la_product VALUES(null,1,"良品铺子 手剥松子218g 坚果炒货 巴西松子","购物满2件打8折，满3件7折",56.9,98,1015,6015,640,"原味*奶油*炭烧*咸香","手袋单人份*礼盒双人份*全家福礼包",1000,"**********","*******")
#商品评价
CREATE TABLE la_product(
	cid INT PRIMARY KEY AUTO_INCREMENT,
	content VARCHAR(500),
	user_name VARCHAR(50),
	comment_time DATETIME,
	pro_color VARCHAR(50),
	pro_size VARCHAR(10)
)
#商品图片
CREATE TABLE la_pro_pic(
	pid INT PRIMARY KEY AUTO_INCREMENT,
	pro_id INT,
	sm VARCHAR(200),
	md VARCHAR(200),
	lg VARCHAR(200)
)