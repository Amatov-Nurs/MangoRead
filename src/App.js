import './core.css';
import {Routes, Route} from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import AboutPage from "./pages/aboutPage/AboutPage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
        <Header/>
      <Routes>
        <Route index element={<MainPage/>}/>
        <Route path='/:id' element={<AboutPage/>}/>
      </Routes>
        <Footer/>
    </>
  );
}

export default App;
