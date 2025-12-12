if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HomePage_Params {
    topRectHeight?: number;
    bottomRectHeight?: number;
    searchKeyword?: string;
    currentTabIndex?: number;
}
import { CommonConstants as Const } from "@bundle:com.huawei.waterflow/entry/ets/common/constants/CommonConstants";
import ClassifyComponent from "@bundle:com.huawei.waterflow/entry/ets/view/ClassifyComponent";
import SearchComponent from "@bundle:com.huawei.waterflow/entry/ets/view/SearchComponent";
import SwiperComponent from "@bundle:com.huawei.waterflow/entry/ets/view/SwiperComponent";
import WaterFlowComponent from "@bundle:com.huawei.waterflow/entry/ets/view/WaterFlowComponent";
import CartPage from "@bundle:com.huawei.waterflow/entry/ets/pages/CartPage";
class HomePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__topRectHeight = this.createStorageLink('topRectHeight', 0, "topRectHeight");
        this.__bottomRectHeight = this.createStorageLink('bottomRectHeight', 0, "bottomRectHeight");
        this.__searchKeyword = this.createStorageLink('searchKeyword', '', "searchKeyword");
        this.__currentTabIndex = new ObservedPropertySimplePU(0, this, "currentTabIndex");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HomePage_Params) {
        if (params.currentTabIndex !== undefined) {
            this.currentTabIndex = params.currentTabIndex;
        }
    }
    updateStateVars(params: HomePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__topRectHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__bottomRectHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__searchKeyword.purgeDependencyOnElmtId(rmElmtId);
        this.__currentTabIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__topRectHeight.aboutToBeDeleted();
        this.__bottomRectHeight.aboutToBeDeleted();
        this.__searchKeyword.aboutToBeDeleted();
        this.__currentTabIndex.aboutToBeDeleted();
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
    private __bottomRectHeight: ObservedPropertyAbstractPU<number>;
    get bottomRectHeight() {
        return this.__bottomRectHeight.get();
    }
    set bottomRectHeight(newValue: number) {
        this.__bottomRectHeight.set(newValue);
    }
    private __searchKeyword: ObservedPropertyAbstractPU<string>;
    get searchKeyword() {
        return this.__searchKeyword.get();
    }
    set searchKeyword(newValue: string) {
        this.__searchKeyword.set(newValue);
    }
    private __currentTabIndex: ObservedPropertySimplePU<number>; // 0: 首页, 1: 购物车, 2: 我的
    get currentTabIndex() {
        return this.__currentTabIndex.get();
    }
    set currentTabIndex(newValue: number) {
        this.__currentTabIndex.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Top });
            Stack.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777283, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.width(Const.FULL_WIDTH);
            Image.height({ "id": 16777245, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.objectFit(ImageFit.Cover);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height(Const.FULL_HEIGHT);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 主体内容区域根据底部导航切换
            Column.create();
            // 主体内容区域根据底部导航切换
            Column.layoutWeight(1);
            // 主体内容区域根据底部导航切换
            Column.padding({
                left: { "id": 16777243, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                right: { "id": 16777244, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                top: this.getUIContext().px2vp(this.topRectHeight)
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentTabIndex === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new 
                                // 首页
                                SearchComponent(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 47, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "SearchComponent" });
                    }
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new ClassifyComponent(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 48, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "ClassifyComponent" });
                    }
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        // 搜索时隐藏轮播
                        if (!this.searchKeyword || this.searchKeyword.trim().length === 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        if (isInitialRender) {
                                            let componentCall = new SwiperComponent(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 51, col: 15 });
                                            ViewPU.create(componentCall);
                                            let paramsLambda = () => {
                                                return {};
                                            };
                                            componentCall.paramsGenerator_ = paramsLambda;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                                        }
                                    }, { name: "SwiperComponent" });
                                }
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new WaterFlowComponent(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 53, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "WaterFlowComponent" });
                    }
                });
            }
            else if (this.currentTabIndex === 1) {
                this.ifElseBranchUpdateFunction(1, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new 
                                // 购物车
                                CartPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 56, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "CartPage" });
                    }
                });
            }
            else if (this.currentTabIndex === 2) {
                this.ifElseBranchUpdateFunction(2, () => {
                    // 我的
                    this.ProfilePage.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(3, () => {
                });
            }
        }, If);
        If.pop();
        // 主体内容区域根据底部导航切换
        Column.pop();
        // 底部导航栏
        this.BottomTabBar.bind(this)();
        Column.pop();
        Stack.pop();
    }
    private BottomTabItem(icon: Resource, title: string, index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
            Column.layoutWeight(1);
            Column.height(50);
            Column.onClick(() => {
                this.currentTabIndex = index;
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(icon);
            Image.width(24);
            Image.height(24);
            Image.margin({ bottom: 4 });
            Image.opacity(this.currentTabIndex === index ? Const.FULL_OPACITY : Const.SIXTY_OPACITY);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize({ "id": 16777271, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.fontColor(this.currentTabIndex === index ? Color.Black : Color.Gray);
        }, Text);
        Text.pop();
        Column.pop();
    }
    private BottomTabBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.SpaceEvenly);
            Row.alignItems(VerticalAlign.Center);
            Row.width(Const.FULL_WIDTH);
            Row.height(56);
            Row.backgroundColor(Color.White);
            Row.borderRadius({ topLeft: 16, topRight: 16 });
            Row.shadow({
                radius: 10,
                color: '#1F000000',
                offsetX: 0,
                offsetY: -2
            });
            Row.margin({
                left: { "id": 16777243, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                right: { "id": 16777244, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }
            });
        }, Row);
        this.BottomTabItem.bind(this)({ "id": 16777300, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, '首页', 0);
        this.BottomTabItem.bind(this)({ "id": 16777299, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, '购物车', 1);
        this.BottomTabItem.bind(this)({ "id": 16777301, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, '我的', 2);
        Row.pop();
    }
    // 购物车页面由 CartPage 组件实现
    private ProfilePage(parent = null) {
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
            Image.create({ "id": 16777301, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.width(96);
            Image.height(96);
            Image.borderRadius(48);
            Image.border({ width: 2, color: { "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
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
            Button.fontColor({ "id": 16777302, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Button.border({ width: 1, color: { "id": 16777302, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
            Button.borderRadius(18);
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
            Text.create('¥3.14');
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
            Column.onClick(() => { });
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
            Column.onClick(() => { });
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
            Column.onClick(() => { });
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
            Text.onClick(() => { });
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
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777306, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
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
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777305, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
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
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777303, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
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
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777304, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
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
    static getEntryName(): string {
        return "HomePage";
    }
}
registerNamedRoute(() => new HomePage(undefined, {}), "", { bundleName: "com.huawei.waterflow", moduleName: "entry", pagePath: "pages/HomePage", pageFullPath: "entry/src/main/ets/pages/HomePage", integratedHsp: "false", moduleType: "followWithHap" });
