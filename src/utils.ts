import { AudioSource, Entity, Transform, TransformType } from '@dcl/sdk/ecs'

export const updateTransform = (entity: Entity, newTransform: Partial<TransformType>) => {
  const transform = Transform.getMutable(entity)
  if (newTransform.position) transform.position = newTransform.position
  if (newTransform.rotation) transform.rotation = newTransform.rotation
  if (newTransform.scale) transform.scale = newTransform.scale
  if (newTransform.parent) transform.parent = newTransform.parent
}

export const playSound = (entity: Entity) => {
  const audioSource = AudioSource.getMutable(entity)
  audioSource.playing = true
}
