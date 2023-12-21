import { Canvas } from './Canvas';
import { HUD } from './HUD';
import { useState } from 'react';
import './App.css';

function App() {

  const [hudDisplayed, showHud] = useState(false);

  return (
    <div className='App'>
      <HUD isHudDisplayed={hudDisplayed}/>
      <Canvas isHudDisplayed={hudDisplayed} showHud={showHud}/>
    </div>
  );
}

export default App;