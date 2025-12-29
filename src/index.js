import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./Redux/Store/Store";
import { registerLicense } from "@syncfusion/ej2-base";
import "primereact/resources/themes/lara-light-cyan/theme.css";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NDaF5cWGBCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWH9fd3RcRGReWUBwV0A="
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // {/* </React.StrictMode> */}
);

reportWebVitals();
