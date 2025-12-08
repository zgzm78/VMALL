/*
 * 购物车页面
 */

import { CommonConstants as Const } from '../common/constants/CommonConstants';

interface CartItem {
  id: number;
  name: string;
  price: number;
  count: number;
  selected: boolean;
  imageUrl: string;
}

@Component
export default struct CartPage {
  @StorageLink('cartItems') cartItems: CartItem[] = [];

  private toggleItemSelected(index: number): void {
    const items: CartItem[] = [...this.cartItems];
    if (index >= 0 && index < items.length) {
      items[index].selected = !items[index].selected;
      this.cartItems = items;
    }
  }

  private increaseItemCount(index: number): void {
    const items: CartItem[] = [...this.cartItems];
    if (index >= 0 && index < items.length) {
      items[index].count += 1;
      this.cartItems = items;
    }
  }

  private decreaseItemCount(index: number): void {
    const items: CartItem[] = [...this.cartItems];
    if (index >= 0 && index < items.length) {
      if (items[index].count > 1) {
        items[index].count -= 1;
        this.cartItems = items;
      }
    }
  }

  private removeItem(index: number): void {
    const items: CartItem[] = [...this.cartItems];
    if (index >= 0 && index < items.length) {
      items.splice(index, 1);
      this.cartItems = items;
    }
  }

  private calculateSelectedTotalPrice(): number {
    let total: number = 0;
    this.cartItems.forEach((item: CartItem) => {
      if (item.selected) {
        total += item.price * item.count;
      }
    });
    return total;
  }

  private areAllItemsSelected(): boolean {
    if (this.cartItems.length === 0) {
      return false;
    }
    let allSelected: boolean = true;
    this.cartItems.forEach((item: CartItem) => {
      if (!item.selected) {
        allSelected = false;
      }
    });
    return allSelected;
  }

  private toggleSelectAll(): void {
    const selectAll: boolean = !this.areAllItemsSelected();
    const items: CartItem[] = [...this.cartItems];
    for (let i = 0; i < items.length; i++) {
      items[i].selected = selectAll;
    }
    this.cartItems = items;
  }

  private handleCheckout(): void {
    // 仅在有选中商品时才结算
    const hasSelected: boolean = this.cartItems.some((item: CartItem) => item.selected);
    if (!hasSelected) {
      AlertDialog.show({
        title: '温馨提示',
        message: '还没有选择要结算的商品哦～',
        primaryButton: {
          value: '我知道了',
          action: () => {
            // 不做额外处理
          }
        }
      });
      return;
    }

    AlertDialog.show({
      title: '支付成功',
      message: '已成功结算所选商品\n感谢您的购买，欢迎再次光临～',
      primaryButton: {
        value: '好的',
        action: () => {
          // 只保留未选中的商品
          const remaining: CartItem[] = this.cartItems.filter((item: CartItem) => !item.selected);
          this.cartItems = remaining;
        }
      }
    });
  }

  @Builder
  private CartItemRow(item: CartItem, index: number) {
    Row() {
      // 左侧选中圆圈（选中：实心红色 + 白色对勾；未选中：空心灰色圆圈）
      Text(this.cartItems[index].selected ? '√' : '')
        .width(24)
        .height(24)
        .borderRadius(12)
        .borderWidth(1)
        .borderColor(this.cartItems[index].selected ? $r('app.color.focus_color') : '#CCCCCC')
        .backgroundColor(this.cartItems[index].selected ? $r('app.color.focus_color') : Color.White)
        .textAlign(TextAlign.Center)
        .fontColor(this.cartItems[index].selected ? Color.White : Color.Transparent)
        .fontSize(16)
        .margin({ right: 8 })
        .onClick(() => {
          this.toggleItemSelected(index);
        })

      // 商品图片
      Image(item.imageUrl)
        .width(80)
        .height(80)
        .objectFit(ImageFit.Cover)
        .borderRadius(8)
        .margin({ right: 8 })

      // 图片右侧信息：名称、数量调节、总价、移出
      Column() {
        // 商品名称
        Text(item.name)
          .fontSize($r('app.float.middle_font_size'))
          .fontColor(Color.Black)
          .maxLines(2)
          .textOverflow({ overflow: TextOverflow.Ellipsis })

        // 数量调节行
        Row() {
          Text('数量')
            .fontSize($r('app.float.small_font_size'))
            .fontColor(Color.Gray)
            .margin({ right: 4 })
          Text('-')
            .width(26)
            .height(26)
            .borderRadius(13)
            .borderWidth(1)
            .borderColor('#DDDDDD')
            .textAlign(TextAlign.Center)
            .fontSize(18)
            .onClick(() => {
              this.decreaseItemCount(index);
            })
          Text(this.cartItems[index].count.toString())
            .fontSize($r('app.float.middle_font_size'))
            .fontColor(Color.Black)
            .margin({ left: 8, right: 8 })
          Text('+')
            .width(26)
            .height(26)
            .borderRadius(13)
            .borderWidth(1)
            .borderColor('#DDDDDD')
            .textAlign(TextAlign.Center)
            .fontSize(18)
            .onClick(() => {
              this.increaseItemCount(index);
            })
        }
        .margin({ top: 6 })

        // 该商品总价 + 移出
        Row() {
          Text('小计 ￥' + (item.price * item.count).toString())
            .fontSize($r('app.float.middle_font_size'))
            .fontColor($r('app.color.focus_color'))
            .layoutWeight(1)

          Text('移出')
            .fontSize($r('app.float.smaller_font_size'))
            .fontColor(Color.Gray)
            .onClick(() => {
              this.removeItem(index);
            })
        }
        .margin({ top: 4 })
      }
      .layoutWeight(1)
    }
    .padding({ top: 10, bottom: 10, left: 8, right: 8 })
    .backgroundColor(Color.White)
    .borderRadius(8)
    .margin({ bottom: 6 })
  }

  @Builder
  private CartBottomBar() {
    Row() {
      // 全选圆圈（选中：实心红色 + 白色对勾；未选中：空心灰色圆圈）
      Row() {
        Text(this.areAllItemsSelected() ? '√' : '')
          .width(20)
          .height(20)
          .borderRadius(10)
          .borderWidth(1)
          .borderColor(this.areAllItemsSelected() ? $r('app.color.focus_color') : '#CCCCCC')
          .backgroundColor(this.areAllItemsSelected() ? $r('app.color.focus_color') : Color.White)
          .textAlign(TextAlign.Center)
          .fontColor(this.areAllItemsSelected() ? Color.White : Color.Transparent)
          .fontSize(14)
          .margin({ right: 4 })
        Text('全选')
          .fontSize($r('app.float.small_font_size'))
          .fontColor(Color.Black)
      }
      .margin({ right: 12 })
      .onClick(() => {
        this.toggleSelectAll();
      })

      // 合计
      Column() {
        Text('已选商品合计')
          .fontSize($r('app.float.small_font_size'))
          .fontColor(Color.Gray)
        Text('￥' + this.calculateSelectedTotalPrice().toString())
          .fontSize($r('app.float.middle_font_size'))
          .fontColor($r('app.color.focus_color'))
      }
      .layoutWeight(1)

      // 结算按钮
      Row() {
        Text('立即结算')
          .fontSize($r('app.float.middle_font_size'))
          .fontColor(Color.White)
      }
      .backgroundColor($r('app.color.focus_color'))
      .borderRadius(20)
      .padding({ left: 24, right: 24, top: 8, bottom: 8 })
      .onClick(() => {
        this.handleCheckout();
      })
    }
    .width(Const.FULL_WIDTH)
    .height(60)
    .backgroundColor(Color.White)
    .padding({ left: 12, right: 12 })
    .borderRadius({ topLeft: 16, topRight: 16 })
  }

  build() {
    Column() {
      // 标题
      Text('我的购物车')
        .fontSize(24)
        .fontColor(Color.White)
        .fontWeight(Const.FONT_WEIGHT_FIVE)
        .margin({ bottom: 16 })

      if (this.cartItems.length === 0) {
        // 购物车为空的提示
        Column() {
          Text('购物车里还没有商品')
            .fontSize($r('app.float.middle_font_size'))
            .fontColor('#333333')
            .opacity(Const.FULL_OPACITY)
          Text('去首页逛逛，挑选喜欢的商品吧~')
            .fontSize($r('app.float.small_font_size'))
            .fontColor('#666666')
            .opacity(Const.FULL_OPACITY)
            .margin({ top: 8 })
        }
        .padding({ left: 16, right: 16, top: 12, bottom: 12 })
        .backgroundColor('rgba(255, 255, 255, 0.9)')
        .borderRadius(12)
        .width('90%')
        .justifyContent(FlexAlign.Center)
        .alignItems(HorizontalAlign.Center)
        .layoutWeight(1)
      } else {
        // 购物车商品列表
        Column() {
          ForEach(this.cartItems, (item: CartItem, index?: number) => {
            if (index !== undefined) {
              this.CartItemRow(item, index);
            }
          }, (item: CartItem) => item.id.toString())
        }
        .layoutWeight(1)

        // 底部合计和结算
        this.CartBottomBar()
      }
    }
    .width(Const.FULL_WIDTH)
  }
}
