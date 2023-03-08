import { UserData } from '@decentraland/Identity';

export const createEntity = (
  transform: TransformConstructorArgs,
  shape: GLTFShape
): Entity => {
  const entity = new Entity();
  entity.addComponentOrReplace(new Transform(transform));
  entity.addComponentOrReplace(shape);

  engine.addEntity(entity);
  return entity;
};

export const createShape = (modelPath: string): GLTFShape => {
  const shape = new GLTFShape(modelPath);
  shape.withCollisions = true;
  shape.isPointerBlocker = true;
  shape.visible = true;

  return shape;
};

export const addAnimation = (
  clipTitle: string,
  entity: Entity
): AnimationState => {
  const animator = new Animator();
  const clip = new AnimationState(clipTitle, { looping: false });

  animator.addClip(clip);
  clip.stop();
  entity.addComponent(animator);

  return clip;
};

export const attachToAvatar = (
  entity: Entity,
  transform: Transform,
  userData: UserData | null
) => {
  if (userData?.userId) {
    const parent = new Entity();
    parent.addComponentOrReplace(
      new AttachToAvatar({
        avatarId: userData.userId,
        anchorPointId: AttachToAvatarAnchorPointId.NameTag,
      })
    );
    entity.addComponentOrReplace(transform);
    entity.setParent(parent);
    engine.addEntity(parent);
  }
};

export const detachFromAvatar = (entity: Entity, transform: Transform) => {
  const parent = entity.getParent();
  entity.setParent(null);
  entity.addComponentOrReplace(transform);

  if (parent) {
    engine.removeEntity(parent);
  }
};
