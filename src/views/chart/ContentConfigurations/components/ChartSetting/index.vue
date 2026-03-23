<template>
  <div class="go-chart-configurations-setting" v-if="targetData">
    <!-- 名称 -->
    <name-setting :chartConfig="targetData.chartConfig"></name-setting>
    <!-- 尺寸 -->
    <size-setting :isGroup="targetData.isGroup" :chartAttr="targetData.attr"></size-setting>
    <!-- 位置 -->
    <position-setting :chartAttr="targetData.attr" :canvasConfig="chartEditStore.getEditCanvasConfig" />
    <!-- 滤镜 -->
    <styles-setting :isGroup="targetData.isGroup" :chartStyles="targetData.styles"></styles-setting>
    <!-- 菜单绑定 (菜单组件本身不需要) -->
    <menu-bind-setting v-if="targetData.chartConfig.key !== 'InputsMenuTab'" :chartConfig="targetData.chartConfig"></menu-bind-setting>
    <!-- 自定义配置项 -->
    <component :is="targetData.chartConfig.conKey" :optionData="targetData.option"></component>
  </div>
</template>

<script setup lang="ts">
import { NameSetting, PositionSetting, SizeSetting, StylesSetting, MenuBindSetting } from '@/components/Pages/ChartItemSetting'
import { useTargetData } from '../hooks/useTargetData.hook'
const { targetData, chartEditStore } = useTargetData()

</script>

<style lang="scss" scoped>
@include go('chart-configurations-setting') {
}
</style>
