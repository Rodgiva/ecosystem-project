import { useState, useEffect } from "react";
import { createNoise2D } from "simplex-noise";

let tiles = [];

const generateTiles = (width, height, freq = 1) => {
  const noise2D = createNoise2D();

  for (let y = 0; y < height; y++) {
    tiles.push([]);
    for (let x = 0; x < width; x++) {
      let val = 0;
      let frequency = freq;
      let amplitude = 1;

      for (let i = 0; i < 8; i++) {
        val +=
          noise2D((x * frequency) / width, (y * frequency) / height) *
          amplitude;

        frequency *= 2;
        amplitude /= 2;
      }

      tiles[y].push(val);
    }
  }
};

generateTiles(300, 300, 1);

const Game = (props) => {
  const [noise, setNoise] = useState([]);

  useEffect(() => {
    setNoise(tiles);
  }, []);

  const tileColor = (val) => {
    if (val < -0.45) {
      return "blue";
    } else if (val >= -0.45 && val < -0.25) {
      return "rgb(100,100,255)";
    } else if (val >= -0.25 && val < -0.15) {
      return "yellow";
    } else if (val >= -0.15 && val < 0.66) {
      return "rgb(0,192,0)";
    } else if (val >= 0.66 && val < 0.9) {
      return "grey";
    } else if (val >= 0.9) {
      return "white";
    }
  };

  return (
    <>
      {noise.map((y, i) => {
        return (
          <div>
            <br />
            {y.map((x, j) => (
              <div
                key={i + 1 + j}
                className="tile"
                style={{ backgroundColor: tileColor(x) }}
              ></div>
            ))}
          </div>
        );
      })}
    </>
  );
};

export default Game;
