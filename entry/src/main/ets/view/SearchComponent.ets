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

import { CommonConstants as Const } from '../common/constants/CommonConstants';
import { SearchHistoryManager } from '../common/utils/SearchHistoryManager';
import { waterFlowData } from '../viewmodel/HomeViewModel';
import { IProductItem } from '../viewmodel/ProductItem';

/**
 * Search component.
 *
 * Usage: Directly reference SearchComponent().
 */
@Component
export default struct SearchComponent {
  @StorageLink('searchKeyword') searchKeyword: string = '';
  @State inputValue: string = '';
  @State searchHistory: string[] = [];
  @State searchSuggestions: string[] = [];
  @State showSuggestions: boolean = false;
  private searchHistoryManager = SearchHistoryManager.getInstance();

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

  build() {
    Column() {
      Row() {
        Image($r('app.media.ic_search'))
          .width($r('app.float.search_width'))
          .height($r('app.float.search_height'))
          .margin({
            left: $r('app.float.search_margin_left'),
            right: $r('app.float.search_margin_right')
          })
        TextInput({
            placeholder: $r('app.string.search_text'),
            text: this.inputValue
          })
            .layoutWeight(1)
            .fontSize($r('app.float.small_font_size'))
            .fontColor(Color.Black)
            .placeholderColor('#999999')
            .backgroundColor(Color.Transparent)
            .onChange((value: string) => {
              this.inputValue = value;
              this.searchKeyword = value;
              this.searchSuggestions = this.getSearchSuggestions(value);
              this.showSuggestions = value.trim().length > 0 && this.searchSuggestions.length > 0;
            })
            .onSubmit(() => {
              this.handleSearch(this.inputValue);
            })
        if (this.inputValue.trim().length > 0) {
          Text('取消')
            .fontSize($r('app.float.small_font_size'))
            .fontColor(Color.Gray)
            .margin({ right: $r('app.float.search_margin_right') })
            .onClick(() => {
              this.inputValue = '';
              this.searchKeyword = '';
              this.showSuggestions = false;
            })
        }
      }
      .width(Const.FULL_WIDTH)
      .height($r('app.float.search_swiper_height'))
      .borderRadius($r('app.float.search_radius'))
      .backgroundColor(Color.White)
      .margin({ top: $r('app.float.search_margin_top') })

      // 搜索建议和历史记录
      if (this.showSuggestions && this.searchSuggestions.length > 0) {
        // 显示搜索建议
        Column() {
          ForEach(this.searchSuggestions, (suggestion: string) => {
            Row() {
              Image($r('app.media.ic_search'))
                .width($r('app.float.search_width'))
                .height($r('app.float.search_height'))
                .margin({
                  left: $r('app.float.search_margin_left'),
                  right: $r('app.float.search_margin_right')
                })
              Text(suggestion)
                .layoutWeight(1)
                .fontSize($r('app.float.small_font_size'))
                .fontColor(Color.Black)
            }
            .width(Const.FULL_WIDTH)
            .height($r('app.float.search_swiper_height'))
            .backgroundColor(Color.White)
            .padding({ left: $r('app.float.search_margin_left') })
            .onClick(() => {
              this.handleSearch(suggestion);
            })
          }, (suggestion: string) => suggestion)
        }
        .backgroundColor(Color.White)
        .borderRadius($r('app.float.search_radius'))
        .margin({ top: 5 })
      } else if (!this.showSuggestions && this.inputValue.trim().length === 0 && this.searchHistory.length > 0) {
        // 显示搜索历史
        Column() {
          // 历史记录标题和清除按钮
          Row() {
            Text('搜索历史')
              .fontSize($r('app.float.small_font_size'))
              .fontColor(Color.Gray)
              .layoutWeight(1)
            Text('清除')
              .fontSize($r('app.float.small_font_size'))
              .fontColor(Color.Gray)
              .onClick(() => this.clearSearchHistory())
          }
          .width(Const.FULL_WIDTH)
          .padding({ left: $r('app.float.search_margin_left'), right: $r('app.float.search_margin_right'), top: 10, bottom: 10 })

          // 历史记录列表
          ForEach(this.searchHistory, (keyword: string) => {
            Row() {
              Image($r('app.media.ic_search'))
                .width($r('app.float.search_width'))
                .height($r('app.float.search_height'))
                .margin({
                  left: $r('app.float.search_margin_left'),
                  right: $r('app.float.search_margin_right')
                })
              Text(keyword)
                .layoutWeight(1)
                .fontSize($r('app.float.small_font_size'))
                .fontColor(Color.Black)
              Text('x')
                .fontSize(16)
                .fontColor(Color.Gray)
                .margin({ right: $r('app.float.search_margin_right') })
                .onClick(() => this.deleteHistoryItem(keyword))
            }
            .width(Const.FULL_WIDTH)
            .height($r('app.float.search_swiper_height'))
            .backgroundColor(Color.White)
            .padding({ left: $r('app.float.search_margin_left') })
            .onClick(() => {
              this.handleSearch(keyword);
            })
          }, (keyword: string) => keyword)
        }
        .backgroundColor(Color.White)
        .borderRadius($r('app.float.search_radius'))
        .margin({ top: 5 })
      }
    }
  }
}