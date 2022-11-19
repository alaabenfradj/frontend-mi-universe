import { Suspense, useEffect, useState } from "react";
import axios from "axiosInstance";
import PropTypes from "prop-types";
import ProductManagement from "components/Dropdowns/ProductMangement";
import { useDispatch, useSelector } from "react-redux";
import UpdateProduct from "../../containers/PageDashboard/UpdateProduct";
function TableOfProducts({ color, prod }) {
  const [products, setproducts] = useState([]);
  const openn = useSelector((state) => state.product.open);
  const [open, setopen] = useState(openn);
  const base_url = "http://localhost:5050/";
  const updatedProduct = useSelector((state) => state.productseller.changedProduct)
  console.log(updatedProduct)
  useEffect(() => {
    axios.get("/products/getproductsseller").then((res) => {
      // console.log(res.data);
      //dispatch(populatesellerProducts(res.data));
      setproducts(res.data);
    });
  }, []);
  //let p = prod.map(p => {if(p._id === updatedProduct._id){  return {...p ,updatedProduct};} return p});
  // const objIndex = prod.findIndex((obj => obj._id === updatedProduct._id));
  // prod[objIndex] = updatedProduct;
  
  return (
    <>
      <div
       style={{ marginTop: "75px" }}
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                All Products
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  marque
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  state
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  
                </th>
              </tr>
            </thead>
            <tbody>
              {prod &&
                prod.map((product) => (
                  <tr key={product._id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <Suspense fallback={null}>
                            {" "}
                            <img
                              className="w-full h-full rounded-full"
                              src={base_url + product.productImage[0] }
                              alt={product.label}
                            />
                          </Suspense>
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {product.label}
                          </p>
                        </div>
                      </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {product.category}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {product.marque}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {product.state}
                        </p>
                      </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                      <ProductManagement product={product} id={product._id} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <UpdateProduct /> 
    </>
  );
}
TableOfProducts.defaultProps = {
  color: "light",
};

TableOfProducts.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
export default TableOfProducts;