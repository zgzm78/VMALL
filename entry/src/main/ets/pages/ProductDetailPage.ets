
import router from '@ohos.router';
import ProductItem from '../viewmodel/ProductItem';
import { CommonConstants as Const } from '../common/constants/CommonConstants';

// Define interfaces for shipping info
interface ShippingInfoItem {
  icon: string;
  text: string;
}

// Cart item interface (used with global cartItems storage)
interface CartItem {
  id: number;
  name: string;
  price: number;
  count: number;
  selected: boolean;
  imageUrl: string;
}

interface FootprintRecord {
  id: string;
  title: string;
  description: string;
  time: string;
  tag?: string;
  imageUrl?: string;
}

interface OrderSummary {
  id: string;
  title: string;
  description: string;
  price: string;
  quantity: number;
  updatedAt: string;
  status: 'pendingPayment' | 'pendingReceipt' | 'pendingReview' | 'afterSales' | 'all';
  statusText: string;
  imageUrl?: string;
  imageKey?: string;
}

/**
 * Product detail page (purchase page).
 */
@Entry
@Component
struct ProductDetailPage {
  @StorageLink('topRectHeight') topRectHeight: number = 0;
  @State product: ProductItem | null = null;
  @State selectedColor: string = '';
  @State selectedStorage: string = '';
  @State selectedVersion: string = '';
  @StorageLink('cartItems') cartItems: CartItem[] = [];
  @StorageLink('footprintItems') footprintItems: FootprintRecord[] = [];
  @StorageLink('orderItems') orderItems: OrderSummary[] = [];

  // Define data as member constants
  private colors: string[] = ['黑色', '白色', '蓝色', '绿色'];
  private storages: string[] = ['64GB', '128GB', '256GB', '512GB'];
  private versions: string[] = ['标准版', 'Pro版', 'Pro Max版'];
  private features: string[] = [
    '高性能处理器，流畅运行大型应用',
    '多摄像头系统，支持夜景模式和超广角拍摄',
    '高刷新率屏幕，提供流畅的视觉体验',
    '大容量电池，支持快速充电',
    '轻薄机身设计，舒适握持感'
  ];
  private reviewStats: string[] = ['好评率', '已评价', '追评'];
  private reviewValues: string[] = ['98%', '1256', '328'];
  private reviews: number[] = [1, 2, 3];
  private shippingInfo: ShippingInfoItem[] = [
    { icon: '🚚', text: '全场包邮' },
    { icon: '⏰', text: '48小时发货' },
    { icon: '🔄', text: '7天无理由' },
    { icon: '🛡️', text: '全国联保' },
    { icon: '💬', text: '在线客服' }
  ];

  aboutToAppear() {
    // Get product data from router params
    // Note: getParams is deprecated but still functional
    const params = router.getParams() as Record<string, Object> | undefined;
    if (params && params['product']) {
      this.product = params['product'] as ProductItem;
      this.addFootprintRecord();
    }
    // Initialize selected values
    this.selectedColor = '黑色';
    this.selectedStorage = '64GB';
    this.selectedVersion = '标准版';
  }

  private parsePrice(priceText: string | undefined): number {
    if (!priceText) {
      return 0;
    }
    const cleaned: string = priceText.replace(/[^\d.]/g, '');
    const value: number = Number.parseFloat(cleaned);
    if (Number.isNaN(value)) {
      return 0;
    }
    return value;
  }

  private formatTimestamp(date: Date): string {
    const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
    const day: string = date.getDate().toString().padStart(2, '0');
    const hour: string = date.getHours().toString().padStart(2, '0');
    const minute: string = date.getMinutes().toString().padStart(2, '0');
    return `${month}/${day} ${hour}:${minute}`;
  }

  private pickFootprintDescription(): string {
    if (!this.product) {
      return '';
    }
    const candidates: string[] = [];
    if (typeof this.product.detail === 'string') {
      candidates.push(this.product.detail);
    } else if (Array.isArray(this.product.detail)) {
      this.product.detail.forEach((item: string) => {
        candidates.push(item);
      });
    }
    if (this.product.promotion) {
      candidates.push(this.product.promotion);
    }
    if (this.product.discount) {
      candidates.push(this.product.discount);
    }
    for (let i = 0; i < candidates.length; i++) {
      const text: string = candidates[i];
      if (text && !text.startsWith('http')) {
        return text;
      }
    }
    return this.product.price ? `价格：${this.product.price}` : '浏览记录';
  }

  private addFootprintRecord(): void {
    if (!this.product) {
      return;
    }
    const descriptionText: string = this.pickFootprintDescription();
    const record: FootprintRecord = {
      id: Date.now().toString(),
      title: this.product.name,
      description: descriptionText,
      time: this.formatTimestamp(new Date()),
      tag: this.product.promotion ?? '浏览',
      imageUrl: this.product.image_url
    };
    const filtered: FootprintRecord[] = this.footprintItems
      ? this.footprintItems.filter((item: FootprintRecord) => item.title !== record.title)
      : [];
    filtered.unshift(record);
    this.footprintItems = filtered.slice(0, 20);
  }

  private addPendingReceiptOrder(): void {
    if (!this.product) {
      return;
    }
    const order: OrderSummary = {
      id: `OD${Date.now()}`,
      title: this.product.name,
      description: this.pickFootprintDescription(),
      price: this.product.price,
      quantity: 1,
      updatedAt: this.formatTimestamp(new Date()),
      status: 'pendingReceipt',
      statusText: '运输中',
      imageUrl: this.product.image_url
    };
    const updated: OrderSummary[] = [order, ...this.orderItems];
    this.orderItems = updated.slice(0, 20);
  }

  private addToCart(): void {
    if (!this.product) {
      return;
    }

    const priceValue: number = this.parsePrice(this.product.price);

    // 判断商品是否已在购物车中（按名称和图片 URL 识别）
    const exists: boolean = this.cartItems.some((item: CartItem) => {
      return item.name === this.product!.name && item.imageUrl === this.product!.image_url;
    });

    if (exists) {
      AlertDialog.show({
        title: '温馨提示',
        message: `【${this.product.name}】已在购物车中，无需重复添加～`,
        primaryButton: {
          value: '我知道了',
          action: () => {
            // 不做额外处理
          }
        }
      });
      return;
    }

    // 生成新的商品 id（在现有 id 的基础上递增）
    let nextId: number = 1;
    if (this.cartItems && this.cartItems.length > 0) {
      let maxId: number = this.cartItems[0].id;
      this.cartItems.forEach((item: CartItem) => {
        if (item.id > maxId) {
          maxId = item.id;
        }
      });
      nextId = maxId + 1;
    }

    const newItem: CartItem = {
      id: nextId,
      name: this.product.name,
      price: priceValue,
      count: 1,
      selected: true,
      imageUrl: this.product.image_url
    };

    const updated: CartItem[] = [...this.cartItems, newItem];
    this.cartItems = updated;

    AlertDialog.show({
      title: '加入购物车',
      message: `已将【${this.product.name}】加入购物车\n可在购物车中查看和结算～`,
      primaryButton: {
        value: '好的',
        action: () => {
          // 这里只做提示，不做额外操作
        }
      }
    });
  }

  private getBonusPoints(): string {
    if (!this.product?.bonus_points) {
      return '';
    }
    return this.product!.bonus_points.replace(/[^\d]/g, '');
  }

  build() {

    Column() {
      // Blurred background image
      if (this.product?.image_url) {
        Image(this.product.image_url)
          .width(Const.FULL_WIDTH)
          .height(Const.FULL_WIDTH)
          .objectFit(ImageFit.Cover)
          .blur(90) // Apply blur effect (6x stronger)
          .transform({
            scale: 1.5 // Scale up by 50%
          })
          .position({ x: 0, y: 0 })
          .zIndex(-1)
      }
      
      // Header with back button
      Row() {
        Row() {
          Text('←')
            .fontSize(24)
            .fontColor(Color.Black)
        }
        .width(48)
        .height(48)
        .justifyContent(FlexAlign.Center)
        .onClick(() => {
          // Note: back() is deprecated but still functional
          try {
            router.back();
          } catch (err) {
            console.error(`Failed to go back: ${err}`);
          }
        })
        Blank()
        Text('商品详情')
          .fontSize(18)
          .fontColor(Color.Black)
          .fontWeight(FontWeight.Medium)
        Blank()
        Blank()
      }
      .width(Const.FULL_WIDTH)
      .height(56)
      .padding({ left: 16, right: 16 })
      .backgroundColor('rgba(255, 255, 255, 0.6)')
      .margin({ top: this.getUIContext().px2vp(this.topRectHeight) })

      Scroll() {
        Column()
          {
          // Product image
          Image(this.product?.image_url)
            .width(Const.FULL_WIDTH)
            .objectFit(ImageFit.Contain)
            .backgroundColor(Color.Transparent)

          // Product info
            Column()
              {
            // Product name
            Text(this.product?.name || '')
              .fontSize(20)
              .fontColor(Color.Black)
              .fontWeight(FontWeight.Medium)
              .width(Const.FULL_WIDTH)
              .margin({ top: 16, bottom: 8 })

            // Price and discount
            Row() {
              Text(this.product?.price || '')
                .fontSize(28)
                .fontColor($r('app.color.focus_color'))
                .fontWeight(FontWeight.Bold)
              if (this.getBonusPoints()) {
                Text(`积分${this.getBonusPoints()}`)
                  .height(24)
                  .fontSize(12)
                  .fontColor($r('app.color.focus_color'))
                  .borderRadius(4)
                  .borderWidth(1)
                  .borderColor($r('app.color.focus_color'))
                  .padding({ left: 8, right: 8 })
                  .margin({ left: 12 })
              }

            }
            .backgroundColor("0x99FFFFFF")
            .width(Const.FULL_WIDTH)
            .margin({ bottom: 8 })

            // Discount / short intro line (e.g. “全金属玄武架构…”)
            Row() {
              if (this.product?.discount) {
                Text(this.product.discount)
                  .fontSize(14)
                  .fontColor(Color.Gray)
                  .margin({ right: 12 })
              }
              if (this.product?.promotion) {
                Text(this.product.promotion)
                  .fontSize(14)
                  .fontColor('#666666')
                  .lineHeight(20)
              }
            }
            .width(Const.FULL_WIDTH)
            .margin({ bottom: 24 })







            // Divider
            Divider()
              .color('#E0E0E0')
              .margin({ top: 16, bottom: 16 })

            // Product description
            Column() {
              Text('商品详情')
                .fontSize(18)
                .fontColor(Color.Black)
                .fontWeight(FontWeight.Medium)
                .width(Const.FULL_WIDTH)
                .margin({ bottom: 16 })
                .padding({ left: 16, right: 16 })
              
              // Dynamic detail display based on type
              if (this.product?.detail) {
                if (typeof this.product.detail === 'string') {
                  // Display text detail
                  Text(this.product.detail)
                    .fontSize(14)
                    .fontColor('#666666')
                    .width(Const.FULL_WIDTH)
                    .lineHeight(22)
                    .margin({ bottom: 16 })
                    .padding({ left: 16, right: 16 })
                } else if (Array.isArray(this.product.detail)) {
                  // Display image array
                  ForEach(this.product.detail, (imageUrl: string) => {
                    Image(imageUrl)
                      .width(Const.FULL_WIDTH)
                      .objectFit(ImageFit.Contain)
                      .backgroundColor(Color.Transparent)
                      .margin({ bottom: 16 })
                      .padding({ left: 16, right: 16 })
                  }, (imageUrl: string) => imageUrl)
                }
              } else {
                // Default text if no detail
                Text('暂无商品详情')
                  .fontSize(14)
                  .fontColor('#999999')
                  .width(Const.FULL_WIDTH)
                  .margin({ bottom: 16 })
                  .padding({ left: 16, right: 16 })
              }
              

            }
            .width(Const.FULL_WIDTH)
            .alignItems(HorizontalAlign.Start)
            .padding({ top: 12 })
            .backgroundColor('rgba(255, 255, 255, 0.6)')

            // Divider
            Divider()
              .color('#E0E0E0')
              .margin({ top: 16, bottom: 16 })

            // Product reviews
            Column() {
              Text('商品评价')
                .fontSize(18)
                .fontColor(Color.Black)
                .fontWeight(FontWeight.Medium)
                .width(Const.FULL_WIDTH)
                .margin({ bottom: 16 })
                .padding({ left: 16, right: 16 })
              
              // Review summary
              Row() {
                Column() {
                  Text('4.8')
                    .fontSize(32)
                    .fontColor(Color.Black)
                    .fontWeight(FontWeight.Bold)
                  Text('综合评分')
                    .fontSize(12)
                    .fontColor('#999999')
                    .margin({ top: 4 })
                }
                .alignItems(HorizontalAlign.Center)
                .margin({ right: 32 })
                
                Column() {
                  ForEach(this.reviewStats, (stat: string, index: number) => {
                    Row() {
                      Text(this.reviewValues[index])
                        .fontSize(16)
                        .fontColor(Color.Black)
                        .fontWeight(FontWeight.Medium)
                        .margin({ right: 8 })
                      Text(stat)
                        .fontSize(14)
                        .fontColor('#666666')
                    }
                    .margin({ bottom: 12 })
                  }, (stat: string) => stat)
                }
              }
              .width(Const.FULL_WIDTH)
              .padding({ left: 16, right: 16 })
              .margin({ bottom: 16 })
              
              // Review examples
              Column() {
                ForEach(this.reviews, (index: number) => {
                  Column() {
                    Row() {
                      Text('用户' + (10000 + index))
                        .fontSize(14)
                        .fontColor('#666666')
                        .margin({ right: 16 })
                      Text('★★★★★')
                        .fontSize(14)
                        .fontColor($r('app.color.focus_color'))
                    }
                    .width(Const.FULL_WIDTH)
                    .margin({ bottom: 8 })
                    
                    Text('手机很好用，运行流畅，拍照效果出色，电池续航也很满意。')
                      .fontSize(14)
                      .fontColor('#666666')
                      .lineHeight(20)
                      .width(Const.FULL_WIDTH)
                      .margin({ bottom: 8 })
                    
                    Text('2023-06-' + (10 + index))
                      .fontSize(12)
                      .fontColor('#999999')
                      .width(Const.FULL_WIDTH)
                  }
                  .width(Const.FULL_WIDTH)
                  .padding({ left: 16, right: 16, bottom: 16 })
                }, (index: number) => index.toString())
              }
              .width(Const.FULL_WIDTH)
              
              // View all reviews button
              Row() {
                Text('查看全部评价')
                  .fontSize(14)
                  .fontColor($r('app.color.focus_color'))
                Text('→')
                  .fontSize(14)
                  .fontColor($r('app.color.focus_color'))
                  .margin({ left: 4 })
              }
              .width(Const.FULL_WIDTH)
              .justifyContent(FlexAlign.Center)
              .padding({ top: 8, bottom: 16 })
            }
            .width(Const.FULL_WIDTH)
            .alignItems(HorizontalAlign.Start)
            .padding({ top: 12 })
            .backgroundColor('rgba(255, 255, 255, 0.6)')
            .margin({ bottom: 12 })

            // Divider
            Divider()
              .color('#E0E0E0')
              .margin({ top: 16, bottom: 16 })

            // Shipping and after-sales info
            Column() {
              Text('配送与售后')
                .fontSize(18)
                .fontColor(Color.Black)
                .fontWeight(FontWeight.Medium)
                .width(Const.FULL_WIDTH)
                .margin({ bottom: 16 })
                .padding({ left: 16, right: 16 })
              
              Row() {
                ForEach(this.shippingInfo, (item: ShippingInfoItem) => {
                  Column() {
                    Text(item.icon)
                      .fontSize(24)
                      .margin({ bottom: 8 })
                    Text(item.text)
                      .fontSize(12)
                      .fontColor('#666666')
                  }
                  .width('20%')
                  .alignItems(HorizontalAlign.Center)
                }, (item: ShippingInfoItem) => item.text)
              }
              .width(Const.FULL_WIDTH)
              .padding({ left: 16, right: 16, bottom: 16 })
            }
            .width(Const.FULL_WIDTH)
            .alignItems(HorizontalAlign.Start)
            .padding({ top: 12 })
            .backgroundColor('rgba(255, 255, 255, 0.6)')
            .margin({ bottom: 12 })
          }
            .backgroundColor("0x99FFFFFF")
          .width(Const.FULL_WIDTH)
            .backgroundColor('rgba(255, 255, 255, 0.6)')
            .borderRadius({ topLeft: 20, topRight: 20 })
          .padding({ left: 16, right: 16, bottom: 100 })
        }
      }
      .backgroundColor(Color.Transparent)
      .layoutWeight(1)

      // Purchase button bar
      Row() {
      Button('立即购买')
        .type(ButtonType.Normal)
        .backgroundColor($r('app.color.focus_color'))
        .fontColor(Color.White)
        .fontSize(16)
        .width('50%')
        .height(50)
        .onClick(() => {
          if (!this.product) {
            return;
          }
          AlertDialog.show({
            title: '购买成功',
            message: `已成功购买【${this.product.name}】，我们会尽快为您发货！`,
            primaryButton: {
              value: '确定',
              action: () => {
                this.addPendingReceiptOrder();
              }
            }
          });
        })
        Button('加入购物车')
          .type(ButtonType.Normal)
          .backgroundColor('#FFE5E5')
          .fontColor($r('app.color.focus_color'))
          .fontSize(16)
          .width('50%')
          .height(50)
          .onClick(() => {
            this.addToCart();
          })
      }
      .width(Const.FULL_WIDTH)
      .height(50)
      .padding({ left: 16, right: 16, bottom: 16 })
      .backgroundColor('rgba(255, 255, 255, 0.6)')
    }
    .width(Const.FULL_WIDTH)
    .height(Const.FULL_WIDTH)
    .backgroundColor(Color.Transparent)
  }
}

