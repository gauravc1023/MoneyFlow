import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const LandingPage = () => {
    const navigate = useNavigate();

    return (

        <div className="landing-page">

            {/* ================= NAVBAR ================= */}
            <nav className="landing-navbar">

                <div className="landing-logo">
                    <i className="fa-solid fa-wallet"></i>
                    <span>MoneyFlow</span>
                </div>

                <div className="nav-links">
                    <a href="#home">Home</a>
                    <a href="#features">Features</a>
                    <a href="#about">About</a>
                    <a href="#how-it-works">How It Works</a>
                </div>

                <div className="nav-buttons">
                    <button
                        className="nav-login"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>

                    <button
                        className="nav-register"
                        onClick={() => navigate("/register")}
                    >
                        Get Started
                    </button>
                </div>

            </nav>


            {/* ================= HERO ================= */}
            <section className="hero-section" id="home">

                <div className="hero-content">

                    <span className="hero-badge">
                        <i className="fa-solid fa-chart-line"></i>
                        Smart Financial Management
                    </span>

                    <h1>
                        Take Control of
                        <span> Your Money</span>
                    </h1>

                    <p>
                        MoneyFlow helps you manage your income, expenses and
                        transactions in one simple and organized place.
                        Understand where your money goes and make smarter
                        financial decisions.
                    </p>

                    <div className="hero-buttons">

                        <button
                            className="primary-button"
                            onClick={() => navigate("/register")}
                        >
                            Get Started
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>

                        <button
                            className="secondary-button"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>

                    </div>

                    <div className="hero-info">

                        <div>
                            <i className="fa-solid fa-shield-halved"></i>
                            <span>Secure</span>
                        </div>

                        <div>
                            <i className="fa-solid fa-chart-pie"></i>
                            <span>Easy to Track</span>
                        </div>

                        <div>
                            <i className="fa-solid fa-bolt"></i>
                            <span>Simple & Fast</span>
                        </div>

                    </div>

                </div>


                {/* Dashboard Visual */}
                <div className="hero-visual">

                    <div className="dashboard-card">

                        <div className="dashboard-header">
                            <div>
                                <span>Total Balance</span>
                                <h2>₹52,480</h2>
                            </div>

                            <div className="balance-icon">
                                <i className="fa-solid fa-wallet"></i>
                            </div>
                        </div>

                        <div className="dashboard-stats">

                            <div className="stat income">
                                <i className="fa-solid fa-arrow-down"></i>

                                <div>
                                    <span>Income</span>
                                    <strong>₹75,000</strong>
                                </div>
                            </div>

                            <div className="stat expense">
                                <i className="fa-solid fa-arrow-up"></i>

                                <div>
                                    <span>Expenses</span>
                                    <strong>₹22,520</strong>
                                </div>
                            </div>

                        </div>

                        <div className="chart-area">

                            <div className="chart-title">
                                <span>Monthly Overview</span>
                                <i className="fa-solid fa-ellipsis"></i>
                            </div>

                            <div className="chart-bars">
                                <span style={{ height: "45%" }}></span>
                                <span style={{ height: "65%" }}></span>
                                <span style={{ height: "40%" }}></span>
                                <span style={{ height: "80%" }}></span>
                                <span style={{ height: "60%" }}></span>
                                <span style={{ height: "90%" }}></span>
                                <span style={{ height: "70%" }}></span>
                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= FEATURES ================= */}
            <section className="features-section" id="features">

                <div className="section-heading">

                    <span>FEATURES</span>

                    <h2>
                        Everything You Need to
                        <strong> Manage Your Money</strong>
                    </h2>

                    <p>
                        MoneyFlow gives you the tools you need to understand
                        and organize your personal finances.
                    </p>

                </div>


                <div className="features-grid">

                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fa-solid fa-money-bill-trend-up"></i>
                        </div>

                        <h3>Income Management</h3>

                        <p>
                            Keep track of your income and understand how much
                            money is coming into your account.
                        </p>
                    </div>


                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fa-solid fa-receipt"></i>
                        </div>

                        <h3>Expense Tracking</h3>

                        <p>
                            Record your expenses and identify where your money
                            is being spent.
                        </p>
                    </div>


                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fa-solid fa-layer-group"></i>
                        </div>

                        <h3>Categories</h3>

                        <p>
                            Organize your transactions using meaningful
                            categories for better financial visibility.
                        </p>
                    </div>


                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fa-solid fa-clock-rotate-left"></i>
                        </div>

                        <h3>Transaction History</h3>

                        <p>
                            Easily view and manage your previous financial
                            transactions whenever you need them.
                        </p>
                    </div>


                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fa-solid fa-chart-pie"></i>
                        </div>

                        <h3>Financial Insights</h3>

                        <p>
                            Get a clearer picture of your financial activity
                            through organized summaries and statistics.
                        </p>
                    </div>


                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fa-solid fa-lock"></i>
                        </div>

                        <h3>Secure Authentication</h3>

                        <p>
                            Your account is protected with secure authentication
                            and role-based access.
                        </p>
                    </div>

                </div>

            </section>


            {/* ================= ABOUT ================= */}
            <section className="about-section" id="about">

                <div className="about-visual">

                    <div className="about-card">

                        <i className="fa-solid fa-wallet"></i>

                        <h3>One Place.</h3>
                        <h3>Complete Control.</h3>

                        <p>
                            Your financial information organized in one place.
                        </p>

                    </div>

                </div>


                <div className="about-content">

                    <span>ABOUT MONEYFLOW</span>

                    <h2>
                        Make Your Financial
                        <strong> Journey Simpler</strong>
                    </h2>

                    <p>
                        Managing personal finances can become complicated when
                        income, expenses and transactions are spread across
                        different places.
                    </p>

                    <p>
                        MoneyFlow brings everything together into a simple
                        platform where you can record transactions, monitor
                        your spending and understand your financial position.
                    </p>

                    <div className="about-points">

                        <div>
                            <i className="fa-solid fa-circle-check"></i>
                            Easy to use
                        </div>

                        <div>
                            <i className="fa-solid fa-circle-check"></i>
                            Organized financial data
                        </div>

                        <div>
                            <i className="fa-solid fa-circle-check"></i>
                            Secure role-based access
                        </div>

                    </div>

                </div>

            </section>


            {/* ================= HOW IT WORKS ================= */}
            <section className="how-section" id="how-it-works">

                <div className="section-heading">

                    <span>HOW IT WORKS</span>

                    <h2>
                        Start Managing Your Money
                        <strong> in Three Simple Steps</strong>
                    </h2>

                </div>


                <div className="steps-container">

                    <div className="step-card">

                        <div className="step-number">01</div>

                        <i className="fa-solid fa-user-plus"></i>

                        <h3>Create Your Account</h3>

                        <p>
                            Register your account and securely access your
                            MoneyFlow dashboard.
                        </p>

                    </div>


                    <div className="step-card">

                        <div className="step-number">02</div>

                        <i className="fa-solid fa-file-invoice-dollar"></i>

                        <h3>Add Transactions</h3>

                        <p>
                            Record your income and expenses and organize them
                            using categories.
                        </p>

                    </div>


                    <div className="step-card">

                        <div className="step-number">03</div>

                        <i className="fa-solid fa-chart-line"></i>

                        <h3>Understand Your Money</h3>

                        <p>
                            Review your financial activity and make better
                            decisions based on your spending.
                        </p>

                    </div>

                </div>

            </section>


            {/* ================= CTA ================= */}
            <section className="cta-section">

                <div className="cta-content">

                    <i className="fa-solid fa-wallet"></i>

                    <h2>
                        Ready to Take Control of Your Money?
                    </h2>

                    <p>
                        Start organizing your finances with MoneyFlow today.
                    </p>

                    <button
                        className="primary-button"
                        onClick={() => navigate("/register")}
                    >
                        Get Started
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>

                </div>

            </section>


            {/* ================= FOOTER ================= */}
            <footer className="landing-footer">

                <div className="footer-logo">
                    <i className="fa-solid fa-wallet"></i>
                    MoneyFlow
                </div>

                <p>
                    Simple. Organized. Smarter money management.
                </p>

                <div className="footer-links">
                    <a href="#home">Home</a>
                    <a href="#features">Features</a>
                    <a href="#about">About</a>
                    <a href="#how-it-works">How It Works</a>
                </div>

                <div className="footer-bottom">
                    © 2026 MoneyFlow. All rights reserved.
                </div>

            </footer>

        </div>

    );
};

export default LandingPage;