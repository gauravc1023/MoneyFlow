import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";


const Profile = () => {

    const [profile, setProfile] = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [editData, setEditData] = useState({
        name: "",
        email: ""
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const token = localStorage.getItem("authToken");

    // Get Profile
    const fetchProfile = async () => {

        try {

            const response = await fetch(
                "https://moneyflow-ws6d.onrender.com/api/users/me",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch profile");
            }

            const data = await response.json();

            setProfile(data);

            setEditData({
                name: data.name,
                email: data.email
            });

        } catch (error) {
            console.error(error);
        }
    };
    const navigate = useNavigate();
    useEffect(() => {
        fetchProfile();
    }, []);

    // Edit Profile
    const handleEditChange = (e) => {

        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        });

    };

    const handleUpdateProfile = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "https://moneyflow-ws6d.onrender.com/api/users/profile",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(editData)
                }
            );

            if (!response.ok) {
                throw new Error("Profile update failed");
            }

            const data = await response.json();

            setProfile(data);
            setShowEdit(false);

            alert("Profile updated successfully");

        } catch (error) {
            alert(error.message);
        }
    };

    // Password
    const handlePasswordChange = (e) => {

        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        });

    };

    const handleChangePassword = async (e) => {

        e.preventDefault();

        if (
            passwordData.newPassword !==
            passwordData.confirmPassword
        ) {
            alert("New password and confirm password do not match");
            return;
        }

        try {

            const response = await fetch(
                "https://moneyflow-ws6d.onrender.com/api/users/change-password",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(passwordData)
                }
            );

            const message = await response.text();

            if (!response.ok) {
                throw new Error(message);
            }

            alert("Password changed successfully");

            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });

            setShowPassword(false);

        } catch (error) {
            alert(error.message);
        }
    };

    if (!profile) {
        return <div className="profile-loading">Loading...</div>;
    }



    const handleCancel = () => {
        const role = localStorage.getItem("userRole");

        if (role === "ADMIN") {
            navigate("/admin");
        } else {
            navigate("/user");
        }
    };

    return (
        <div className="dashboard-page">
            <div className="profile-page">

                <div className="profile-card">

                    <h2>My Profile</h2>

                    <div className="profile-info">

                        <div className="profile-row">
                            <span>Name</span>
                            <strong>{profile.name}</strong>
                        </div>

                        <div className="profile-row">
                            <span>Email</span>
                            <strong>{profile.email}</strong>
                        </div>

                        <div className="profile-row">
                            <span>Role</span>
                            <strong className="role">
                                {profile.role}
                            </strong>
                        </div>

                    </div>

                    <div className="profile-actions">

                        <button
                            className="edit-btn"
                            onClick={() => setShowEdit(!showEdit)}
                        >
                            Edit Profile
                        </button>

                        <button
                            className="password-btn"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            Change Password
                        </button>

                        <button className="cancel-profile-btn" onClick={handleCancel}>
                            Cancel
                        </button>

                    </div>


                    {/* EDIT PROFILE */}

                    {showEdit && (

                        <form
                            className="profile-form"
                            onSubmit={handleUpdateProfile}
                        >

                            <h3>Edit Profile</h3>

                            <input
                                type="text"
                                name="name"
                                value={editData.name}
                                onChange={handleEditChange}
                                placeholder="Name"
                                required
                            />

                            <input
                                type="email"
                                name="email"
                                value={editData.email}
                                onChange={handleEditChange}
                                placeholder="Email"
                                required
                            />

                            <button type="submit">
                                Save Changes
                            </button>

                        </form>

                    )}


                    {/* CHANGE PASSWORD */}

                    {showPassword && (

                        <form
                            className="profile-form"
                            onSubmit={handleChangePassword}
                        >

                            <h3>Change Password</h3>

                            <input
                                type="password"
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                                placeholder="Current Password"
                                required
                            />

                            <input
                                type="password"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                placeholder="New Password"
                                required
                            />

                            <input
                                type="password"
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                                placeholder="Confirm New Password"
                                required
                            />

                            <button type="submit">
                                Change Password
                            </button>

                        </form>

                    )}

                </div>

            </div>
        </div>
    );
};

export default Profile;