import React, { useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import scss from "./PhotoEdit.module.scss";
import { useNavigate, useLocation } from "react-router";
import AuthContext from "../../Storage/auth-context";
import { useContext, useState, useRef } from "react";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io";
import * as Io5Icons from "react-icons/io5";
import * as ImIcons from "react-icons/im";
import "./duetonfilters.css";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { download } from "downloadjs";

const PhotoEdit = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [fileName, setfileName] = useState("");
  const [edited, setEdited] = useState(false);
  const [bright, setBright] = useState(100);
  const [blur, setBlur] = useState(0);
  const [grey, setGrey] = useState(0);
  const [hue, setHue] = useState(0);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(1);
  const [invert, setInvert] = useState(0);
  const [opacity, setOpacity] = useState(100);
  const [sepia, setSepia] = useState(0);
  const [mixBlendMode, setMixBlendMode] = useState("normal");
  const [imageClasses, setImageClasses] = useState(`${scss.image_holder}`);
  const [isBright, setIsBright] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [isGrey, setIsGrey] = useState(false);
  const [isHue, setIsHue] = useState(false);
  const [isSaturation, setIsSaturation] = useState(false);
  const [isContrast, setIsContrast] = useState(false);
  const [isInvert, setIsInvert] = useState(false);
  const [isOpacity, setIsOpacity] = useState(false);
  const [isSepia, setIsSepia] = useState(false);
  const [isMixBlendMode, setIsMixBlendMode] = useState(false);
  const [isDueton, setIsDueton] = useState(false);
  const selectedImageRef = useRef("");
  const choose_imageRef = useRef("");
  const image_holderRef = useRef("");
  const imageRef = useRef("");
  const remove_img_btnRef = useRef("");
  const optionsRef = useRef("");
  const canvasRef = useRef("");
  const clearAllRef = useRef("");
  const mixBlendModeRef = useRef("");
  const DuotoneFiltersRef = useRef("");
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
    imageRef.current.style.mixBlendMode = mixBlendMode;
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
      ") contrast(" +
      contrast +
      "%) invert(" +
      invert +
      "%) opacity(" +
      opacity +
      "%) sepia(" +
      sepia +
      "%)";
    let context = canvasRef.current.getContext("2d");
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
      ") contrast(" +
      contrast +
      "%) invert(" +
      invert +
      "%) opacity(" +
      opacity +
      "%) sepia(" +
      sepia +
      "%)";
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
    setContrast(100);
    setInvert(0);
    setOpacity(100);
    setSepia(0);
    setMixBlendMode("normal");
    setImageClasses(`${scss.image_holder}`);
    // editImage();
  }

  const removeImageHandler = () => {
    window.location.reload();
  };

  const exportHandler = () => {
    if (imageRef.current.getAttribute("src") !== "") {
      htmlToImage
        .toJpeg(image_holderRef.current, { quality: 0.95 })
        .then(function (dataUrl) {
          var link = document.createElement("a");
          link.download = `${fileName}.jpeg`;
          link.href = dataUrl;
          link.click();
          document.body.removeChild(link);
        });

      // if (edited === true) {
      //   const context = canvasRef.current.getContext("2d");
      //   context.drawImage(
      //     imageRef.current,
      //     0,
      //     0,
      //     imageRef.current.width,
      //     imageRef.current.height
      //   );
      //   var jpegUrl = canvasRef.current.toDataURL("image/jpg");

      //   const link = document.createElement("a");
      //   document.body.appendChild(link);

      //   link.setAttribute("href", jpegUrl);
      //   link.setAttribute("download", fileName);
      //   link.click();
      //   document.body.removeChild(link);
      // }
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
      setIsContrast(false);
      setIsInvert(false);
      setIsOpacity(false);
      setIsSepia(false);
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
      } else if (option === "contrast") {
        setIsContrast(true);
      } else if (option === "invert") {
        setIsInvert(true);
      } else if (option === "opacity") {
        setIsOpacity(true);
      } else if (option === "sepia") {
        setIsSepia(true);
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
  };
  const changeBlurHandler = (event) => {
    setBlur(event.target.value);
  };
  const changeGreyHandler = (event) => {
    setGrey(event.target.value);
  };
  const changeHueHandler = (event) => {
    setHue(event.target.value);
  };
  const changeSaturationHandler = (event) => {
    setSaturation(event.target.value);
  };
  const changeContrastHandler = (event) => {
    setContrast(event.target.value);
  };
  const changeInvertHandler = (event) => {
    setInvert(event.target.value);
  };
  const changeOpacityHandler = (event) => {
    setOpacity(event.target.value);
  };
  const changeSepiaHandler = (event) => {
    setSepia(event.target.value);
  };

  const showMixBland = () => {
    if (isMixBlendMode === false) {
      if (isDueton === true) {
        DuotoneFiltersRef.current.style.display = "none";
        setIsDueton(false);
      }
      mixBlendModeRef.current.style.display = "flex";
    } else {
      mixBlendModeRef.current.style.display = "none";
    }
    setIsMixBlendMode((prevstate) => !prevstate);
  };

  const showDueton = () => {
    if (isDueton === false) {
      if (isMixBlendMode === true) {
        mixBlendModeRef.current.style.display = "none";
        setIsMixBlendMode(false);
      }
      DuotoneFiltersRef.current.style.display = "flex";
    } else {
      DuotoneFiltersRef.current.style.display = "none";
    }
    setIsDueton((prevstate) => !prevstate);
  };


  useEffect(() => {
    const identifier = setTimeout(() => {
      editImage();
    }, 10);

    return () => {
      clearTimeout(identifier);
    };
  }, [
    bright,
    blur,
    grey,
    hue,
    saturation,
    contrast,
    invert,
    opacity,
    sepia,
    mixBlendMode,
  ]);

  const addClassToImage = (className) => {
    setImageClasses(`${className} ${scss.image_holder}`);
  };

  return (
    <>
      <div className={scss.PhotoEdit}>
        <div className={scss.Tools}>
          <ul>
            <li
              onClick={() => showOption("bright")}
              className={isBright ? scss.active_option : null}
            >
              <MdIcons.MdBrightnessMedium
                className={scss.OptionLogo}
                style={{ width: 25, height: 25 }}
              />
              <p>BrightNess</p>
            </li>
            <li
              onClick={() => showOption("blur")}
              className={isBlur ? scss.active_option : null}
            >
              <MdIcons.MdLensBlur
                className={scss.OptionLogo}
                style={{ width: 30, height: 30 }}
              />
              <p>Blur</p>
            </li>
            <li
              onClick={() => showOption("grey")}
              className={isGrey ? scss.active_option : null}
            >
              <MdIcons.MdInvertColors className={scss.OptionLogo} />
              <p>GreyScale</p>
            </li>
            <li
              onClick={() => showOption("hue")}
              className={isHue ? scss.active_option : null}
            >
              <IoIcons.IoMdColorFill className={scss.OptionLogo} />
              <p>Hue Rotate</p>
            </li>
            <li
              onClick={() => showOption("saturation")}
              className={isSaturation ? scss.active_option : null}
            >
              <Io5Icons.IoColorFilter className={scss.OptionLogo} />
              <p>Saturation</p>
            </li>
            <li
              onClick={() => showOption("contrast")}
              className={isContrast ? scss.active_option : null}
            >
              <ImIcons.ImContrast
                className={scss.OptionLogo}
                style={{ width: 25, height: 25 }}
              />
              <p>Contrast</p>
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
                accept="image/jpeg, image/png, image/jpg"
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
            className={`${scss.image_canvas}`}
            id="image_canvas"
          ></canvas>

          <div className={imageClasses} ref={image_holderRef}>
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
              className={`${scss.image}`}
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
                isContrast ? scss.active_controller : null
              }`}
            >
              <input
                type="range"
                max="300"
                min="0"
                value={contrast}
                className={scss.slider}
                onChange={changeContrastHandler}
              />
              <p id="contrastVal" className={scss.show_value}>
                {contrast}
              </p>
            </div>
            <div
              className={`${scss.option} ${
                isInvert ? scss.active_controller : null
              }`}
            >
              <input
                type="range"
                max="100"
                min="0"
                value={invert}
                className={scss.slider}
                onChange={changeInvertHandler}
              />
              <p id="invertVal" className={scss.show_value}>
                {invert}
              </p>
            </div>
            <div
              className={`${scss.option} ${
                isSepia ? scss.active_controller : null
              }`}
            >
              <input
                type="range"
                max="100"
                min="0"
                value={sepia}
                className={scss.slider}
                onChange={changeSepiaHandler}
              />
              <p id="sepiaVal" className={scss.show_value}>
                {sepia}
              </p>
            </div>
            <div
              className={`${scss.option} ${
                isInvert ? scss.active_controller : null
              }`}
            >
              <input
                type="range"
                max="100"
                min="0"
                value={invert}
                className={scss.slider}
                onChange={changeInvertHandler}
              />
              <p id="invertVal" className={scss.show_value}>
                {invert}
              </p>
            </div>
            <div
              className={`${scss.option} ${
                isOpacity ? scss.active_controller : null
              }`}
            >
              <input
                type="range"
                max="100"
                min="0"
                value={opacity}
                className={scss.slider}
                onChange={changeOpacityHandler}
              />
              <p id="opacityVal" className={scss.show_value}>
                {opacity}
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
        <div className={scss.Tools}>
          <ul>
            <li
              onClick={() => showOption("invert")}
              className={isInvert ? scss.active_option : null}
            >
              <Io5Icons.IoInvertModeOutline className={scss.OptionLogo} />
              <p>Invert</p>
            </li>
            <li
              onClick={() => showOption("opacity")}
              className={isOpacity ? scss.active_option : null}
            >
              <MdIcons.MdOpacity className={scss.OptionLogo} />
              <p>Opacity</p>
            </li>
            <li
              onClick={() => showOption("sepia")}
              className={isSepia ? scss.active_option : null}
            >
              <MdIcons.MdOutlineMotionPhotosOn className={scss.OptionLogo} />
              <p>Sepia</p>
            </li>
            <li
              onClick={showMixBland}
              className={isMixBlendMode ? scss.active_option : null}
            >
              <MdIcons.MdBurstMode className={scss.OptionLogo} />
              <p>BlendMode</p>
            </li>
            <li
              onClick={showDueton}
              className={isDueton ? scss.active_option : null}
            >
              <MdIcons.MdOutlineFilterBAndW className={scss.OptionLogo} />
              <p>Dueton</p>
            </li>
          </ul>
        </div>
      </div>
      <div className={scss.filterList}>
        <div className={scss.DuotoneFilters} ref={DuotoneFiltersRef}>
          {/* "https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" */}
          <div
            className={`blend-blue ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-blue")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
          <div
            className={`blend-blue-dark ${scss.DuotoneElem} `}
            onClick={() => addClassToImage("blend-blue-dark")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
          <div
            className={`blend-blue-light ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-blue-light")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
          <div
            className={`blend-orange ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-orange")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
          <div
            className={`blend-orange-dark ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-orange-dark")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
          <div
            className={`blend-orange-light ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-orange-light")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
          <div
            className={`blend-red ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-red")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
          <div
            className={`blend-red-dark ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-red-dark")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
          <div
            className={`blend-red-light ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-red-light")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
          <div
            className={`blend-green ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-green")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
          <div
            className={`blend-green-dark ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-green-dark")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
          <div
            className={`blend-green-light ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-green-light")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
          <div
            className={`blend-yellow ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-yellow")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
          <div
            className={`blend-yellow-dark ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-yellow-dark")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
          <div
            className={`blend-yellow-light ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-yellow-light")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
          <div
            className={`blend-purple ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-purple")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
          <div
            className={`blend-purple-dark ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-purple-dark")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
          <div
            className={`blend-purple-light ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-purple-light")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>

          <div
            className={`blend-pink ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-pink")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
          <div
            className={`blend-pink-dark ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-pink-dark")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
          <div
            className={`blend-pink-light ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-pink-light")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
 

          <div
            className={`blend-blue-yellow ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-blue-yellow")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
          <div
            className={`blend-blue-yellow-dark ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-blue-yellow-dark")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
          <div
            className={`blend-blue-yellow-light ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-blue-yellow-light")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>

          <div
            className={`blend-pink-yellow ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-pink-yellow")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
          <div
            className={`blend-pink-yellow-dark ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-pink-yellow-dark")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
          <div
            className={`blend-pink-yellow-light ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-pink-yellow-light")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>

          <div
            className={`blend-red-blue ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-red-blue")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
          <div
            className={`blend-red-blue-dark ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-red-blue-dark")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
          <div
            className={`blend-red-blue-light ${scss.DuotoneElem}`}
            onClick={() => addClassToImage("blend-red-blue-light")}
          >
            <img
              className={`${scss.DuotoneImg}`}
              src="https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="duotone-filter"
            />
          </div>
        </div>
        <div className={scss.mixBlendMode} ref={mixBlendModeRef}>
          <button
            className={scss.mixBlendModeButton}
            onClick={() => setMixBlendMode("normal")}
          >
            Normal
          </button>
          {/* <button className={scss.mixBlendModeButton} onClick={() => setMixBlendMode("multiply")}>Multiply</button> */}
          <button
            className={scss.mixBlendModeButton}
            onClick={() => setMixBlendMode("overlay")}
          >
            Overlay
          </button>
          <button
            className={scss.mixBlendModeButton}
            onClick={() => setMixBlendMode("darken")}
          >
            Darken
          </button>
          <button
            className={scss.mixBlendModeButton}
            onClick={() => setMixBlendMode("lighten")}
          >
            Lighten
          </button>
          <button
            className={scss.mixBlendModeButton}
            onClick={() => setMixBlendMode("color-dodge")}
          >
            Color-dodge
          </button>
          <button
            className={scss.mixBlendModeButton}
            onClick={() => setMixBlendMode("hard-light")}
          >
            Hard-light
          </button>
          <button
            className={scss.mixBlendModeButton}
            onClick={() => setMixBlendMode("soft-light")}
          >
            Soft-light
          </button>
          <button
            className={scss.mixBlendModeButton}
            onClick={() => setMixBlendMode("difference")}
          >
            Difference
          </button>
          {/* <button className={scss.mixBlendModeButton} onClick={() => setMixBlendMode("exclusion")}>Exclusion</button> */}
          <button
            className={scss.mixBlendModeButton}
            onClick={() => setMixBlendMode("color")}
          >
            Color
          </button>
          <button
            className={scss.mixBlendModeButton}
            onClick={() => setMixBlendMode("luminosity")}
          >
            Luminosity
          </button>
        </div>
      </div>
    </>
  );
};

export default PhotoEdit;
