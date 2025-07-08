import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import HomePage from "./pages/HomePage.tsx";
import DetailFilmPage from "./pages/DetailFilmPage.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Navigate to={"/cinema/today"} replace/>}/>
                <Route path={"/cinema/today"} element={<HomePage />} />
                <Route path={"/cinema/:filmId"} element={<DetailFilmPage />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
