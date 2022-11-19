import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals";
import { persistor, store } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "./back-office/assets/styles/tailwind.css";

// STYLE front
import "./styles/index.scss";
import "./index.css";
import "./fonts/line-awesome-1.3.0/css/line-awesome.css";
//
const RtlImportCssLazy = React.lazy(() => import("RtlImportCss"));
//

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <App />
        <form action="https://sandbox.paymee.tn/gateway/" ></form>

      {/* LOAD RTL CSS WHEN RTL MODE ENABLE */}
      {process.env.REACT_APP_LRT_OR_RTL === "rtl" && (
        <Suspense fallback={<div />}>
          <RtlImportCssLazy />
        </Suspense>
      )}
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
