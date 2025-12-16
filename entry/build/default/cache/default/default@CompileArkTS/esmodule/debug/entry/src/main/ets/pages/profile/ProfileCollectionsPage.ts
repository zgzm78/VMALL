if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ProfileCollectionsPage_Params {
    pageType?: QuickEntryType;
    currentMeta?: CollectionMeta;
    currentItems?: CollectionItem[];
    footprintItems?: CollectionItem[];
    entryConfigs?: QuickEntryConfig[];
}
import router from "@ohos:router";
import { CommonConstants as Const } from "@bundle:com.huawei.waterflow/entry/ets/common/constants/CommonConstants";
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
class ProfileCollectionsPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__pageType = new ObservedPropertySimplePU('footprint', this, "pageType");
        this.__currentMeta = new ObservedPropertyObjectPU({ title: '', subtitle: '', empty: '' }, this, "currentMeta");
        this.__currentItems = new ObservedPropertyObjectPU([], this, "currentItems");
        this.__footprintItems = this.createStorageLink('footprintItems', [], "footprintItems");
        this.entryConfigs = [
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
        this.setInitiallyProvidedValue(params);
        this.declareWatch("footprintItems", this.onFootprintItemsChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ProfileCollectionsPage_Params) {
        if (params.pageType !== undefined) {
            this.pageType = params.pageType;
        }
        if (params.currentMeta !== undefined) {
            this.currentMeta = params.currentMeta;
        }
        if (params.currentItems !== undefined) {
            this.currentItems = params.currentItems;
        }
        if (params.entryConfigs !== undefined) {
            this.entryConfigs = params.entryConfigs;
        }
    }
    updateStateVars(params: ProfileCollectionsPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__pageType.purgeDependencyOnElmtId(rmElmtId);
        this.__currentMeta.purgeDependencyOnElmtId(rmElmtId);
        this.__currentItems.purgeDependencyOnElmtId(rmElmtId);
        this.__footprintItems.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__pageType.aboutToBeDeleted();
        this.__currentMeta.aboutToBeDeleted();
        this.__currentItems.aboutToBeDeleted();
        this.__footprintItems.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __pageType: ObservedPropertySimplePU<QuickEntryType>;
    get pageType() {
        return this.__pageType.get();
    }
    set pageType(newValue: QuickEntryType) {
        this.__pageType.set(newValue);
    }
    private __currentMeta: ObservedPropertyObjectPU<CollectionMeta>;
    get currentMeta() {
        return this.__currentMeta.get();
    }
    set currentMeta(newValue: CollectionMeta) {
        this.__currentMeta.set(newValue);
    }
    private __currentItems: ObservedPropertyObjectPU<CollectionItem[]>;
    get currentItems() {
        return this.__currentItems.get();
    }
    set currentItems(newValue: CollectionItem[]) {
        this.__currentItems.set(newValue);
    }
    private __footprintItems: ObservedPropertyAbstractPU<CollectionItem[]>;
    get footprintItems() {
        return this.__footprintItems.get();
    }
    set footprintItems(newValue: CollectionItem[]) {
        this.__footprintItems.set(newValue);
    }
    private readonly entryConfigs: QuickEntryConfig[];
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
                }
                else {
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
                return { "id": 16777307, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" };
            case 'detail2':
                return { "id": 16777308, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" };
            case 'shoppingcart1':
                return { "id": 16777312, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" };
            case 'shoppingcart2':
                return { "id": 16777313, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" };
            case 'shoppingcart3':
                return { "id": 16777314, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" };
            default:
                return { "id": 16777312, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" };
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
        }
        catch (err) {
            console.error(`Failed to go back: ${err}`);
            try {
                router.replaceUrl({ url: 'pages/HomePage' });
            }
            catch (replaceErr) {
                console.error(`Failed to navigate home: ${replaceErr}`);
            }
        }
    }
    private PageHeader(title: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(Const.FULL_WIDTH);
            Row.padding({ left: 12, right: 12, top: 16, bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(40);
            Row.height(40);
            Row.justifyContent(FlexAlign.Center);
            Row.alignItems(VerticalAlign.Center);
            Row.backgroundColor('#F5F6F8');
            Row.borderRadius(20);
            Row.shadow({ radius: 2, color: '#1F000000', offsetY: 1 });
            Row.onClick(() => {
                this.goBack();
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('<');
            Text.fontSize(22);
            Text.fontColor('#333');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(22);
            Text.fontColor('#111');
            Text.fontWeight(FontWeight.Medium);
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(40);
            Row.height(40);
        }, Row);
        Row.pop();
        Row.pop();
    }
    private CollectionCard(item: CollectionItem, accentColor: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding(16);
            Column.backgroundColor(Color.White);
            Column.borderRadius(16);
            Column.border({ width: 1, color: '#F1F1F1' });
            Column.shadow({ radius: 2, color: '#1F000000', offsetY: 1 });
            Column.margin({ bottom: 16 });
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.tag ? item.tag : '收藏推荐');
            Text.fontSize(12);
            Text.fontColor('#333');
            Text.padding({ left: 12, right: 12, top: 4, bottom: 4 });
            Text.backgroundColor(accentColor);
            Text.borderRadius(12);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.time);
            Text.fontSize(12);
            Text.fontColor('#999');
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (item.imageUrl && item.imageUrl.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(item.imageUrl);
                        Image.width(96);
                        Image.height(96);
                        Image.borderRadius(16);
                        Image.objectFit(ImageFit.Cover);
                        Image.margin({ right: 16 });
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.getCollectionImage(item.imageKey ?? ''));
                        Image.width(96);
                        Image.height(96);
                        Image.borderRadius(16);
                        Image.objectFit(ImageFit.Cover);
                        Image.margin({ right: 16 });
                    }, Image);
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.title);
            Text.fontSize(18);
            Text.fontColor('#333');
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.description);
            Text.fontSize(14);
            Text.fontColor('#666');
            Text.margin({ top: 6 });
            Text.maxLines(2);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('再逛逛');
            Text.fontSize(13);
            Text.fontColor('#999');
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('查看详情 >');
            Text.fontSize(14);
            Text.fontColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.onClick(() => { });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(Const.FULL_WIDTH);
            Column.height(Const.FULL_HEIGHT);
            Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Column.padding({ top: 24, left: 12, right: 12, bottom: 12 });
        }, Column);
        this.PageHeader.bind(this)(this.currentMeta.title);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.currentMeta.subtitle);
            Text.fontSize(14);
            Text.fontColor('#666');
            Text.margin({ left: 24, right: 24, bottom: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentItems.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(Const.FULL_WIDTH);
                        Column.height(Const.FULL_HEIGHT);
                        Column.justifyContent(FlexAlign.Center);
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(':)');
                        Text.fontSize(42);
                        Text.margin({ bottom: 12 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.currentMeta.empty);
                        Text.fontSize(16);
                        Text.fontColor('#777');
                        Text.textAlign(TextAlign.Center);
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Scroll.create();
                    }, Scroll);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.padding({ left: 20, right: 20, bottom: 24 });
                        Column.width('100%');
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = (_item, index?: number) => {
                            const item = _item;
                            this.CollectionCard.bind(this)(item, index !== undefined ? this.getAccentColor(index) : '#FFF2EC');
                        };
                        this.forEachUpdateFunction(elmtId, this.currentItems, forEachItemGenFunction, (item: CollectionItem) => item.id, true, false);
                    }, ForEach);
                    ForEach.pop();
                    Column.pop();
                    Scroll.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ProfileCollectionsPage";
    }
}
registerNamedRoute(() => new ProfileCollectionsPage(undefined, {}), "", { bundleName: "com.huawei.waterflow", moduleName: "entry", pagePath: "pages/profile/ProfileCollectionsPage", pageFullPath: "entry/src/main/ets/pages/profile/ProfileCollectionsPage", integratedHsp: "false", moduleType: "followWithHap" });
