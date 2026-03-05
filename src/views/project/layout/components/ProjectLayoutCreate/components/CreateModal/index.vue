<template>
  <n-modal v-model:show="showRef" class="go-create-modal" @afterLeave="closeHandle">
    <n-space size="large">
      <n-card class="card-box" hoverable>
        <template #header>
          <n-text class="card-box-tite"></n-text>
        </template>
        <template #header-extra>
          <n-text @click="closeHandle">
            <n-icon size="20">
              <component :is="CloseIcon"></component>
            </n-icon>
          </n-text>
         </template>
        <n-space class="card-box-content" vertical>
          <n-form ref="formRef" :model="formData" :rules="rules">
            <n-form-item label="项目名称" path="projectName">
              <n-input v-model:value="formData.projectName" placeholder="请输入项目名称" />
            </n-form-item>
          </n-form>
          <n-space class="card-box-content" justify="center">
            <n-button
              size="large"
              :disabled="item.disabled"
              v-for="item in typeList"
              :key="item.key"
              @click="btnHandle"
            >
              <component :is="item.title"></component>
              <template #icon>
                <n-icon size="18">
                  <component :is="item.icon"></component>
                </n-icon>
              </template>
            </n-button>
          </n-space>
        </n-space>
        <template #action></template>
      </n-card>
    </n-space>
  </n-modal>
</template>

<script lang="ts" setup>
import { ref, watch, shallowRef } from 'vue'
import { icon } from '@/plugins'
import { PageEnum, ChartEnum } from '@/enums/pageEnum'
import { fetchPathByName, routerTurnByPath, renderLang, getUUID } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'
import { ChartEditStoreEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'

const { FishIcon, CloseIcon } = icon.ionicons5
const { StoreIcon, ObjectStorageIcon } = icon.carbon
const showRef = ref(false)

const emit = defineEmits(['close'])
const props = defineProps({
  show: Boolean
})

const chartEditStore = useChartEditStore()

const formRef = ref()
const formData = ref({
  projectName: ''
})

const rules = {
  projectName: {
    required: true,
    message: '请输入项目名称',
    trigger: 'blur'
  }
}

const typeList = shallowRef([
  {
    title: renderLang('project.new_project'),
    key: ChartEnum.CHART_HOME_NAME,
    icon: FishIcon,
    disabled: false
  },
  {
    title: renderLang('project.my_template'),
    key: PageEnum.BASE_HOME_TEMPLATE_NAME,
    icon: ObjectStorageIcon,
    disabled: true
  },
  {
    title: renderLang('project.template_market'),
    key: PageEnum.BASE_HOME_TEMPLATE_MARKET_NAME,
    icon: StoreIcon,
    disabled: true
  }
])

watch(props, newValue => {
  showRef.value = newValue.show
})

// 关闭对话框
const closeHandle = () => {
  emit('close', false)
}

// 处理按钮点击
const btnHandle = async (key: string) => {
  try {
    await formRef.value?.validate()
    closeHandle()
    const id = getUUID()
    const path = fetchPathByName(ChartEnum.CHART_HOME_NAME, 'href')
    console.log(path + id, 'openNewWindow');
    
    // 保存项目信息到本地存储
    const projectInfo = {
      id: id,
      [ChartEditStoreEnum.EDIT_CANVAS_CONFIG]: {
        ...chartEditStore.getEditCanvasConfig,
        projectName: formData.value.projectName
      },
      [ChartEditStoreEnum.COMPONENT_LIST]: [],
      [ChartEditStoreEnum.REQUEST_GLOBAL_CONFIG]: chartEditStore.getRequestGlobalConfig
    }
    
    // 获取现有项目列表
    const existingProjects = JSON.parse(localStorage.getItem(StorageEnum.GO_CHART_STORAGE_LIST) || '[]')
    // 添加新项目
    existingProjects.push(projectInfo)
    // 保存到本地存储
    localStorage.setItem(StorageEnum.GO_CHART_STORAGE_LIST, JSON.stringify(existingProjects))
    console.log('项目信息已保存到本地存储', projectInfo)
    
    ue5('openNewWindow', path +'/' + id)
    routerTurnByPath(path, [id], undefined, true)
  } catch (error) {
    console.log('表单验证失败', error)
  }
}
</script>
<style lang="scss" scoped>
$cardWidth: 570px;

@include go('create-modal') {
  position: fixed;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  .card-box {
    width: $cardWidth;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0);
    @extend .go-transition;
    &:hover {
      @include hover-border-color('hover-border-color');
    }
    &-tite {
      font-size: 14px;
    }
    &-content {
      padding: 0px 10px;
      width: 100%;
    }
  }
}
</style>
