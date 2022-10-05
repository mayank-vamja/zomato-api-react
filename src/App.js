import React from "react";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import AppRoutes from "./routes";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <Header />
          <AppRoutes />
          <Footer />
        </Router>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
