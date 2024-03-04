import { Canvas } from './Canvas';
import { HUD } from './HUD';
import { PDF} from './PDF';
import { useState } from 'react';
import './App.css';

function App() {

  const [hudDisplayed, showHud] = useState(false);
  const [currentChapter, setCurrentChapter] = useState("");

  return (
    <div className='App'>
      <HUD isHudDisplayed={hudDisplayed} chapterSelected={currentChapter}/>
      <Canvas isHudDisplayed={hudDisplayed} showHud={showHud} setChapter={setCurrentChapter}/>
      {currentChapter && (
        <PDF chapterSelected={currentChapter}/>
      )}
    </div>
  );
}

export default App;