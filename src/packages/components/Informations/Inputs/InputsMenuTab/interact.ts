import { InteractEventOn, InteractActionsType } from '@/enums/eventEnum'

// 菜单组组件交互类型
export enum ComponentInteractEventEnum {
    CLICK = 'click'
}

// 联动参数
export enum ComponentInteractParamsEnum {
    BUTTON_ID = 'buttonId',
    BUTTON_TEXT = 'buttonText'
}

// 定义组件触发回调事件
export const interactActions: InteractActionsType[] = [
    {
        interactType: InteractEventOn.CLICK,
        interactName: '菜单点击',
        componentEmitEvents: {
            [ComponentInteractEventEnum.CLICK]: [
                {
                    value: ComponentInteractParamsEnum.BUTTON_ID,
                    label: '菜单ID'
                },
                {
                    value: ComponentInteractParamsEnum.BUTTON_TEXT,
                    label: '菜单文本'
                }
            ]
        }
    }
]