import './App.css';
import { Canvas } from './Canvas';
import { HUD } from './HUD';

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