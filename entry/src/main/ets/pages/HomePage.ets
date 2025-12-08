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

  // 我的占位页
  @Builder
  private ProfilePage() {
    Column() {
      Text('我的')
        .fontSize($r('app.float.middle_font_size'))
        .fontColor(Color.White)
      Text('个人中心功能待实现')
        .fontSize($r('app.float.small_font_size'))
        .fontColor(Color.White)
        .opacity(Const.SIXTY_OPACITY)
        .margin({ top: 8 })
    }
    .justifyContent(FlexAlign.Center)
    .alignItems(HorizontalAlign.Center)
    .width(Const.FULL_WIDTH)
    .height(Const.FULL_HEIGHT)
  }
}
