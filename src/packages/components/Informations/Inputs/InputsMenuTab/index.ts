import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const MenuTabConfig: ConfigType = {
    key: 'InputsMenuTab',
    chartKey: 'VInputsMenuTab',
    conKey: 'VCInputsMenuTab',
    title: '菜单组',
    category: ChatCategoryEnum.INPUTS,
    categoryName: ChatCategoryEnumName.INPUTS,
    package: PackagesCategoryEnum.INFORMATIONS,
    chartFrame: ChartFrameEnum.STATIC,
    image: 'menu_tab.png'
}