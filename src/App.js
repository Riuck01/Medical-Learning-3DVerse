import './App.css';
import { Canvas } from './Canvas';
import { HUD } from './HUD';
import { PDF } from './PDF';

function App() {
  return (
    <div className='App'>
      <HUD/>
      <Canvas/>
      <PDF/>
    </div>
  );
}

export default App;