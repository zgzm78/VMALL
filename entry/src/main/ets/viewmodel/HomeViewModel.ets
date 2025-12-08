/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { IProductItem } from './ProductItem';

/**
 * Home page classify title data.
 */
const classifyTitle: Resource[] = [
  $r('app.string.title_bar_homepage'),
  $r('app.string.title_bar_phone'),
  $r('app.string.title_bar_computer'),
  $r('app.string.title_bar_foods'),
  $r('app.string.title_bar_men_wear'),
  $r('app.string.title_bar_fresh'),
  $r('app.string.title_bar_furniture_kitchenware')
];

/**
 * Home page swiper image data.
 */
const swiperImage: Resource[] = [
  $r('app.media.ic_home_appliances_special'),
  $r('app.media.ic_coupons'),
  $r('app.media.ic_internal_purchase_price')
];


/**
 * Home page water flow item init data.
 */
const waterFlowData: IProductItem[] = [
  // 首页分类 (category: 0)
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_04B8B3EA3656D724A068789C65AC2CFF.png",
    "name": "Mate 80 Pro",
    "discount": "",
    "price": "¥6999",
    "promotion": "",
    "bonus_points": "",
    "detail":"",
    "category": 0
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_C42771B009616C47F5D965927253D340.png",
    "name": "Mate 80 RS 非凡大师",
    "discount": "",
    "price": "¥11999",
    "promotion": "",
    "bonus_points": "",
    "detail":"",
    "category": 0
  },
  // 手机分类 (category: 1)
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_6476C5B49284C5626B813B3342FE19B2.png",
    "name": "Mate X7",
    "discount": "超可靠折叠玄武架构，第二代红枫影像，鸿蒙大屏AI智能体",
    "price": "¥17599",
    "promotion": "",
    "bonus_points": "200",
    "detail": [
      "https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/92E898579B5026F68AEB0ED4A1469878.jpg",
      "https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/B3BCCA7DA126B24AE1C6C8E10AAA9838.jpg",
      "https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/AD02E9E8F1B413A50E29C8DEF8D5FAF2.jpg"
    ],
    "category": 1
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_D6757632EAE2763CF86C2FA9FEF903CA.png",
    "name": "Mate 80 Pro Max",
    "discount": "全金属玄武架构，超透亮灵珑屏，第二代红枫影像",
    "price": "¥8999",
    "promotion": "",
    "bonus_points": "90",
    "detail":[
      "https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/87B47339EF5534CA981A3674790AE525.jpg",
      "https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/B43DCBFA7FDB6C3E198355E8DDF4DC6C.jpg",
      "https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/5329BDD40CD224467EA295E4EDCCFEAF.jpg",
      "https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/6DB3DFF828EB211CA574DF6FD09D09F4.jpg"
    ],
    "category": 1
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_7359210F3AB11077FAA8D757DB3C553F.png",
    "name": "Mate 80",
    "discount": "第二代红枫影像，鸿蒙AI，超可靠玄武架构",
    "price": "¥5499",
    "promotion": "",
    "bonus_points": "55",
    "detail":[
      "https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/824F6FD7AB7FB9AC64A17C6D90A24A12.jpg",
      "https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/0B7CB1D8DB34085D4341CBB09938EECC.jpg",
      "https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/BB39C233924643C1724728796201D9AB.jpg"
    ],
    "category": 1
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_04B8B3EA3656D724A068789C65AC2CFF.png",
    "name": "Mate 80 Pro",
    "discount": "第二代红枫影像，鸿蒙AI，户外探索模式",
    "price": "¥6999",
    "promotion": "",
    "bonus_points": "70",
    "detail":[
      "https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/F7339B07B8A4DD94E7CA323AEC30D8CA.jpg",
      "https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/A4FE9B8EC253E789DAB1845A3E13EAA4.jpg",
      "https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/D33FBEFE2D330C12AB2CA1C2F5DDFABB.jpg"
    ],
    "category": 1
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_C42771B009616C47F5D965927253D340.png",
    "name": "Mate 80 RS 非凡大师",
    "discount": "超广色域灵珑屏，高亮钛玄武架构，第二代红枫影像",
    "price": "¥11999",
    "promotion": "",
    "bonus_points": "120",
    "detail":[
      "https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/9A6AF67A6FC31B504F54783DE7A8CA54.jpg",
      "https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/7DB1628BF676CD060C7725529DDD0CFB.jpg",
      "https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/7C38CA7A9360316C93BCFE194FD10E91.jpg",
      "https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/E7AA7DF02494E0779AB3638C92B18509.jpg"
    ],
    "category": 1
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_A7DDBD65423DBED94B982E5D3CCC2D27.png",
    "name": "Mate X6",
    "discount": "分布式玄武架构，鸿蒙大屏AI，红枫原色影像",
    "price": "¥10999",
    "promotion": "原价 ¥12999",
    "bonus_points": "140",
    "detail":[
      "https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/CBA3176617F969A7C132E6D1170B3DFD.jpg",
      "https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/F4829CD9249F531BC3899E78BEA29B02.jpg",
      "https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/1981C995F82D9FB92A3FA7E1561A7308.jpg",
      "https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/7D74AE13F9907DAFAA0C793632276C38.jpg",
      "https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/335F106991DCF08A4C2232EDB19D01F8.jpg"
    ],
    "category": 1
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_1ADACDD1074CFC04E130A69678F422C1.png",
    "name": "Mate 70 Air",
    "discount": "超薄长续航，7英寸华为临境大屏，红枫原色影像",
    "price": "¥4199",
    "promotion": "",
    "bonus_points": "40",
    "detail":[
      "https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/D7A0E002EB6DFD52C77ED873ECEA2941.jpg",
      "https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/D7A0E002EB6DFD52C77ED873ECEA2941.jpg",
      "https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/40567705BB0EFAF4D55FF055B6D0C958.jpg",
      "https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/0F9C625B918A020655F71295A2C751BE.jpg"
    ],
    "category": 1
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_4EA4288A58F97B1DFF68C2F608F84EC3.png",
    "name": "Mate 70 Pro",
    "discount": "12期0分期利息",
    "price": "¥5499",
    "promotion": "原价 ¥6499",
    "bonus_points": "",
    "detail":"",
    "category": 1
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_CCB892969E4A54DB10FEECB7BB4E704D.png",
    "name": "Mate XTs 非凡大师",
    "discount": "",
    "price": "¥21999",
    "promotion": "",
    "bonus_points": "",
    "detail":"",
    "category": 1
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_435A71F45CED8BB63F827041183F5702.png",
    "name": "Pura 80",
    "discount": "12期0分期利息",
    "price": "¥4899",
    "promotion": "原价 ¥5499",
    "bonus_points": "",
    "detail":"",
    "category": 1
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_840ACF79CA46AEEEC8730992DD05616A.png",
    "name": "华为畅享 70X 尊享版",
    "discount": "",
    "price": "¥1899",
    "promotion": "原价 ¥1999",
    "bonus_points": "",
    "detail":"",
    "category": 1
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_6DEFA8E52CD749385860692A24DA15B9.png",
    "name": "Mate 70 Pro+",
    "discount": "12期0分期利息",
    "price": "¥6899",
    "promotion": "原价 ¥8499",
    "bonus_points": "",
    "detail":"",
    "category": 1
  },
  // 电脑分类 (category: 2)
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_3D2D80A19F6C33F8A3A91DD1CD31F411.png",
    "name": "MateBook 14 酷睿 Ultra",
    "discount": "12期0分期利息",
    "price": "¥5599",
    "promotion": "原价 ¥5799",
    "bonus_points": "",
    "detail":"",
    "category": 2
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_A51050A7F1F08287AF6ED936E42E49C6.png",
    "name": "MateBook Pro",
    "discount": "新品 | 12期0分期利息",
    "price": "¥8899",
    "promotion": "原价 ¥8999",
    "bonus_points": "",
    "detail":"",
    "category": 2
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_B040F9A8572FB6AE583BEBA5C606845C.png",
    "name": "MateBook D 14",
    "discount": "赠品",
    "price": "¥3999",
    "promotion": "",
    "bonus_points": "",
    "detail":"",
    "category": 2
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_44D32EC50B77359AAE64D05FB6D68BC0.png",
    "name": "MateBook D 16 2024",
    "discount": "赠品",
    "price": "¥4299",
    "promotion": "",
    "bonus_points": "",
    "detail":"",
    "category": 2
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_7C4DBE0558BF5B2191FBF2002484E137.png",
    "name": "MateBook Fold 非凡大师",
    "discount": "新品 | 12期0分期利息",
    "price": "¥26999",
    "promotion": "赠品",
    "bonus_points": "",
    "detail":"",
    "category": 2
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_5184880ED48AC3A8CD6EF04ACDE7B389.png",
    "name": "MateBook GT 14 酷睿 Ultra",
    "discount": "",
    "price": "¥7499",
    "promotion": "",
    "bonus_points": "",
    "detail":"",
    "category": 2
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_5E37C22E7CDE74B3A954FAFD2E2D613F.png",
    "name": "MateBook D 16 SE 2024",
    "discount": "",
    "price": "¥3499",
    "promotion": "原价 ¥3699",
    "bonus_points": "",
    "detail":"",
    "category": 2
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_304C8996E4B0B563E0C160B1226B363B.png",
    "name": "MateView SE 27英寸",
    "discount": "3期0分期利息",
    "price": "¥549",
    "promotion": "原价 ¥699",
    "bonus_points": "",
    "detail":"",
    "category": 2
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_2293D39712DF9EBD9D491B2535C484F9.png",
    "name": "MateBook D 14 SE",
    "discount": "",
    "price": "¥3499",
    "promotion": "原价 ¥3699",
    "bonus_points": "",
    "detail":"",
    "category": 2
  },
  // 食品分类 (category: 3)
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_bop_server/BopMaterialCenter/800_800_B90DFF2974B7DCD085AF9512A8FB2440.png",
    "name": "【莫塞尔】荷兰乐荷有机全脂牛奶",
    "discount": "",
    "price": "¥179",
    "promotion": "",
    "bonus_points": "",
    "detail":"",
    "category": 3
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_bop_server/BopMaterialCenter/800_800_160993A35041ABEE5B7C85122A4E8D78.png",
    "name": "【莫塞尔】法国白马庄园红葡萄酒",
    "discount": "赠品",
    "price": "¥10062",
    "promotion": "",
    "bonus_points": "",
    "detail":"",
    "category": 3
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_bop_server/BopMaterialCenter/800_800_B0716F4A26600F143A6526701540B0ED.png",
    "name": "【莫塞尔】细品如饴·蜂蜜礼盒",
    "discount": "",
    "price": "¥268",
    "promotion": "",
    "bonus_points": "",
    "detail":"",
    "category": 3
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_bop_server/BopMaterialCenter/800_800_5E161470643C39F448D0F7482F744E00.png",
    "name": "【莫塞尔】阿根廷草饲牛板腱",
    "discount": "",
    "price": "¥168",
    "promotion": "",
    "bonus_points": "",
    "detail":"",
    "category": 3
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_bop_server/BopMaterialCenter/800_800_1668413169B213756ED2FA3B358E0016.png",
    "name": "【莫塞尔】世界咖啡甄享礼盒",
    "discount": "",
    "price": "¥188",
    "promotion": "",
    "bonus_points": "",
    "detail":"",
    "category": 3
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_bop_server/BopMaterialCenter/800_800_90697A70125BAEB9AE8FAC06AB016341.png",
    "name": "【莫塞尔】2025年中秋酒茶礼盒",
    "discount": "",
    "price": "¥355",
    "promotion": "原价 ¥448",
    "bonus_points": "",
    "detail":"",
    "category": 3
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_bop_server/BopMaterialCenter/800_800_E7C9C304373B1D57A1606B348217B3A3.png",
    "name": "【莫塞尔】法国吉哈伯通红葡萄酒",
    "discount": "赠品",
    "price": "¥228",
    "promotion": "",
    "bonus_points": "",
    "detail":"",
    "category": 3
  },
  // 穿戴分类 (category: 4)
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_6056BC862F8F7936BF7E6B49D79BDACD.png",
    "name": "WATCH GT 6 Pro",
    "discount": "6期0分期利息",
    "price": "¥2438",
    "promotion": "原价 ¥2488",
    "bonus_points": "",
    "detail":"",
    "category": 4
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_60CFCD2159D58FA009EC03BE1E85273C.png",
    "name": "华为手环 10",
    "discount": "",
    "price": "¥209",
    "promotion": "原价 ¥269",
    "bonus_points": "",
    "detail":"",
    "category": 4
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_B6563E16A22FD3AEF60D57DCA8A2C935.png",
    "name": "WATCH GT 6",
    "discount": "6期0分期利息",
    "price": "¥1438",
    "promotion": "原价 ¥1488",
    "bonus_points": "",
    "detail":"",
    "category": 4
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_1DF7063BA73B72B93BAB792928EEB6A3.png",
    "name": "WATCH 5",
    "discount": "12期0分期利息",
    "price": "¥2399",
    "promotion": "原价 ¥2699",
    "bonus_points": "",
    "detail":"",
    "category": 4
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_CE7B0985EEEBA55C7AD62F9F63012238.png",
    "name": "WATCH D2",
    "discount": "",
    "price": "¥2988",
    "promotion": "",
    "bonus_points": "",
    "detail":"",
    "category": 4
  },
  {
    "image_url": "https://res.vmallres.com/pimages/uomcdn/CN/pms/202409/gbom/6942103132186/800_800_946FA8C2EBABBF99306F74B18FD0FBB5mp.png",
    "name": "WATCH GT 5",
    "discount": "",
    "price": "¥1788",
    "promotion": "",
    "bonus_points": "",
    "detail":"",
    "category": 4
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_E802EF64EF2A2E298B693CFE48F9D239.png",
    "name": "WATCH FIT 4",
    "discount": "6期0分期利息",
    "price": "¥849",
    "promotion": "原价 ¥999",
    "bonus_points": "",
    "detail":"",
    "category": 4
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_DCF47F0B3BBF85B21642C5F61B6C3329.png",
    "name": "WATCH Ultimate 2 非凡探索",
    "discount": "12期0分期利息",
    "price": "¥7499",
    "promotion": "",
    "bonus_points": "",
    "detail":"",
    "category": 4
  },
  {
    "image_url": "https://res.vmallres.com/pimages/uomcdn/CN/pms/202409/gbom/6942103134203/800_800_B9306C4BE9A3D6AEB4849FB193AD5C99mp.png",
    "name": "WATCH GT 5 Pro",
    "discount": "12期0分期利息",
    "price": "¥2288",
    "promotion": "原价 ¥2788",
    "bonus_points": "",
    "detail":"",
    "category": 4
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_AEE2D7AC56F75A798506E98FCA142E99.png",
    "name": "华为儿童手表 5 Pro",
    "discount": "6期0分期利息",
    "price": "¥998",
    "promotion": "原价 ¥1198",
    "bonus_points": "",
    "detail":"",
    "category": 4
  },
  // 耳机分类 (category: 5)
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_46F0024C477212E37407F94DC12DF2A7.png",
    "name": "FreeClip 2",
    "discount": "6期0分期利息",
    "price": "¥1299",
    "promotion": "",
    "bonus_points": "",
    "detail":"",
    "category": 5
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_CA93198592B07BE0077670D66162148C.png",
    "name": "FreeBuds Pro 5",
    "discount": "赠品 | 6期0分期利息",
    "price": "¥1449",
    "promotion": "原价 ¥1499",
    "bonus_points": "",
    "detail":"",
    "category": 5
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_8BCF6E4469DAAE0A2495890B593B5C8B.png",
    "name": "FreeBuds 7i",
    "discount": "3期0分期利息",
    "price": "¥499",
    "promotion": "原价 ¥599",
    "bonus_points": "",
    "detail":"",
    "category": 5
  },
  {
    "image_url": "https://res.vmallres.com/pimages/uomcdn/CN/pms/202406/displayProduct/10086459091537/800_800_5D558EF0FF7BEE784DD94C817F1F4EDBmp.png",
    "name": "FreeBuds SE 2",
    "discount": "",
    "price": "¥109",
    "promotion": "原价 ¥199",
    "bonus_points": "",
    "detail":"",
    "category": 5
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_028BCCEA088102D4B48DBAB75202DA79.png",
    "name": "FreeClip",
    "discount": "6期0分期利息",
    "price": "¥1099",
    "promotion": "原价 ¥1299",
    "bonus_points": "",
    "detail":"",
    "category": 5
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_6C36BB3013B0FA782F29A0FA0CE1736B.png",
    "name": "FreeArc",
    "discount": "6期0分期利息",
    "price": "¥599",
    "promotion": "原价 ¥799",
    "bonus_points": "",
    "detail":"",
    "category": 5
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_97CD385480B682A73A764504A5FA6EFE.png",
    "name": "FreeBuds SE 3",
    "discount": "",
    "price": "¥149",
    "promotion": "原价 ¥199",
    "bonus_points": "",
    "detail":"",
    "category": 5
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_25A67014C292A0E4B425FC539DDD73DF.png",
    "name": "FreeBuds 6",
    "discount": "6期0分期利息",
    "price": "¥749",
    "promotion": "原价 ¥999",
    "bonus_points": "",
    "detail":"",
    "category": 5
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_79C24E66FC900688A75CA5142C928BB7.png",
    "name": "FreeBuds SE 4 ANC",
    "discount": "3期0分期利息",
    "price": "¥209",
    "promotion": "原价 ¥299",
    "bonus_points": "",
    "detail":"",
    "category": 5
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_0A0C29E4F39BD71ED0F9DA1173E8A0B6.png",
    "name": "FreeBuds Pro 4",
    "discount": "6期0分期利息",
    "price": "¥1249",
    "promotion": "原价 ¥1499",
    "bonus_points": "",
    "detail":"",
    "category": 5
  },
  // 家具分类 (category: 6)
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_10CEB44B36EBADBDE2F017A044840D46.png",
    "name": "720智能空气净化器3s增强版",
    "discount": "3期0分期利息",
    "price": "¥1299",
    "promotion": "原价 ¥1799",
    "bonus_points": "",
    "detail":"",
    "category": 6
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_AA87313C60CC489CE47F860B6A341AA9.png",
    "name": "MEIPONT智能空调 风神之眼Pro",
    "discount": "",
    "price": "¥3499",
    "promotion": "原价 ¥3799",
    "bonus_points": "",
    "detail":"",
    "category": 6
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_E87BF21B6FDD8C7B80CAD4A2E1744AEF.png",
    "name": "哈尔斯智能咖啡杯 星闪版 (纯钛)",
    "discount": "",
    "price": "¥449",
    "promotion": "原价 ¥499",
    "bonus_points": "",
    "detail":"",
    "category": 6
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_CF268A092B1A6DCA64359BA25EDCF27C.png",
    "name": "哈尔斯智能泡茶杯 星闪纯钛版",
    "discount": "",
    "price": "¥2999",
    "promotion": "",
    "bonus_points": "",
    "detail":"",
    "category": 6
  },
  {
    "image_url": "https://res.vmallres.com/pimages/uomcdn/CN/pms/202409/gbom/6939991700627/800_800_B395CC143C44A83A98DAA5823D044CD9mp.png",
    "name": "720智能空气加湿一体机",
    "discount": "3期0分期利息",
    "price": "¥1799",
    "promotion": "原价 ¥2299",
    "bonus_points": "",
    "detail":"",
    "category": 6
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_1E0E907641703E54A954C2F5F83B43EC.png",
    "name": "IAM智能宠物空气净化器U7 Pro",
    "discount": "6期0分期利息",
    "price": "¥4699",
    "promotion": "原价 ¥5499",
    "bonus_points": "",
    "detail":"",
    "category": 6
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_50A3560D2EE39111D3590692004820AF.png",
    "name": "IAM宠物空气净化器U7",
    "discount": "6期0分期利息",
    "price": "¥3499",
    "promotion": "原价 ¥4199",
    "bonus_points": "",
    "detail":"",
    "category": 6
  },
  {
    "image_url": "https://res.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/800_800_A6405B5254373CDB10C44FA03AC90078.png",
    "name": "MEIPONT智能空调 风神之眼",
    "discount": "",
    "price": "¥2999",
    "promotion": "原价 ¥3299",
    "bonus_points": "",
    "detail":"",
    "category": 6
  }
];

export { classifyTitle, swiperImage, waterFlowData };