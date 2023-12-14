import { useCallback, useEffect } from 'react';
import { useScript } from '@uidotdev/usehooks';
import {
    publicToken,
    mainSceneUUID,
    characterControllerSceneUUID,
  } from "./config.js";
import { VideoPlayer, importCssRenderer } from './VideoPlayer';


export const Canvas = () => {
  const status = useScript(
    `https://cdn.3dverse.com/legacy/sdk/latest/SDK3DVerse.js`,
    {
      removeOnUnmount: false,
    }
  );

  const status_three = useScript(
    `https://cdn.3dverse.com/legacy/sdk/stable/SDK3DVerse_ThreeJS_Ext.js`,
    {
      removeOnUnmount: false,
    }
  );

  const initApp = useCallback(async () => {
    await SDK3DVerse.joinOrStartSession({
      userToken: publicToken,
      sceneUUID: mainSceneUUID,
      canvas: document.getElementById('display-canvas'),
      createDefaultCamera: false,
      startSimulation: "on-assets-loaded",
      viewportProperties: {
        defaultControllerType: SDK3DVerse.controller_type.orbit,
      },
    }).then(async () => {
      //await SDK3DVerse.installExtension(SDK3DVerse_ThreeJS_Ext);

      const playerEntity = await SDK3DVerse.engineAPI.findEntitiesByNames("Player")

      const videoPlayer = new VideoPlayer(playerEntity);
      window.sampleApp = { videoPlayer };
      await videoPlayer.initialize();
      await InitFirstPersonController(characterControllerSceneUUID);
    })
  }, []);

  async function InitFirstPersonController(charCtlSceneUUID) {
    // To spawn an entity we need to create an EntityTempllate and specify the
    // components we want to attach to it. In this case we only want a scene_ref
    // that points to the character controller scene.
    const playerTemplate = new SDK3DVerse.EntityTemplate();
    playerTemplate.attachComponent("scene_ref", { value: charCtlSceneUUID });
  
    // Passing null as parent entity will instantiate our new entity at the root
    // of the main scene.
    const parentEntity = null;
    // Setting this option to true will ensure that our entity will be destroyed
    // when the client is disconnected from the session, making sure we don't
    // leave our 'dead' player body behind.
    const deleteOnClientDisconnection = true;
    // We don't want the player to be saved forever in the scene, so we
    // instantiate a transient entity.
    // Note that an entity template can be instantiated multiple times.
    // Each instantiation results in a new entity.
    const playerSceneEntity = await playerTemplate.instantiateTransientEntity(
      "Player",
      parentEntity,
      deleteOnClientDisconnection
    );
  
    // The character controller scene is setup as having a single entity at its
    // root which is the first person controller itself.
    const firstPersonController = (await playerSceneEntity.getChildren())[0];
    // Look for the first person camera in the children of the controller.
    const children = await firstPersonController.getChildren();
    const firstPersonCamera = children.find((child) =>
      child.isAttached("camera")
    );
  
    // We need to assign the current client to the first person controller
    // script which is attached to the firstPersonController entity.
    // This allows the script to know which client inputs it should read.
    SDK3DVerse.engineAPI.assignClientToScripts(firstPersonController);
  
    // Finally set the first person camera as the main camera.
    SDK3DVerse.setMainCamera(firstPersonCamera);
  }

  useEffect(() => {
    console.log(status, status_three)
    if (status === 'ready' && status_three === 'ready') {
      initApp();
    }
  }, [status, status_three]);

  return (
    <>
      <canvas
        id='display-canvas'
        style={{
          posistion: 'absolute',
          height: '100vh',
          width: '100vw',
          verticalAlign: 'middle',
        }}
        tabIndex="1"
      ></canvas>
    </>
  );
};