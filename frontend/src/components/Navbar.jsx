import { useState } from 'react';
import logo from '../assets/logo.svg';
import './Navbar.css';
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {FaRegUserCircle, FaListAlt, FaHeart, FaShoppingCart, FaSignOutAlt, FaUserShield, FaBars, FaTimes} from "react-icons/fa";
import {RiArrowDropDownFill} from "react-icons/ri";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const userName = user?.userName || "Guest";
    const userImg = user?.userPicture || "https://ui-avatars.com/api/?name=" + userName;

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src={logo} alt="Logo" className="logo" />
            </div>

            <div className={`navbar-right ${menuOpen ? 'open' : ''}`}>
                <Link to="/" className="btn-home" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/shop" className="btn-shop" onClick={() => setMenuOpen(false)}>Shop</Link>
                <Link to="/help" className="btn-help" onClick={() => setMenuOpen(false)}>Help</Link>

                {user ? (

                    <div className="dropdown">
                        <ul className=" flex flex-col gap-2 max-w-[280px] ">
                            <li>
                                <details className="group">
                                    <summary className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
    <span className="flex gap-2 items-center">
        <img className="w-6 h-6 rounded-full" src={userImg} alt="User profile" />
        <span style={{ color: "#EE6C4D" }}>{userName}</span>
    </span>
                                        <RiArrowDropDownFill
                                            className="group-open:rotate-180 transition-transform duration-300"
                                            style={{ color: '#EE6C4D' }}
                                        />
                                    </summary>
                                    <article className="px-4 pb-4">
                                        <ul className="flex flex-col gap-4 pl-2 mt-4">
                                            <li className="flex items-center gap-2">
                                                <FaRegUserCircle className="w-5 h-5 text-gray-600" />
                                                <Link to="">Settings</Link>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <FaListAlt className="w-5 h-5 text-gray-600" />
                                                <Link to="/profiles">My Profiles</Link>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <FaHeart className="w-5 h-5 text-gray-600" />
                                                <Link to="/shop">Wish List</Link>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <FaShoppingCart className="w-5 h-5 text-gray-600" />
                                                <Link to="/shop">Cart Shop</Link>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <FaSignOutAlt className="w-5 h-5 text-gray-600" />
                                                <Link
                                                    to="/"
                                                    style={{ background: "none", boxShadow: "none" }}
                                                    onClick={() => logout()}
                                                >
                                                    Log Out
                                                </Link>
                                            </li>
                                        </ul>
                                    </article>
                                </details>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login" className="btn-login" onClick={() => setMenuOpen(false)}>
                        <FaUserShield className="login-icon" /> Login
                    </Link>
                )}
            </div>
            <button className="menu-toggle" onClick={toggleMenu}>
                {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
        </nav>
    );
}
