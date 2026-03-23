import cloneDeep from 'lodash/cloneDeep'
import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'
import { COMPONENT_INTERACT_EVENT_KET } from '@/enums/eventEnum'
import { interactActions, ComponentInteractEventEnum } from './interact'
import { MenuTabConfig } from "./index"

export const option = {
    // 菜单组组件交互类型
    [COMPONENT_INTERACT_EVENT_KET]: ComponentInteractEventEnum.CLICK,
    // 菜单组数据
    buttons: [
        { id: '1', text: '菜单1' },
        { id: '2', text: '菜单2' },
        { id: '3', text: '菜单3' }
    ],
    // 菜单间距
    spacing: 30,
    // 暴露配置内容给用户
    dataset: ""
}

export default class Config extends PublicConfigClass implements CreateComponentType {
    public key = MenuTabConfig.key
    public attr = { ...chartInitConfig, w: 300, h: 40, zIndex: -1 }
    public chartConfig = cloneDeep(MenuTabConfig)
    public interactActions = interactActions
    public option = cloneDeep(option)
}