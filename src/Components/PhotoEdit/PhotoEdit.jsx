import React from "react";
import * as Icon from "react-bootstrap-icons";
import scss from "./PhotoEdit.module.scss";
import { useNavigate, useLocation } from "react-router";
import AuthContext from "../../Storage/auth-context";
import { useContext, useState, useRef } from "react";

const PhotoEdit = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [fileName, setfileName] = useState("");
  const [edited, setEdited] = useState(false);
  const [bright, setBright] = useState(100);
  const [blur, setBlur] = useState(0);
  const [grey, setGrey] = useState(0);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(1);
  const [isBright, setIsBright] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [isGrey, setIsGrey] = useState(false);
  const [isHue, setIsHue] = useState(false);
  const [isSaturation, setIsSaturation] = useState(false);
  const selectedImageRef = useRef("");
  const choose_imageRef = useRef("");
  const image_holderRef = useRef("");
  const imageRef = useRef("");
  const remove_img_btnRef = useRef("");
  const optionsRef = useRef("");
  const canvasRef = useRef("");
  const clearAllRef = useRef("");
  const selectImageHandler = () => {
    selectedImageRef.current.click();
  };
  const shangeImageHandler = () => {
    const file = selectedImageRef.current.files[0];

    if (file) {
      const reader = new FileReader();
      setfileName(file.name);

      choose_imageRef.current.style.display = "none";
      image_holderRef.current.style.display = "block";

      reader.addEventListener("load", function () {
        imageRef.current.setAttribute("src", this.result);
      });

      reader.readAsDataURL(file);
      remove_img_btnRef.current.style.display = "block";
    }

    if (edited === false) {
      setEdited(true);
    }
    clearAllRef.current.style.transform = "translateY(0px)";
  };

  const editImage = () => {
    imageRef.current.style.filter =
      "grayscale(" +
      grey +
      "%) hue-rotate(" +
      hue +
      "deg) brightness(" +
      bright +
      "%) blur(" +
      blur +
      "px) saturate(" +
      saturation +
      ")";
    const context = canvasRef.current.getContext("2d");
    context.filter =
      "grayscale(" +
      grey +
      "%) hue-rotate(" +
      hue +
      "deg) brightness(" +
      bright +
      "%) blur(" +
      blur +
      "px) saturate(" +
      saturation +
      ")";

    // clearAll.style.transform = 'translateY(0px)';
  };
  function clearAllRangeValue() {
    imageRef.current.style.filter = "none";
    const context = canvasRef.current.getContext("2d");
    context.filter = "none";

    setBright(100);
    setBlur(0);
    setGrey(0);
    setHue(0);
    setSaturation(1);

    // editImage();
  }

  const removeImageHandler = () => {
    // imageRef.current.src = "";
    // remove_img_btnRef.current.style.display = "none";
    // choose_imageRef.current.style.display = "block";
    // image_holderRef.style.display = "none";
    // optionsRef.current.style.transform = "translateY(80px)";
    // alert("Kek");

    // clearAllRangeValue();

    window.location.reload();
  };

  const exportHandler = () => {
    if (imageRef.current.getAttribute("src") !== "") {
      if (edited === true) {
        const context = canvasRef.current.getContext("2d");
        context.drawImage(
          imageRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        var jpegUrl = canvasRef.current.toDataURL("image/jpg");

        const link = document.createElement("a");
        document.body.appendChild(link);

        link.setAttribute("href", jpegUrl);
        link.setAttribute("download", fileName);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const showOption = (option) => {
    if (imageRef.current.getAttribute("src") === "") {
      alert("Choose Image First");
    } else {
      optionsRef.current.style.transform = "translateY(0px)";

      setIsBright(false);
      setIsBlur(false);
      setIsGrey(false);
      setIsHue(false);
      setIsSaturation(false);

      if (option === "bright") {
        setIsBright(true);
      } else if (option === "blur") {
        setIsBlur(true);
      } else if (option === "grey") {
        setIsGrey(true);
      } else if (option === "hue") {
        setIsHue(true);
      } else if (option === "saturation") {
        setIsSaturation(true);
      }
      if (edited === true) {
        canvasRef.current.height = imageRef.current.naturalHeight;
        canvasRef.current.width = imageRef.current.naturalWidth;
      } else {
        alert("Edit Your Image First");
      }
    }
  };

  const changeBrightNessHandler = (event) => {
    setBright(event.target.value);
    editImage();
  };
  const changeBlurHandler = (event) => {
    setBlur(event.target.value);
    editImage();
  };
  const changeGreyHandler = (event) => {
    setGrey(event.target.value);
    editImage();
  };
  const changeHueHandler = (event) => {
    setHue(event.target.value);
    editImage();
  };
  const changeSaturationHandler = (event) => {
    setSaturation(event.target.value);
    editImage();
  };
  return (
    <div className={scss.PhotoEdit}>
      <div className={scss.Tools}>
        <ul>
          <li
            onClick={() => showOption("bright")}
            className={isBright ? scss.active_option : null}
          >
            <i class="bx bxs-brightness-half"></i>
            <p>BrightNess</p>
          </li>
          <li
            onClick={() => showOption("blur")}
            className={isBlur ? scss.active_option : null}
          >
            <i class="bx bxs-brush"></i>
            <p>Blur</p>
          </li>
          <li
            onClick={() => showOption("grey")}
            className={isGrey ? scss.active_option : null}
          >
            <i class="bx bxs-collection"></i>
            <p>GreyScale</p>
          </li>
          <li
            onClick={() => showOption("hue")}
            className={isHue ? scss.active_option : null}
          >
            <i class="bx bxs-color-fill"></i>
            <p>Hue Rotate</p>
          </li>
          <li
            onClick={() => showOption("saturation")}
            className={isSaturation ? scss.active_option : null}
          >
            <i class="bx bxs-magic-wand"></i>
            <p>Saturation</p>
          </li>
          <li onClick={exportHandler}>
            <i class="bx bx-export"></i>
            <p>Export</p>
          </li>
        </ul>
      </div>
      <div className={scss.content}>
        <div className={scss.choose_image} ref={choose_imageRef}>
          <div className={scss.upload_img_box} onClick={selectImageHandler}>
            <i class="bx bxs-image-add"></i>
            <input
              type="file"
              name="selectedImage"
              className={scss.selectedImage}
              id="selectedImage"
              accept="image/jpeg, image/png"
              ref={selectedImageRef}
              onChange={shangeImageHandler}
            />
            <p id="hint" className={scss.hint}>
              choose Image from folder
            </p>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          className={scss.image_canvas}
          id="image_canvas"
        ></canvas>

        <div className={scss.image_holder} ref={image_holderRef}>
          <button
            ref={remove_img_btnRef}
            className={scss.remove_img_btn}
            id="remove_img_btn"
            onClick={removeImageHandler}
          >
            <i class="bx bxs-message-square-x"></i>
          </button>
          <img
            src=""
            alt="img"
            id="image"
            ref={imageRef}
            className={scss.image}
          />
        </div>

        <div className={scss.options} ref={optionsRef}>
          <div
            className={`${scss.option} ${
              isBright ? scss.active_controller : null
            }`}
          >
            <input
              type="range"
              max="200"
              min="0"
              id="bright"
              value={bright}
              className={`${scss.slider}`}
              onChange={changeBrightNessHandler}
            />
            <p id="brightVal" className={scss.show_value}>
              {bright}
            </p>
          </div>

          <div
            className={`${scss.option} ${
              isBlur ? scss.active_controller : null
            }`}
          >
            <input
              type="range"
              max="40"
              min="0"
              value={blur}
              className={scss.slider}
              onChange={changeBlurHandler}
            />
            <p id="blurVal" className={scss.show_value}>
              {blur}
            </p>
          </div>

          <div
            className={`${scss.option} ${
              isGrey ? scss.active_controller : null
            }`}
          >
            <input
              type="range"
              max="100"
              min="0"
              value={grey}
              className={scss.slider}
              onChange={changeGreyHandler}
            />
            <p id="greyVal" className={scss.show_value}>
              {grey}
            </p>
          </div>

          <div
            className={`${scss.option} ${
              isHue ? scss.active_controller : null
            }`}
          >
            <input
              type="range"
              max="100"
              min="0"
              value={hue}
              className={scss.slider}
              onChange={changeHueHandler}
            />
            <p id="hueVal" className={scss.show_value}>
              {hue}
            </p>
          </div>

          <div
            className={`${scss.option} ${
              isSaturation ? scss.active_controller : null
            }`}
          >
            <input
              type="range"
              max="100"
              min="1"
              value={saturation}
              id="saturation"
              className={scss.slider}
              onChange={changeSaturationHandler}
            />
            <p id="saturationVal" className={scss.show_value}>
              {saturation}
            </p>
          </div>
        </div>
        <button
          className={scss.clearAll}
          ref={clearAllRef}
          onClick={() => {
            clearAllRangeValue();
          }}
        >
          <span>Reset</span>
          <i class="bx bx-reset"></i>
        </button>
      </div>
    </div>
  );
};

export default PhotoEdit;
