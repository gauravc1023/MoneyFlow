import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { jwtDecode } from "jwt-decode";
import Navbar from "./Navbar";

const Auth = ({ mode }) => {

  const navigate = useNavigate();

  const isRegister = mode === "register";


  /* ==============================
     LOGIN STATE
  ============================== */

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [loginError, setLoginError] = useState("");


  /* ==============================
     REGISTER STATE
  ============================== */

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    adminKey: ""
  });

  const [role, setRole] = useState("USER");

  const [registerError, setRegisterError] = useState("");


  /* ==============================
     LOGIN
  ============================== */

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoginError("");

    try {

      const response = await fetch(
        "https://moneyflow-ws6d.onrender.com/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(loginData)
        }
      );


      const result = await response.json();


      if (!response.ok) {

        setLoginError(
          result.error || "Invalid email or password."
        );

        return;
      }


      /* ==============================
         GET JWT
      ============================== */

      const token = result.token;

      if (!token) {

        setLoginError(
          "Login successful, but token was not received."
        );

        return;
      }


      /* ==============================
         DECODE JWT
      ============================== */

      const decodedToken = jwtDecode(token);

      console.log("Decoded JWT:", decodedToken);


      /* ==============================
         GET ROLE
      ============================== */

      const userRole = String(
        decodedToken.role || ""
      )
        .replace("ROLE_", "")
        .toUpperCase();


      console.log("User Role:", userRole);


      if (
        userRole !== "USER" &&
        userRole !== "ADMIN"
      ) {

        setLoginError(
          "Invalid user role received from server."
        );

        return;
      }

      /* ==============================
         STORE AUTH DATA
      ============================== */

      localStorage.setItem("authToken", token);

      /* ==============================
         GET USER DETAILS
      ============================== */

      const userResponse = await fetch(
        `https://moneyflow-ws6d.onrender.com/api/users/email/${encodeURIComponent(decodedToken.sub)}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (!userResponse.ok) {
        setLoginError("Unable to fetch user details.");
        return;
      }

      const user = await userResponse.json();

      console.log("Logged-in user:", user);


      /* ==============================
         STORE USER DETAILS
      ============================== */

      localStorage.setItem("userId", user.id);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userRole", user.role);

      /* ==============================
         REDIRECT
      ============================== */

      if (userRole === "ADMIN") {

        navigate("/admin", {
          replace: true
        });

      } else {

        navigate("/user", {
          replace: true
        });
      }

    } catch (error) {

      console.error(
        "Login error:",
        error
      );

      setLoginError(
        "Unable to connect to server. Please try again."
      );
    }
  };


  /* ==============================
     REGISTER
  ============================== */

  const handleRegister = async (e) => {

    e.preventDefault();

    setRegisterError("");


    /* ==============================
       PASSWORD VALIDATION
    ============================== */

    if (
      registerData.password !==
      registerData.confirmPassword
    ) {

      setRegisterError(
        "Passwords do not match."
      );

      return;
    }


    try {

      let endpoint;

      let requestBody;


      /* ==============================
         USER REGISTRATION
      ============================== */

      if (role === "USER") {

        endpoint =
          "https://moneyflow-ws6d.onrender.com/api/auth/register/user";

        requestBody = {

          name: registerData.name,

          email: registerData.email,

          password: registerData.password,

          confirmPassword:
            registerData.confirmPassword
        };
      }


      /* ==============================
         ADMIN REGISTRATION
      ============================== */

      else {

        endpoint =
          "https://moneyflow-ws6d.onrender.com/api/auth/register/admin";

        requestBody = {

          name: registerData.name,

          email: registerData.email,

          password: registerData.password,

          confirmPassword:
            registerData.confirmPassword,

          adminKey: registerData.adminKey
        };
      }


      /* ==============================
         API REQUEST
      ============================== */

      const response = await fetch(
        endpoint,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(requestBody)
        }
      );


      const result = await response.json();


      /* ==============================
         SUCCESS
      ============================== */

      if (response.ok) {

        setRegisterData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          adminKey: ""
        });

        setRole("USER");

        /*
          Registration successful.
          Go to separate Login page.
        */

        navigate("/login", {
          replace: true
        });

        return;
      }


      /* ==============================
         REGISTRATION ERROR
      ============================== */

      setRegisterError(
        result.error ||
        "Registration failed."
      );

    } catch (error) {

      console.error(
        "Registration error:",
        error
      );

      setRegisterError(
        "Unable to connect to server. Please try again."
      );
    }
  };


  /* ==============================
     ROLE SELECTION
  ============================== */

  const selectUserRole = () => {

    setRole("USER");

    setRegisterError("");

    setRegisterData((previous) => ({
      ...previous,
      adminKey: ""
    }));
  };


  const selectAdminRole = () => {

    setRole("ADMIN");

    setRegisterError("");
  };


  /* ==============================
     LOGIN UI
  ============================== */

  return (

    <>
      <div className="auth-page" >
        <Navbar />
        <div className="auth-container">
          <div
            className={`auth-wrapper ${isRegister ? "toggled" : ""
              }`}
          >

            {/* Background Shapes */}

            <div className="background-shape"></div>

            <div className="secondary-shape"></div>


            {/* =================================================
            LOGIN
         ================================================= */}

            <div className="credentials-panel signin">

              <h2 className="slide-element">
                Login
              </h2>


              <form onSubmit={handleLogin}>

                {/* Email */}

                <div className="field-wrapper slide-element">

                  <input
                    type="email"
                    placeholder=" "
                    required
                    value={loginData.email}

                    onChange={(e) => {

                      setLoginData({
                        ...loginData,
                        email: e.target.value
                      });

                      setLoginError("");
                    }}
                  />

                  <label>Email</label>

                  <i className="fa-solid fa-envelope"></i>

                </div>


                {/* Password */}

                <div className="field-wrapper slide-element">

                  <input
                    type="password"
                    placeholder=" "
                    required
                    value={loginData.password}

                    onChange={(e) => {

                      setLoginData({
                        ...loginData,
                        password: e.target.value
                      });

                      setLoginError("");
                    }}
                  />

                  <label>Password</label>

                  <i className="fa-solid fa-lock"></i>

                </div>


                {/* Login Error */}

                {loginError && (
                  <div className="error-message">
                    {loginError}
                  </div>
                )}


                {/* Login Button */}

                <div className="field-wrapper slide-element">

                  <button
                    className="submit-button"
                    type="submit"
                  >
                    Login
                  </button>

                </div>


                {/* Register Link */}

                <div className="switch-link slide-element">

                  <p>

                    Don't have an account?

                    <br />

                    <span
                      onClick={() =>
                        navigate("/register")
                      }
                    >
                      Sign Up
                    </span>

                  </p>

                </div>

              </form>

            </div>


            {/* Login Welcome */}

            <div className="welcome-section signin">

              <h2 className="slide-element">

                WELCOME
                <br />
                BACK!

              </h2>

            </div>


            {/* =================================================
            REGISTER
         ================================================ */}

            <div className="credentials-panel signup">

              <h2 className="slide-element">
                Register
              </h2>


              <form onSubmit={handleRegister}>

                {/* Role Selection */}

                <div className="role-selection slide-element">

                  <button
                    type="button"
                    className={`role-card ${role === "USER"
                      ? "active"
                      : ""
                      }`}

                    onClick={selectUserRole}
                  >

                    <i className="fa-solid fa-user"></i>

                    <span>User</span>

                  </button>


                  <button
                    type="button"
                    className={`role-card ${role === "ADMIN"
                      ? "active"
                      : ""
                      }`}

                    onClick={selectAdminRole}
                  >

                    <i className="fa-solid fa-shield-halved"></i>

                    <span>Admin</span>

                  </button>

                </div>


                {/* Name */}

                <div className="field-wrapper slide-element">

                  <input
                    type="text"
                    placeholder=" "
                    required
                    value={registerData.name}

                    onChange={(e) => {

                      setRegisterData({
                        ...registerData,
                        name: e.target.value
                      });

                      setRegisterError("");
                    }}
                  />

                  <label>Name</label>

                  <i className="fa-solid fa-user"></i>

                </div>


                {/* Email */}

                <div className="field-wrapper slide-element">

                  <input
                    type="email"
                    placeholder=" "
                    required
                    value={registerData.email}

                    onChange={(e) => {

                      setRegisterData({
                        ...registerData,
                        email: e.target.value
                      });

                      setRegisterError("");
                    }}
                  />

                  <label>Email</label>

                  <i className="fa-solid fa-envelope"></i>

                </div>


                {/* Password */}

                <div className="field-wrapper slide-element">

                  <input
                    type="password"
                    placeholder=" "
                    required
                    value={registerData.password}

                    onChange={(e) => {

                      setRegisterData({
                        ...registerData,
                        password: e.target.value
                      });

                      setRegisterError("");
                    }}
                  />

                  <label>Password</label>

                  <i className="fa-solid fa-lock"></i>

                </div>


                {/* Confirm Password */}

                <div className="field-wrapper slide-element">

                  <input
                    type="password"
                    placeholder=" "
                    required
                    value={
                      registerData.confirmPassword
                    }

                    onChange={(e) => {

                      setRegisterData({
                        ...registerData,
                        confirmPassword:
                          e.target.value
                      });

                      setRegisterError("");
                    }}
                  />

                  <label>
                    Confirm Password
                  </label>

                  <i className="fa-solid fa-lock"></i>

                </div>


                {/* Admin Key */}

                {role === "ADMIN" && (

                  <div className="field-wrapper slide-element">

                    <input
                      type="password"
                      placeholder=" "
                      required
                      value={registerData.adminKey}

                      onChange={(e) => {

                        setRegisterData({
                          ...registerData,
                          adminKey: e.target.value
                        });

                        setRegisterError("");
                      }}
                    />

                    <label>
                      Admin Key
                    </label>

                    <i className="fa-solid fa-key"></i>

                  </div>
                )}


                {/* Registration Error */}

                {registerError && (

                  <div className="error-message">
                    {registerError}
                  </div>
                )}


                {/* Register Button */}

                <div className="field-wrapper slide-element">

                  <button
                    className="submit-button"
                    type="submit"
                  >
                    Register
                  </button>

                </div>


                {/* Login Link */}

                <div className="switch-link slide-element">

                  <p>

                    Already have an account?

                    <br />

                    <span
                      onClick={() =>
                        navigate("/login")
                      }
                    >
                      Sign In
                    </span>

                  </p>

                </div>

              </form>

            </div>


            {/* Register Welcome */}

            <div className="welcome-section signup">

              <h2 className="slide-element">

                <span>WELCOME!</span>

                <span>TO</span>

                <span>MONEYFLOW</span>

              </h2>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;