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
	column_ad_img TEXT #列图片	
)

#商品
CREATE TABLE la_product(
	sku INT PRIMARY KEY AUTO_INCREMENT,
	pid INT,
	family_id INT,
	title VARCHAR(100),
	discount_msg VARCHAR(100),
	onsale_price DECIMAL(10,2),
	origin_price DECIMAL(10,2),
	month_sold INT,
	total_sold INT,
	total_comments_num INT,
	taste VARCHAR(200),
	package VARCHAR(200),
	storage INT
)
INSERT INTO la_product VALUES(null,1,"良品铺子 手剥松子218g 坚果炒货 巴西松子","购物满2件打8折，满3件7折",56.9,98,1015,6015,640,"原味*奶油*炭烧*咸香","手袋单人份*礼盒双人份*全家福礼包",1000,"**********","*******")
#商品详情
CREATE TABLE la_product_details(
	did INT PRIMARY KEY AUTO_INCREMENT;
	pid INT,
	pro_param TEXT，
	detail_pics TEXT
)
INSERT INTO la_product_details(pid, pro_param, detail_pics) VALUES(1,"[{\"产品类型\":\"烘炒类\"},{\"原料产地\":\"巴基斯坦\"},{\"产地\":\"湖北省武汉市\"},{\"配料表\":\"进口松子、食用盐\"},{\"产品规格\":\"210g\"},{\"保质期\":\"180天\"},{\"产品标准号\":\"GB/T 22165\"},{\"生产许可证编号\":\"QS4201 1801 0226\"},{\"存储方法\":\"请放置于常温、阴凉、通风、干燥的环境下\"},{\"食用方法\":\"开袋去壳即食\"}]","[{\"url\":\"img/tw1.jpg\"},{\"url\":\"img/tw2.jpg\"},{\"url\":\"img/tw3.jpg\"},{\"url\":\"img/tw4.jpg\"},{\"url\":\"img/tw5.jpg\"},{\"url\":\"img/tw6.jpg\"},{\"url\":\"img/tw7.jpg\"}]")


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




#楼层
{
    "id":100111,
    "type":2,
    "title":"甜品",
    "sub_title":"每一道甜品都有一个故事",
    "links":[
        {
            "name":"桂花糕",
            "url":"http://www.baidu.com/abc.jpg"
        },
        {
            "name":"奶皮酥",
            "url":"http://www.baidu.com/abc.jpg"
        },
        {
            "name":"栗子糕",
            "url":"http://www.baidu.com/abc.jpg"
        },
        {
            "name":"马卡龙",
            "url":"http://www.baidu.com/abc.jpg"
        },
        {
            "name":"铜锣烧",
            "url":"http://www.baidu.com/abc.jpg"
        },
        {
            "name":"豌豆黄",
            "url":"http://www.baidu.com/abc.jpg"
        }
    ],
    "link_seperator":"|",
    "col1":{
        "links":[
            {
                "name":"核桃",
                "url":"http://www.baidu.com/abc.jpg"
            },
            {
                "name":"核桃",
                "url":"http://www.baidu.com/abc.jpg"
            },
            {
                "name":"核桃",
                "url":"http://www.baidu.com/abc.jpg"
            },
            {
                "name":"核桃",
                "url":"http://www.baidu.com/abc.jpg"
            },
            {
                "name":"核桃",
                "url":"http://www.baidu.com/abc.jpg"
            },
            {
                "name":"核桃",
                "url":"http://www.baidu.com/abc.jpg"
            }
        ],
        "title":"零食大礼包开抢啦",
        "sub_title":"当小鱼儿恋上软豆腐",
        "url":"http://www.baidu.com/1231313.jpg",
        "index_img":"http://www.baidu.com/1231313.jpg"
    },
    "col2":[
        {
            "title":"雪之恋和风大福",
            "price":13.8,
            "url":"http://www.baidu.com/abc.jpg"
        }
    ],
    "col3":[
        {
            "title":"小悠布丁",
            "price":4.8,
            "url":"http://www.baidu.com/1231312313.jpg"
        },
        {
            "title":"小悠布丁",
            "price":4.8,
            "url":"http://www.baidu.com/1231312313.jpg"
        }
    ],
    "col4":[
        {
            "title":"小悠布丁",
            "price":4.8,
            "url":"http://www.baidu.com/1231312313.jpg"
        }
    ],
    "col5":[
        {
            "title":"小悠布丁",
            "price":4.8,
            "url":"http://www.baidu.com/1231312313.jpg"
        },
        {
            "title":"小悠布丁",
            "price":4.8,
            "url":"http://www.baidu.com/1231312313.jpg"
        }
    ]
}