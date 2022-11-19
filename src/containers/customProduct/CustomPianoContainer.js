import { StarIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import { useState, Suspense, useEffect } from "react";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  Stars,
  Text,
} from "@react-three/drei";

import { Canvas } from "@react-three/fiber";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Pianoo from "./Pianoo";
import Piano from "./Piano";
import { showText } from "../../app/productslice/Productsliceseller";
import { useDispatch } from "react-redux";
//import { Input } from "@mui/material";
import Input from "@material-tailwind/react/Input";
import { changeCategory, colorFilter } from "app/productslice/Productsliceseller";
import { useHistory } from "react-router-dom";
import ntc from "ntc";

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CustomPianoContainer() {
  const [selectedSize, setSelectedSize] = useState();
  const [Hinges, setHinges] = useState("#FFF36B");
  const [Keys, setKeys] = useState("#FFFFFF");
  const [Pianoo, setPiano] = useState("#2E2E2E");
  const [HingesChanged, setHingesChanged] = useState(false);
  const [KeysChanged, setKeysChanged] = useState(false);
  const [PianoChanged, setPianoChanged] = useState(false);
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [color, setColor] = useState("#ffffff");
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    name: "Basic Keyboard",
    price: 3000,
    changedPiano: false,
    changedKeys: false,
    changedHinges: false,
  });
  const [piano_match, setPianoMatch] = useState("");
  const [keys_match, setKeysMatch] = useState("");
  const [hinges_match, setHingesMatch] = useState("");
  const [hexPiano, setHexPiano] = useState("#000000");
  const [hexKeys, setHexKeys] = useState("#ffffff");
  const [hexHinges, setHexHinges] = useState("#FFF36B");
  useEffect(() => {
    const { changedHinges, changedKeys, changedPiano } = product;
    changedHinges && setProduct({ ...product, price: product.price + 50 });
    changedKeys && setProduct({ ...product, price: product.price + 50 });
    changedPiano && setProduct({ ...product, price: product.price + 50 });
  }, [HingesChanged, KeysChanged, PianoChanged]);
  const handleKeysChanged = (e) => {
    const keys_match = ntc.name(e.target.value);
    setHexKeys(e.target.value);
    setKeysMatch(keys_match[1]);
    setKeys(e.target.value);
    setKeysChanged(true);
    setProduct({ ...product, changedKeys: true });
  };
  const handlePianoChanged = (e) => {
    const piano_match = ntc.name(e.target.value);
    setHexPiano(e.target.value);
    setPianoMatch(piano_match[1]);
    setPiano(e.target.value);
    setPianoChanged(true);
    setProduct({ ...product, changedPiano: true });
  };
  const handleHingesChanged = (e) => {
    const hinges_match = ntc.name(e.target.value);
    setHexHinges(e.target.value);
    setHingesMatch(hinges_match[1]);
    setHinges(e.target.value);
    setHingesChanged(true);
    setProduct({ ...product, changedHinges: true });
  };


  function hexToName(hex) {
    // first get hsl correspondance
    var hsl = hexToHsl(hex);
    if(!hsl){
      return;
    }
    // get the base color
    var color = getColorName(hsl[0] * 360);
    // check saturation and luminosity
    // needs more granularity, left as an exercise for the reader
    if (hsl[1] < .5) {
      return hsl[2] <= .5 ? hsl[2] === 0? 'black' : 'darkgray' : hsl[2] === 1 ? 'white': 'gray';
    }
    return hsl[2] <= .5 ? color : 'light' + color;
  }

  function getColorName(hue) {
    // here you will need more work:
    // we use fixed distance for this simple demo
    var names = ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta'];
    var angles = [0, 60, 120, 180, 240, 300];
    var match = angles.filter(a =>
      a - 60 <= hue && a + 60 > hue
    )[0] || 0;
    return names[angles.indexOf(match)];
  }
  // shamelessly stolen from https://stackoverflow.com/a/3732187/3702797
  function hexToHsl(hex) {
    if (hex.length === 3) {
      hex = hex.split('').map(c => c.repeat(2)).join('');
    }
    if (hex.length !== 6) {
      return;
    }
    var r = parseInt(hex[0] + hex[1], 16);
    var g = parseInt(hex[2] + hex[3], 16);
    var b = parseInt(hex[4] + hex[5], 16);
  
    r /= 255; g /= 255; b /= 255;
    var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
  
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default: h = 0
      }
      h /= 6;
    }
  
    return [h, s, l];
  }
  const history = useHistory();
  const handleSubmit = (e) => {
    let colors = {}
    colors.piano = hexToName(hexPiano.substring(1));
    colors.keys = hexToName(hexKeys.substring(1));
    colors.hinges = hexToName(hexHinges.substring(1));
    dispatch(colorFilter(colors));
    dispatch(changeCategory("keyboards"));
    history.push(`/mi/archive/the-demo-archive-slug?custom=keyboards`);
    e.preventDefault();
  };
  const handleTextColor = (e) => {
    setColor(e.target.value);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setHinges("#E1FF00");
    setKeys("#FAFAFA");
    setPiano("#2E2E2E");
    setText("");
    setHingesChanged(false);
    setPianoChanged(false);
    setKeysChanged(false);
    setProduct({
      ...product,
      changedHinges: false,
      changedKeys: false,
      changedPiano: false,
      price: 3000,
    });
  };

  return (
    <div className="container mt-5 mb-10 mx-auto flex items-center">
      {/* Image gallery */}
      <div className="card">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl dark:text-neutral-300">
          {product.name}
        </h1>
        <div className="product-canvas">
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [-3, 2, 3], fov: 30 }}
          >
            <ambientLight intensity={0.7} />
            <spotLight
              intensity={0.5}
              angle={0.5}
              penumbra={1}
              position={[10, 15, 10]}
              castShadow
            />
            <Suspense fallback={null}>
              <Piano
                customColors={{
                  Hinges: Hinges,
                  Keys: Keys,
                  Piano: Pianoo,
                }}
              />
              <Text
                text={text}
                color={color}
                position={[0.02, 0.5, -0.02]}
                rotation={[0,-0.3,0]}
                maxLength={10}
              ></Text>
              <Environment preset="city" />

              <Stars
                radius={100} // Radius of the inner sphere (default=100)
                depth={50} // Depth of area where stars should fit (default=50)
                count={5000} // Amount of stars (default=5000)
                factor={4} // Size factor (default=4)
                saturation={0} // Saturation 0-1 (default=0)
                fade // Faded dots (default=false)
              />
            </Suspense>
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
            />
          </Canvas>
        </div>
      </div>

      {/* Product info */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:pt-5 lg:pb-5 lg:px-8 lg:grid lg:grid-cols-1 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8"></div>

        {/* Options */}
        <div className="mt-4 lg:mt-0 lg:row-span-3">
          <h2 className="mb-3 text-gray-900 dark:text-neutral-300">
            Product information
          </h2>
          <p className="text-3xl text-gray-900 dark:text-neutral-300">
            ${product.price}
          </p>

          {/* Reviews */}
          <div className="mt-4">
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      reviews.average > rating
                        ? "text-gray-900 star"
                        : "text-gray-200 emptyStar",
                      "h-5 w-5 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{reviews.average} out of 5 stars</p>
              <a
                href={reviews.href}
                className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                {reviews.totalCount} reviews
              </a>
            </div>
          </div>

          <form className="mt-6">
            {/* Colors */}
            <div>
              <h3 className="text-md text-gray-900 font-medium dark:text-neutral-300">
                Color :
              </h3>
              <div className="colors">
                <div>
                  <label>Piano </label>
                  <input
                    type="color"
                    id="Piano"
                    name="Piano"
                    value={Piano}
                    onChange={(e) => handlePianoChanged(e)}
                  />
                </div>

                <div>
                  <label>Keys </label>
                  <input
                    type="color"
                    id="Keys"
                    name="Keys"
                    value={Keys}
                    onChange={(e) => handleKeysChanged(e)}
                  />
                </div>
                <div>
                  <label>Hinges </label>
                  <input
                    type="color"
                    id="Hinges"
                    name="Hinges"
                    value={Hinges}
                    onChange={(e) => handleHingesChanged(e)}
                  />
                </div>
              </div>
            </div>

            {/* Sizes */}

            <label className="mt-5">Text : </label>

            <div className="mb-4">
              <input
                type="text"
                onChange={(event) => setText(event.target.value)}
                placeholder="some text"
                className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                maxLength="20"
              />
            </div>

            <label className="mt-2 ml-3 mr-2">Text Color :</label>
            <input
              type="color"
              id="text"
              name="text"
              value="#ffffff"
              onChange={(e) => handleTextColor(e)}
            />

            <div className="flex justify-between mt-7">
              <ButtonPrimary
                onClick={(e) => handleSubmit(e)}
                type="submit"
                className="bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add to bag
              </ButtonPrimary>
              <ButtonPrimary
                type="button"
                onClick={(e) => handleCancel(e)}
                className="cancel bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </ButtonPrimary>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
