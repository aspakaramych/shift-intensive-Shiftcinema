import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import HomePage from "./pages/HomePage.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Navigate to={"/cinema/today"} replace/>}/>
                <Route path={"/cinema/today"} element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
