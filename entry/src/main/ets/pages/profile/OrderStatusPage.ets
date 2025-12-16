import router from '@ohos.router';
import { CommonConstants as Const } from '../../common/constants/CommonConstants';

type OrderStatusType = 'all' | 'pendingPayment' | 'pendingReceipt' | 'pendingReview' | 'afterSales';
type OrderImageKey = 'detail1' | 'detail2' | 'shoppingcart1' | 'shoppingcart2' | 'shoppingcart3';

interface OrderItem {
  id: string;
  title: string;
  description: string;
  price: string;
  quantity: number;
  updatedAt: string;
  status: OrderStatusType;
  statusText: string;
  imageKey: OrderImageKey;
}

interface OrderStatusMeta {
  title: string;
  subtitle: string;
  empty: string;
  accent: string;
  primaryAction: string;
  secondaryAction: string;
}

interface OrderStatusConfig {
  type: OrderStatusType;
  meta: OrderStatusMeta;
}

@Entry
@Component
struct OrderStatusPage {
  @State status: OrderStatusType = 'all';
  @State currentMeta: OrderStatusMeta = {
    title: '',
    subtitle: '',
    empty: '',
    accent: '#000000',
    primaryAction: '',
    secondaryAction: ''
  };
  @State currentOrders: OrderItem[] = [];

  private readonly statusConfigs: OrderStatusConfig[] = [
    {
      type: 'all',
      meta: {
        title: '我的订单',
        subtitle: '查看全部订单进度',
        empty: '暂时没有订单记录',
        accent: '#222222',
        primaryAction: '查看详情',
        secondaryAction: '联系客服'
      }
    },
    {
      type: 'pendingPayment',
      meta: {
        title: '待付款订单',
        subtitle: '请在失效前完成付款',
        empty: '暂无待付款订单',
        accent: '#FF8A00',
        primaryAction: '去付款',
        secondaryAction: '取消订单'
      }
    },
    {
      type: 'pendingReceipt',
      meta: {
        title: '待收货订单',
        subtitle: '物流运输中，请耐心等待',
        empty: '暂无待收货订单',
        accent: '#1E88E5',
        primaryAction: '确认收货',
        secondaryAction: '查看物流'
      }
    },
    {
      type: 'pendingReview',
      meta: {
        title: '待评价订单',
        subtitle: '评价可获得积分奖励',
        empty: '暂无待评价订单',
        accent: '#673AB7',
        primaryAction: '去评价',
        secondaryAction: '查看详情'
      }
    },
    {
      type: 'afterSales',
      meta: {
        title: '售后服务',
        subtitle: '售后申请及进度查询',
        empty: '暂无售后记录',
        accent: '#009688',
        primaryAction: '查看进度',
        secondaryAction: '售后进度'
      }
    }
  ];

  private readonly orderData: OrderItem[] = [
    {
      id: 'OD202405100001',
      title: 'HUAWEI Mate 60 Pro 12+512G',
      description: '南糯紫 · 昆仑玻璃',
      price: '¥7299',
      quantity: 1,
      updatedAt: '2024-05-10 20:15',
      status: 'pendingPayment',
      statusText: '待付款',
      imageKey: 'detail1'
    },
    {
      id: 'OD202405060023',
      title: 'HUAWEI WATCH 4 Pro',
      description: '玄黑色 · 铂金表带',
      price: '¥3399',
      quantity: 1,
      updatedAt: '2024-05-07 09:48',
      status: 'pendingReceipt',
      statusText: '运输中',
      imageKey: 'shoppingcart1'
    },
    {
      id: 'OD202404280012',
      title: 'HUAWEI FreeBuds Pro 3',
      description: '星河蓝 · 主动降噪',
      price: '¥1299',
      quantity: 2,
      updatedAt: '2024-05-05 12:03',
      status: 'pendingReview',
      statusText: '待评价',
      imageKey: 'shoppingcart2'
    },
    {
      id: 'OD202404150045',
      title: 'HUAWEI MatePad 11.5" S',
      description: '柔光版 · Wi-Fi 8+256G',
      price: '¥2699',
      quantity: 1,
      updatedAt: '2024-05-02 16:24',
      status: 'afterSales',
      statusText: '售后处理中',
      imageKey: 'shoppingcart3'
    },
    {
      id: 'OD202404010108',
      title: 'HUAWEI Vision Glass',
      description: '微晶玻璃 / 高清沉浸观影',
      price: '¥1999',
      quantity: 1,
      updatedAt: '2024-04-20 10:18',
      status: 'all',
      statusText: '已完成',
      imageKey: 'detail2'
    }
  ];

  aboutToAppear() {
    const params: Object | undefined = router.getParams();
    if (params && typeof params === 'object') {
      const recordParams = params as Record<string, Object>;
      const statusParam: Object | undefined = recordParams['status'];
      if (typeof statusParam === 'string' && this.isValidStatus(statusParam)) {
        this.applyStatus(statusParam as OrderStatusType);
        return;
      }
    }
    this.applyStatus(this.status);
  }

  private isValidStatus(value: string): boolean {
    return value === 'all' || value === 'pendingPayment' || value === 'pendingReceipt' ||
      value === 'pendingReview' || value === 'afterSales';
  }

  private applyStatus(targetStatus: OrderStatusType) {
    this.status = targetStatus;
    this.currentMeta = this.getStatusMeta(targetStatus);
    this.currentOrders = this.filterOrders(targetStatus);
  }

  private getStatusMeta(status: OrderStatusType): OrderStatusMeta {
    for (let i = 0; i < this.statusConfigs.length; i++) {
      if (this.statusConfigs[i].type === status) {
        return this.statusConfigs[i].meta;
      }
    }
    return this.statusConfigs[0].meta;
  }

  private goBack() {
    try {
      router.back();
    } catch (err) {
      console.error(`Failed to go back: ${err}`);
      try {
        router.replaceUrl({ url: 'pages/HomePage' });
      } catch (replaceErr) {
        console.error(`Failed to navigate home: ${replaceErr}`);
      }
    }
  }

  private filterOrders(status: OrderStatusType): OrderItem[] {
    if (status === 'all') {
      return this.orderData;
    }
    const filtered: OrderItem[] = [];
    for (let i = 0; i < this.orderData.length; i++) {
      if (this.orderData[i].status === status) {
        filtered.push(this.orderData[i]);
      }
    }
    return filtered;
  }

  private getImageResource(key: OrderImageKey): Resource {
    switch (key) {
      case 'detail1':
        return $r('app.media.detail1');
      case 'detail2':
        return $r('app.media.detail2');
      case 'shoppingcart1':
        return $r('app.media.shoppingcart1');
      case 'shoppingcart2':
        return $r('app.media.shoppingcart2');
      case 'shoppingcart3':
      default:
        return $r('app.media.shoppingcart3');
    }
  }

  @Builder
  private PageHeader(title: string) {
    Row() {
      Row() {
        Text('<')
          .fontSize(22)
          .fontColor('#333')
      }
      .width(40)
      .height(40)
      .backgroundColor('#F5F6F8')
      .borderRadius(20)
      .justifyContent(FlexAlign.Center)
      .alignItems(VerticalAlign.Center)
      .shadow({ radius: 2, color: '#1F000000', offsetY: 1 })
      .onClick(() => {
        this.goBack();
      })

      Text(title)
        .fontSize(22)
        .fontColor('#111')
        .fontWeight(FontWeight.Medium)
        .layoutWeight(1)
        .textAlign(TextAlign.Center)

      Row()
        .width(40)
        .height(40)
    }
    .width(Const.FULL_WIDTH)
    .padding({ left: 12, right: 12, top: 16, bottom: 16 })
  }

  @Builder
  private StatusTag(text: string, color: string) {
    Text(text)
      .fontSize(12)
      .fontColor(color)
      .borderRadius(12)
      .borderWidth(1)
      .borderColor(color)
      .padding({ left: 10, right: 10, top: 3, bottom: 3 })
  }

  @Builder
  private OrderCardView(item: OrderItem, cardMeta: OrderStatusMeta) {
    Column() {
      Row() {
        Image(this.getImageResource(item.imageKey))
          .width(96)
          .height(96)
          .borderRadius(12)
          .objectFit(ImageFit.Cover)
          .margin({ right: 12 })
        Column() {
          Text(item.title)
            .fontSize(16)
            .fontColor('#222')
            .fontWeight(FontWeight.Medium)
            .margin({ bottom: 4 })
          Text(item.description)
            .fontSize(13)
            .fontColor('#666')
            .margin({ bottom: 6 })
          Text(`数量 x${item.quantity} · ${item.price}`)
            .fontSize(13)
            .fontColor('#444')
        }
        .layoutWeight(1)

        this.StatusTag(item.statusText, cardMeta.accent)
      }
      .margin({ bottom: 12 })

      Row() {
        Column() {
          Text(item.id)
            .fontSize(12)
            .fontColor('#999')
          Text(item.updatedAt)
            .fontSize(12)
            .fontColor('#999')
            .margin({ top: 4 })
        }
        .layoutWeight(1)

        Row() {
          Text(cardMeta.secondaryAction)
            .fontSize(13)
            .fontColor('#666')
            .padding({ left: 12, right: 12, top: 6, bottom: 6 })
            .borderRadius(16)
            .borderWidth(1)
            .borderColor('#DDDDDD')
            .margin({ right: 8 })
          Text(cardMeta.primaryAction)
            .fontSize(13)
            .fontColor(Color.White)
            .backgroundColor(cardMeta.accent)
            .padding({ left: 16, right: 16, top: 6, bottom: 6 })
            .borderRadius(16)
        }
      }
    }
    .padding(16)
    .backgroundColor(Color.White)
    .borderRadius(16)
    .border({ width: 1, color: '#EFEFEF' })
    .shadow({ radius: 2, color: '#1F000000', offsetY: 1 })
    .margin({ bottom: 16 })
    .width('100%')
  }

  build() {
    Column() {
      this.PageHeader(this.currentMeta.title)
      Text(this.currentMeta.subtitle)
        .fontSize(14)
        .fontColor('#666')
        .margin({ left: 24, right: 24, bottom: 12 })

      if (this.currentOrders.length === 0) {
        Column() {
          Text('[ ]')
            .fontSize(48)
            .margin({ bottom: 12 })
          Text(this.currentMeta.empty)
            .fontSize(16)
            .fontColor('#777')
            .textAlign(TextAlign.Center)
        }
        .width('85%')
        .justifyContent(FlexAlign.Center)
        .alignItems(HorizontalAlign.Center)
        .padding(24)
        .backgroundColor(Color.White)
        .borderRadius(16)
        .border({ width: 1, color: '#EFEFEF' })
        .shadow({ radius: 2, color: '#1F000000', offsetY: 1 })
      } else {
        Scroll() {
          Column() {
            ForEach(this.currentOrders, (item: OrderItem) => {
              this.OrderCardView(item, this.getStatusMeta(item.status));
            }, (item: OrderItem) => item.id)
          }
          .padding({ left: 20, right: 20, bottom: 24 })
          .width('100%')
        }
      }
    }
    .width(Const.FULL_WIDTH)
    .height(Const.FULL_HEIGHT)
    .backgroundColor($r('app.color.home_background_color'))
    .padding({ top: 24, left: 12, right: 12, bottom: 12 })
  }
}
