<template>
  <collapse-item name="菜单绑定" :expanded="false">
    <setting-item-box name="绑定菜单1" :alone="true">
      <n-select v-model:value="menuBindData.menuId" placeholder="选择要绑定的菜单">
        <n-option v-for="menu in menuList" :key="menu.id" :value="menu.id">
          {{ menu.text }}
        </n-option>
      </n-select>
    </setting-item-box>
    <setting-item-box name="默认显示" :alone="true">
      <n-switch v-model:value="menuBindData.isDefaultShow" />
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { CollapseItem, SettingItemBox } from './index'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { option as menuTabOption } from '@/packages/components/Informations/Inputs/InputsMenuTab/config'

const props = defineProps({
  chartConfig: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:chartConfig'])

const chartEditStore = useChartEditStore()

// 菜单绑定数据
const menuBindData = ref({
  menuId: props.chartConfig.menuBind?.menuId || '',
  isDefaultShow: props.chartConfig.menuBind?.isDefaultShow || false
})
console.log(menuBindData.value,'menuBindData.value');


// 菜单列表
// const menuList = ref<any[]>([])
const menuList = ref([
        { id: '1', text: '菜单1' },
        { id: '2', text: '菜单2' },
        { id: '3', text: '菜单3' }
    ])

// 获取菜单列表
const getMenuList = () => {
  // 从 InputsMenuTab 的配置文件中获取默认的按钮列表
  menuList.value = menuTabOption.buttons as any[]
  
  // 同时从 chartEditStore 中获取所有菜单组件，更新菜单列表
  const components = chartEditStore.getComponentList
  const menus = components.filter(item => item.chartConfig.key === 'InputsMenuTab')
  
  if (menus.length > 0) {
    // 取第一个菜单组件的按钮列表
    menuList.value = menus[0].option.buttons || []
  }
}

// 监听菜单绑定数据变化
watch(
  menuBindData,
  (newData) => {
    emit('update:chartConfig', {
      ...props.chartConfig,
      menuBind: newData
    })
  },
  { deep: true }
)

// 监听组件列表变化，更新菜单列表
// watch(
//   () => chartEditStore.getComponentList,
//   () => {
//     getMenuList()
//   },
//   { deep: true }
// )

// onMounted(() => {
//   getMenuList()
// })
</script>