<template>
  <div class="preview-container">
    <!-- 控制按钮 -->
    <div class="control-buttons" v-if="!isHidden && buttonShow">
      <button class="control-btn hide-btn" @click="toggleHide">
        隐藏
      </button>
    </div>

    <!-- 图表列表 -->
    <div class="chart-list" :class="{ 'chart-list-hidden': isHidden }">
      <div class="chart-item" :id="item.id" v-for="(item, index) in chartEditStore.componentList"
        :class="animationsClass(item.styles.animations)" :key="item.id" :style="{
          ...getComponentAttrStyle(item.attr, index),
          ...getTransformStyle(item.styles),
          ...getStatusStyle(item.status),
          ...getPreviewConfigStyle(item.preview),
          ...getBlendModeStyle(item.styles) as any,
          ...getSizeStyle(item.attr)
        }">
        <!-- 分组 -->
        <preview-render-group v-if="item.isGroup" :groupData="(item as CreateComponentGroupType)" :groupIndex="index"
          :themeSetting="themeSetting" :themeColor="themeColor"></preview-render-group>

        <!-- 单组件 -->
        <component v-else :is="item.chartConfig.chartKey" :id="item.id" :chartConfig="item" :themeSetting="themeSetting"
          :themeColor="themeColor" :style="{
            ...getSizeStyle(item.attr),
            ...getFilterStyle(item.styles)
          }" v-on="useLifeHandler(item)"></component>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, PropType, computed, onMounted } from 'vue'
import { useChartDataPondFetch } from '@/hooks'
import { ChartEditStorageType } from '../../index.d'
import { PreviewRenderGroup } from '../PreviewRenderGroup/index'
import { CreateComponentGroupType } from '@/packages/index.d'
import { chartColors } from '@/settings/chartThemes/index'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { animationsClass, getFilterStyle, getTransformStyle, getBlendModeStyle, colorCustomMerge } from '@/utils'
import { getSizeStyle, getComponentAttrStyle, getStatusStyle, getPreviewConfigStyle } from '../../utils'
import { useLifeHandler } from '@/hooks'

// 初始化数据池
const { initDataPond, clearMittDataPondMap } = useChartDataPondFetch()
const chartEditStore = useChartEditStore()

// 隐藏状态
const isHidden = ref(false)
// 控制按钮是否显示
const buttonShow = ref(true)

// 切换隐藏/显示
const toggleHide = () => {
  isHidden.value = !isHidden.value
  ue5('Complete')
}

// const props = defineProps({
//   localStorageInfo: {
//     type: Object as PropType<ChartEditStorageType>,
//     required: true
//   }
// })

// 主题色
const themeSetting = computed(() => {
  const chartThemeSetting = chartEditStore.editCanvasConfig.chartThemeSetting
  return chartThemeSetting
})

// 配置项
const themeColor = computed(() => {
  const colorCustomMergeData = colorCustomMerge(chartEditStore.editCanvasConfig.chartCustomThemeColorInfo)
  return colorCustomMergeData[chartEditStore.editCanvasConfig.chartThemeColor]
})

// 组件渲染结束初始化数据池
clearMittDataPondMap()
onMounted(() => {
  initDataPond(useChartEditStore)
  ue.interface.Play = () => {
    isHidden.value = false
    buttonShow.value = false
    console.log('Play');
    
  }
  ue.interface.Stop = () => {
    isHidden.value = true
    buttonShow.value = true
    console.log('Stop');
  }
})
</script>

<style lang="scss" scoped>
.preview-container {
  position: relative;
  width: 100%;
  height: 100%;
}

// 控制按钮
.control-buttons {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 9999;
}

.control-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
}

.hide-btn {
  background-color: #64748b;
  color: white;
}

.complete-btn {
  background-color: #3b82f6;
  color: white;
}

// 图表列表
.chart-list {
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease;
}

// 隐藏状态
.chart-list-hidden {
  opacity: 0;
  pointer-events: none;
}

.chart-item {
  position: absolute;
}
</style>
