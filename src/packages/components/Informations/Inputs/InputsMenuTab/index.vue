<template>
  <div class="menu-tab-container" :style="`width:${w}px;height:${h}px;`">
    <div class="menu-tab-buttons" :style="`gap: ${option.value.spacing}px;`">
      <n-button
        v-for="button in option.value.buttons"
        :key="button.id"
        type="default"
        @click="handleButtonClick(button)"
      >
        {{ button.text }}
      </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, toRefs, shallowReactive, watch } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useChartInteract } from '@/hooks'
import { InteractEventOn } from '@/enums/eventEnum'
import { ComponentInteractParamsEnum } from './interact'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
const option = shallowReactive({
  value: {
    buttons: props.chartConfig.option.buttons,
    spacing: props.chartConfig.option.spacing,
    dataset: props.chartConfig.option.dataset
  }
})

const handleButtonClick = (button: any) => {
  // 存储到联动数据
  useChartInteract(
      props.chartConfig,
      useChartEditStore,
      { 
        [ComponentInteractParamsEnum.BUTTON_ID]: button.id,
        [ComponentInteractParamsEnum.BUTTON_TEXT]: button.text
      },
      InteractEventOn.CLICK
  )
  
  // 控制绑定该菜单的元素显示隐藏
  const chartEditStore = useChartEditStore()
  const components = chartEditStore.getComponentList
  
  components.forEach((component, index) => {
    // 检查组件是否绑定了菜单
    if (component.chartConfig.menuBind) {
      const menuBind = component.chartConfig.menuBind
      // 如果绑定的是当前菜单，则根据菜单ID控制显示隐藏
      if (menuBind.menuId) {
        if (menuBind.menuId === button.id) {
          // 显示该组件
          component.status.hide = false
        } else {
          // 隐藏该组件
          component.status.hide = true
        }
      } else if (menuBind.isDefaultShow) {
        // 如果没有绑定菜单且设置了默认显示，则保持显示
        component.status.hide = false
      }
      // 更新组件列表
      chartEditStore.updateComponentList(index, component)
    }
  })
}

// 手动更新
watch(
    () => props.chartConfig.option,
    (newData: any) => {
      console.log(newData,'newData')
      option.value = newData
    },
    {
      immediate: true,
      deep: true
    }
)

</script>

<style lang="scss" scoped>
.menu-tab-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
}

.menu-tab-buttons {
  display: flex;
  align-items: center;
}
</style>