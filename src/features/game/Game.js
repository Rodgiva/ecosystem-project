import { useState, useEffect } from "react";
import { createNoise2D } from "simplex-noise";

let tiles = [];
const width = 600;
const height = 300;

const pxlWidth = 1200 / width;
const pxlHeight = 600 / height;

const generateTiles = (width, height, freq = 1, contrast = 1, shift = 0) => {
  const noise2D = createNoise2D();

  for (let y = 0; y < height; y++) {
    tiles.push([]);
    for (let x = 0; x < width; x++) {
      let val = 0;
      let frequency = freq;
      let amplitude = 1;

      for (let i = 0; i < 8; i++) {
        val +=
          noise2D(
            (y * frequency * width) / height / width,
            (x * frequency) / height
          ) * amplitude;

        frequency *= 2;
        amplitude /= 2;
      }

      val *= contrast;

      val += shift;

      if (val > 1) {
        val = 1;
      } else if (val < -1) {
        val = -1;
      }

      tiles[y].push(val);
    }
  }
};

generateTiles(width, height, 2, 0.85, 0);

const Game = (props) => {
  const [noise, setNoise] = useState([]);

  useEffect(() => {
    setNoise(tiles);
  }, []);

  const tileColor = (val) => {
    if (val < -0.45) {
      return "blue";
    } else if (val >= -0.45 && val < -0.25) {
      return "rgb(64,92,255)";
    } else if (val >= -0.25 && val < -0.15) {
      return "yellow";
    } else if (val >= -0.15 && val < 0.35) {
      return "rgb(0,192,0)";
    } else if (val >= 0.35 && val < 0.75) {
      return "rgb(0,128,0)";
    } else if (val >= 0.75 && val < 1) {
      return "grey";
    } else if ((val = 1)) {
      return "white";
    }
  };

  return (
    <>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${width}, 1fr)`,
          gridTemplateRows: `repeat(${height}, 1fr)`,
        }}
      >
        {noise.map((y, i) => {
          return (
            <>
              {y.map((x, j) => (
                <div
                  key={i + 1 + j}
                  style={{
                    backgroundColor: tileColor(x),
                    width: pxlWidth + "px",
                    height: pxlHeight + "px",
                  }}
                ></div>
              ))}
            </>
          );
        })}
      </div>
    </>
  );
};

export default Game;
