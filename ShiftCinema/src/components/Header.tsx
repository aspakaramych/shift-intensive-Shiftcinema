import {useNavigate} from "react-router";
import Logo from "../assets/logo.svg?react"
import UserIcon from "../assets/user_icon.svg?react"
import TicketIcon from "../assets/ticket_icon.svg?react"
import ExitIcon from "../assets/exit_icon.svg?react"
import SwitchMode from "../assets/switch_mode.svg?react"
import "../styles/header-style.css"

const Header = () => {
    const navigate = useNavigate();
    const id = localStorage.getItem("id");
    return (
        <header className="header">
            <div className="header-container">
                <span onClick={() => navigate("/")} className="logo-span">

                    <div>
                        <p>Шифт</p>
                        <p>Cinema</p>
                    </div>
                    <Logo/>
                </span>
                <div className="desktop-navigation">
                    <span onClick={() => navigate(`/account/${id}`)} className="desktop-navigation-span">
                        <UserIcon/>
                        <p>Профиль</p>
                    </span>
                    <span className="desktop-navigation-span">
                        <TicketIcon/>
                        <p>Билеты</p>
                    </span>
                </div>

                <span className="desktop-navigation-span">
                    <ExitIcon/>
                    <p>Выйти</p>
                </span>
                <span className="desktop-navigation-span">
                    <SwitchMode/>
                </span>
            </div>
        </header>
    )
}

export default Header