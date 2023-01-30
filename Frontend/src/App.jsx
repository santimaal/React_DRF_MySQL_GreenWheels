// import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import './App.css';

// bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.min.js";

// components
import Header from './components/Header/Header'
import SpinnerLoading from "./components/LoadingSpinner/SpinnerLoading";

// pages
const Bikes = React.lazy(() => import("./pages/Bikes/Bikes"))
const AddBike = React.lazy(() => import("./pages/Bikes/CreateBike"))
const Home = React.lazy(() => import("./pages/Home/Home"))
const Station = React.lazy(() => import("./pages/Station/Stations"))
const AddStation = React.lazy(() => import("./pages/Station/CreateStation"))

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Suspense fallback={<SpinnerLoading />}><Home /></Suspense>} />
          <Route path="home" element={<Suspense fallback={<SpinnerLoading />}><Home /></Suspense>} />
          <Route path="bike" element={<Suspense fallback={<SpinnerLoading />}><Bikes /></Suspense>} />
          <Route path="addbike" element={<Suspense fallback={<SpinnerLoading />}><AddBike /></Suspense>} />
          <Route path="station" element={<Suspense fallback={<SpinnerLoading />}><Station /></Suspense>} />
          <Route path="addstation" element={<Suspense fallback={<SpinnerLoading />}><AddStation /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
