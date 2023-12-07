import './Canvas.css';

export default function Canvas() {
  return (
    <div className="Canvas">
      <header className="Canvas-header">
        <div class="canvas-container">
        {/* <!-- CANVAS --> */}
        <canvas id="display-canvas" tabindex="1" oncontextmenu="event.preventDefault()"></canvas></div>

        <div class="hud-container">
        <h1 class="test">hello, ceci est un texte affiché par dessus le canvas de la scene 3Dverse</h1>
        </div>

        {/* <!-- SDK 3DVERSE --> */}
        <script src="https://cdn.3dverse.com/legacy/sdk/stable/SDK3DVerse.js"></script>

        {/* <!-- APP ENTRYPOINT --> */}
        <script src="./main.js" type="module"></script>
      </header>
    </div>
  );
}
