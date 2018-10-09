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

#商品详情
CREATE TABLE la_product(
	id INT PRIMARY KEY AUTO_INCREMENT,
    pro_id INT,
	family_id INT,
    sku INT,
	title VARCHAR(100),
	discount_msg VARCHAR(100),
	onsale_price DECIMAL(10,2),
	origin_price DECIMAL(10,2),
	month_sold INT,
	total_sold INT,
	total_comments INT,
	taste VARCHAR(200),
	package VARCHAR(200),
	storage INT
)
INSERT INTO la_product (pro_id,family_id,sku,title,discount_msg,onsale_price,origin_price,month_sold,total_sold,total_comments,taste,package,storage) VALUES(1,1,218310,"良品铺子 手剥松子218g 坚果炒货 巴西松子","购物满2件打8折，满3件7折",56.9,98,1015,6015,640,"原味","手袋单人份",1000),(1,1,218311,"良品铺子 手剥松子218g 坚果炒货 巴西松子","购物满2件打8折，满3件7折",99.8,208,1015,6015,640,"原味","礼盒双人份",900),(1,1,218312,"良品铺子 手剥松子218g 坚果炒货 巴西松子","购物满2件打8折，满3件7折",198,468,1015,6015,640,"原味","全家福礼包",800),(1,1,218313,"良品铺子 手剥松子218g 坚果炒货 巴西松子","购物满2件打8折，满3件7折",56.9,98,1015,6015,640,"奶油","手袋单人份",1000),(1,1,218314,"良品铺子 手剥松子218g 坚果炒货 巴西松子","购物满2件打8折，满3件7折",99.8,208,1015,6015,640,"奶油","礼盒双人份",900),(1,1,218315,"良品铺子 手剥松子218g 坚果炒货 巴西松子","购物满2件打8折，满3件7折",198,468,1015,6015,640,"奶油","全家福礼包",800),(1,1,218316,"良品铺子 手剥松子218g 坚果炒货 巴西松子","购物满2件打8折，满3件7折",56.9,98,1015,6015,640,"炭烧","手袋单人份",1000),(1,1,218317,"良品铺子 手剥松子218g 坚果炒货 巴西松子","购物满2件打8折，满3件7折",99.8,208,1015,6015,640,"炭烧","礼盒双人份",900),(1,1,218318,"良品铺子 手剥松子218g 坚果炒货 巴西松子","购物满2件打8折，满3件7折",198,468,1015,6015,640,"炭烧","全家福礼包",800),(1,1,218319,"良品铺子 手剥松子218g 坚果炒货 巴西松子","购物满2件打8折，满3件7折",56.9,98,1015,6015,640,"咸香","手袋单人份",1000),(1,1,218320,"良品铺子 手剥松子218g 坚果炒货 巴西松子","购物满2件打8折，满3件7折",99.8,208,1015,6015,640,"咸香","礼盒双人份",900),(1,1,218321,"良品铺子 手剥松子218g 坚果炒货 巴西松子","购物满2件打8折，满3件7折",198,468,1015,6015,640,"咸香","全家福礼包",800)
#商品详情：参数+细节图
CREATE TABLE la_product_details(
	did INT PRIMARY KEY AUTO_INCREMENT,
	pid INT,
	pro_param TEXT,
	detail_pics TEXT
)
INSERT INTO la_product_details(pid, pro_param, detail_pics) VALUES(1,"[{\"产品类型\":\"烘炒类\"},{\"原料产地\":\"巴基斯坦\"},{\"产地\":\"湖北省武汉市\"},{\"配料表\":\"进口松子、食用盐\"},{\"产品规格\":\"210g\"},{\"保质期\":\"180天\"},{\"产品标准号\":\"GB/T 22165\"},{\"生产许可证编号\":\"QS4201 1801 0226\"},{\"存储方法\":\"请放置于常温、阴凉、通风、干燥的环境下\"},{\"食用方法\":\"开袋去壳即食\"}]","[{\"url\":\"img/tw1.jpg\"},{\"url\":\"img/tw2.jpg\"},{\"url\":\"img/tw3.jpg\"},{\"url\":\"img/tw4.jpg\"},{\"url\":\"img/tw5.jpg\"},{\"url\":\"img/tw6.jpg\"},{\"url\":\"img/tw7.jpg\"}]")


#商品详情：评价
CREATE TABLE la_product_comments(
	id INT PRIMARY KEY AUTO_INCREMENT,
    com_type INT, #数字表示好中差评
	content VARCHAR(500),
	user_name VARCHAR(50),
    avatar VARCHAR(128) DEFAULT "img/getAvatar.do.jpg",
	com_time BIGINT,
	taste VARCHAR(50),
	pack VARCHAR(10)
)
INSERT INTO la_product_comments (com_type,content,user_name,com_time,taste,pack) VALUES (1,"松子超级好吃吖 很香 没有吃到空的 还是挺饱满的 活动促销的时候买的 还挺实惠的 同城发货速度好快吖 一天就到了 包装也挺好哒","一来二往",1536640200000,"咸香","手袋单人份")
INSERT INTO la_product_comments (com_type,content,user_name,com_time,taste,pack) VALUES (1,"一如既往的喜欢良品铺子，坚果颗粒饱满，味道美味，做活动的时候经常买，送家人，朋友都不错，有更多实惠就更好啦。","华容花果山",1536780201000,"原味","礼盒双人份"),(2,"还行，就是份量太少了点。","单细胞动物",1590780221000,"奶油","手袋单人份")
INSERT INTO la_product_comments (com_type,content,user_name,com_time,taste,pack) VALUES (1,"质量不错好吃，与卖家描述的完全一致，非常满意，完全超出期望值，发货速度非常快，包装非常仔细、严实，物流公司服务态度很好，运送速度很快，很满意的一次购物，給32个赞赞赞赞赞赞赞赞赞赞赞赞赞赞赞赞赞赞赞赞赞赞赞赞赞赞赞赞赞''''''''''","whgk223",1596784001000,"炭烧","礼盒双人份"),(1,"满意满意 很好吃 和在实体店买的味道一样 好像还送了小礼品，宝宝很喜欢吃哦","abc123",1550788821000,"奶油","手袋单人份"),(1,"这是一个好评模板，不要看了下面都是废话。因为本仙女很懒不想每个宝贝都写好评所以才模仿网友的好评模板，但是这个宝贝不管是质量还是款式都是本仙女喜欢的如果不喜欢本仙女收到会很生气然后这个模板就会变成各种喋喋不体的吐槽，自然不会撒下这个好评给各位淘友一个参考。本宝贝还是极好的，来自一位懒省事的只爱购物不爱写评论只想换积分的仙女","hgish666",1596734253000,"奶油","礼盒双人份"),(1,"物流很快，喜欢，一直在天猫买。希望优惠活动多一些，针对老会员有积分更好，老板生意兴隆～～～～～～～～～～～～","jgls567",1595566821000,"炭烧","手袋单人份"),(1,"不仅特别好吃，吃到的更是良品铺子的品质！买了一大堆东西，无可挑剔！！每一个都特别好！对得起良品","ste658",1556736785000,"奶油","礼盒双人份"),(3,"很小一袋，感觉越来越没有以前好了","ruio999",1578236826600,"炭烧","手袋单人份"),(1,"零食非常好，与卖家描述的完全一致，非常满意,真的很喜欢，完全超出期望值，发货速度非常快，包装非常仔细、严实，物流公司服务态度很好，运送速度很快，很满意的一次购物，还会继续回购。","tet366",1588738351300,"奶油","礼盒双人份"),(3,"给别人买的，本来当个大礼包，想送出去好看点，结果给我分两个很小气很小气的小箱发过来，重点是分两个，更显着小气。。。还两个位置发，不理解","tyru654",1583536826230,"奶油","手袋单人份"),(2,"挺好的，一如既往，好吃，就是还以为是以前的大包，收到后，是小包，稍微有些失望，还会继续购买的。","swteiy435",1513003486230,"咸香","手袋单人份"),(1,"发货神速，第二天就到了。大热天不必出门就有美食，很满意了。老顾客，信赖品质，希望保持！","ayithk22",1556236820010,"奶油","手袋单人份"),(1,"味道还是一如既往的好。作为上班的零食。良品铺子一直是我的第一选择，物流快。服务好。零食还深得我心","yaktk990",1518903480030,"原味","全家福礼包")

#商品详情：大中小图片
CREATE TABLE la_pro_pics(
	id INT PRIMARY KEY AUTO_INCREMENT,
	pro_id INT,
	sm VARCHAR(200),
	md VARCHAR(200),
	lg VARCHAR(200)
)
INSERT INTO la_pro_pics (pro_id,sm,md,lg) VALUES (1,"img/01_small.jpg","img/01_mid.jpg","img/01.jpg"),(1,"img/02_small.jpg","img/02_mid.jpg","img/02.jpg"),(1,"img/03_small.jpg","img/03_mid.jpg","img/03.jpg"),(1,"img/04_small.jpg","img/04_mid.jpg","img/04.jpg"),(1,"img/05_small.jpg","img/05_mid.jpg","img/05.jpg"),(1,"img/06_small.jpg","img/06_mid.jpg","img/06.jpg"),(1,"img/07_small.jpg","img/07_mid.jpg","img/07.jpg"),(1,"img/08_small.jpg","img/08_mid.jpg","img/08.jpg")




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