import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import HomePage from "./pages/HomePage.tsx";
import DetailFilmPage from "./pages/DetailFilmPage.tsx";
import {HOMEPAGE_PATH} from "./utils/routes.ts";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Navigate to={HOMEPAGE_PATH} replace/>}/>
                <Route path={HOMEPAGE_PATH} element={<HomePage/>}/>
                <Route path={"/cinema/:filmId"} element={<DetailFilmPage/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
