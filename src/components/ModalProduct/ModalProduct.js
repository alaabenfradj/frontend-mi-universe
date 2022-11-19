import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "app/productslice/Productslice";
import { additem } from "app/cartslice/carteslics";
import axios from "axiosInstance";
import { Link } from "react-router-dom";
import aa from "search-insights";
import algoliasearch from "algoliasearch/lite"
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example(props) {
  
  const dispatch = useDispatch();
  const [product, setProduct] = useState(props.product);
  const [open, setOpen] = useState(false);
  const [rate, setrating] = useState(0);
  const currentUser = useSelector(
    (state) => state.user.userLogedIn
  );
  /*const client= algoliasearch('1RY92FSHMF','2a5deb3323c4edb2ecbcc46687c2c216');
  const index=client.initIndex('events');*/
  const ratings = () => {
    axios.get(`products/getrating/${product._id}`).then((res) => {
      setrating(res.data[0].rating);
    });
  };
  const [qty, setQty] = useState(1);
  const item = {
    label: product.label,
    price: product.price,
    productImage: product.productImage,
    productid: product._id,
    qte: qty,
  };
  useEffect(() => {
    ratings();
  }, []);

  return (
    <>
      <button
        type="button"
        className="relative z-10 w-full bg-white bg-opacity-75 py-2 px-4 rounded-md text-sm text-gray-900 opacity-0 group-hover:opacity-100 focus:opacity-100"
        onClick={() => {
          setOpen(true);
          dispatch(selectProduct(product));
        }}
      >
        Quick View
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpen}
        >
          <div
            className="flex min-h-screen text-center md:block md:px-2 lg:px-4"
            style={{ fontSize: 0 }}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden md:inline-block md:align-middle md:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
                <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5">
                      <img
                        src={`http://localhost:5050/${product.productImage[0]}`}
                        alt={product.label}
                        className="object-center object-cover"
                      />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">
                        {product.label}
                      </h2>
                      <section
                        aria-labelledby="information-heading"
                        className="mt-2"
                      >
                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>

                        <p className="text-2xl text-gray-900">
                          ${product.price}
                        </p>

                        {/* Reviews */}
                        <div className="mt-6">
                          <h4 className="sr-only">Reviews</h4>
                          <div className="flex items-center">
                            <div className="flex items-center">
                              {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                  key={rating}
                                  className={classNames(
                                    rate > rating
                                      ? "text-gray-900"
                                      : "text-gray-200",
                                    "h-5 w-5 flex-shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                            <p className="sr-only">{rate} out of 5 stars</p>
                            <button className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                              {product.reviewsCount} reviews
                            </button>
                          </div>
                        </div>
                      </section>
                      <section
                        aria-labelledby="options-heading"
                        className="mt-10"
                      >
                        <div>
                          <h4 className="text-sm text-gray-900 font-medium">
                            {product.description}
                          </h4>
                        </div>
                        <div>
                          <h4 className="text-sm text-gray-900 font-medium">
                            {" "}
                            Quantity
                          </h4>
                          <input
                            type="number"
                            disabled={true}
                            min={1}
                            value={qty}
                            onChange={(e) => {
                              setQty(e.target.value);
                            }}
                            className="text-sm text-gray-900 font-medium"
                          ></input>
                        </div>
                        
                        <button
                          onClick={() => {
                            dispatch(additem(item));
                            setOpen(false);
                            
                          }}
                          type="button"
                          className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Add to Cart
                        </button>
                        
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
