/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import ProductItem, { IProductItem } from '../viewmodel/ProductItem';
import { WaterFlowDataSource } from '../viewmodel/WaterFlowDataSource';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import { waterFlowData } from '../viewmodel/HomeViewModel';
import FlowItemComponent from '../view/FlowItemComponent';

/**
 * Water flow component.
 *
 * Usage: Directly reference WaterFlowComponent().
 */
@Component
export default struct WaterFlowComponent {
  @StorageLink('bottomRectHeight') bottomRectHeight: number = 0;
  @StorageLink('selectedCategoryIndex') @Watch('onCategoryIndexChange') selectedCategoryIndex: number = 0;
  @StorageLink('searchKeyword') @Watch('onSearchKeywordChange') searchKeyword: string = '';
  private datasource: WaterFlowDataSource = new WaterFlowDataSource();

  aboutToAppear() {
    this.updateDataSource();
  }

  /**
   * 中英文关键词映射表
   */
  private keywordMap: Record<string, string> = {
    '手表': 'watch',
    '电脑': 'computer',
    '手机': 'mate',
    '耳机': 'earbuds',
    '平板': 'tablet',
    '电视': 'tv',
    '手环': 'band'
  };

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
    } else {
      // No search keyword, filter by category
      if (this.selectedCategoryIndex < 0) {
        // Show all products if invalid index
        filteredData = waterFlowData;
      } else {
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

  build() {
    WaterFlow({ footer: (): void => this.itemFoot() }) {
      LazyForEach(this.datasource, (item: ProductItem) => {
        FlowItem() {
          FlowItemComponent({ item: item })

        }
      }, (item: ProductItem) => JSON.stringify(item))
    }
    .layoutWeight(Const.WATER_FLOW_LAYOUT_WEIGHT)
    .layoutDirection(FlexDirection.Column)
    .columnsTemplate(Const.WATER_FLOW_COLUMNS_TEMPLATE)
    .columnsGap($r('app.float.water_flow_columns_gap'))
    .rowsGap($r('app.float.water_flow_row_gap'))
  }

  @Builder
  itemFoot() {
    Column() {
      Text($r('app.string.footer_text'))
        .fontColor(Color.Gray)
        .fontSize($r('app.float.footer_text_size'))
        .width(Const.FULL_WIDTH)
        .height($r('app.float.footer_text_height'))
        .textAlign(TextAlign.Center)
    }
    .margin({
      top: $r('app.float.water_flow_row_gap'),
      bottom: this.getUIContext().px2vp(this.bottomRectHeight)
    })
  }
}