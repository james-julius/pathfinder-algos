import './App.scss';
import { useCallback, useEffect, useState } from 'react';

function App() {
  const [columns, setColumns] = useState(15);
  const [rows, setRows] = useState(15);
  const [cellWidth, setCellWidth] = useState(30);
  const [cellHeight, setCellHeight] = useState(30);
  const [map, setMap] = useState([
    [0, 0, 0],
    [0, 0, 0]
  ]);
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

  const mapSetup = useCallback(() => {
    const mapToBe = [];
    for (let column = 0; column < columns; column++) {
      mapToBe.push([]);
      for (let row = 0; row < rows; row++) {
        mapToBe[column][row] = new Node(row, column);
      }
    }
    console.log('setting map to:' + mapToBe);
    setMap(mapToBe);
  }, []);

  useEffect(() => {
    mapSetup();
  }, []);


  return (
    <div className="App">
      <div id="map" style={{height: "auto"}}>
        {map && map.map((row, idx) => {
          return <div className="column">
            {row[idx] && map[idx].map((cell) => {
              return <>
                <div 
                  class={`cell ${cell.class}`} 
                  style={{height: cellHeight, width: cellWidth}}>
                </div>
              </>
            })}
          </div>
        })}
      </div>
    </div>
  );
}

export default App;
