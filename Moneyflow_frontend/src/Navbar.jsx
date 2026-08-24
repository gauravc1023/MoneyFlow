import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {

    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");

    const isLoggedIn = !!token;

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");

        navigate("/");
        setMenuOpen(false);
    };

    const handleProfile = () => {
        if (role === "ADMIN") {
            navigate("/admin/profile");
        } else {
            navigate("/profile");
        }

        setMenuOpen(false);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="navbar">

            {/* Logo */}
            <Link
                to="/"
                className="navbar-logo"
                onClick={closeMenu}
            >
                <i className="fa-solid fa-wallet"></i>
                <span>MoneyFlow</span>
            </Link>


            {/* Desktop Navigation */}
            <div className="navbar-links">

                <Link to="/">
                    Home
                </Link>

                <a href="/#features">
                    Features
                </a>

                <a href="/#about">
                    About
                </a>

                <a href="/#how-it-works">
                    How It Works
                </a>

                {isLoggedIn && role === "USER" && (
                    <Link to="/user">
                        Dashboard
                    </Link>
                )}

                {isLoggedIn && role === "ADMIN" && (
                    <Link to="/admin">
                        Dashboard
                    </Link>
                )}

            </div>


            {/* Desktop Buttons */}
            <div className="navbar-buttons">

                {!isLoggedIn ? (
                    <>
                        <Link
                            to="/login"
                            className="navbar-login"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="navbar-get-started"
                        >
                            Get Started
                        </Link>
                    </>
                ) : (
                    <>
                        <span className="navbar-role">
                            {role}
                        </span>

                        <button
                            className="navbar-logout"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                        <button
                            className="profile-btn"
                            onClick={handleProfile}
                        >
                            👤 Profile
                        </button>
                    </>
                )}

            </div>


            {/* Mobile Menu Button */}
            <button
                className="mobile-menu-btn"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </button>


            {/* Mobile Menu */}
            {menuOpen && (
                <div className="mobile-menu">

                    <Link
                        to="/"
                        onClick={closeMenu}
                    >
                        Home
                    </Link>

                    <a
                        href="/#features"
                        onClick={closeMenu}
                    >
                        Features
                    </a>

                    <a
                        href="/#about"
                        onClick={closeMenu}
                    >
                        About
                    </a>

                    <a
                        href="/#how-it-works"
                        onClick={closeMenu}
                    >
                        How It Works
                    </a>

                    {isLoggedIn && role === "USER" && (
                        <Link
                            to="/user"
                            onClick={closeMenu}
                        >
                            Dashboard
                        </Link>
                    )}

                    {isLoggedIn && role === "ADMIN" && (
                        <Link
                            to="/admin"
                            onClick={closeMenu}
                        >
                            Dashboard
                        </Link>
                    )}


                    {!isLoggedIn ? (
                        <div className="mobile-auth-buttons">

                            <Link
                                to="/login"
                                className="navbar-login"
                                onClick={closeMenu}
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="navbar-get-started"
                                onClick={closeMenu}
                            >
                                Get Started
                            </Link>

                        </div>
                    ) : (
                        <div className="mobile-auth-buttons">

                            <span className="navbar-role">
                                {role}
                            </span>

                            <button
                                className="profile-btn"
                                onClick={handleProfile}
                            >
                                👤 Profile
                            </button>

                            <button
                                className="navbar-logout"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        </div>
                    )}

                </div>
            )}

        </nav>
    );
};

export default Navbar;