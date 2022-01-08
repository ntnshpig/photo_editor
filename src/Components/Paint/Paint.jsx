import scss from "./Paint.module.scss";
import { useRef, useState } from "react";
import { ReactPainter } from "react-painter";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { HexColorPicker } from "react-colorful";

const Paint = (props) => {
  const canvRef = useRef("");
  let canvasRef = useRef("");
  const [color, setColor] = useState("#000000");

  const exportHandler = () => {
    htmlToImage
      .toJpeg(canvRef.current, { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = `image.jpeg`;
        link.href = dataUrl;
        link.click();
        document.body.removeChild(link);
      });
  };

  function clearAllRangeValue() {
    const context = canvasRef.getContext("2d");
    context.clearRect(0, 0, 850, 500);
  }

  return (
    <div className={scss.PaintDiv}>
      <ReactPainter
        onSave={(blob) => exportHandler()}
        width={850}
        height={470}
        render={({
          canvas,
          triggerSave,
          setLineWidth,
          setColor,
          setLineJoin,
          getCanvasProps
        }) => (
          <div className={scss.PaintBlock}>
            <div className={scss.Tools}>
            <div className={scss.ToolElem}>
                <span>Size:</span>
              <input
                type="range"
                min="1"
                max="100"
                onChange={(e) => setLineWidth(e.target.value)}
              />
              </div>
              <div className={scss.ToolElem}>
              <span>Color:</span>
                <HexColorPicker color={color} onChange={setColor} />
              </div>
            </div>
            <div className={scss.awesomeContainerBlock}>
              <div className={scss.awesomeContainer} ref={canvRef}>
              <canvas {...getCanvasProps({ ref: ref => (canvasRef = ref) })} />
                {/* {canvas} */}
              </div>
            </div>

            <button className={scss.Save} onClick={triggerSave}>
              Save
            </button>
            <button className={scss.Clear} onClick={() => clearAllRangeValue()}>
              Clear
            </button>
          </div>
        )}
      />
      {/* <iframe
        style={{top:0, left:0, bottom:0, right:0, width:1200, height:1100, border:"none", margin:0, padding:0, overflow:"hidden", zIndex:999999}}
        allowfullscreen
        frameBorder="0"
        src="https://studio.pixelixe.com/#api?apiKey=RwYSHD8uDStjGBdVKxkzRlc9DX0lUw0FDDAjXw&width=500&height=500"
        title="Lol"
      ></iframe> */}
    </div>
  );
};

export default Paint;
