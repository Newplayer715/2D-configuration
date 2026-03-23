<template>
  <n-space>
    <n-icon size="20" :depth="3">
      <fish-icon></fish-icon>
    </n-icon>
    <n-text @click="handleFocus">
      工作空间 -
      <n-button v-show="!focus" secondary size="tiny">
        <span class="title">
          {{ comTitle }}
        </span>
      </n-button>
    </n-text>

    <n-input v-show="focus" ref="inputInstRef" size="small" type="text" maxlength="16" show-count placeholder="请输入项目名称"
      v-model:value.trim="title" @keyup.enter="handleBlur" @blur="handleBlur"></n-input>
  </n-space>
</template>

<script setup lang="ts">
import { ref, nextTick, computed } from 'vue'
import { fetchRouteParamsLocation, setTitle } from '@/utils'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { EditCanvasConfigEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { icon } from '@/plugins'

const { FishIcon } = icon.ionicons5
const chartEditStore = useChartEditStore()

const focus = ref<boolean>(false)
const inputInstRef = ref(null)
const id = fetchRouteParamsLocation()
// 根据路由 id 参数获取项目信息
const fetchProhectInfoById = () => {
  if (id) {
    // 从本地存储中查找项目名称
    try {
      const localStorageInfo = JSON.parse(localStorage.getItem('GO_CHART_STORAGE_LIST') || '[]')
      const project = localStorageInfo.find((item: any) => item.id === id)
      console.log('project', project);
      if (project && project.editCanvasConfig && project.editCanvasConfig.projectName) {
        return project.editCanvasConfig.projectName
      }
    } catch (error) {
      console.error('从本地存储获取项目信息失败', error)
    }
  }
  return ''
}

const title = ref<string>(fetchProhectInfoById() || '')
const comTitle = computed(() => {
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  title.value = title.value.replace(/\s/g, '')
  const newTitle = title.value.length ? title.value : '新项目'
  setTitle(`工作空间-${newTitle}`)
  // chartEditStore.setEditCanvasConfig(EditCanvasConfigEnum.PROJECT_NAME, newTitle)
  return newTitle
}) 

const handleFocus = () => {
  focus.value = true
  nextTick(() => {
    inputInstRef.value && (inputInstRef.value as any).focus()
  })
}

const handleBlur = () => {
  focus.value = false
  const newTitle = comTitle.value
  // 更新本地存储中的项目名称
  if (id) {
    const localStorageInfo = JSON.parse(localStorage.getItem('GO_CHART_STORAGE_LIST') || '[]')
    const projectIndex = localStorageInfo.findIndex((item: any) => item.id === id)
    if (projectIndex !== -1) {
      localStorageInfo[projectIndex].editCanvasConfig.projectName = newTitle
      localStorage.setItem('GO_CHART_STORAGE_LIST', JSON.stringify(localStorageInfo))
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  padding-left: 5px;
  padding-right: 5px;
  font-size: 15px;
}
</style>
