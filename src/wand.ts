import {
  Animator,
  AudioSource,
  engine,
  Entity,
  GltfContainer,
  InputAction,
  pointerEventsSystem,
  Transform,
  TransformType
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'

import { playSound, updateTransform } from './utils'

export class Wand {
  private readonly lightAnimation = 'WandLight'
  private readonly outlineAnimation = 'WandOutline'
  private readonly transformRelativeToPlayer = {
    position: Vector3.create(0.4, 0.4, 0.5),
    rotation: Quaternion.fromEulerDegrees(45, 180, 0),
    parent: engine.PlayerEntity
  }

  private transform: Partial<TransformType>
  private entity: Entity

  constructor(transform: Partial<TransformType>, onClick: (wand: Wand) => void) {
    const wand = engine.addEntity()
    GltfContainer.create(wand, { src: 'models/wand.glb' })
    Transform.create(wand, { ...transform })

    this.entity = wand
    this.transform = { ...transform }

    // Set up light and outline animations
    Animator.create(wand, {
      states: [
        {
          clip: this.lightAnimation,
          playing: false,
          loop: false
        },
        {
          clip: this.outlineAnimation,
          playing: true,
          loop: true
        }
      ]
    })

    AudioSource.create(wand, {
      audioClipUrl: 'sounds/click.mp3',
      playing: false,
      loop: false
    })

    // Add interaction to wand
    pointerEventsSystem.onPointerDown(
      {
        entity: wand,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Pick up!'
        }
      },
      () => {
        onClick(this)
      }
    )
  }

  pickUp = () => {
    playSound(this.entity)
    // Stop animations and attach wand to avatar
    Animator.stopAllAnimations(this.entity, true)
    updateTransform(this.entity, this.transformRelativeToPlayer)
  }

  putDown = () => {
    playSound(this.entity)
    // Stop animations and detach from avatar
    Animator.stopAllAnimations(this.entity, true)
    updateTransform(this.entity, this.transform)
    // Start animation for emissive outline
    Animator.playSingleAnimation(this.entity, this.outlineAnimation)
  }

  lightUp = () => {
    Animator.playSingleAnimation(this.entity, this.lightAnimation)
  }
}
