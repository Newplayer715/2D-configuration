import { ref, onMounted } from 'vue'
import { goDialog } from '@/utils'
import { DialogEnum } from '@/enums/pluginEnum'
import { ChartList } from '../../..'
import { StorageEnum } from '@/enums/storageEnum'
// 数据初始化
export const useDataListInit = () => {
  const list = ref<ChartList>([])

  // 从本地存储加载数据
  const loadDataFromLocalStorage = () => {
    try {
      const localStorageInfo = JSON.parse(localStorage.getItem(StorageEnum.GO_CHART_STORAGE_LIST) || '[]')
      console.log('GO_CHART_STORAGE_LIST', localStorageInfo)

      // 转换为 ChartList 格式
      const chartList: ChartList = localStorageInfo.map((item: any) => ({
        id: item.id,
        title: item.editCanvasConfig?.projectName || '未命名项目',
        release: false, // 默认为未发布
        label: '我的项目' // 默认为我的项目
      }))

      list.value = chartList
    } catch (error) {
      console.error('从本地存储加载数据失败', error)
      list.value = []
    }
  }

  // 组件挂载时加载数据
  onMounted(() => {
    loadDataFromLocalStorage()
  })

  // 删除
  const deleteHandle = (cardData: any, index: number) => {
    goDialog({
      type: DialogEnum.DELETE,
      promise: true,
      onPositiveCallback: () =>
        new Promise(res => setTimeout(() => res(1), 1000)),
      promiseResCallback: (e: any) => {
        try {
          // 从本地存储中删除对应 id 的项目
          const existingProjects = JSON.parse(localStorage.getItem(StorageEnum.GO_CHART_STORAGE_LIST) || '[]')
          const updatedProjects = existingProjects.filter((item: any) => item.id !== cardData.id)
          localStorage.setItem(StorageEnum.GO_CHART_STORAGE_LIST, JSON.stringify(updatedProjects))
          ue5('deleteproject', { id: cardData.id,projectName:cardData.title })
          // 更新列表显示
          list.value.splice(index, 1)
          window.$message.success('删除成功')
        } catch (error) {
          console.error('删除项目失败', error)
          window.$message.error('删除失败，请重试')
        }
      }
    })
  }

  return {
    list,
    deleteHandle
  }
}
