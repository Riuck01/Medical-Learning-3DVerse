import { useCallback, useEffect } from 'react';
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
  
  const triggers = {}
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
        await InitFirstPersonController(characterControllerSceneUUID);

        await getAllLibraries();

        SDK3DVerse.engineAPI.onEnterTrigger((emitterEntity, triggerEntity) =>
        {
            console.log(emitterEntity, " entered trigger of ", triggerEntity);
            const parent = triggerEntity.getParent()
            if (parent) {
                for (const chap in triggers) {
                    console.log(parent.getEUID() === triggers[chap][0], parent.getEUID(), triggers[chap][0])
                    if (parent.getEUID() === triggers[chap][0])
                        triggers[chap][1] = true
                        setChapter(chap)
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
