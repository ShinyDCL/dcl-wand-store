import { getUserData, UserData } from '@decentraland/Identity';
import { InstructionsLabel } from './ui/instructionsLabel';
import {
  addAnimation,
  attachToAvatar,
  createEntity,
  createShape,
  detachFromAvatar,
} from './utils';

// Grass
createEntity(
  { position: new Vector3(56, 0, 56) },
  createShape('models/default/grass.glb')
);

// Wand store
const store = createEntity(
  { position: new Vector3(56, 0, 56) },
  createShape('models/wandStore.glb')
);

// Wands
const wandShape = createShape('models/wand.glb');
const wand1 = createEntity(
  {
    position: new Vector3(57.8, 1.27, 54.1),
    rotation: Quaternion.Euler(0, 340, 0),
  },
  wandShape
);
const wand1Transform = wand1.getComponent(Transform);
const wand2 = createEntity(
  {
    position: new Vector3(57.6, 1.27, 54),
    rotation: Quaternion.Euler(0, 190, 0),
  },
  wandShape
);
const wand2Transform = wand2.getComponent(Transform);

// Transform object for attaching wand to avatar
const attachTransform = new Transform({
  position: new Vector3(0.4, -0.7, 0.5),
  rotation: Quaternion.Euler(45, 180, 0),
});

// Get user data
let userData: UserData | null;
void executeTask(async () => {
  userData = await getUserData();
});

// Set up animations
const vaseExplosion = addAnimation('Animation', store);
addAnimation('WandLight', wand1);
const light = addAnimation('WandLight', wand2);

// Set up instructions label
const canvas = new UICanvas();
const texture = new Texture('images/background.png');
const instructionsLabel = new InstructionsLabel(
  canvas,
  texture,
  `Press 'E' to try it out, 'F' to put it down`
);

let currentWand: Entity | null = null;
const input = Input.instance;

// Subscribe to event when button E is pressed
input.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, false, () => {
  if (!currentWand) return;
  if (currentWand.uuid === wand1.uuid) vaseExplosion.play();
  if (currentWand.uuid === wand2.uuid) light.play();
});

// Subscribe to event when button F is pressed
input.subscribe('BUTTON_DOWN', ActionButton.SECONDARY, false, () => {
  if (!currentWand) return;
  if (currentWand.uuid === wand1.uuid) {
    vaseExplosion.stop();
    detachFromAvatar(wand1, wand1Transform);
  }
  if (currentWand.uuid === wand2.uuid) {
    light.stop();
    detachFromAvatar(wand2, wand2Transform);
  }

  instructionsLabel.hide();
  currentWand = null;
});

// Add interactions to wands
const addOnPointerDown = (wand: Entity) => {
  const onPointerDown = new OnPointerDown(
    () => {
      if (currentWand) return;
      currentWand = wand;
      attachToAvatar(wand, attachTransform, userData);
      instructionsLabel.show();
    },
    { hoverText: 'Pick up!', button: ActionButton.POINTER }
  );
  wand.addComponentOrReplace(onPointerDown);
};
addOnPointerDown(wand1);
addOnPointerDown(wand2);
