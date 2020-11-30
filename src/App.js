import './App.css';
import { useRef, useEffect, useState } from 'react';

function App() {
  const canvas = useRef('canvas');
  const [columns, setColumns] = useState(15);
  const [rows, setRows] = useState(15);
  const [canvasWidth, setCanvasWidth] = useState(30);
  const [canvasHeight, setCanvasHeight] = useState(30);
  const [map, setMap] = useState([]);
  const [obstacleFrequency, setObstacleFrequency] = useState(0.3);

  class Node {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.neighbours = [];
      this.previous = null;
      this.imPassable = Math.random() < obstacleFrequency;
    }
  }

  function boardSetup() {
    for (let column of columns) {
      map.push([]);
      for (let row of rows) {
        map[column][row] = new Node(row, column);
      }
    }
  }
  useEffect(() => {
    canvas.getContext("2d");
    canvas.width = canvasWidth * columns;
    canvas.height = canvasHeight * rows;
    boardSetup();
  }, []);


  return (
    <div className="App">
      <canvas ref="canvas" id="canvas">

      </canvas>
    </div>
  );
}

export default App;
