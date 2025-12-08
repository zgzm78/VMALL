if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CartPage_Params {
    cartItems?: CartItem[];
}
import { CommonConstants as Const } from "@bundle:com.huawei.waterflow/entry/ets/common/constants/CommonConstants";
interface CartItem {
    id: number;
    name: string;
    price: number;
    count: number;
    selected: boolean;
    imageUrl: string;
}
export default class CartPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__cartItems = this.createStorageLink('cartItems', [], "cartItems");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CartPage_Params) {
    }
    updateStateVars(params: CartPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__cartItems.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__cartItems.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __cartItems: ObservedPropertyAbstractPU<CartItem[]>;
    get cartItems() {
        return this.__cartItems.get();
    }
    set cartItems(newValue: CartItem[]) {
        this.__cartItems.set(newValue);
    }
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
    private CartItemRow(item: CartItem, index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding({ top: 10, bottom: 10, left: 8, right: 8 });
            Row.backgroundColor(Color.White);
            Row.borderRadius(8);
            Row.margin({ bottom: 6 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 左侧选中圆圈（选中：实心红色 + 白色对勾；未选中：空心灰色圆圈）
            Text.create(this.cartItems[index].selected ? '√' : '');
            // 左侧选中圆圈（选中：实心红色 + 白色对勾；未选中：空心灰色圆圈）
            Text.width(24);
            // 左侧选中圆圈（选中：实心红色 + 白色对勾；未选中：空心灰色圆圈）
            Text.height(24);
            // 左侧选中圆圈（选中：实心红色 + 白色对勾；未选中：空心灰色圆圈）
            Text.borderRadius(12);
            // 左侧选中圆圈（选中：实心红色 + 白色对勾；未选中：空心灰色圆圈）
            Text.borderWidth(1);
            // 左侧选中圆圈（选中：实心红色 + 白色对勾；未选中：空心灰色圆圈）
            Text.borderColor(this.cartItems[index].selected ? { "id": 16777231, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } : '#CCCCCC');
            // 左侧选中圆圈（选中：实心红色 + 白色对勾；未选中：空心灰色圆圈）
            Text.backgroundColor(this.cartItems[index].selected ? { "id": 16777231, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } : Color.White);
            // 左侧选中圆圈（选中：实心红色 + 白色对勾；未选中：空心灰色圆圈）
            Text.textAlign(TextAlign.Center);
            // 左侧选中圆圈（选中：实心红色 + 白色对勾；未选中：空心灰色圆圈）
            Text.fontColor(this.cartItems[index].selected ? Color.White : Color.Transparent);
            // 左侧选中圆圈（选中：实心红色 + 白色对勾；未选中：空心灰色圆圈）
            Text.fontSize(16);
            // 左侧选中圆圈（选中：实心红色 + 白色对勾；未选中：空心灰色圆圈）
            Text.margin({ right: 8 });
            // 左侧选中圆圈（选中：实心红色 + 白色对勾；未选中：空心灰色圆圈）
            Text.onClick(() => {
                this.toggleItemSelected(index);
            });
        }, Text);
        // 左侧选中圆圈（选中：实心红色 + 白色对勾；未选中：空心灰色圆圈）
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 商品图片
            Image.create(item.imageUrl);
            // 商品图片
            Image.width(80);
            // 商品图片
            Image.height(80);
            // 商品图片
            Image.objectFit(ImageFit.Cover);
            // 商品图片
            Image.borderRadius(8);
            // 商品图片
            Image.margin({ right: 8 });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 图片右侧信息：名称、数量调节、总价、移出
            Column.create();
            // 图片右侧信息：名称、数量调节、总价、移出
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 商品名称
            Text.create(item.name);
            // 商品名称
            Text.fontSize({ "id": 16777246, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            // 商品名称
            Text.fontColor(Color.Black);
            // 商品名称
            Text.maxLines(2);
            // 商品名称
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        // 商品名称
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 数量调节行
            Row.create();
            // 数量调节行
            Row.margin({ top: 6 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('数量');
            Text.fontSize({ "id": 16777271, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.fontColor(Color.Gray);
            Text.margin({ right: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('-');
            Text.width(26);
            Text.height(26);
            Text.borderRadius(13);
            Text.borderWidth(1);
            Text.borderColor('#DDDDDD');
            Text.textAlign(TextAlign.Center);
            Text.fontSize(18);
            Text.onClick(() => {
                this.decreaseItemCount(index);
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.cartItems[index].count.toString());
            Text.fontSize({ "id": 16777246, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.fontColor(Color.Black);
            Text.margin({ left: 8, right: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('+');
            Text.width(26);
            Text.height(26);
            Text.borderRadius(13);
            Text.borderWidth(1);
            Text.borderColor('#DDDDDD');
            Text.textAlign(TextAlign.Center);
            Text.fontSize(18);
            Text.onClick(() => {
                this.increaseItemCount(index);
            });
        }, Text);
        Text.pop();
        // 数量调节行
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 该商品总价 + 移出
            Row.create();
            // 该商品总价 + 移出
            Row.margin({ top: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('小计 ￥' + (item.price * item.count).toString());
            Text.fontSize({ "id": 16777246, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.fontColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('移出');
            Text.fontSize({ "id": 16777272, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.fontColor(Color.Gray);
            Text.onClick(() => {
                this.removeItem(index);
            });
        }, Text);
        Text.pop();
        // 该商品总价 + 移出
        Row.pop();
        // 图片右侧信息：名称、数量调节、总价、移出
        Column.pop();
        Row.pop();
    }
    private CartBottomBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(Const.FULL_WIDTH);
            Row.height(60);
            Row.backgroundColor(Color.White);
            Row.padding({ left: 12, right: 12 });
            Row.borderRadius({ topLeft: 16, topRight: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 全选圆圈（选中：实心红色 + 白色对勾；未选中：空心灰色圆圈）
            Row.create();
            // 全选圆圈（选中：实心红色 + 白色对勾；未选中：空心灰色圆圈）
            Row.margin({ right: 12 });
            // 全选圆圈（选中：实心红色 + 白色对勾；未选中：空心灰色圆圈）
            Row.onClick(() => {
                this.toggleSelectAll();
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.areAllItemsSelected() ? '√' : '');
            Text.width(20);
            Text.height(20);
            Text.borderRadius(10);
            Text.borderWidth(1);
            Text.borderColor(this.areAllItemsSelected() ? { "id": 16777231, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } : '#CCCCCC');
            Text.backgroundColor(this.areAllItemsSelected() ? { "id": 16777231, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } : Color.White);
            Text.textAlign(TextAlign.Center);
            Text.fontColor(this.areAllItemsSelected() ? Color.White : Color.Transparent);
            Text.fontSize(14);
            Text.margin({ right: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('全选');
            Text.fontSize({ "id": 16777271, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.fontColor(Color.Black);
        }, Text);
        Text.pop();
        // 全选圆圈（选中：实心红色 + 白色对勾；未选中：空心灰色圆圈）
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 合计
            Column.create();
            // 合计
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('已选商品合计');
            Text.fontSize({ "id": 16777271, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.fontColor(Color.Gray);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('￥' + this.calculateSelectedTotalPrice().toString());
            Text.fontSize({ "id": 16777246, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.fontColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
        }, Text);
        Text.pop();
        // 合计
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 结算按钮
            Row.create();
            // 结算按钮
            Row.backgroundColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            // 结算按钮
            Row.borderRadius(20);
            // 结算按钮
            Row.padding({ left: 24, right: 24, top: 8, bottom: 8 });
            // 结算按钮
            Row.onClick(() => {
                this.handleCheckout();
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('立即结算');
            Text.fontSize({ "id": 16777246, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        // 结算按钮
        Row.pop();
        Row.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(Const.FULL_WIDTH);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题
            Text.create('我的购物车');
            // 标题
            Text.fontSize(24);
            // 标题
            Text.fontColor(Color.White);
            // 标题
            Text.fontWeight(Const.FONT_WEIGHT_FIVE);
            // 标题
            Text.margin({ bottom: 16 });
        }, Text);
        // 标题
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.cartItems.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 购物车为空的提示
                        Column.create();
                        // 购物车为空的提示
                        Column.padding({ left: 16, right: 16, top: 12, bottom: 12 });
                        // 购物车为空的提示
                        Column.backgroundColor('rgba(255, 255, 255, 0.9)');
                        // 购物车为空的提示
                        Column.borderRadius(12);
                        // 购物车为空的提示
                        Column.width('90%');
                        // 购物车为空的提示
                        Column.justifyContent(FlexAlign.Center);
                        // 购物车为空的提示
                        Column.alignItems(HorizontalAlign.Center);
                        // 购物车为空的提示
                        Column.layoutWeight(1);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('购物车里还没有商品');
                        Text.fontSize({ "id": 16777246, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.fontColor('#333333');
                        Text.opacity(Const.FULL_OPACITY);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('去首页逛逛，挑选喜欢的商品吧~');
                        Text.fontSize({ "id": 16777271, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.fontColor('#666666');
                        Text.opacity(Const.FULL_OPACITY);
                        Text.margin({ top: 8 });
                    }, Text);
                    Text.pop();
                    // 购物车为空的提示
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 购物车商品列表
                        Column.create();
                        // 购物车商品列表
                        Column.layoutWeight(1);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = (_item, index?: number) => {
                            const item = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                If.create();
                                if (index !== undefined) {
                                    this.ifElseBranchUpdateFunction(0, () => {
                                        this.CartItemRow.bind(this)(item, index);
                                    });
                                }
                                else {
                                    this.ifElseBranchUpdateFunction(1, () => {
                                    });
                                }
                            }, If);
                            If.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.cartItems, forEachItemGenFunction, (item: CartItem) => item.id.toString(), true, false);
                    }, ForEach);
                    ForEach.pop();
                    // 购物车商品列表
                    Column.pop();
                    // 底部合计和结算
                    this.CartBottomBar.bind(this)();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
