import React, { useCallback, useEffect, useState } from 'react';
import { useScript } from '@uidotdev/usehooks';
import {
  publicToken,
  mainSceneUUID,
  characterControllerSceneUUID,
} from "./config.js";

export const Canvas = ({isHudDisplayed, showHud, setChapter}) => {
  const status = useScript(
	`https://cdn.3dverse.com/legacy/sdk/latest/SDK3DVerse.js`,
	{
	  removeOnUnmount: false,
	}
  );

  const [linkedSceneEntity, setLinkedSceneEntity] = useState(null);
  const [linkedSceneEntity2, setLinkedSceneEntity2] = useState(null);
  const [placingElement, setPlacingElement] = useState(false);
  
  const triggers = {}
  const initApp = useCallback(async () => {
	// const playerBoundingBox = SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0].getTransform();

	const canvas = document.getElementById("display-canvas");

	canvas.addEventListener('mousedown', () => setFPSCameraController(canvas));
	
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
		await InitFirstPersonController(characterControllerSceneUUID);

		await getAllLibraries();

		SDK3DVerse.engineAPI.onEnterTrigger((emitterEntity, triggerEntity) =>
		{
			console.log(emitterEntity, " entered trigger of ", triggerEntity);
			const parent = triggerEntity.getParent()
			if (parent) {
				for (const chap in triggers) {
					console.log(parent.getEUID() === triggers[chap][0], parent.getEUID(), triggers[chap][0])
					if (parent.getEUID() === triggers[chap][0]) {
						triggers[chap][1] = true
						setChapter(chap)
					}
				}
			}
		});

		SDK3DVerse.engineAPI.onExitTrigger((emitterEntity, triggerEntity) =>
		{
			console.log(emitterEntity, " exited trigger of ", triggerEntity);
			const parent = triggerEntity.getParent()
			if (parent) {
				for (const chap in triggers) {
					if (parent.getEUID() === triggers[chap][0])
						triggers[chap][1] = false
				}
			}
			if (!isInLibTriggers(emitterEntity))
			  setChapter("")
		});

		function update()
		{

		}
		SDK3DVerse.notifier.on('onFramePreRender', update);

		document.getElementById("display-canvas").addEventListener("mousedown", async (e) => {
			console.log("clicked", e)

			const object = (await SDK3DVerse.engineAPI.castScreenSpaceRay(e.screenX, e.screenY, false, false, true)).entity
			console.log(object, object !== null)
			if (object !== null) {
				if (object.hasParent()) {
					let parent = object.getParent()

					console.log(parent.getName())
					while (!parent.getName().startsWith("biblio")) {
						if (parent.hasParent()) {
							parent = parent.getParent()
							console.log(parent.getName())
						} else {
							parent = null
							break
						}
					}

					console.log("We finally got this: "+parent)
					if (parent !== null) {
						let id = parent.getName().match(/biblio #\[(.*)\]/)[1]
						console.log(id, triggers[id], triggers[id] !== undefined && triggers[id][1] === true)
						if (id !== null && triggers[id] !== undefined && triggers[id][1] === true) {
							console.log("Changing "+triggers[id])
							//setChapter(id)
						}
						console.log(parent.getName(), parent.getName().match(/biblio #\[(.*)\]/)[1])
					}
				}
			}
		})
	})
  }, []);

  //------------------------------------------------------------------------------
  async function setFPSCameraController(canvas){
	// Remove the required click for the LOOK_LEFT, LOOK_RIGHT, LOOK_UP, and 
	// LOOK_DOWN actions.
	SDK3DVerse.actionMap.values["LOOK_LEFT"][0] = ["MOUSE_AXIS_X_POS"];
	SDK3DVerse.actionMap.values["LOOK_RIGHT"][0] = ["MOUSE_AXIS_X_NEG"];
	SDK3DVerse.actionMap.values["LOOK_DOWN"][0] = ["MOUSE_AXIS_Y_NEG"];
	SDK3DVerse.actionMap.values["LOOK_UP"][0] = ["MOUSE_AXIS_Y_POS"];
	SDK3DVerse.actionMap.propagate();

	// Lock the mouse pointer.
	canvas.requestPointerLock = (
	  canvas.requestPointerLock 
	  || canvas.mozRequestPointerLock 
	  || canvas.webkitPointerLockElement
	);
	canvas.requestPointerLock();
  };

  async function getAllLibraries() {
	const scene = (await SDK3DVerse.engineAPI.findEntitiesByEUID("7643ab3f-d337-48cc-9475-e02b7aa9c49a"))[0];

	const children = await scene.getChildren()

	const biblios = children.filter((child) =>
		child.getName().startsWith("biblio")// && child.isAttached('physics_material')
	)

	for (const biblio of biblios) {
		const hasTrigger = (await biblio.getChildren()).find((child) =>
			child.getName() === "pdf-trigger" && child.isAttached('physics_material') && child.isAttached("box_geometry")
		);
		
		if (hasTrigger) {
			triggers[biblio.getName().match(/biblio #\[(.*)\]/)[1]] = [biblio.getEUID(), false];
		}
	}

	console.log(triggers)
  }
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

	const doorBoundingBox = (await SDK3DVerse.engineAPI.findEntitiesByEUID('b4f86ad3-47d3-48cf-9305-1b69f85800d7'))[0];
	
	SDK3DVerse.engineAPI.onEnterTrigger((player, door) =>
	{
	  console.log("colision occured");
	  if (door === doorBoundingBox)
	  {
		console.log(isHudDisplayed);
		showHud(true);
	  }
	});

	SDK3DVerse.engineAPI.onExitTrigger((player, door) =>
	{
	  console.log("colision exitted");
	  if (door === doorBoundingBox)
	  {
		console.log(isHudDisplayed);
		showHud(false);
	  }
	});
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

  function isInLibTriggers(entity)
  {
	for (const chap in triggers) {
		if (triggers[chap][1] === true)
			return true
	}
	return false
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
