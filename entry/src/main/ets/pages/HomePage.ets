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

import { CommonConstants as Const } from '../common/constants/CommonConstants';
import ClassifyComponent from '../view/ClassifyComponent';
import SearchComponent from '../view/SearchComponent';
import SwiperComponent from '../view/SwiperComponent';
import WaterFlowComponent from '../view/WaterFlowComponent';
import CartPage from './CartPage';

/**
 * The home page consists of four components: search component,
 * classify component, swiper component, and waterfall flow component.
 * How to use: These four components are invoked where the control is used.
 */
@Entry
@Component
struct HomePage {
  @StorageLink('topRectHeight') topRectHeight: number = 0;
  @StorageLink('bottomRectHeight') bottomRectHeight: number = 0;
  @StorageLink('searchKeyword') searchKeyword: string = '';
  @State currentTabIndex: number = 0; // 0: 首页, 1: 购物车, 2: 我的

  build() {
    Stack({ alignContent: Alignment.Top }) {
      Image($r('app.media.ic_app_background'))
        .width(Const.FULL_WIDTH)
        .height($r('app.float.image_background_height'))
        .objectFit(ImageFit.Cover)
      Column() {
        // 主体内容区域根据底部导航切换
        Column() {
          if (this.currentTabIndex === 0) {
            // 首页
            SearchComponent()
            ClassifyComponent()
            // 搜索时隐藏轮播
            if (!this.searchKeyword || this.searchKeyword.trim().length === 0) {
              SwiperComponent()
            }
            WaterFlowComponent()
          } else if (this.currentTabIndex === 1) {
            // 购物车
            CartPage()
          } else if (this.currentTabIndex === 2) {
            // 我的
            this.ProfilePage()
          }
        }
        .layoutWeight(1)
        .padding({
          left: $r('app.float.home_margin_left'),
          right: $r('app.float.home_margin_right'),
          top: this.getUIContext().px2vp(this.topRectHeight)
        })

        // 底部导航栏
        this.BottomTabBar()
      }
      .height(Const.FULL_HEIGHT)
    }
    .backgroundColor($r('app.color.home_background_color'))
  }

  @Builder
  private BottomTabItem(icon: Resource, title: string, index: number) {
    Column() {
      Image(icon)
        .width(24)
        .height(24)
        .margin({ bottom: 4 })
        .opacity(this.currentTabIndex === index ? Const.FULL_OPACITY : Const.SIXTY_OPACITY)
      Text(title)
        .fontSize($r('app.float.small_font_size'))
        .fontColor(this.currentTabIndex === index ? Color.Black : Color.Gray)
    }
    .justifyContent(FlexAlign.Center)
    .alignItems(HorizontalAlign.Center)
    .layoutWeight(1)
    .height(50)
    .onClick(() => {
      this.currentTabIndex = index;
    })
  }

  @Builder
  private BottomTabBar() {
    Row() {
      this.BottomTabItem($r('app.media.ic_tab_home'), '首页', 0)
      this.BottomTabItem($r('app.media.ic_tab_cart'), '购物车', 1)
      this.BottomTabItem($r('app.media.ic_tab_profile'), '我的', 2)
    }
    .justifyContent(FlexAlign.SpaceEvenly)
    .alignItems(VerticalAlign.Center)
    .width(Const.FULL_WIDTH)
    .height(56)
    .backgroundColor(Color.White)
    .borderRadius({ topLeft: 16, topRight: 16 })
    .shadow({
      radius: 10,
      color: '#1F000000',
      offsetX: 0,
      offsetY: -2
    })
    .margin({
      left: $r('app.float.home_margin_left'),
      right: $r('app.float.home_margin_right')
    })
  }

  // 购物车页面由 CartPage 组件实现

  @Builder
  private ProfilePage() {
    Column() {
      Column() {
        Text('个人中心')
            .fontSize(24)
            .fontColor('#FFF')
            .fontWeight(FontWeight.Bold)
            .alignSelf(ItemAlign.Center)
      }
      .width(Const.FULL_WIDTH)
      .height(70)
      .justifyContent(FlexAlign.Center)
      .alignItems(HorizontalAlign.Center)
      .borderRadius(12)
      .margin({ bottom: 16 })
      .shadow({ radius: 2, color: '#1F000000', offsetY: 1 })
      
      // 用户信息卡片
      Row() {
        Image($r('app.media.ic_tab_profile'))
          .width(96)
          .height(96)
          .borderRadius(48)
          .border({ width: 2, color: $r('app.color.home_background_color') })
          .shadow({ radius: 8, color: '#40000000', offsetY: 4 })
          .margin({ right: 20 })

        Column() {
          Text('用户')
            .fontSize(20)
            .fontColor('#333')
            .fontWeight(FontWeight.Bold)
          Text('test123')
            .fontSize(14)
            .margin({ top: 6 })
            .fontColor('#666')
        }
        .layoutWeight(1)

        Row() {
          Button('退出登录')
            .width(96)
            .height(36)
            .fontSize(14)
            .backgroundColor('#FFF')
            .fontColor($r('app.color.error_color'))
            .border({ width: 1, color: $r('app.color.error_color') })
            .borderRadius(18)
        }
      }
      .padding(20)
      .backgroundColor(Color.White)
      .borderRadius(16)
      .margin({ left: 20, right: 20, bottom: 20 })
      .width('calc(100% - 40px)')
      .shadow({ radius: 4, color: '#1F000000', offsetY: 2 })
      
      // 资产统计区域
      Row() {
          Column() {
            Text('优惠券')
              .fontSize(14)
              .fontColor('#666')
            Text('2张')
              .fontSize(18)
              .fontColor('#333')
              .fontWeight(FontWeight.Medium)
              .margin({ top: 4 })
          }
          .flexGrow(1)
          .alignItems(HorizontalAlign.Center)
          .padding(12)

          Column() {
            Text('余额')
              .fontSize(14)
              .fontColor('#666')
            Text('¥3.14')
              .fontSize(18)
              .fontColor('#333')
              .fontWeight(FontWeight.Medium)
              .margin({ top: 4 })
          }
          .flexGrow(1)
          .alignItems(HorizontalAlign.Center)
          .padding(12)

          Column() {
            Text('红包')
              .fontSize(14)
              .fontColor('#666')
            Text('3个')
              .fontSize(18)
              .fontColor('#333')
              .fontWeight(FontWeight.Medium)
              .margin({ top: 4 })
          }
          .flexGrow(1)
          .alignItems(HorizontalAlign.Center)
          .padding(12)

          Column() {
            Text('省钱卡')
              .fontSize(14)
              .fontColor('#666')
            Text('已开通')
              .fontSize(18)
              .fontColor(Color.Green)
              .fontWeight(FontWeight.Medium)
              .margin({ top: 4 })
          }
          .flexGrow(1)
          .alignItems(HorizontalAlign.Center)
          .padding(12)

      }
      .padding(16)
      .backgroundColor(Color.White)
      .borderRadius(16)
      .margin({ left: 20, right: 20, bottom: 20 })
      .width('calc(100% - 40px)')
      .justifyContent(FlexAlign.SpaceBetween)
      .shadow({ radius: 4, color: '#1F000000', offsetY: 2 })
      
      // 快捷入口区域
      Row() {
          Column() {
            Text('我的足迹')
              .fontSize(16)
              .fontColor('#333')
              .padding(12)
              .backgroundColor(Color.White)
              .borderRadius(12)
              .shadow({ radius: 2, color: '#1F000000', offsetY: 1 })
          }
          .onClick(() => {})

          Column() {
            Text('我的收藏')
              .fontSize(16)
              .fontColor('#333')
              .padding(12)
              .backgroundColor(Color.White)
              .borderRadius(12)
              .shadow({ radius: 2, color: '#1F000000', offsetY: 1 })
          }
          .onClick(() => {})

          Column() {
            Text('我的关注')
              .fontSize(16)
              .fontColor('#333')
              .padding(12)
              .backgroundColor(Color.White)
              .borderRadius(12)
              .shadow({ radius: 2, color: '#1F000000', offsetY: 1 })
          }
          .onClick(() => {})

      }
      .width('calc(100% - 80px)')
      .justifyContent(FlexAlign.SpaceBetween)
      .margin({ bottom: 20 })
      
      // 我的订单区域
      Column() {
        Row() {
          Text('我的订单')
            .fontSize(20)
            .fontColor('#333')
            .fontWeight(FontWeight.Medium)

          Blank()

          Text('查看全部 >')
            .fontSize(14)
            .fontColor('#666')
            .onClick(() => {})
        }
        .width('100%')
        .margin({ bottom: 20 })

        Row() {
          Column() {
            Image($r('app.media.icon_zhif'))
              .width(50)
            Text('待付款')
              .fontSize(14)
              .fontColor('#666')
              .margin({ top: 8 })
          }
          .flexGrow(1)
          .alignItems(HorizontalAlign.Center)

          Column() {
            Image($r('app.media.icon_lotion'))
              .width(50)
            Text('待收货')
              .fontSize(14)
              .fontColor('#666')
              .margin({ top: 8 })
          }
          .flexGrow(1)
          .alignItems(HorizontalAlign.Center)

          Column() {
            Image($r('app.media.carmine'))
              .width(50)
            Text('待评价')
              .fontSize(14)
              .fontColor('#666')
              .margin({ top: 8 })
          }
          .flexGrow(1)
          .alignItems(HorizontalAlign.Center)

          Column() {
            Image($r('app.media.icon_gwc'))
              .width(50)
            Text('退换/售后')
              .fontSize(14)
              .fontColor('#666')
              .margin({ top: 8 })
          }
          .flexGrow(1)
          .alignItems(HorizontalAlign.Center)

        }
        .padding(20)
        .backgroundColor(Color.White)
        .borderRadius(16)
        .width('100%')
        .justifyContent(FlexAlign.SpaceBetween)
      }
      .padding(20)
      .backgroundColor(Color.White)
      .borderRadius(16)
      .margin({ left: 20, right: 20 })
      .width('calc(100% - 40px)')
      .shadow({ radius: 4, color: '#1F000000', offsetY: 2 })
    }
    .alignItems(HorizontalAlign.Center)
    .width(Const.FULL_WIDTH)
    .height(Const.FULL_HEIGHT)
    .padding({ bottom: 20 })

  }
}
