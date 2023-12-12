import { useCallback, useEffect } from 'react';
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

  const initApp = useCallback(async () => {
    await SDK3DVerse.joinOrStartSession({
      userToken: publicToken,
      sceneUUID: mainSceneUUID,
      canvas: document.getElementById('display-canvas'),
      viewportProperties: {
        defaultControllerType: SDK3DVerse.controller_type.orbit,
      },
    });

    // await InitFirstPersonController(characterControllerSceneUUID);
  }, []);

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