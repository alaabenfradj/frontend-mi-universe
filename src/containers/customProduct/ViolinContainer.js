import { StarIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import { useState, Suspense, useEffect } from "react";
import { ContactShadows, Environment, OrbitControls, Stars } from "@react-three/drei";

import { Canvas } from "@react-three/fiber";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Violin from "./Violin";
import ntc from "ntc";
import { useDispatch } from "react-redux";
import { changeCategory, colorFilter } from "app/productslice/Productsliceseller";
import { useHistory } from "react-router-dom";

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ViolinContainer() {

  const [the_stick, setThe_stick] = useState("#826466");
  const [body, setBody] = useState("#927C7C");
  const [the_stickChanged, setThe_stickChanged] = useState(false);
  const [bodyChanged, setBodyChanged] = useState(false);
  const [product, setProduct] = useState({
    name: "Basic Violin",
    price: 700,
    changedBody: false,
    changedStick: false,
  });
  const [stick_match, setStickMatch] = useState("");
  const [body_match, setBodyMatch] = useState("");
  const [hexStick, setHexStick] = useState("#E8B187");
  const [hexBody, setHexBody] = useState("#4C2C2E");
  const dispatch = useDispatch();
  useEffect(() => {
    const { changedBody, changedStick } = product;
    changedBody && setProduct({ ...product, price: product.price + 50 });
    changedStick && setProduct({ ...product, price: product.price + 50 });
  }, [bodyChanged, the_stickChanged]);

  const handleStickChanged = (e) => {
    const stick_match = ntc.name(e.target.value);
    setHexStick(e.target.value);
    setStickMatch(stick_match[1]);
    setThe_stick(e.target.value);
    setThe_stickChanged(true);
    setProduct({ ...product, changedStick: true });
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
    colors.stick = hexToName(hexStick.substring(1));
    colors.bodyViolin = hexToName(hexBody.substring(1));
    dispatch(colorFilter(colors));
    dispatch(changeCategory("strings"));
    history.push(`/mi/archive/the-demo-archive-slug?custom=strings`);
    e.preventDefault();
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setBody("#826466");
    setThe_stick("#927C7C");
    setBodyChanged(false);
    setThe_stickChanged(false);
    setProduct({
      ...product,
      changedBody: false,
      changedStick: false,
      price: 700,
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
            camera={{ position: [70, 25, 25], fov: 40 }}
          >
            <directionalLight position={[10, 10, 5]} intensity={2} />
            <directionalLight position={[-10, -10, -5]} intensity={1} />
            <ambientLight intensity={0.7} />
            <spotLight
              intensity={0.5}
              angle={0.5}
              penumbra={1}
              position={[10, 15, 10]}
              castShadow
            />
            <Suspense fallback={null}>
              <Violin
                customColors={{
                  bodyViolin: body,
                  the_stick: the_stick,
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
                  <label>Body </label>
                  <input
                    type="color"
                    id="support"
                    name="support"
                    value={body}
                    onChange={(e) => handleBodyChanged(e)}
                  />
                </div>
                <div>
                  <label>Stick </label>
                  <input
                    type="color"
                    id="face"
                    name="face"
                    value={the_stick}
                    onChange={(e) => handleStickChanged(e)}
                  />
                </div>
              </div>
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
