if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ProductDetailPage_Params {
    topRectHeight?: number;
    product?: ProductItem | null;
    selectedColor?: string;
    selectedStorage?: string;
    selectedVersion?: string;
    cartItems?: CartItem[];
    footprintItems?: FootprintRecord[];
    orderItems?: OrderSummary[];
    colors?: string[];
    storages?: string[];
    versions?: string[];
    features?: string[];
    reviewStats?: string[];
    reviewValues?: string[];
    reviews?: number[];
    shippingInfo?: ShippingInfoItem[];
}
import router from "@ohos:router";
import type ProductItem from '../viewmodel/ProductItem';
import { CommonConstants as Const } from "@bundle:com.huawei.waterflow/entry/ets/common/constants/CommonConstants";
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
class ProductDetailPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__topRectHeight = this.createStorageLink('topRectHeight', 0, "topRectHeight");
        this.__product = new ObservedPropertyObjectPU(null, this, "product");
        this.__selectedColor = new ObservedPropertySimplePU('', this, "selectedColor");
        this.__selectedStorage = new ObservedPropertySimplePU('', this, "selectedStorage");
        this.__selectedVersion = new ObservedPropertySimplePU('', this, "selectedVersion");
        this.__cartItems = this.createStorageLink('cartItems', [], "cartItems");
        this.__footprintItems = this.createStorageLink('footprintItems', [], "footprintItems");
        this.__orderItems = this.createStorageLink('orderItems', [], "orderItems");
        this.colors = ['黑色', '白色', '蓝色', '绿色'];
        this.storages = ['64GB', '128GB', '256GB', '512GB'];
        this.versions = ['标准版', 'Pro版', 'Pro Max版'];
        this.features = [
            '高性能处理器，流畅运行大型应用',
            '多摄像头系统，支持夜景模式和超广角拍摄',
            '高刷新率屏幕，提供流畅的视觉体验',
            '大容量电池，支持快速充电',
            '轻薄机身设计，舒适握持感'
        ];
        this.reviewStats = ['好评率', '已评价', '追评'];
        this.reviewValues = ['98%', '1256', '328'];
        this.reviews = [1, 2, 3];
        this.shippingInfo = [
            { icon: '🚚', text: '全场包邮' },
            { icon: '⏰', text: '48小时发货' },
            { icon: '🔄', text: '7天无理由' },
            { icon: '🛡️', text: '全国联保' },
            { icon: '💬', text: '在线客服' }
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ProductDetailPage_Params) {
        if (params.product !== undefined) {
            this.product = params.product;
        }
        if (params.selectedColor !== undefined) {
            this.selectedColor = params.selectedColor;
        }
        if (params.selectedStorage !== undefined) {
            this.selectedStorage = params.selectedStorage;
        }
        if (params.selectedVersion !== undefined) {
            this.selectedVersion = params.selectedVersion;
        }
        if (params.colors !== undefined) {
            this.colors = params.colors;
        }
        if (params.storages !== undefined) {
            this.storages = params.storages;
        }
        if (params.versions !== undefined) {
            this.versions = params.versions;
        }
        if (params.features !== undefined) {
            this.features = params.features;
        }
        if (params.reviewStats !== undefined) {
            this.reviewStats = params.reviewStats;
        }
        if (params.reviewValues !== undefined) {
            this.reviewValues = params.reviewValues;
        }
        if (params.reviews !== undefined) {
            this.reviews = params.reviews;
        }
        if (params.shippingInfo !== undefined) {
            this.shippingInfo = params.shippingInfo;
        }
    }
    updateStateVars(params: ProductDetailPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__topRectHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__product.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedColor.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedStorage.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedVersion.purgeDependencyOnElmtId(rmElmtId);
        this.__cartItems.purgeDependencyOnElmtId(rmElmtId);
        this.__footprintItems.purgeDependencyOnElmtId(rmElmtId);
        this.__orderItems.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__topRectHeight.aboutToBeDeleted();
        this.__product.aboutToBeDeleted();
        this.__selectedColor.aboutToBeDeleted();
        this.__selectedStorage.aboutToBeDeleted();
        this.__selectedVersion.aboutToBeDeleted();
        this.__cartItems.aboutToBeDeleted();
        this.__footprintItems.aboutToBeDeleted();
        this.__orderItems.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __topRectHeight: ObservedPropertyAbstractPU<number>;
    get topRectHeight() {
        return this.__topRectHeight.get();
    }
    set topRectHeight(newValue: number) {
        this.__topRectHeight.set(newValue);
    }
    private __product: ObservedPropertyObjectPU<ProductItem | null>;
    get product() {
        return this.__product.get();
    }
    set product(newValue: ProductItem | null) {
        this.__product.set(newValue);
    }
    private __selectedColor: ObservedPropertySimplePU<string>;
    get selectedColor() {
        return this.__selectedColor.get();
    }
    set selectedColor(newValue: string) {
        this.__selectedColor.set(newValue);
    }
    private __selectedStorage: ObservedPropertySimplePU<string>;
    get selectedStorage() {
        return this.__selectedStorage.get();
    }
    set selectedStorage(newValue: string) {
        this.__selectedStorage.set(newValue);
    }
    private __selectedVersion: ObservedPropertySimplePU<string>;
    get selectedVersion() {
        return this.__selectedVersion.get();
    }
    set selectedVersion(newValue: string) {
        this.__selectedVersion.set(newValue);
    }
    private __cartItems: ObservedPropertyAbstractPU<CartItem[]>;
    get cartItems() {
        return this.__cartItems.get();
    }
    set cartItems(newValue: CartItem[]) {
        this.__cartItems.set(newValue);
    }
    private __footprintItems: ObservedPropertyAbstractPU<FootprintRecord[]>;
    get footprintItems() {
        return this.__footprintItems.get();
    }
    set footprintItems(newValue: FootprintRecord[]) {
        this.__footprintItems.set(newValue);
    }
    private __orderItems: ObservedPropertyAbstractPU<OrderSummary[]>;
    get orderItems() {
        return this.__orderItems.get();
    }
    set orderItems(newValue: OrderSummary[]) {
        this.__orderItems.set(newValue);
    }
    // Define data as member constants
    private colors: string[];
    private storages: string[];
    private versions: string[];
    private features: string[];
    private reviewStats: string[];
    private reviewValues: string[];
    private reviews: number[];
    private shippingInfo: ShippingInfoItem[];
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
        }
        else if (Array.isArray(this.product.detail)) {
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(Const.FULL_WIDTH);
            Column.height(Const.FULL_WIDTH);
            Column.backgroundColor(Color.Transparent);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // Blurred background image
            if (this.product?.image_url) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.product.image_url);
                        Image.width(Const.FULL_WIDTH);
                        Image.height(Const.FULL_WIDTH);
                        Image.objectFit(ImageFit.Cover);
                        Image.blur(90);
                        Image.transform({
                            scale: 1.5 // Scale up by 50%
                        });
                        Image.position({ x: 0, y: 0 });
                        Image.zIndex(-1);
                    }, Image);
                });
            }
            // Header with back button
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Header with back button
            Row.create();
            // Header with back button
            Row.width(Const.FULL_WIDTH);
            // Header with back button
            Row.height(56);
            // Header with back button
            Row.padding({ left: 16, right: 16 });
            // Header with back button
            Row.backgroundColor('rgba(255, 255, 255, 0.6)');
            // Header with back button
            Row.margin({ top: this.getUIContext().px2vp(this.topRectHeight) });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(48);
            Row.height(48);
            Row.justifyContent(FlexAlign.Center);
            Row.onClick(() => {
                // Note: back() is deprecated but still functional
                try {
                    router.back();
                }
                catch (err) {
                    console.error(`Failed to go back: ${err}`);
                }
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('←');
            Text.fontSize(24);
            Text.fontColor(Color.Black);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('商品详情');
            Text.fontSize(18);
            Text.fontColor(Color.Black);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        // Header with back button
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.backgroundColor(Color.Transparent);
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Product image
            Image.create(this.product?.image_url);
            // Product image
            Image.width(Const.FULL_WIDTH);
            // Product image
            Image.objectFit(ImageFit.Contain);
            // Product image
            Image.backgroundColor(Color.Transparent);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Product info
            Column.create();
            // Product info
            Column.backgroundColor("0x99FFFFFF");
            // Product info
            Column.width(Const.FULL_WIDTH);
            // Product info
            Column.backgroundColor('rgba(255, 255, 255, 0.6)');
            // Product info
            Column.borderRadius({ topLeft: 20, topRight: 20 });
            // Product info
            Column.padding({ left: 16, right: 16, bottom: 100 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Product name
            Text.create(this.product?.name || '');
            // Product name
            Text.fontSize(20);
            // Product name
            Text.fontColor(Color.Black);
            // Product name
            Text.fontWeight(FontWeight.Medium);
            // Product name
            Text.width(Const.FULL_WIDTH);
            // Product name
            Text.margin({ top: 16, bottom: 8 });
        }, Text);
        // Product name
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Price and discount
            Row.create();
            // Price and discount
            Row.backgroundColor("0x99FFFFFF");
            // Price and discount
            Row.width(Const.FULL_WIDTH);
            // Price and discount
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.product?.price || '');
            Text.fontSize(28);
            Text.fontColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.getBonusPoints()) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`积分${this.getBonusPoints()}`);
                        Text.height(24);
                        Text.fontSize(12);
                        Text.fontColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.borderRadius(4);
                        Text.borderWidth(1);
                        Text.borderColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.padding({ left: 8, right: 8 });
                        Text.margin({ left: 12 });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        // Price and discount
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Discount / short intro line (e.g. “全金属玄武架构…”)
            Row.create();
            // Discount / short intro line (e.g. “全金属玄武架构…”)
            Row.width(Const.FULL_WIDTH);
            // Discount / short intro line (e.g. “全金属玄武架构…”)
            Row.margin({ bottom: 24 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.product?.discount) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.product.discount);
                        Text.fontSize(14);
                        Text.fontColor(Color.Gray);
                        Text.margin({ right: 12 });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.product?.promotion) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.product.promotion);
                        Text.fontSize(14);
                        Text.fontColor('#666666');
                        Text.lineHeight(20);
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        // Discount / short intro line (e.g. “全金属玄武架构…”)
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Divider
            Divider.create();
            // Divider
            Divider.color('#E0E0E0');
            // Divider
            Divider.margin({ top: 16, bottom: 16 });
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Product description
            Column.create();
            // Product description
            Column.width(Const.FULL_WIDTH);
            // Product description
            Column.alignItems(HorizontalAlign.Start);
            // Product description
            Column.padding({ top: 12 });
            // Product description
            Column.backgroundColor('rgba(255, 255, 255, 0.6)');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('商品详情');
            Text.fontSize(18);
            Text.fontColor(Color.Black);
            Text.fontWeight(FontWeight.Medium);
            Text.width(Const.FULL_WIDTH);
            Text.margin({ bottom: 16 });
            Text.padding({ left: 16, right: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // Dynamic detail display based on type
            if (this.product?.detail) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (typeof this.product.detail === 'string') {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    // Display text detail
                                    Text.create(this.product.detail);
                                    // Display text detail
                                    Text.fontSize(14);
                                    // Display text detail
                                    Text.fontColor('#666666');
                                    // Display text detail
                                    Text.width(Const.FULL_WIDTH);
                                    // Display text detail
                                    Text.lineHeight(22);
                                    // Display text detail
                                    Text.margin({ bottom: 16 });
                                    // Display text detail
                                    Text.padding({ left: 16, right: 16 });
                                }, Text);
                                // Display text detail
                                Text.pop();
                            });
                        }
                        else if (Array.isArray(this.product.detail)) {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    // Display image array
                                    ForEach.create();
                                    const forEachItemGenFunction = _item => {
                                        const imageUrl = _item;
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Image.create(imageUrl);
                                            Image.width(Const.FULL_WIDTH);
                                            Image.objectFit(ImageFit.Contain);
                                            Image.backgroundColor(Color.Transparent);
                                            Image.margin({ bottom: 16 });
                                            Image.padding({ left: 16, right: 16 });
                                        }, Image);
                                    };
                                    this.forEachUpdateFunction(elmtId, this.product.detail, forEachItemGenFunction, (imageUrl: string) => imageUrl, false, false);
                                }, ForEach);
                                // Display image array
                                ForEach.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(2, () => {
                            });
                        }
                    }, If);
                    If.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // Default text if no detail
                        Text.create('暂无商品详情');
                        // Default text if no detail
                        Text.fontSize(14);
                        // Default text if no detail
                        Text.fontColor('#999999');
                        // Default text if no detail
                        Text.width(Const.FULL_WIDTH);
                        // Default text if no detail
                        Text.margin({ bottom: 16 });
                        // Default text if no detail
                        Text.padding({ left: 16, right: 16 });
                    }, Text);
                    // Default text if no detail
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        // Product description
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Divider
            Divider.create();
            // Divider
            Divider.color('#E0E0E0');
            // Divider
            Divider.margin({ top: 16, bottom: 16 });
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Product reviews
            Column.create();
            // Product reviews
            Column.width(Const.FULL_WIDTH);
            // Product reviews
            Column.alignItems(HorizontalAlign.Start);
            // Product reviews
            Column.padding({ top: 12 });
            // Product reviews
            Column.backgroundColor('rgba(255, 255, 255, 0.6)');
            // Product reviews
            Column.margin({ bottom: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('商品评价');
            Text.fontSize(18);
            Text.fontColor(Color.Black);
            Text.fontWeight(FontWeight.Medium);
            Text.width(Const.FULL_WIDTH);
            Text.margin({ bottom: 16 });
            Text.padding({ left: 16, right: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Review summary
            Row.create();
            // Review summary
            Row.width(Const.FULL_WIDTH);
            // Review summary
            Row.padding({ left: 16, right: 16 });
            // Review summary
            Row.margin({ bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Center);
            Column.margin({ right: 32 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('4.8');
            Text.fontSize(32);
            Text.fontColor(Color.Black);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('综合评分');
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const stat = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.margin({ bottom: 12 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.reviewValues[index]);
                    Text.fontSize(16);
                    Text.fontColor(Color.Black);
                    Text.fontWeight(FontWeight.Medium);
                    Text.margin({ right: 8 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(stat);
                    Text.fontSize(14);
                    Text.fontColor('#666666');
                }, Text);
                Text.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, this.reviewStats, forEachItemGenFunction, (stat: string) => stat, true, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        // Review summary
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Review examples
            Column.create();
            // Review examples
            Column.width(Const.FULL_WIDTH);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const index = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width(Const.FULL_WIDTH);
                    Column.padding({ left: 16, right: 16, bottom: 16 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width(Const.FULL_WIDTH);
                    Row.margin({ bottom: 8 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('用户' + (10000 + index));
                    Text.fontSize(14);
                    Text.fontColor('#666666');
                    Text.margin({ right: 16 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('★★★★★');
                    Text.fontSize(14);
                    Text.fontColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                }, Text);
                Text.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('手机很好用，运行流畅，拍照效果出色，电池续航也很满意。');
                    Text.fontSize(14);
                    Text.fontColor('#666666');
                    Text.lineHeight(20);
                    Text.width(Const.FULL_WIDTH);
                    Text.margin({ bottom: 8 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('2023-06-' + (10 + index));
                    Text.fontSize(12);
                    Text.fontColor('#999999');
                    Text.width(Const.FULL_WIDTH);
                }, Text);
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.reviews, forEachItemGenFunction, (index: number) => index.toString(), false, false);
        }, ForEach);
        ForEach.pop();
        // Review examples
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // View all reviews button
            Row.create();
            // View all reviews button
            Row.width(Const.FULL_WIDTH);
            // View all reviews button
            Row.justifyContent(FlexAlign.Center);
            // View all reviews button
            Row.padding({ top: 8, bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('查看全部评价');
            Text.fontSize(14);
            Text.fontColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('→');
            Text.fontSize(14);
            Text.fontColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.margin({ left: 4 });
        }, Text);
        Text.pop();
        // View all reviews button
        Row.pop();
        // Product reviews
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Divider
            Divider.create();
            // Divider
            Divider.color('#E0E0E0');
            // Divider
            Divider.margin({ top: 16, bottom: 16 });
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Shipping and after-sales info
            Column.create();
            // Shipping and after-sales info
            Column.width(Const.FULL_WIDTH);
            // Shipping and after-sales info
            Column.alignItems(HorizontalAlign.Start);
            // Shipping and after-sales info
            Column.padding({ top: 12 });
            // Shipping and after-sales info
            Column.backgroundColor('rgba(255, 255, 255, 0.6)');
            // Shipping and after-sales info
            Column.margin({ bottom: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('配送与售后');
            Text.fontSize(18);
            Text.fontColor(Color.Black);
            Text.fontWeight(FontWeight.Medium);
            Text.width(Const.FULL_WIDTH);
            Text.margin({ bottom: 16 });
            Text.padding({ left: 16, right: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(Const.FULL_WIDTH);
            Row.padding({ left: 16, right: 16, bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('20%');
                    Column.alignItems(HorizontalAlign.Center);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.icon);
                    Text.fontSize(24);
                    Text.margin({ bottom: 8 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.text);
                    Text.fontSize(12);
                    Text.fontColor('#666666');
                }, Text);
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.shippingInfo, forEachItemGenFunction, (item: ShippingInfoItem) => item.text, false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        // Shipping and after-sales info
        Column.pop();
        // Product info
        Column.pop();
        Column.pop();
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Purchase button bar
            Row.create();
            // Purchase button bar
            Row.width(Const.FULL_WIDTH);
            // Purchase button bar
            Row.height(50);
            // Purchase button bar
            Row.padding({ left: 16, right: 16, bottom: 16 });
            // Purchase button bar
            Row.backgroundColor('rgba(255, 255, 255, 0.6)');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('立即购买');
            Button.type(ButtonType.Normal);
            Button.backgroundColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Button.fontColor(Color.White);
            Button.fontSize(16);
            Button.width('50%');
            Button.height(50);
            Button.onClick(() => {
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
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('加入购物车');
            Button.type(ButtonType.Normal);
            Button.backgroundColor('#FFE5E5');
            Button.fontColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Button.fontSize(16);
            Button.width('50%');
            Button.height(50);
            Button.onClick(() => {
                this.addToCart();
            });
        }, Button);
        Button.pop();
        // Purchase button bar
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ProductDetailPage";
    }
}
registerNamedRoute(() => new ProductDetailPage(undefined, {}), "", { bundleName: "com.huawei.waterflow", moduleName: "entry", pagePath: "pages/ProductDetailPage", pageFullPath: "entry/src/main/ets/pages/ProductDetailPage", integratedHsp: "false", moduleType: "followWithHap" });
