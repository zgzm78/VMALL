if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ProfilePage_Params {
}
import router from "@ohos:router";
import { CommonConstants as Const } from "@bundle:com.huawei.waterflow/entry/ets/common/constants/CommonConstants";
export default class ProfilePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ProfilePage_Params) {
    }
    updateStateVars(params: ProfilePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
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
                action: () => { }
            }
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Center);
            Column.width(Const.FULL_WIDTH);
            Column.height(Const.FULL_HEIGHT);
            Column.padding({ bottom: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(Const.FULL_WIDTH);
            Column.height(70);
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
            Column.borderRadius(12);
            Column.margin({ bottom: 16 });
            Column.shadow({ radius: 2, color: '#1F000000', offsetY: 1 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('个人中心');
            Text.fontSize(24);
            Text.fontColor('#FFF');
            Text.fontWeight(FontWeight.Bold);
            Text.alignSelf(ItemAlign.Center);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 用户信息卡片
            Row.create();
            // 用户信息卡片
            Row.padding(20);
            // 用户信息卡片
            Row.backgroundColor(Color.White);
            // 用户信息卡片
            Row.borderRadius(16);
            // 用户信息卡片
            Row.margin({ left: 20, right: 20, bottom: 20 });
            // 用户信息卡片
            Row.width('calc(100% - 40px)');
            // 用户信息卡片
            Row.shadow({ radius: 4, color: '#1F000000', offsetY: 2 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777303, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.width(96);
            Image.height(96);
            Image.borderRadius(48);
            Image.border({ width: 2, color: { "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
            Image.shadow({ radius: 8, color: '#40000000', offsetY: 4 });
            Image.margin({ right: 20 });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('用户');
            Text.fontSize(20);
            Text.fontColor('#333');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('test123');
            Text.fontSize(14);
            Text.margin({ top: 6 });
            Text.fontColor('#666');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('退出登录');
            Button.width(96);
            Button.height(36);
            Button.fontSize(14);
            Button.backgroundColor('#FFF');
            Button.fontColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Button.border({ width: 1, color: { "id": 16777231, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
            Button.borderRadius(18);
            Button.onClick(() => {
                this.handleLogout();
            });
        }, Button);
        Button.pop();
        Row.pop();
        // 用户信息卡片
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 资产统计区域
            Row.create();
            // 资产统计区域
            Row.padding(16);
            // 资产统计区域
            Row.backgroundColor(Color.White);
            // 资产统计区域
            Row.borderRadius(16);
            // 资产统计区域
            Row.margin({ left: 20, right: 20, bottom: 20 });
            // 资产统计区域
            Row.width('calc(100% - 40px)');
            // 资产统计区域
            Row.justifyContent(FlexAlign.SpaceBetween);
            // 资产统计区域
            Row.shadow({ radius: 4, color: '#1F000000', offsetY: 2 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.flexGrow(1);
            Column.alignItems(HorizontalAlign.Center);
            Column.padding(12);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('优惠券');
            Text.fontSize(14);
            Text.fontColor('#666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('2张');
            Text.fontSize(18);
            Text.fontColor('#333');
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.flexGrow(1);
            Column.alignItems(HorizontalAlign.Center);
            Column.padding(12);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('余额');
            Text.fontSize(14);
            Text.fontColor('#666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('￥3.14');
            Text.fontSize(18);
            Text.fontColor('#333');
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.flexGrow(1);
            Column.alignItems(HorizontalAlign.Center);
            Column.padding(12);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('红包');
            Text.fontSize(14);
            Text.fontColor('#666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('3个');
            Text.fontSize(18);
            Text.fontColor('#333');
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.flexGrow(1);
            Column.alignItems(HorizontalAlign.Center);
            Column.padding(12);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('省钱卡');
            Text.fontSize(14);
            Text.fontColor('#666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('已开通');
            Text.fontSize(18);
            Text.fontColor(Color.Green);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        // 资产统计区域
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 快捷入口区域
            Row.create();
            // 快捷入口区域
            Row.width('calc(100% - 80px)');
            // 快捷入口区域
            Row.justifyContent(FlexAlign.SpaceBetween);
            // 快捷入口区域
            Row.margin({ bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.onClick(() => {
                this.handleQuickEntry('footprint');
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('我的足迹');
            Text.fontSize(16);
            Text.fontColor('#333');
            Text.padding(12);
            Text.backgroundColor(Color.White);
            Text.borderRadius(12);
            Text.shadow({ radius: 2, color: '#1F000000', offsetY: 1 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.onClick(() => {
                this.handleQuickEntry('favorites');
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('我的收藏');
            Text.fontSize(16);
            Text.fontColor('#333');
            Text.padding(12);
            Text.backgroundColor(Color.White);
            Text.borderRadius(12);
            Text.shadow({ radius: 2, color: '#1F000000', offsetY: 1 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.onClick(() => {
                this.handleQuickEntry('following');
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('我的关注');
            Text.fontSize(16);
            Text.fontColor('#333');
            Text.padding(12);
            Text.backgroundColor(Color.White);
            Text.borderRadius(12);
            Text.shadow({ radius: 2, color: '#1F000000', offsetY: 1 });
        }, Text);
        Text.pop();
        Column.pop();
        // 快捷入口区域
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 我的订单区域
            Column.create();
            // 我的订单区域
            Column.padding(20);
            // 我的订单区域
            Column.backgroundColor(Color.White);
            // 我的订单区域
            Column.borderRadius(16);
            // 我的订单区域
            Column.margin({ left: 20, right: 20 });
            // 我的订单区域
            Column.width('calc(100% - 40px)');
            // 我的订单区域
            Column.shadow({ radius: 4, color: '#1F000000', offsetY: 2 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('我的订单');
            Text.fontSize(20);
            Text.fontColor('#333');
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('查看全部 >');
            Text.fontSize(14);
            Text.fontColor('#666');
            Text.onClick(() => {
                this.handleOrderNavigation('all');
            });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding(20);
            Row.backgroundColor(Color.White);
            Row.borderRadius(16);
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.flexGrow(1);
            Column.alignItems(HorizontalAlign.Center);
            Column.onClick(() => {
                this.handleOrderNavigation('pendingPayment');
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777307, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.width(50);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('待付款');
            Text.fontSize(14);
            Text.fontColor('#666');
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.flexGrow(1);
            Column.alignItems(HorizontalAlign.Center);
            Column.onClick(() => {
                this.handleOrderNavigation('pendingReceipt');
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777306, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.width(50);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('待收货');
            Text.fontSize(14);
            Text.fontColor('#666');
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.flexGrow(1);
            Column.alignItems(HorizontalAlign.Center);
            Column.onClick(() => {
                this.handleOrderNavigation('pendingReview');
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777284, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.width(50);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('待评价');
            Text.fontSize(14);
            Text.fontColor('#666');
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.flexGrow(1);
            Column.alignItems(HorizontalAlign.Center);
            Column.onClick(() => {
                this.handleOrderNavigation('afterSales');
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777305, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.width(50);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('退换/售后');
            Text.fontSize(14);
            Text.fontColor('#666');
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        // 我的订单区域
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
