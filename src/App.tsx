import React from "react";
import "./App.css";
import {backgroundRender} from "./app/helpers/backgroundRender";
import {Route, Routes} from "react-router-dom";
import Home from "./app/components/pages/home";
import Favourites from "./app/components/pages/favourites";
import NotFound from "./app/components/pages/notFound";
import Detail from "./app/components/pages/detail";
import FloatingMenu from "./app/components/molecules/floatingMenu";

function App() {

    return (
        <main
            className={'App'}
            style={{
                background: `url(${backgroundRender()}) no-repeat center`,
                backgroundColor: 'black',
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
            }}
        >
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"fav"} element={<Favourites/>}/>
                <Route path={"detail"} element={<Detail/>}/>
                <Route path={"*"} element={<NotFound/>}/>
            </Routes>
            <FloatingMenu />
        </main>
    );
}

export default App;
