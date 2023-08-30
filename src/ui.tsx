import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'

let isVisible: boolean = false

export const setupUI = () => {
  ReactEcsRenderer.setUiRenderer(() => (
    <UiEntity
      uiTransform={{
        width: '100%',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        display: isVisible ? 'flex' : 'none'
      }}
    >
      <UiEntity
        uiTransform={{
          width: 580,
          height: 90,
          margin: 10
        }}
        uiBackground={{
          textureMode: 'nine-slices',
          texture: {
            src: 'images/background.png'
          },
          textureSlices: {
            top: 0.2,
            bottom: 0.2,
            left: 0.2,
            right: 0.2
          }
        }}
        uiText={{ value: `Press 'E' to try it out, 'F' to put it down`, fontSize: 28, color: Color4.White() }}
      />
    </UiEntity>
  ))
}

export const showLabel = () => (isVisible = true)
export const hideLabel = () => (isVisible = false)
