import { useCallback, useEffect } from 'react';
import { useScript } from '@uidotdev/usehooks';
import {
    publicToken,
    mainSceneUUID,
    characterControllerSceneUUID,
  } from "./config.js";

export const Canvas = (props) => {
  const status = useScript(
    `https://cdn.3dverse.com/legacy/sdk/latest/SDK3DVerse.js`,
    {
      removeOnUnmount: false,
    }
  );
  
  const initApp = useCallback(async () => {
    // const playerBoundingBox = SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0].getTransform();
    
    window.hudDisplayed = false;
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
      console.log("session initalized");
      await InitFirstPersonController(characterControllerSceneUUID).then(
        console.log("character controler initialized")
      );
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

    const doorBoundingBox = (await SDK3DVerse.engineAPI.findEntitiesByEUID('b4f86ad3-47d3-48cf-9305-1b69f85800d7'))[0];
    
    SDK3DVerse.engineAPI.onEnterTrigger((player, door) =>
    {
      console.log("colision occured");
      if (door === doorBoundingBox)
      {
        props.props[1](!props.props[0]);
      }
    });
  }

  useEffect(() => {
    if (status === 'ready') {
      initApp();
    }
  }, [status, initApp]);

  return (
    <>
      <canvas
        id='display-canvas'
        style={{
          display: 'flex',
          height: '100vh',
          width: '100vw',
          verticalAlign: 'middle',
        }}
        tabIndex="1"
      ></canvas>
    </>
  );
};