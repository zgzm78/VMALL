if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface OrderStatusPage_Params {
    status?: OrderStatusType;
    currentMeta?: OrderStatusMeta;
    currentOrders?: OrderItem[];
    statusConfigs?: OrderStatusConfig[];
    orderData?: OrderItem[];
}
import router from "@ohos:router";
import { CommonConstants as Const } from "@bundle:com.huawei.waterflow/entry/ets/common/constants/CommonConstants";
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
class OrderStatusPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__status = new ObservedPropertySimplePU('all', this, "status");
        this.__currentMeta = new ObservedPropertyObjectPU({
            title: '',
            subtitle: '',
            empty: '',
            accent: '#000000',
            primaryAction: '',
            secondaryAction: ''
        }, this, "currentMeta");
        this.__currentOrders = new ObservedPropertyObjectPU([], this, "currentOrders");
        this.statusConfigs = [
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
        this.orderData = [
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
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: OrderStatusPage_Params) {
        if (params.status !== undefined) {
            this.status = params.status;
        }
        if (params.currentMeta !== undefined) {
            this.currentMeta = params.currentMeta;
        }
        if (params.currentOrders !== undefined) {
            this.currentOrders = params.currentOrders;
        }
        if (params.statusConfigs !== undefined) {
            this.statusConfigs = params.statusConfigs;
        }
        if (params.orderData !== undefined) {
            this.orderData = params.orderData;
        }
    }
    updateStateVars(params: OrderStatusPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__status.purgeDependencyOnElmtId(rmElmtId);
        this.__currentMeta.purgeDependencyOnElmtId(rmElmtId);
        this.__currentOrders.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__status.aboutToBeDeleted();
        this.__currentMeta.aboutToBeDeleted();
        this.__currentOrders.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __status: ObservedPropertySimplePU<OrderStatusType>;
    get status() {
        return this.__status.get();
    }
    set status(newValue: OrderStatusType) {
        this.__status.set(newValue);
    }
    private __currentMeta: ObservedPropertyObjectPU<OrderStatusMeta>;
    get currentMeta() {
        return this.__currentMeta.get();
    }
    set currentMeta(newValue: OrderStatusMeta) {
        this.__currentMeta.set(newValue);
    }
    private __currentOrders: ObservedPropertyObjectPU<OrderItem[]>;
    get currentOrders() {
        return this.__currentOrders.get();
    }
    set currentOrders(newValue: OrderItem[]) {
        this.__currentOrders.set(newValue);
    }
    private readonly statusConfigs: OrderStatusConfig[];
    private readonly orderData: OrderItem[];
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
                return { "id": 16777307, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" };
            case 'detail2':
                return { "id": 16777308, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" };
            case 'shoppingcart1':
                return { "id": 16777312, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" };
            case 'shoppingcart2':
                return { "id": 16777313, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" };
            case 'shoppingcart3':
            default:
                return { "id": 16777314, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" };
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
            Row.backgroundColor('#F5F6F8');
            Row.borderRadius(20);
            Row.justifyContent(FlexAlign.Center);
            Row.alignItems(VerticalAlign.Center);
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
    private StatusTag(text: string, color: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(text);
            Text.fontSize(12);
            Text.fontColor(color);
            Text.borderRadius(12);
            Text.borderWidth(1);
            Text.borderColor(color);
            Text.padding({ left: 10, right: 10, top: 3, bottom: 3 });
        }, Text);
        Text.pop();
    }
    private OrderCardView(item: OrderItem, cardMeta: OrderStatusMeta, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding(16);
            Column.backgroundColor(Color.White);
            Column.borderRadius(16);
            Column.border({ width: 1, color: '#EFEFEF' });
            Column.shadow({ radius: 2, color: '#1F000000', offsetY: 1 });
            Column.margin({ bottom: 16 });
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.getImageResource(item.imageKey));
            Image.width(96);
            Image.height(96);
            Image.borderRadius(12);
            Image.objectFit(ImageFit.Cover);
            Image.margin({ right: 12 });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.title);
            Text.fontSize(16);
            Text.fontColor('#222');
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ bottom: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.description);
            Text.fontSize(13);
            Text.fontColor('#666');
            Text.margin({ bottom: 6 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`数量 x${item.quantity} · ${item.price}`);
            Text.fontSize(13);
            Text.fontColor('#444');
        }, Text);
        Text.pop();
        Column.pop();
        this.StatusTag.bind(this)(item.statusText, cardMeta.accent);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.id);
            Text.fontSize(12);
            Text.fontColor('#999');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.updatedAt);
            Text.fontSize(12);
            Text.fontColor('#999');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(cardMeta.secondaryAction);
            Text.fontSize(13);
            Text.fontColor('#666');
            Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
            Text.borderRadius(16);
            Text.borderWidth(1);
            Text.borderColor('#DDDDDD');
            Text.margin({ right: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(cardMeta.primaryAction);
            Text.fontSize(13);
            Text.fontColor(Color.White);
            Text.backgroundColor(cardMeta.accent);
            Text.padding({ left: 16, right: 16, top: 6, bottom: 6 });
            Text.borderRadius(16);
        }, Text);
        Text.pop();
        Row.pop();
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
            if (this.currentOrders.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('85%');
                        Column.justifyContent(FlexAlign.Center);
                        Column.alignItems(HorizontalAlign.Center);
                        Column.padding(24);
                        Column.backgroundColor(Color.White);
                        Column.borderRadius(16);
                        Column.border({ width: 1, color: '#EFEFEF' });
                        Column.shadow({ radius: 2, color: '#1F000000', offsetY: 1 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('[ ]');
                        Text.fontSize(48);
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
                        const forEachItemGenFunction = _item => {
                            const item = _item;
                            this.OrderCardView.bind(this)(item, this.getStatusMeta(item.status));
                        };
                        this.forEachUpdateFunction(elmtId, this.currentOrders, forEachItemGenFunction, (item: OrderItem) => item.id, false, false);
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
        return "OrderStatusPage";
    }
}
registerNamedRoute(() => new OrderStatusPage(undefined, {}), "", { bundleName: "com.huawei.waterflow", moduleName: "entry", pagePath: "pages/profile/OrderStatusPage", pageFullPath: "entry/src/main/ets/pages/profile/OrderStatusPage", integratedHsp: "false", moduleType: "followWithHap" });
