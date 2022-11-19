import { StarIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import { useState, Suspense, useEffect } from "react";
import { ContactShadows, Environment, OrbitControls, Text,Stars } from "@react-three/drei";

import { Canvas } from "@react-three/fiber";
import Guitar from "./Guitar_model";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Electrique from "./Electrique";
import Drums from "./Drums";
import { useDispatch } from "react-redux";
import { changeCategory, colorFilter } from "app/productslice/Productsliceseller";
import { useHistory } from "react-router-dom";
import ntc from "ntc";
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CustomDrums() {
  const [face, setFace] = useState("#E8B187");
  const [chords, setChords] = useState("#B9B7BD");
  const [body, setBody] = useState("#4C2C2E");
  const [circulos, setCirculos] = useState("#FFF36B");
  const [circulosChanged, setCirculosChanged] = useState(false);
  const [text, setText] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const [product, setProduct] = useState({
    name: "Basic Drums",
    price: 5000,
    changedCirculos: false,
  });
  const [circulos_match, setCirculosMatch] = useState("");
  const [hexCirculos, setHexCirculos] = useState("#FFF36B");
  const dispatch = useDispatch();
  useEffect(() => {
    const {changedCirculos } =
      product;
    changedCirculos && setProduct({ ...product, price: product.price + 50 });
  }, [circulosChanged]);

  const handleCirculosChanged = (e) => {
    const circulos_match = ntc.name(e.target.value);
    setHexCirculos(e.target.value);
    setCirculosMatch(circulos_match[1]);
    setCirculos(e.target.value);
    setProduct({ ...product, changedBody: true });
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
    colors.circulo = hexToName(hexCirculos.substring(1));
    dispatch(colorFilter(colors));
    dispatch(changeCategory("percussions"));
    history.push(`/mi/archive/the-demo-archive-slug?custom=percussions`);
    e.preventDefault();
  };
  const handleTextColor = (e) => {
    setColor(e.target.value);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setCirculos("")
    setCirculosChanged(false);
    setProduct({
      ...product,
      changedCirculos: false,
      price: 300,
    });
  };
  return (
    <div className="container mx-auto mt-2 mb-10 flex items-center">
      {/* Image gallery */}
      <div className="card">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl dark:text-neutral-300">
          {product.name}
        </h1>
        <div className="product-canvas">
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0, 50], fov: 65 }}
          >
            <ambientLight intensity={0.7} />

            <Suspense fallback={null}>
              <Drums
                customColors={{
                  circulosDrum: circulos
                }}
              />
              <Text
                text={text}
                color={color}
                position={[7.1, -4.5, 15]}
                rotation={[0, 0.8, 0]}
                scale={90}
              ></Text>
              <Environment preset="city" />
              <ContactShadows
                rotation-x={Math.PI / 2}
                position={[0, -0.8, 0]}
                opacity={0.25}
                width={10}
                height={10}
                blur={1.5}
                far={0.8}
              />
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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-1 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8"></div>

        {/* Options */}
        <div className="mt-4 lg:mt-0 lg:row-span-3">
          <h2 className="mb-3 text-gray-900 dark:text-neutral-300">Product information</h2>
          <p className="text-3xl text-gray-900 dark:text-neutral-300">${product.price}</p>

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
              <h3 className="text-md text-gray-900 font-medium dark:text-neutral-300">Color :</h3>
              <div className="colors">
                <div>
                  <label>Circulos </label>
                  <input
                    type="color"
                    id="support"
                    name="support"
                    value={circulos}
                    onChange={(e) => handleCirculosChanged(e)}
                  />
                </div>
              </div>
              <label className="mt-5">Text : </label>
              <div className="mb-4">
                <input
                  type="text"
                  onChange={(event) => setText(event.target.value)}
                  placeholder="some text"
                  className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                  maxLength="1"
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
            </div>
            <div className="flex justify-between mt-10">
              <ButtonPrimary
                onClick={(e) => handleSubmit(e)}
                type="submit"
                className="mr-5 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Search
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
