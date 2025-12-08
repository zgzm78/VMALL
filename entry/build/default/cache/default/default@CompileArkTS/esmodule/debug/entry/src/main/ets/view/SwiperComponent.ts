if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SwiperComponent_Params {
    dotIndicator?: DotIndicator;
}
import { CommonConstants as Const } from "@bundle:com.huawei.waterflow/entry/ets/common/constants/CommonConstants";
import { swiperImage } from "@bundle:com.huawei.waterflow/entry/ets/viewmodel/HomeViewModel";
export default class SwiperComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.dotIndicator = new DotIndicator();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SwiperComponent_Params) {
        if (params.dotIndicator !== undefined) {
            this.dotIndicator = params.dotIndicator;
        }
    }
    updateStateVars(params: SwiperComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private dotIndicator: DotIndicator;
    aboutToAppear() {
        this.dotIndicator.selectedColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Swiper.create();
            Swiper.indicator(this.dotIndicator);
            Swiper.autoPlay(true);
            Swiper.itemSpace(0);
            Swiper.width(Const.FULL_WIDTH);
            Swiper.displayCount(1);
            Swiper.margin({
                top: { "id": 16777277, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                bottom: { "id": 16777276, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }
            });
        }, Swiper);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(item);
                    Image.width(Const.FULL_WIDTH);
                    Image.height({ "id": 16777275, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                    Image.borderRadius({ "id": 16777278, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                    Image.backgroundColor(Color.White);
                }, Image);
            };
            this.forEachUpdateFunction(elmtId, swiperImage, forEachItemGenFunction, (item: Resource) => JSON.stringify(item), false, false);
        }, ForEach);
        ForEach.pop();
        Swiper.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
