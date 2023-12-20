import { Canvas } from './Canvas';
import { HUD } from './HUD';
import { useState } from 'react';
import './App.css';

function App() {

  const [hudDisplayed, showHud] = useState(false);

  if (hudDisplayed)
  {
    return (
      <div className='App'>
        <HUD/>
        <Canvas props={[hudDisplayed, showHud]}/>
      </div>
    );
  }
  return (
    <div className='App'>
      <Canvas props={[hudDisplayed, showHud]}/>
    </div>
  );
}

export default App;