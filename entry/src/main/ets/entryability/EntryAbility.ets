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

import { UIAbility } from '@kit.AbilityKit';
import { window } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';
import Logger from '../common/utils/Logger';

/**
 * Lift cycle management of Ability.
 */
export default class EntryAbility extends UIAbility {
  onWindowStageCreate(windowStage: window.WindowStage): void {
    // Main window is created, set main page for this ability
    windowStage.loadContent('pages/HomePage', (err, data) => {
      if (err.code) {
        Logger.error('Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
        return;
      }
      Logger.info('Succeeded in loading the content. Data: %{public}s', JSON.stringify(data) ?? '');

      try {
        let windowClass: window.Window = windowStage.getMainWindowSync();
        let isLayoutFullScreen = true;
        windowClass.setWindowLayoutFullScreen(isLayoutFullScreen).then(() => {
          Logger.info('EntryAbility', 'Succeeded in setting the window layout to full-screen mode.');
        }).catch((err: BusinessError) => {
          Logger.error('EntryAbility',
            `Failed to set the window layout to full-screen mode. Code is ${err.code}, message is ${err.message}`);
        });

        let type = window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR;
        let avoidArea = windowClass.getWindowAvoidArea(type);
        let bottomRectHeight = avoidArea.bottomRect.height;
        AppStorage.setOrCreate('bottomRectHeight', bottomRectHeight);

        type = window.AvoidAreaType.TYPE_SYSTEM;
        avoidArea = windowClass.getWindowAvoidArea(type);
        let topRectHeight = avoidArea.topRect.height;
        AppStorage.setOrCreate('topRectHeight', topRectHeight);

        // Initialize selected category index (0: 首页)
        AppStorage.setOrCreate('selectedCategoryIndex', 0);
        // Initialize search keyword
        AppStorage.setOrCreate('searchKeyword', '');
      } catch (error) {
        Logger.error('EntryAbility',
          `Failed to set the window layout to full-screen mode. Code is ${err.code}, message is ${err.message}`);
      }
    });
  }
}