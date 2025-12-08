import UIAbility from "@ohos:app.ability.UIAbility";
import window from "@ohos:window";
import type { BusinessError as BusinessError } from "@ohos:base";
import Logger from "@bundle:com.huawei.waterflow/entry/ets/common/utils/Logger";
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
                    Logger.error('EntryAbility', `Failed to set the window layout to full-screen mode. Code is ${err.code}, message is ${err.message}`);
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
            }
            catch (error) {
                Logger.error('EntryAbility', `Failed to set the window layout to full-screen mode. Code is ${err.code}, message is ${err.message}`);
            }
        });
    }
}
