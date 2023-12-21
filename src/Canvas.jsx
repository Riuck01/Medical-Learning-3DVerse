import React, { useCallback, useEffect, useState } from 'react';
import { useScript } from '@uidotdev/usehooks';
import {
  publicToken,
  mainSceneUUID,
  characterControllerSceneUUID,
} from "./config.js";

export const Canvas = () => {
  const status = useScript(
    `https://cdn.3dverse.com/legacy/sdk/latest/SDK3DVerse.js`,
    {
      removeOnUnmount: false,
    }
  );

  const [linkedSceneEntity, setLinkedSceneEntity] = useState(null);
  const [linkedSceneEntity2, setLinkedSceneEntity2] = useState(null);
  const [placingElement, setPlacingElement] = useState(false);

  const initApp = useCallback(async () => {
    await SDK3DVerse.startSession({
      userToken: publicToken,
      sceneUUID: mainSceneUUID,
      canvas: document.getElementById('display-canvas'),
      createDefaultCamera: false,
      startSimulation: "on-assets-loaded",
      viewportProperties: {
        defaultControllerType: SDK3DVerse.controller_type.orbit,
      },
    }).then(async () => {
      await InitFirstPersonController(characterControllerSceneUUID);
    });
  }, []);

  async function InitFirstPersonController(charCtlSceneUUID) {
    const playerTemplate = new SDK3DVerse.EntityTemplate();
    playerTemplate.attachComponent("scene_ref", { value: charCtlSceneUUID });
    const parentEntity = null;
    const deleteOnClientDisconnection = true;
    const playerSceneEntity = await playerTemplate.instantiateTransientEntity(
      "Player",
      parentEntity,
      deleteOnClientDisconnection
    );

    const firstPersonController = (await playerSceneEntity.getChildren())[0];
    const children = await firstPersonController.getChildren();
    const firstPersonCamera = children.find((child) =>
      child.isAttached("camera")
    );

    SDK3DVerse.engineAPI.assignClientToScripts(firstPersonController);
    SDK3DVerse.setMainCamera(firstPersonCamera);
  }

  const handleToggleScene = async () => {
    if (linkedSceneEntity) {
      await SDK3DVerse.engineAPI.deleteEntities([linkedSceneEntity], [linkedSceneEntity2]);
      setLinkedSceneEntity(null);
      setPlacingElement(false);
      await SDK3DVerse.engineAPI.deleteEntities([linkedSceneEntity2]);
      setLinkedSceneEntity2(null);
      setPlacingElement(false);
    } else {
      setLinkedSceneEntity(await spawnSceneLinker({ position: [-6.200027, 1.195431, -2.294269] }));
      setLinkedSceneEntity2(await spawnSceneLinker({ position: [2.053556, 1.148622, -7.25245] }));
      setPlacingElement(true);
    }
  };

  const handleToggleScene2 = async () => {
    if (linkedSceneEntity) {
      await SDK3DVerse.engineAPI.deleteEntities([linkedSceneEntity]);
      setLinkedSceneEntity(null);
      setPlacingElement(false);
    } else {
      setLinkedSceneEntity(await spawnSceneLinker2({ position: [-6.200027, 1.195431, -2.294269] }));
      setLinkedSceneEntity2(await spawnSceneLinker2({ position: [2.053556, 1.148622, -7.25245] }));
      setPlacingElement(true);
    }
  };

  const handleToggleScene3 = async () => {
    if (linkedSceneEntity) {
      await SDK3DVerse.engineAPI.deleteEntities([linkedSceneEntity]);
      setLinkedSceneEntity(null);
      setPlacingElement(false);
    } else {
      setLinkedSceneEntity(await spawnSceneLinker3({ position: [-6.200027, 1.195431, -2.294269] }));
      setLinkedSceneEntity2(await spawnSceneLinker3({ position: [2.053556, 1.148622, -7.25245] }));
      setPlacingElement(true);
    }
  };
  

  const sceneToLinkUUID = '9e577f34-dcb3-4d84-8517-bfa3d3069029';
  const sceneToLinkUUID2 = '797641f9-b0ed-4cba-bad1-4bef7f62e6a0';
  const sceneToLinkUUID3 = '79b59f1c-8d82-43f9-8853-49a2d1a9b433';

  const spawnSceneLinker = async function (sceneTransform, options = {}) {
    const {
      parentEntity = null,
      deleteOnClientDisconnection = true
    } = options;

    let template = new SDK3DVerse.EntityTemplate();

    // Ajouter une référence de scène et une transformation locale
    template.attachComponent('scene_ref', { value: sceneToLinkUUID });
    template.attachComponent('local_transform', sceneTransform);

    const entity = await template.instantiateTransientEntity("linked scene name", parentEntity, deleteOnClientDisconnection);
    return entity;
  };

  const spawnSceneLinker2 = async function (sceneTransform, options = {}) {
    const {
      parentEntity = null,
      deleteOnClientDisconnection = true
    } = options;

    let template = new SDK3DVerse.EntityTemplate();

    // Ajouter une référence de scène et une transformation locale
    template.attachComponent('scene_ref', { value: sceneToLinkUUID2 });
    template.attachComponent('local_transform', sceneTransform);

    const entity = await template.instantiateTransientEntity("linked scene name", parentEntity, deleteOnClientDisconnection);
    return entity;
  };

  const spawnSceneLinker3 = async function (sceneTransform, options = {}) {
    const {
      parentEntity = null,
      deleteOnClientDisconnection = true
    } = options;

    let template = new SDK3DVerse.EntityTemplate();

    // Ajouter une référence de scène et une transformation locale
    template.attachComponent('scene_ref', { value: sceneToLinkUUID3 });
    template.attachComponent('local_transform', sceneTransform);

    const entity = await template.instantiateTransientEntity("linked scene name", parentEntity, deleteOnClientDisconnection);
    return entity;
  };



  useEffect(() => {
    if (status === 'ready') {
      initApp();
    }
  }, [status]);

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
      <button onClick={handleToggleScene}>
        {placingElement ? 'Cancel Placement' : 'Place Element'}
      </button>
      <button onClick={handleToggleScene}>
        {placingElement ? 'Cancel Placement' : 'Place Element'}
      </button>
      <button onClick={handleToggleScene}>
        {placingElement ? 'Cancel Placement' : 'Place Element'}
      </button>
    </>
  );
};
