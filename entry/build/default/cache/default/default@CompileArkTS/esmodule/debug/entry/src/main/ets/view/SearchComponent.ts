if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SearchComponent_Params {
    searchKeyword?: string;
    inputValue?: string;
    searchHistory?: string[];
    searchSuggestions?: string[];
    showSuggestions?: boolean;
    searchHistoryManager?;
}
import { CommonConstants as Const } from "@bundle:com.huawei.waterflow/entry/ets/common/constants/CommonConstants";
import { SearchHistoryManager } from "@bundle:com.huawei.waterflow/entry/ets/common/utils/SearchHistoryManager";
import { waterFlowData } from "@bundle:com.huawei.waterflow/entry/ets/viewmodel/HomeViewModel";
import type { IProductItem } from '../viewmodel/ProductItem';
export default class SearchComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__searchKeyword = this.createStorageLink('searchKeyword', '', "searchKeyword");
        this.__inputValue = new ObservedPropertySimplePU('', this, "inputValue");
        this.__searchHistory = new ObservedPropertyObjectPU([], this, "searchHistory");
        this.__searchSuggestions = new ObservedPropertyObjectPU([], this, "searchSuggestions");
        this.__showSuggestions = new ObservedPropertySimplePU(false, this, "showSuggestions");
        this.searchHistoryManager = SearchHistoryManager.getInstance();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SearchComponent_Params) {
        if (params.inputValue !== undefined) {
            this.inputValue = params.inputValue;
        }
        if (params.searchHistory !== undefined) {
            this.searchHistory = params.searchHistory;
        }
        if (params.searchSuggestions !== undefined) {
            this.searchSuggestions = params.searchSuggestions;
        }
        if (params.showSuggestions !== undefined) {
            this.showSuggestions = params.showSuggestions;
        }
        if (params.searchHistoryManager !== undefined) {
            this.searchHistoryManager = params.searchHistoryManager;
        }
    }
    updateStateVars(params: SearchComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__searchKeyword.purgeDependencyOnElmtId(rmElmtId);
        this.__inputValue.purgeDependencyOnElmtId(rmElmtId);
        this.__searchHistory.purgeDependencyOnElmtId(rmElmtId);
        this.__searchSuggestions.purgeDependencyOnElmtId(rmElmtId);
        this.__showSuggestions.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__searchKeyword.aboutToBeDeleted();
        this.__inputValue.aboutToBeDeleted();
        this.__searchHistory.aboutToBeDeleted();
        this.__searchSuggestions.aboutToBeDeleted();
        this.__showSuggestions.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __searchKeyword: ObservedPropertyAbstractPU<string>;
    get searchKeyword() {
        return this.__searchKeyword.get();
    }
    set searchKeyword(newValue: string) {
        this.__searchKeyword.set(newValue);
    }
    private __inputValue: ObservedPropertySimplePU<string>;
    get inputValue() {
        return this.__inputValue.get();
    }
    set inputValue(newValue: string) {
        this.__inputValue.set(newValue);
    }
    private __searchHistory: ObservedPropertyObjectPU<string[]>;
    get searchHistory() {
        return this.__searchHistory.get();
    }
    set searchHistory(newValue: string[]) {
        this.__searchHistory.set(newValue);
    }
    private __searchSuggestions: ObservedPropertyObjectPU<string[]>;
    get searchSuggestions() {
        return this.__searchSuggestions.get();
    }
    set searchSuggestions(newValue: string[]) {
        this.__searchSuggestions.set(newValue);
    }
    private __showSuggestions: ObservedPropertySimplePU<boolean>;
    get showSuggestions() {
        return this.__showSuggestions.get();
    }
    set showSuggestions(newValue: boolean) {
        this.__showSuggestions.set(newValue);
    }
    private searchHistoryManager;
    aboutToAppear() {
        this.loadSearchHistory();
    }
    /**
     * 加载搜索历史
     */
    private async loadSearchHistory() {
        this.searchHistory = await this.searchHistoryManager.getHistory();
    }
    /**
     * 处理搜索
     * @param keyword 搜索关键词
     */
    private async handleSearch(keyword: string) {
        this.inputValue = keyword;
        this.searchKeyword = keyword;
        this.showSuggestions = false;
        await this.searchHistoryManager.addHistory(keyword);
        this.loadSearchHistory();
    }
    /**
     * 获取搜索建议
     * @param keyword 搜索关键词
     */
    private getSearchSuggestions(keyword: string): string[] {
        if (!keyword || keyword.trim().length === 0) {
            return [];
        }
        const lowerKeyword = keyword.toLowerCase();
        const allKeywords = new Set<string>();
        // 从产品数据中提取可能的搜索建议
        waterFlowData.forEach((item: IProductItem) => {
            const name = item.name?.toLowerCase() || '';
            const discount = item.discount?.toLowerCase() || '';
            const promotion = item.promotion?.toLowerCase() || '';
            if (name.includes(lowerKeyword)) {
                allKeywords.add(item.name || '');
            }
            if (discount.includes(lowerKeyword)) {
                allKeywords.add(item.discount || '');
            }
            if (promotion.includes(lowerKeyword)) {
                allKeywords.add(item.promotion || '');
            }
        });
        // 限制建议数量
        return Array.from(allKeywords).slice(0, 5);
    }
    /**
     * 清除搜索历史
     */
    private async clearSearchHistory() {
        await this.searchHistoryManager.clearHistory();
        this.searchHistory = [];
    }
    /**
     * 删除特定搜索历史
     * @param keyword 搜索关键词
     */
    private async deleteHistoryItem(keyword: string) {
        await this.searchHistoryManager.deleteHistory(keyword);
        this.searchHistory = this.searchHistory.filter(item => item !== keyword);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(Const.FULL_WIDTH);
            Row.height({ "id": 16777269, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Row.borderRadius({ "id": 16777268, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Row.backgroundColor(Color.White);
            Row.margin({ top: { "id": 16777267, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777295, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.width({ "id": 16777270, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.height({ "id": 16777264, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.margin({
                left: { "id": 16777265, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                right: { "id": 16777266, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({
                placeholder: { "id": 16777222, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                text: this.inputValue
            });
            TextInput.layoutWeight(1);
            TextInput.fontSize({ "id": 16777271, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            TextInput.fontColor(Color.Black);
            TextInput.placeholderColor('#999999');
            TextInput.backgroundColor(Color.Transparent);
            TextInput.onChange((value: string) => {
                this.inputValue = value;
                this.searchKeyword = value;
                this.searchSuggestions = this.getSearchSuggestions(value);
                this.showSuggestions = value.trim().length > 0 && this.searchSuggestions.length > 0;
            });
            TextInput.onSubmit(() => {
                this.handleSearch(this.inputValue);
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.inputValue.trim().length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('取消');
                        Text.fontSize({ "id": 16777271, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.fontColor(Color.Gray);
                        Text.margin({ right: { "id": 16777266, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
                        Text.onClick(() => {
                            this.inputValue = '';
                            this.searchKeyword = '';
                            this.showSuggestions = false;
                        });
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
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 搜索建议和历史记录
            if (this.showSuggestions && this.searchSuggestions.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 显示搜索建议
                        Column.create();
                        // 显示搜索建议
                        Column.backgroundColor(Color.White);
                        // 显示搜索建议
                        Column.borderRadius({ "id": 16777268, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        // 显示搜索建议
                        Column.margin({ top: 5 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const suggestion = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.width(Const.FULL_WIDTH);
                                Row.height({ "id": 16777269, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                                Row.backgroundColor(Color.White);
                                Row.padding({ left: { "id": 16777265, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
                                Row.onClick(() => {
                                    this.handleSearch(suggestion);
                                });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create({ "id": 16777295, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                                Image.width({ "id": 16777270, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                                Image.height({ "id": 16777264, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                                Image.margin({
                                    left: { "id": 16777265, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                                    right: { "id": 16777266, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }
                                });
                            }, Image);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(suggestion);
                                Text.layoutWeight(1);
                                Text.fontSize({ "id": 16777271, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                                Text.fontColor(Color.Black);
                            }, Text);
                            Text.pop();
                            Row.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.searchSuggestions, forEachItemGenFunction, (suggestion: string) => suggestion, false, false);
                    }, ForEach);
                    ForEach.pop();
                    // 显示搜索建议
                    Column.pop();
                });
            }
            else if (!this.showSuggestions && this.inputValue.trim().length === 0 && this.searchHistory.length > 0) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 显示搜索历史
                        Column.create();
                        // 显示搜索历史
                        Column.backgroundColor(Color.White);
                        // 显示搜索历史
                        Column.borderRadius({ "id": 16777268, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        // 显示搜索历史
                        Column.margin({ top: 5 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 历史记录标题和清除按钮
                        Row.create();
                        // 历史记录标题和清除按钮
                        Row.width(Const.FULL_WIDTH);
                        // 历史记录标题和清除按钮
                        Row.padding({ left: { "id": 16777265, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, right: { "id": 16777266, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, top: 10, bottom: 10 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('搜索历史');
                        Text.fontSize({ "id": 16777271, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.fontColor(Color.Gray);
                        Text.layoutWeight(1);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('清除');
                        Text.fontSize({ "id": 16777271, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.fontColor(Color.Gray);
                        Text.onClick(() => this.clearSearchHistory());
                    }, Text);
                    Text.pop();
                    // 历史记录标题和清除按钮
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 历史记录列表
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const keyword = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.width(Const.FULL_WIDTH);
                                Row.height({ "id": 16777269, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                                Row.backgroundColor(Color.White);
                                Row.padding({ left: { "id": 16777265, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
                                Row.onClick(() => {
                                    this.handleSearch(keyword);
                                });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create({ "id": 16777295, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                                Image.width({ "id": 16777270, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                                Image.height({ "id": 16777264, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                                Image.margin({
                                    left: { "id": 16777265, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                                    right: { "id": 16777266, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }
                                });
                            }, Image);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(keyword);
                                Text.layoutWeight(1);
                                Text.fontSize({ "id": 16777271, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                                Text.fontColor(Color.Black);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('x');
                                Text.fontSize(16);
                                Text.fontColor(Color.Gray);
                                Text.margin({ right: { "id": 16777266, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
                                Text.onClick(() => this.deleteHistoryItem(keyword));
                            }, Text);
                            Text.pop();
                            Row.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.searchHistory, forEachItemGenFunction, (keyword: string) => keyword, false, false);
                    }, ForEach);
                    // 历史记录列表
                    ForEach.pop();
                    // 显示搜索历史
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
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
