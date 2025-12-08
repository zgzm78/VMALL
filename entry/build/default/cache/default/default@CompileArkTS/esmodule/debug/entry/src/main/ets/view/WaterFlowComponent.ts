if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WaterFlowComponent_Params {
    bottomRectHeight?: number;
    selectedCategoryIndex?: number;
    searchKeyword?: string;
    datasource?: WaterFlowDataSource;
    keywordMap?: Record<string, string>;
}
import type ProductItem from '../viewmodel/ProductItem';
import type { IProductItem } from '../viewmodel/ProductItem';
import { WaterFlowDataSource } from "@bundle:com.huawei.waterflow/entry/ets/viewmodel/WaterFlowDataSource";
import { CommonConstants as Const } from "@bundle:com.huawei.waterflow/entry/ets/common/constants/CommonConstants";
import { waterFlowData } from "@bundle:com.huawei.waterflow/entry/ets/viewmodel/HomeViewModel";
import FlowItemComponent from "@bundle:com.huawei.waterflow/entry/ets/view/FlowItemComponent";
export default class WaterFlowComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__bottomRectHeight = this.createStorageLink('bottomRectHeight', 0, "bottomRectHeight");
        this.__selectedCategoryIndex = this.createStorageLink('selectedCategoryIndex', 0, "selectedCategoryIndex");
        this.__searchKeyword = this.createStorageLink('searchKeyword', '', "searchKeyword");
        this.datasource = new WaterFlowDataSource();
        this.keywordMap = {
            '手表': 'watch',
            '电脑': 'computer',
            '手机': 'mate',
            '耳机': 'earbuds',
            '平板': 'tablet',
            '电视': 'tv',
            '手环': 'band'
        };
        this.setInitiallyProvidedValue(params);
        this.declareWatch("selectedCategoryIndex", this.onCategoryIndexChange);
        this.declareWatch("searchKeyword", this.onSearchKeywordChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WaterFlowComponent_Params) {
        if (params.datasource !== undefined) {
            this.datasource = params.datasource;
        }
        if (params.keywordMap !== undefined) {
            this.keywordMap = params.keywordMap;
        }
    }
    updateStateVars(params: WaterFlowComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__bottomRectHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedCategoryIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__searchKeyword.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__bottomRectHeight.aboutToBeDeleted();
        this.__selectedCategoryIndex.aboutToBeDeleted();
        this.__searchKeyword.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __bottomRectHeight: ObservedPropertyAbstractPU<number>;
    get bottomRectHeight() {
        return this.__bottomRectHeight.get();
    }
    set bottomRectHeight(newValue: number) {
        this.__bottomRectHeight.set(newValue);
    }
    private __selectedCategoryIndex: ObservedPropertyAbstractPU<number>;
    get selectedCategoryIndex() {
        return this.__selectedCategoryIndex.get();
    }
    set selectedCategoryIndex(newValue: number) {
        this.__selectedCategoryIndex.set(newValue);
    }
    private __searchKeyword: ObservedPropertyAbstractPU<string>;
    get searchKeyword() {
        return this.__searchKeyword.get();
    }
    set searchKeyword(newValue: string) {
        this.__searchKeyword.set(newValue);
    }
    private datasource: WaterFlowDataSource;
    aboutToAppear() {
        this.updateDataSource();
    }
    /**
     * 中英文关键词映射表
     */
    private keywordMap: Record<string, string>;
    /**
     * 改进的关键词处理：同时保留中文关键词和对应的英文关键词
     * @param keyword 原始关键词
     * @returns 处理后的关键词列表
     */
    private processKeywords(keyword: string): string[] {
        const processedKeywords = new Set<string>();
        // 拆分原始关键词
        const originalKeywords = keyword.split(/\s+/);
        // 添加原始关键词和对应的英文关键词
        for (const kw of originalKeywords) {
            // 添加原始关键词
            processedKeywords.add(kw);
            // 添加对应的英文关键词（如果有）
            const englishKw = this.keywordMap[kw];
            if (englishKw) {
                processedKeywords.add(englishKw);
            }
        }
        return Array.from(processedKeywords);
    }
    /**
     * Update data source based on selected category and search keyword.
     */
    private updateDataSource(): void {
        let filteredData: ProductItem[];
        // When searching, skip category filter and search all products
        if (this.searchKeyword && this.searchKeyword.trim().length > 0) {
            const keyword = this.searchKeyword.trim().toLowerCase();
            // 处理关键词：同时获取原始关键词和对应的英文关键词
            const processedKeywords = this.processKeywords(keyword);
            filteredData = waterFlowData.filter((item: IProductItem) => {
                // 获取产品的各个字段用于搜索
                const name = item.name?.toLowerCase() || '';
                const discount = item.discount?.toLowerCase() || '';
                const promotion = item.promotion?.toLowerCase() || '';
                const bonusPoints = item.bonus_points?.toLowerCase() || '';
                // 对于每个处理后的关键词，检查是否有字段包含该关键词
                // 只要有一个关键词匹配，就返回该产品
                const anyKeywordMatched = processedKeywords.some((kw: string) => {
                    return name.includes(kw) ||
                        discount.includes(kw) ||
                        promotion.includes(kw) ||
                        bonusPoints.includes(kw);
                });
                return anyKeywordMatched;
            });
        }
        else {
            // No search keyword, filter by category
            if (this.selectedCategoryIndex < 0) {
                // Show all products if invalid index
                filteredData = waterFlowData;
            }
            else {
                // Filter products by selected category
                filteredData = waterFlowData.filter((item: IProductItem) => item.category === this.selectedCategoryIndex);
            }
        }
        this.datasource.setDataArray(filteredData);
    }
    /**
     * Handle category index change.
     */
    onCategoryIndexChange(): void {
        this.updateDataSource();
    }
    /**
     * Handle search keyword change.
     */
    onSearchKeywordChange(): void {
        this.updateDataSource();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            WaterFlow.create({ footer: (): void => this.itemFoot() });
            WaterFlow.layoutWeight(Const.WATER_FLOW_LAYOUT_WEIGHT);
            WaterFlow.layoutDirection(FlexDirection.Column);
            WaterFlow.columnsTemplate(Const.WATER_FLOW_COLUMNS_TEMPLATE);
            WaterFlow.columnsGap({ "id": 16777279, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            WaterFlow.rowsGap({ "id": 16777282, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
        }, WaterFlow);
        {
            const __lazyForEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    FlowItem.create();
                }, FlowItem);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new FlowItemComponent(this, { item: item }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/WaterFlowComponent.ets", line: 140, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    item: item
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "FlowItemComponent" });
                }
                FlowItem.pop();
            };
            const __lazyForEachItemIdFunc = (item: ProductItem) => JSON.stringify(item);
            LazyForEach.create("1", this, this.datasource, __lazyForEachItemGenFunction, __lazyForEachItemIdFunc);
            LazyForEach.pop();
        }
        WaterFlow.pop();
    }
    itemFoot(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.margin({
                top: { "id": 16777282, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                bottom: this.getUIContext().px2vp(this.bottomRectHeight)
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777220, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.fontColor(Color.Gray);
            Text.fontSize({ "id": 16777242, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.width(Const.FULL_WIDTH);
            Text.height({ "id": 16777241, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
