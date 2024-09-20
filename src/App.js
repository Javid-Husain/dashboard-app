// src/App.js
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store.js";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <h1 className="head">Dynamic Dashboard</h1>
          <Dashboard />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
