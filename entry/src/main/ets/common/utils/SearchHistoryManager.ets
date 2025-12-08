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

const MAX_HISTORY_COUNT = 10;

/**
 * 搜索历史管理类
 */
export class SearchHistoryManager {
  private static instance: SearchHistoryManager;
  private searchHistory: string[] = [];

  private constructor() {
    // 使用内存存储搜索历史
    this.searchHistory = [];
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): SearchHistoryManager {
    if (!SearchHistoryManager.instance) {
      SearchHistoryManager.instance = new SearchHistoryManager();
    }
    return SearchHistoryManager.instance;
  }

  /**
   * 获取搜索历史记录
   */
  public async getHistory(): Promise<string[]> {
    return [...this.searchHistory];
  }

  /**
   * 添加搜索历史记录
   * @param keyword 搜索关键词
   */
  public async addHistory(keyword: string): Promise<void> {
    if (!keyword || keyword.trim().length === 0) {
      return;
    }

    // 移除已存在的相同关键词
    this.searchHistory = this.searchHistory.filter(item => item !== keyword);
    
    // 添加到历史记录开头
    this.searchHistory.unshift(keyword);
    
    // 限制历史记录数量
    if (this.searchHistory.length > MAX_HISTORY_COUNT) {
      this.searchHistory = this.searchHistory.slice(0, MAX_HISTORY_COUNT);
    }
  }

  /**
   * 清除搜索历史记录
   */
  public async clearHistory(): Promise<void> {
    this.searchHistory = [];
  }

  /**
   * 删除特定搜索历史记录
   * @param keyword 搜索关键词
   */
  public async deleteHistory(keyword: string): Promise<void> {
    if (!keyword || keyword.trim().length === 0) {
      return;
    }

    this.searchHistory = this.searchHistory.filter(item => item !== keyword);
  }
}
