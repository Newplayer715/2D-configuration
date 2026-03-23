<template>
  <collapse-item name="菜单组配置" :expanded="true">
    <!-- 统一间距设置 -->
    <setting-item-box name="菜单间距" :alone="true">
      <div style="display: flex; gap: 16px; align-items: center;">
        <n-input-number v-model:value="optionData.spacing" placeholder="请输入间距" :min="0" />
        <n-text>px</n-text>
      </div>
    </setting-item-box>
    
    <!-- 菜单列表 -->
    <div v-for="(button, index) in optionData.buttons" :key="button.id" style="margin-bottom: 16px;">
      <setting-item-box :name="`菜单 ${Number(index) + 1}`" :alone="true">
        <div style="display: flex; gap: 16px; align-items: flex-start;">
          <!-- 菜单文本 -->
          <div style="flex: 1;">
              <n-input v-model:value="button.text" placeholder="请输入菜单文本" />
          </div>
          <!-- 操作菜单 -->
          <div style="display: flex; gap: 8px; align-items: flex-start; margin-top: 4px;">
            <n-button text size="small" @click="removeButton(Number(index))" :disabled="optionData.buttons.length <= 1">
              <template #icon>
                <n-icon>
                  <TrashIcon />
                </n-icon>
              </template>
            </n-button>
          </div>
        </div>
      </setting-item-box>
    </div>
    
    <!-- 添加菜单 -->
    <setting-item-box  :alone="true">
      <n-button type="primary" @click="addButton()">
        <template #icon>
          <n-icon>
            <AddIcon />
          </n-icon>
        </template>
        添加菜单
      </n-button>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue'
import { CollapseItem, SettingItemBox } from '@/components/Pages/ChartItemSetting'
import { option } from './config'
import { icon } from '@/plugins'

const { AddIcon, TrashIcon } = icon.ionicons5

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})


// 添加菜单
const addButton = (index?: number) => {
  const newButton = {
    id: Date.now().toString(),
    text: `菜单${props.optionData.buttons.length + 1}`
  }
  
  if (index !== undefined) {
    props.optionData.buttons.splice(index, 0, newButton)
  } else {
    props.optionData.buttons.push(newButton)
  }
}

// 删除菜单
const removeButton = (index: number) => {
  props.optionData.buttons.splice(index, 1)
}
</script>