import { setUpWands } from './setUpWands';
import { createEntity, createShape } from './utils';

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
const wand2 = createEntity(
  {
    position: new Vector3(57.6, 1.27, 54),
    rotation: Quaternion.Euler(0, 190, 0),
  },
  wandShape
);

// Github link
const githubLink = createEntity(
  { position: new Vector3(62, 1.3, 65) },
  createShape('models/default/githubLink.glb')
);
githubLink.addComponent(
  new OnPointerDown(
    () => openExternalURL('https://github.com/ShinyDCL/wand-store'),
    { hoverText: 'Github' }
  )
);

// Twitter link
const twitterLink = createEntity(
  { position: new Vector3(61, 1.3, 65) },
  createShape('models/default/twitterLink.glb')
);
twitterLink.addComponent(
  new OnPointerDown(
    () =>
      openExternalURL(
        'https://twitter.com/ShinyDCL/status/1598760892962721792'
      ),
    { hoverText: 'Twitter' }
  )
);

setUpWands(store, wand1, wand2);
