import { Animator, engine, Entity, GltfContainer, Transform, TransformType } from '@dcl/sdk/ecs'

export class Vase {
  private readonly explosionAnimation = 'Animation'
  private entity: Entity

  constructor(transform: Partial<TransformType>) {
    const vase = engine.addEntity()
    GltfContainer.create(vase, { src: 'models/vase.glb' })
    Transform.create(vase, { ...transform })

    this.entity = vase

    // Set up light and outline animations
    Animator.create(vase, {
      states: [
        {
          clip: this.explosionAnimation,
          playing: false,
          loop: false
        }
      ]
    })
  }

  explode = () => Animator.playSingleAnimation(this.entity, this.explosionAnimation)

  reset = () => Animator.stopAllAnimations(this.entity)
}
