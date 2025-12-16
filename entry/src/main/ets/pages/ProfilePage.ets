import router from '@ohos.router';
import { CommonConstants as Const } from '../common/constants/CommonConstants';

/**
 * Profile (我的) tab content.
 */
@Component
export default struct ProfilePage {
  private handleQuickEntry(entry: 'footprint' | 'favorites' | 'following') {
    router.pushUrl({
      url: 'pages/profile/ProfileCollectionsPage',
      params: {
        pageType: entry
      }
    }).catch((err: Error) => {
      console.error(`Failed to open ${entry} page: ${err.message}`);
    });
  }

  private handleOrderNavigation(status: 'all' | 'pendingPayment' | 'pendingReceipt' | 'pendingReview' | 'afterSales') {
    router.pushUrl({
      url: 'pages/profile/OrderStatusPage',
      params: {
        status: status
      }
    }).catch((err: Error) => {
      console.error(`Failed to open order page: ${err.message}`);
    });
  }

  private handleLogout() {
    AlertDialog.show({
      title: '退出登录',
      message: '确定要退出当前账号吗？',
      primaryButton: {
        value: '确认退出',
        action: () => {
          console.info('User confirmed logout');
        }
      },
      secondaryButton: {
        value: '取消',
        action: () => {}
      }
    });
  }

  build() {
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
            .onClick(() => {
              this.handleLogout();
            })
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
          Text('￥3.14')
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
        .onClick(() => {
          this.handleQuickEntry('footprint');
        })

        Column() {
          Text('我的收藏')
            .fontSize(16)
            .fontColor('#333')
            .padding(12)
            .backgroundColor(Color.White)
            .borderRadius(12)
            .shadow({ radius: 2, color: '#1F000000', offsetY: 1 })
        }
        .onClick(() => {
          this.handleQuickEntry('favorites');
        })

        Column() {
          Text('我的关注')
            .fontSize(16)
            .fontColor('#333')
            .padding(12)
            .backgroundColor(Color.White)
            .borderRadius(12)
            .shadow({ radius: 2, color: '#1F000000', offsetY: 1 })
        }
        .onClick(() => {
          this.handleQuickEntry('following');
        })

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
            .onClick(() => {
              this.handleOrderNavigation('all');
            })
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
          .onClick(() => {
            this.handleOrderNavigation('pendingPayment');
          })

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
          .onClick(() => {
            this.handleOrderNavigation('pendingReceipt');
          })

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
          .onClick(() => {
            this.handleOrderNavigation('pendingReview');
          })

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
          .onClick(() => {
            this.handleOrderNavigation('afterSales');
          })

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
