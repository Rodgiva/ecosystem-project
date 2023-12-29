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
          noise2D(
            (y * frequency * width) / height / width,
            (x * frequency) / height
          ) * amplitude;

        frequency *= 2;
        amplitude /= 2;
      }

      tiles[y].push(val);
    }
  }
};

generateTiles(300, 150, 1);

const Game = (props) => {
  const [noise, setNoise] = useState([]);
  const [width, setWidth] = useState(4);
  const [height, setHeigth] = useState(4);

  // window.addEventListener("keydown", (e) => {
  //   switch (e.key) {
  //     case "z":
  //     case "ArrowUp":
  //       break;
  //     case "s":
  //     case "ArrowDown":
  //       break;
  //     case "q":
  //     case "ArrowLet":
  //       break;
  //     case "d":
  //     case "ArrowRight":
  //       break;
  //     case "+":
  //       setWidth(width + 2);
  //       setHeigth(height + 2);
  //       console.log("+");
  //       break;
  //     case "-":
  //       setWidth(width - 2);
  //       setHeigth(height - 2);
  //       console.log("-");
  //       break;
  //     default:
  //       break;
  //   }
  // });

  useEffect(() => {
    setNoise(tiles);
  }, []);
  console.log("bip");

  const tileColor = (val) => {
    if (val < -0.45) {
      return "blue";
    } else if (val >= -0.45 && val < -0.25) {
      return "rgb(64,92,255)";
    } else if (val >= -0.25 && val < -0.1) {
      return "yellow";
    } else if (val >= -0.1 && val < 0.75) {
      return "rgb(0,192,0)";
    } else if (val >= 0.75 && val < 0.95) {
      return "grey";
    } else if (val >= 0.95) {
      return "white";
    }
  };

  return (
    <>
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(300, 1fr)",
          gridTemplateRows: "repeat(150, 1fr)",
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
                    width: width + "px",
                    height: height + "px",
                  }}
                ></div>
              ))}
            </>
          );
        })}
        <div
          style={{
            backgroundColor: "black",
            width: "2px",
            height: "2px",
            top: "calc(((100vh - 600px) / 2) + 201px )",
            left: "calc(((100vw - 1200px) / 2) + 201px)",
            position: "absolute",
            borderRadius: "4px",
          }}
        ></div>
      </div>
    </>
  );
};

export default Game;
