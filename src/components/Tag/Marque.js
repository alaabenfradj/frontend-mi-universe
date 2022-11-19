import { useState, useEffect } from "react";
import axios from "axiosInstance";
import { useDispatch } from "react-redux";
import { filterByMarque } from "../../app/filterSlice/filterSlice";

const Marque = ({ className = "", tag, hideCount = false }) => {
  const [nbrr, setNbr] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`products/marque?marque=${tag}`)
      .then((res) => {
        setNbr(res.data.length);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <button
      className={`nc-Tag inline-block bg-white text-sm text-neutral-600 py-2 px-3 rounded-lg border border-neutral-100 md:py-2.5 md:px-4 dark:bg-neutral-700 dark:border-neutral-700 hover:border-neutral-200 dark:hover:border-neutral-6000 ${className}`}
      data-nc-id="Tag"
      //  href ={`/archive/the-demo-archive-slug?marque=${tag}`}
      onClick={() => dispatch(filterByMarque(tag))}
    >
      {`${tag}`}
      {tag && <span className="text-xs font-normal"> ({nbrr})</span>}
    </button>
  );
};

export default Marque;
