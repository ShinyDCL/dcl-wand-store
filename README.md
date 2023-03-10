# Decentraland scene

This project contains wand store inspired by Ollivanders wand store from Harry Potter. Created for Sandstorm's Decentraland contest #7 - Movie Marathon.

Currently deployed under Decentraland name `Wizardry`. Follow <a href="https://ambientcg.com/view?id=Bricks052">this link </a> or type in the Decentraland chatbox `/changerealm wizardry.dcl.eth` to visit the scene.

![Wand store from outside](screenshots/store-outside.png)
![Wand store from inside](screenshots/store-inside1.png)
![Wand store from inside](screenshots/store-inside2.png)

## 3D models

All of the 3D models have been created by me, with the exception of default grass, Github and Twitter links, which are from Decentraland Builder.

Textures used in 3D models and their sources:

- Bricks for building: <a href="https://ambientcg.com/view?id=Bricks052">ambientCG</a>
- Pavement outside building: <a href="https://ambientcg.com/view?id=PavingStones115A">ambientCG</a>
- Wood planks for store floor: <a href="https://ambientcg.com/view?id=Planks003">ambientCG</a>
- Wood used for furniture/doors: <a href="https://ambientcg.com/view?id=Wood028">ambientCG</a>
- Wood used for wands generated using <a href="https://github.com/carson-katri/dream-textures">Dream Textures</a>
- Images used as textures for wand boxes, paper notes and books generated using <a href="https://www.midjourney.com/">Midjourney AI</a>

## Try it out

**Install the CLI**

Download and install the Decentraland CLI by running the following command:

```bash
npm i -g decentraland
```

**Previewing the scene**

Open this folder on the command line, then run:

```
dcl start
```

Any dependencies are installed and then the CLI opens the scene in a new browser tab.

## Deploy to Decentraland

If you own any parcels of land in Decentraland, or have permissions to deploy to someone else's, you can publish this project.

1. Make sure the scene parcels in `scene.json` match those you own or have permissions on.
2. Run `dcl deploy` on the project folder
3. This will open a browser tab to confirm. Metamask will prompt you to sign.
   > Note: Make sure you are using the wallet that owns the parcels or has permissions.

### Deploy to a free server

If you don't own parcels in Decentraland or are not ready to publish your scene to the world, you can share your creations by uploading your scenes to a free hosting service.

See [Upload a preview](https://docs.decentraland.org/development-guide/deploy-to-now/) for instructions on how to do this.

## Resources

Learn more about how to build your own scenes in our [documentation](https://docs.decentraland.org/) site.

Find more example scenes, tutorials and helper libraries in the [Awesome Repository](https://github.com/decentraland-scenes/Awesome-Repository).

If you need any help, join [Decentraland's Discord](https://dcl.gg/discord), where you'll find a vibrant community of other creators who are eager to help. You're sure to find help in the #SDK support channel.

## Copyright info

This scene is protected with a standard Apache 2 licence. See the terms and conditions in the [LICENSE](/LICENSE) file.
