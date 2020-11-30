import './App.scss';
import { useCallback, useEffect, useState } from 'react';

function App() {
  const [columns, setColumns] = useState(15);
  const [rows, setRows] = useState(15);
  const [maxCols, maxRows] = [50, 50];
  const [cellWidth, setCellWidth] = useState(20);
  const [cellHeight, setCellHeight] = useState(20);
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

  const mapSetup = useCallback(() => {
    const mapToBe = [];
    for (let column = 0; column < columns; column++) {
      mapToBe.push([]);
      for (let row = 0; row < rows; row++) {
        mapToBe[column][row] = new Node(row, column);
      }
    }
    setMap(mapToBe);
  }, [columns, rows]);

  useEffect(() => {
    mapSetup();
  }, [columns, rows]);


  return (
    <div className="App">
      <label>
        Map Columns:
        <select value={columns} onChange={(e) => setColumns(e.target.value)}>
          {Array.from(Array(maxCols).keys()).map((val, idx) => {
            return (
              <option key={`col-dropdown-${idx}`} value={idx + 1}>
                {idx + 1}
              </option>
            );
          })}
        </select>
      </label>
      <label>
        Map Rows:
        <select value={rows} onChange={(e) => setRows(e.target.value)}>
          {Array.from(Array(maxRows).keys()).map((val, idx) => {
            return (
              <option key={`row-dropdown-${idx}`} value={idx + 1}>
                {idx + 1}
              </option>
            );
          })}
        </select>
      </label>
      <div id="map" style={{ height: "auto" }}>
        {map &&
          map.map((row, idx) => {
            return (
              <div className="column">
                {row[idx] &&
                  map[idx].map((cell) => {
                    return (
                      <>
                        <div
                          class={`cell ${cell.class}`}
                          style={{ height: cellHeight, width: cellWidth }}
                        ></div>
                      </>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
