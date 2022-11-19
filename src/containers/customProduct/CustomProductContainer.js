import { StarIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import { useState, Suspense, useEffect } from "react";
import { ContactShadows, Environment, OrbitControls, Stars } from "@react-three/drei";

import { Canvas } from "@react-three/fiber";
import Guitar from "./Guitar_model";
import ButtonPrimary from "components/Button/ButtonPrimary";

import ntc from "ntc";
import { useNameThatColor } from "react-ntc";
import { useDispatch } from "react-redux";
import { changeCategory, colorFilter } from "app/productslice/Productsliceseller";
import { useHistory } from "react-router-dom";

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CustomGuitar() {
  const [selectedSize, setSelectedSize] = useState();
  const [face, setFace] = useState("#E8B187");
  const [chords, setChords] = useState("#B9B7BD");
  const [body, setBody] = useState("#4C2C2E");
  const [bodyChanged, setBodyChanged] = useState(false);
  const [chordsChanged, setChordsChanged] = useState(false);
  const [faceChanged, setFaceChanged] = useState(false);
  const [product, setProduct] = useState({
    name: "Basic Guitar",
    price: 300,
    changedBody: false,
    changedChords: false,
    changedFace: false,
  });
  const [face_match, setFaceMatch] = useState("");
  const [body_match, setBodyMatch] = useState("");
  const [chords_match, setChordsMatch] = useState("");
  const [hexFace, setHexFace] = useState("#E8B187");
  const [hexChords, setHexChords] = useState("#B9B7BD");
  const [hexBody, setHexBody] = useState("#4C2C2E");
  const dispatch = useDispatch();
  useEffect(() => {
    const { changedBody, changedChords, changedFace } = product;
    changedBody && setProduct({ ...product, price: product.price + 50 });
    changedChords && setProduct({ ...product, price: product.price + 50 });
    changedFace && setProduct({ ...product, price: product.price + 50 });
  }, [bodyChanged, chordsChanged, faceChanged]);
  const handleChordsChanged = (e) => {
    const chords_match = ntc.name(e.target.value);
    setHexChords(e.target.value);
    setChordsMatch(chords_match[1]);
    setChords(e.target.value);
    setChordsChanged(true);
    setProduct({ ...product, changedChords: true });
  };
  const handleFaceChanged = (e) => {
    const face_match = ntc.name(e.target.value);
    setHexFace(e.target.value);
    setFaceMatch(face_match[1]);
    setFace(e.target.value);
    setFaceChanged(true);
    setProduct({ ...product, changedFace: true });
  };
  const handleBodyChanged = (e) => {
    const body_match = ntc.name(e.target.value);
    setHexBody(e.target.value);
    setBodyMatch(body_match[1]);
    setBody(e.target.value);
    setBodyChanged(true);
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
    colors.face = hexToName(hexFace.substring(1));
    colors.body = hexToName(hexBody.substring(1));
    colors.chords = hexToName(hexChords.substring(1));
    dispatch(colorFilter(colors));
    dispatch(changeCategory("guitars"));
    history.push(`/mi/archive/the-demo-archive-slug?custom=guitars`);
    e.preventDefault();
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setBody("#E8B187");
    setChords("#B9B7BD");
    setFace("#4C2C2E");
    setBodyChanged(false);
    setFaceChanged(false);
    setChordsChanged(false);
    setProduct({
      ...product,
      changedBody: false,
      changedFace: false,
      changedChords: false,
      price: 300,
    });
  };
  return (
    <div className=" container mt-10 mb-10 mx-auto flex items-center">
      {/* Image gallery */}
      <div className="card">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl dark:text-neutral-300">
          {product.name}
        </h1>
        <div className="product-canvas">
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [-10, 7, 15], fov: 50 }}
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
              <Guitar
                customColors={{
                  face: face,
                  chords: chords,
                  body: body,
                }}
              />
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
              enableZoom={false}
              enableRotate={true}
            />
          </Canvas>
        </div>
      </div>

      {/* Product info */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:pt-5 lg:pb-5 lg:px-8 lg:grid lg:grid-cols-1 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8"></div>

        {/* Options */}
        <div className="lg:mt-0 lg:row-span-3">
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
                  <label>face </label>
                  <input
                    type="color"
                    id="face"
                    name="face"
                    value={face}
                    onChange={(e) => handleFaceChanged(e)}
                  />
                </div>

                <div>
                  <label>chords </label>
                  <input
                    type="color"
                    id="chords"
                    name="chords"
                    value={chords}
                    onChange={(e) => handleChordsChanged(e)}
                  />
                </div>
                <div>
                  <label>body </label>
                  <input
                    type="color"
                    id="support"
                    name="support"
                    value={body}
                    onChange={(e) => handleBodyChanged(e)}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <ButtonPrimary
                onClick={(e) => handleSubmit(e)}
                type="submit"
                className="my-5 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Filter
              </ButtonPrimary>
              <ButtonPrimary
                type="button"
                onClick={(e) => handleCancel(e)}
                className="my-5 cancel bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
