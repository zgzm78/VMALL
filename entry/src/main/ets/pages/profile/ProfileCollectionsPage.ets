import router from '@ohos.router';
import { CommonConstants as Const } from '../../common/constants/CommonConstants';

type QuickEntryType = 'footprint' | 'favorites' | 'following';

interface CollectionItem {
  id: string;
  title: string;
  description: string;
  time: string;
  tag?: string;
  imageKey?: string;
  imageUrl?: string;
}

interface CollectionMeta {
  title: string;
  subtitle: string;
  empty: string;
}

interface QuickEntryConfig {
  type: QuickEntryType;
  meta: CollectionMeta;
  items: CollectionItem[];
}

@Entry
@Component
struct ProfileCollectionsPage {
  @State pageType: QuickEntryType = 'footprint';
  @State currentMeta: CollectionMeta = { title: '', subtitle: '', empty: '' };
  @State currentItems: CollectionItem[] = [];
  @StorageLink('footprintItems') @Watch('onFootprintItemsChange') footprintItems: CollectionItem[] = [];

  private readonly entryConfigs: QuickEntryConfig[] = [
    {
      type: 'footprint',
      meta: {
        title: '我的足迹',
        subtitle: '最近浏览的商品记录',
        empty: '还没有浏览记录，去首页逛逛吧～'
      },
      items: []
    },
    {
      type: 'favorites',
      meta: {
        title: '我的收藏',
        subtitle: '已收藏的商品/专题',
        empty: '暂未收藏任何内容'
      },
      items: [
        { id: 'fav-001', title: 'HUAWEI WATCH 4 Pro', description: '健康监测旗舰手表', time: '2024-05-08 收藏', tag: '热卖', imageKey: 'shoppingcart2' },
        { id: 'fav-002', title: '智慧屏 V5 Pro 85\"', description: '星闪投屏 / 144Hz高刷', time: '2024-04-30 收藏', imageKey: 'shoppingcart3' },
        { id: 'fav-003', title: 'HUAWEI Pocket 2', description: '时尚小折叠手机', time: '2024-04-18 收藏', tag: '限量', imageKey: 'detail1' }
      ]
    },
    {
      type: 'following',
      meta: {
        title: '我的关注',
        subtitle: '关注的店铺和达人',
        empty: '还没有关注对象，去发现喜欢的店铺吧'
      },
      items: [
        { id: 'follow-001', title: '华为官方旗舰店', description: '新品优先体验 / 售后无忧', time: '2024-05-01 关注', tag: '官方', imageKey: 'detail2' },
        { id: 'follow-002', title: 'HarmonyOS 生态馆', description: '智能家居套装推荐', time: '2024-04-20 关注', imageKey: 'shoppingcart1' },
        { id: 'follow-003', title: '摄影达人 · 光影实验室', description: '手机摄影技巧分享', time: '2024-04-08 关注', imageKey: 'shoppingcart2' }
      ]
    }
  ];

  aboutToAppear() {
    const params: Object | undefined = router.getParams();
    if (params && typeof params === 'object') {
      const recordParams = params as Record<string, Object>;
      const typeParam: Object | undefined = recordParams['pageType'];
      if (typeof typeParam === 'string' && this.isValidType(typeParam)) {
        this.applyConfig(typeParam as QuickEntryType);
        return;
      }
    }
    this.applyConfig(this.pageType);
  }

  private isValidType(value: string): boolean {
    return value === 'footprint' || value === 'favorites' || value === 'following';
  }

  private applyConfig(targetType: QuickEntryType) {
    let matched: boolean = false;
    for (let i = 0; i < this.entryConfigs.length; i++) {
      const config: QuickEntryConfig = this.entryConfigs[i];
      if (config.type === targetType) {
        this.pageType = targetType;
        this.currentMeta = config.meta;
        if (targetType === 'footprint') {
          this.currentItems = this.footprintItems ? [...this.footprintItems] : [];
        } else {
          this.currentItems = config.items;
        }
        matched = true;
        break;
      }
    }
    if (!matched) {
      const fallback: QuickEntryConfig = this.entryConfigs[0];
      this.pageType = fallback.type;
      this.currentMeta = fallback.meta;
      this.currentItems = fallback.items;
    }
  }

  private getAccentColor(index: number): string {
    const palette: string[] = ['#FFF2EC', '#EAF3FF', '#F1FFF1', '#FFF4FF'];
    return palette[index % palette.length];
  }

  private getCollectionImage(key: string): Resource {
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
        return $r('app.media.shoppingcart3');
      default:
        return $r('app.media.shoppingcart1');
    }
  }

  private onFootprintItemsChange() {
    if (this.pageType === 'footprint') {
      this.currentItems = this.footprintItems ? [...this.footprintItems] : [];
    }
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
      .justifyContent(FlexAlign.Center)
      .alignItems(VerticalAlign.Center)
      .backgroundColor('#F5F6F8')
      .borderRadius(20)
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
  private CollectionCard(item: CollectionItem, accentColor: string) {
    Column() {
      Row() {
        Text(item.tag ? item.tag : '收藏推荐')
          .fontSize(12)
          .fontColor('#333')
          .padding({ left: 12, right: 12, top: 4, bottom: 4 })
          .backgroundColor(accentColor)
          .borderRadius(12)
        Text(item.time)
          .fontSize(12)
          .fontColor('#999')
          .margin({ left: 12 })
        Blank()
      }
      .margin({ bottom: 12 })

      Row() {
        if (item.imageUrl && item.imageUrl.length > 0) {
          Image(item.imageUrl)
            .width(96)
            .height(96)
            .borderRadius(16)
            .objectFit(ImageFit.Cover)
            .margin({ right: 16 })
        } else {
          Image(this.getCollectionImage(item.imageKey ?? ''))
            .width(96)
            .height(96)
            .borderRadius(16)
            .objectFit(ImageFit.Cover)
            .margin({ right: 16 })
        }
        Column() {
          Text(item.title)
            .fontSize(18)
            .fontColor('#333')
            .fontWeight(FontWeight.Medium)
          Text(item.description)
            .fontSize(14)
            .fontColor('#666')
            .margin({ top: 6 })
            .maxLines(2)
            .textOverflow({ overflow: TextOverflow.Ellipsis })
        }
        .layoutWeight(1)
      }

      Row() {
        Text('再逛逛')
          .fontSize(13)
          .fontColor('#999')
          .fontWeight(FontWeight.Medium)
        Blank()
        Text('查看详情 >')
          .fontSize(14)
          .fontColor($r('app.color.focus_color'))
          .onClick(() => {})
      }
    }
    .padding(16)
    .backgroundColor(Color.White)
    .borderRadius(16)
    .border({ width: 1, color: '#F1F1F1' })
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

      if (this.currentItems.length === 0) {
        Column() {
          Text(':)')
            .fontSize(42)
            .margin({ bottom: 12 })
          Text(this.currentMeta.empty)
            .fontSize(16)
            .fontColor('#777')
            .textAlign(TextAlign.Center)
        }
        .width(Const.FULL_WIDTH)
        .height(Const.FULL_HEIGHT)
        .justifyContent(FlexAlign.Center)
        .alignItems(HorizontalAlign.Center)
      } else {
        Scroll() {
          Column() {
            ForEach(this.currentItems, (item: CollectionItem, index?: number) => {
              this.CollectionCard(item, index !== undefined ? this.getAccentColor(index) : '#FFF2EC');
            }, (item: CollectionItem) => item.id)
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
