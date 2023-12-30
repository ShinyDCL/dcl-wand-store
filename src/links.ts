import { openExternalUrl } from '~system/RestrictedActions'

import { engine, Entity, GltfContainer, InputAction, pointerEventsSystem, Transform, TransformType } from '@dcl/sdk/ecs'

export enum LinkType {
  TWITTER = 'Twitter',
  GITHUB = 'Github',
  MUSIC = 'Music'
}

export const URLS: Record<LinkType, string> = {
  [LinkType.GITHUB]: 'https://github.com/ShinyDCL/dcl-wand-store',
  [LinkType.TWITTER]: 'https://twitter.com/ShinyDCL/status/1598760892962721792',
  [LinkType.MUSIC]:
    'https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/25486900035804141438897435195658448120910728073030870014422397475890002920924'
} as const

export const LINK_MODELS: Record<LinkType, string> = {
  [LinkType.GITHUB]: 'models/links/github.glb',
  [LinkType.TWITTER]: 'models/links/twitter.glb',
  [LinkType.MUSIC]: 'models/links/music.glb'
} as const

export const createLinkEntity = (transform: Partial<TransformType>, linkType: LinkType): Entity => {
  const entity = engine.addEntity()
  Transform.create(entity, transform)
  GltfContainer.create(entity, { src: LINK_MODELS[linkType] })

  pointerEventsSystem.onPointerDown({ entity, opts: { button: InputAction.IA_POINTER, hoverText: linkType } }, () => {
    openExternalUrl({ url: URLS[linkType] })
  })

  return entity
}

export const setupLinks = (parent: Entity): void => {
  createLinkEntity({ position: { x: 7, y: 1.3, z: 7 }, parent }, LinkType.GITHUB)
  createLinkEntity({ position: { x: 6, y: 1.3, z: 7 }, parent }, LinkType.TWITTER)
  createLinkEntity({ position: { x: 5, y: 1.3, z: 7 }, parent }, LinkType.MUSIC)
}
