import { Animator, Entity, GltfContainer, Transform, TransformType, engine } from '@dcl/sdk/ecs'

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
          name: this.explosionAnimation,
          clip: this.explosionAnimation,
          playing: false,
          loop: false
        }
      ]
    })
  }

  playExplosionAnimation = () => Animator.playSingleAnimation(this.entity, this.explosionAnimation)

  stopAnimations = () => Animator.stopAllAnimations(this.entity)
}
