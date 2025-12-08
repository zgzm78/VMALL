# 基于WaterFlow容器实现瀑布流布局功能

### 简介

基于WaterFlow容器，实现瀑布流布局。

<img src='./screenshots/device/waterflow.webp' width=320>

### 相关概念

- WaterFlow：瀑布流容器，由“行”和“列”分割的单元格所组成，通过容器自身的排列规则，将不同大小的“项目”自上而下，如瀑布般紧密布局。
- FlowItem：瀑布流容器的子组件。
- LazyForEach：LazyForEach从提供的数据源中按需迭代数据，并在每次迭代过程中创建相应的组件。当LazyForEach在滚动容器中使用了，框架会根据滚动容器可视区域按需创建组件，当组件划出可视区域外时，框架会进行组件销毁回收以降低内存占用。

### 相关权限

不涉及

### 使用说明

1. 启动应用，上下滑动瀑布流展示区域，展示瀑布流布局。

### 约束与限制

1. 本示例仅支持标准系统上运行，支持设备：华为手机。
2. HarmonyOS系统：HarmonyOS 5.0.5 Release及以上。
3. DevEco Studio版本：DevEco Studio 6.0.0 Release及以上。
4. HarmonyOS SDK版本：HarmonyOS 6.0.0 Release SDK及以上。
