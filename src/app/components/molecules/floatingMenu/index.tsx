import React, {useState} from "react";
import style from "./menu.module.scss";
import {IconHamburger, IconHeart, IconSearch, IconHome} from "../../../assets/icons";
import {useNavigate} from "react-router-dom";
import Modal from "../../elements/modal";
import {SearchCity} from "./searchCity";


const FloatingMenu = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [search, setShowSearch] = useState(false);
    const navigate = useNavigate();

    const handleSearch = () => {
        setShowSearch(true);
    };

    const navigateToLink = (searchResult: any) => () => {
        setShowSearch(false);
        navigate("/detail", {state: searchResult});
    };

    return (
        <>
            <Modal
                maxWidth={500}
                visible={search}
                closeModal={() => setShowSearch(false)}
                style={{top: "-5%"}}
            >
                <SearchCity onNavigate={navigateToLink}/>
            </Modal>
            <div className={style.menu}>
                <div
                    className={`${style.menu} ${style.menu__options} ${
                        showMenu ? style.menu__options__open : ""
                    }`}
                >
                    <IconSearch onClick={handleSearch}/>
                    <IconHeart onClick={() => navigate("/fav")}/>
                    <IconHome onClick={() => navigate("/")}/>
                </div>
                <div
                    className={style.menu__parentButton}
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <IconHamburger/>
                </div>
            </div>
        </>
    );
};

export default FloatingMenu;
