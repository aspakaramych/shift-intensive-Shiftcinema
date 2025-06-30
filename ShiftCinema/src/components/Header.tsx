import {useNavigate} from "react-router";

const Header = () => {
    const navigate = useNavigate();
    const id = localStorage.getItem("id");
    return (
        <header>
            <button onClick={() => navigate("/")}>Лого</button>
            <button onClick={() => navigate(`/account/${id}`)}>Профиль</button>
            <button>Билеты</button>
            <button>Выйти</button>
            <button>Switch</button>
        </header>
    )
}

export default Header