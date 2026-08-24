import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import Navbar from "./Navbar";


import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
const AdminDashboard = () => {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionError, setActionError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const [editingUser, setEditingUser] = useState(null);

    const [summary, setSummary] = useState(null);
    const [summaryLoading, setSummaryLoading] = useState(true);
    const [summaryError, setSummaryError] = useState("");

    const [openMenu, setOpenMenu] = useState(null);


    const [selectedUser, setSelectedUser] = useState(null);
    const [userTransactions, setUserTransactions] = useState([]);
    const [transactionsLoading, setTransactionsLoading] = useState(false);

    const [transactions, setTransactions] = useState([]);
    const [transactionLoading, setTransactionLoading] = useState(true);
    const [transactionError, setTransactionError] = useState("");

    const [transactionSearchTerm, setTransactionSearchTerm] = useState("");
    const [transactionTypeFilter, setTransactionTypeFilter] = useState("ALL");

    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const [categories, setCategories] = useState([]);
    const [categoryLoading, setCategoryLoading] = useState(true);
    const [categoryError, setCategoryError] = useState("");

    const [newCategory, setNewCategory] = useState("");
    const [editingCategory, setEditingCategory] = useState(null);

    const incomeExpenseData = summary
        ? [
            {
                name: "Income",
                value: summary.totalIncome
            },
            {
                name: "Expense",
                value: summary.totalExpense
            }
        ]
        : [];

    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
        fetchAdminSummary();
        fetchTransactions();
        fetchCategories();
    }, []);

    const handleAddCategory = async () => {
        if (!newCategory.trim()) {
            return;
        }

        try {
            const token = localStorage.getItem("authToken");

            const response = await fetch(
                "http://localhost:8080/api/categories",
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: newCategory.trim()
                    })
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Backend error:", errorData);
                throw new Error("Failed to add category");
            }

            const data = await response.json();

            console.log("Category added:", data);

            setCategories((previousCategories) => [
                ...previousCategories,
                data
            ]);

            setNewCategory("");


        } catch (error) {
            console.error("Add category error:", error);
        }
    };

    const handleDeleteCategory = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmed) {
            return;
        }

        try {

            const token = localStorage.getItem("authToken");

            const response = await fetch(
                `http://localhost:8080/api/categories/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete category");
            }

            setCategories((previousCategories) =>
                previousCategories.filter(
                    (category) => category.id !== id
                )
            );

        } catch (error) {

            console.error("Delete category error:", error);
            alert("Unable to delete category");
        }
    };

    const handleUpdateCategory = async () => {

        if (!editingCategory.name.trim()) {
            alert("Category name is required");
            return;
        }

        try {

            const token = localStorage.getItem("authToken");

            const response = await fetch(
                `http://localhost:8080/api/categories/${editingCategory.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        name: editingCategory.name.trim()
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update category");
            }

            const updatedCategory = await response.json();

            setCategories((previousCategories) =>
                previousCategories.map((category) =>
                    category.id === updatedCategory.id
                        ? updatedCategory
                        : category
                )
            );

            setEditingCategory(null);

        } catch (error) {

            console.error("Update category error:", error);
            alert("Failed to update category");
        }
    };

    const fetchCategories = async () => {
        const token = localStorage.getItem("authToken");

        try {
            setCategoryLoading(true);
            setCategoryError("");

            const response = await fetch(
                "http://localhost:8080/api/categories",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch categories");
            }

            const data = await response.json();

            setCategories(data);

        } catch (error) {

            console.error("Category fetch error:", error);
            setCategoryError("Failed to load categories");

        } finally {

            setCategoryLoading(false);
        }
    };

    const handleDeleteTransaction = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const token = localStorage.getItem("authToken");

            const response = await fetch(
                `http://localhost:8080/api/admin/transactions/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete transaction");
            }

            // Remove deleted transaction immediately
            setTransactions(previousTransactions =>
                previousTransactions.filter(transaction => transaction.id !== id)
            );

        } catch (error) {

            console.error("Delete error:", error);

            alert("Unable to delete transaction.");
        }
    };

    const fetchTransactions = async () => {
        const token = localStorage.getItem("authToken");

        try {
            setTransactionLoading(true);
            setTransactionError("");

            const response = await fetch(
                "http://localhost:8080/api/admin/transactions",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch transactions");
            }

            const data = await response.json();

            setTransactions(data);

        } catch (error) {
            console.error("Transaction fetch error:", error);
            setTransactionError("Failed to fetch transactions");
        } finally {
            setTransactionLoading(false);
        }
    };

    const fetchUsers = async () => {
        const token = localStorage.getItem("authToken");

        try {


            const response = await fetch(
                "http://localhost:8080/api/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            const data = await response.json();
            setUsers(data);
        }
        catch (error) {
            console.error("User fetched error : ", error)
            setError("Failed to fetch users");
        }
        finally {
            setLoading(false);
        }
    }


    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleUpdateUser = async () => {
        try {
            const token = localStorage.getItem("authToken");

            const response = await fetch(
                `http://localhost:8080/api/users/${editingUser.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        name: editingUser.name,
                        email: editingUser.email
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update user");
            }

            const updatedUser = await response.json()

            setUsers((previousUsers) =>
                previousUsers.map((user) =>
                    user.id === updatedUser.id ? updatedUser : user)
            );

            // Refresh the user list
            setEditingUser(null);
            await fetchUsers();
        } catch (error) {
            console.error("Error updating user:", error);
            setError("Failed to update user");
        }
    };

    const fetchAdminSummary = async () => {

        const token = localStorage.getItem("authToken");

        try {

            const response = await fetch(
                "http://localhost:8080/api/admin/summary",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch admin summary");
            }

            const data = await response.json();
            console.log("Admin Summary: ", data);

            setSummary(data);

        } catch (error) {

            console.error("Admin summary error:", error);
            setSummaryError("Failed to load admin summary");

        } finally {

            setSummaryLoading(false);
        }
    };


    const handleDeleteUser = async (userId) => {
        const confitmed = window.confirm("Are you sure you want to delete this user?");

        if (!confitmed) { return; }

        try {
            const token = localStorage.getItem("authToken")

            const response = await fetch(
                `http://localhost:8080/api/admin/users/${userId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete user");
            }
            await fetchUsers();
            setUsers((previousUsers) => previousUsers.filter((user) => user.id !== userId));

        }
        catch (error) {
            console.error("Error deleting user:", error);
            setError("Failed to delete user");
        }
    }

    const handleMakeUser = async (userId) => {
        try {
            const token = localStorage.getItem("authToken");

            const response = await fetch(
                `http://localhost:8080/api/admin/user/${userId}/role?role=USER`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error("You are not authorized to change this user's role.");
                }

                if (response.status === 401) {
                    throw new Error("Your session has expired. Please login again.");
                }

                throw new Error("Failed to make user");
            }

            const updatedUser = await response.json();

            setUsers((previousUsers) =>
                previousUsers.map((user) =>
                    user.id === updatedUser.id ? updatedUser : user
                )
            );

            setOpenMenu(null);

        } catch (error) {
            console.error("Error making user:", error);
            setActionError(error.message);
        }
    };

    const handleMakeAdmin = async (userId) => {
        try {
            const token = localStorage.getItem("authToken");

            const response = await fetch(
                `http://localhost:8080/api/admin/user/${userId}/role?role=ADMIN`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to make user admin");
            }

            const updatedUser = await response.json();

            setUsers((previousUsers) =>
                previousUsers.map((user) =>
                    user.id === updatedUser.id ? updatedUser : user
                )
            );

            setOpenMenu(null);

        } catch (error) {
            console.error("Error making user admin:", error);
            setActionError("Failed to make user admin");
        }
    };

    const handleViewTransactions = async (userId) => {

        try {

            const token = localStorage.getItem("authToken");

            setTransactionsLoading(true);

            const response = await fetch(
                `http://localhost:8080/api/admin/users/${userId}/transactions`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch transactions");
            }

            const data = await response.json();

            setUserTransactions(data);

            const user = users.find(
                (user) => user.id === userId
            );

            setSelectedUser(user);

            setOpenMenu(null);

        } catch (error) {

            console.error(
                "Error fetching user transactions:",
                error
            );

            setError("Failed to fetch transactions");

        } finally {

            setTransactionsLoading(false);

        }
    };

    const filteredTransactions = transactions.filter((transaction) => {

        const search = transactionSearchTerm.toLowerCase();

        const matchesSearch =
            transaction.userName?.toLowerCase().includes(search) ||
            transaction.description?.toLowerCase().includes(search) ||
            transaction.categoryName?.toLowerCase().includes(search) ||
            transaction.type?.toLowerCase().includes(search);

        const matchesType =
            transactionTypeFilter === "ALL" ||
            transaction.type?.toUpperCase() === transactionTypeFilter;

        return matchesSearch && matchesType;
    });

    return (
        <>
            <Navbar />

            <div className="dashboard-page">

                <div className="admin-users-section">

                    <h2>Admin Summary</h2>

                    <div className="admin-summary-section">


                        {summaryLoading && <p>Loading summary...</p>}

                        {summaryError && <p>{summaryError}</p>}

                        {!summaryLoading && !summaryError && summary && (

                            <div className="summary-cards">

                                <div className="summary-card">
                                    <h3>Total Users</h3>
                                    <p>{summary.totalUsers}</p>
                                </div>

                                <div className="summary-card">
                                    <h3>Total Transactions</h3>
                                    <p>{summary.totalTransactions}</p>
                                </div>

                                <div className="summary-card">
                                    <h3>Total Income</h3>
                                    <p>₹ {summary.totalIncome?.toLocaleString("en-IN")}</p>
                                </div>

                                <div className="summary-card">
                                    <h3>Total Expense</h3>
                                    <p>₹ {summary.totalExpense?.toLocaleString("en-IN")}</p>
                                </div>

                                <div className="summary-card">
                                    <h3>Balance</h3>
                                    <p>₹ {summary.balance?.toLocaleString("en-IN")}</p>
                                </div>


                            </div>
                        )}

                    </div>

                    <div className="admin-analytics-section">

                        <h2>Financial Analytics</h2>

                        <div className="admin-charts-container">


                            {/* ================= PIE CHART ================= */}
                            <div className="admin-chart-card">

                                <h3>Income vs Expense</h3>

                                <ResponsiveContainer
                                    width="100%"
                                    height={350}
                                >

                                    <PieChart>

                                        <Pie
                                            data={incomeExpenseData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={110}
                                            label
                                        >

                                            <Cell fill="#00d4ff" />
                                            <Cell fill="#ff6b6b" />

                                        </Pie>

                                        <Tooltip />
                                        <Legend />

                                    </PieChart>

                                </ResponsiveContainer>

                            </div>

                            {/* ================= BAR CHART ================= */}

                            <div className="admin-chart-card">

                                <h3>Income vs Expense</h3>

                                <ResponsiveContainer width="100%" height={350}>

                                    <BarChart data={incomeExpenseData}>

                                        <CartesianGrid strokeDasharray="3 3" />

                                        <XAxis dataKey="name" />

                                        <YAxis />

                                        <Tooltip />

                                        <Legend />

                                        <Bar
                                            dataKey="value"
                                            name="Amount"
                                            fill="#00d4ff"
                                            radius={[6, 6, 0, 0]}
                                        />

                                    </BarChart>

                                </ResponsiveContainer>

                            </div>
                        </div>

                    </div>
                    <br />
                    <h2>User Management</h2>

                    {loading && <p>Loading users...</p>}

                    {error && <p>{error}</p>}

                    {!loading && !error && (
                        <div className="users-table-wrapper">
                            <div className="user-search">

                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />

                            </div>
                            {editingUser && (

                                <div className="edit-user-form">

                                    <h3>Edit User</h3>

                                    <input
                                        type="text"
                                        value={editingUser.name}
                                        onChange={(e) =>
                                            setEditingUser({
                                                ...editingUser,
                                                name: e.target.value
                                            })
                                        }
                                    />

                                    <input
                                        type="email"
                                        value={editingUser.email}
                                        onChange={(e) =>
                                            setEditingUser({
                                                ...editingUser,
                                                email: e.target.value
                                            })
                                        }
                                    />

                                    <button onClick={handleUpdateUser}>
                                        Save Changes
                                    </button>

                                    <button onClick={() => setEditingUser(null)}>
                                        Cancel
                                    </button>

                                </div>

                            )}
                            <table className="users-table">

                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {filteredUsers.map((user) => (

                                        <tr key={user.id}>

                                            <td>{user.id}</td>

                                            <td>{user.name}</td>

                                            <td>{user.email}</td>

                                            <td>{user.role}</td>

                                            <td className="actions-cell">

                                                <button
                                                    className="edit-button"
                                                    onClick={() => setEditingUser(user)}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="delete-button"
                                                    onClick={() => handleDeleteUser(user.id)}
                                                >
                                                    Delete
                                                </button>

                                                <div className="action-menu-container" >

                                                    <button
                                                        className="more-button"
                                                        onClick={() =>
                                                            setOpenMenu(
                                                                openMenu === user.id ? null : user.id
                                                            )
                                                        }
                                                    >
                                                        ⋮
                                                    </button>

                                                    {openMenu === user.id && (

                                                        <div className="action-dropdown">

                                                            <button
                                                                onClick={() => handleMakeAdmin(user.id)}
                                                            >
                                                                Make Admin
                                                            </button>

                                                            <button
                                                                onClick={() => handleMakeUser(user.id)}
                                                            >
                                                                Make User
                                                            </button>

                                                            <button
                                                                onClick={() => handleViewTransactions(user.id)}
                                                            >
                                                                View Transactions
                                                            </button>

                                                        </div>

                                                    )}

                                                </div>

                                            </td>

                                        </tr>
                                    ))}


                                </tbody>

                            </table>

                        </div>
                    )}

                    {selectedUser && (

                        <div className="user-transactions-section">

                            <div className="transactions-header">

                                <h2>
                                    Transactions of {selectedUser.name}
                                </h2>

                                <button
                                    onClick={() => {
                                        setSelectedUser(null);
                                        setUserTransactions([]);
                                    }}
                                >
                                    Close
                                </button>

                            </div>

                            {transactionsLoading && (
                                <p>Loading transactions...</p>
                            )}

                            {!transactionsLoading && userTransactions.length === 0 && (
                                <p>No transactions found.</p>
                            )}

                            {!transactionsLoading && userTransactions.length > 0 && (

                                <table className="users-table">

                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Date</th>
                                            <th>Type</th>
                                            <th>Category</th>
                                            <th>Description</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {userTransactions.map((transaction) => (

                                            <tr key={transaction.id}>

                                                <td>{transaction.id}</td>

                                                <td>{transaction.date}</td>

                                                <td>{transaction.type}</td>

                                                <td>{transaction.categoryName}</td>

                                                <td>{transaction.description}</td>

                                                <td>₹{transaction.amount}</td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            )}

                        </div>

                    )}
                    <br /><br />
                    <div className="category-management-section">

                        <div className="category-management-header">

                            <div>
                                <h2>Category Management</h2>
                                <p>
                                    Manage the categories available for transactions.
                                </p>
                            </div>

                        </div>


                        {/* ADD CATEGORY */}

                        <div className="add-category-form">

                            <input
                                type="text"
                                placeholder="Enter new category name..."
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleAddCategory();
                                    }
                                }}
                            />

                            <button
                                className="add-category-button"
                                onClick={handleAddCategory}
                            >
                                + Add Category
                            </button>

                        </div>


                        {/* CATEGORY LIST */}

                        {categoryLoading && (
                            <p className="category-message">
                                Loading categories...
                            </p>
                        )}

                        {categoryError && (
                            <p className="category-error">
                                {categoryError}
                            </p>
                        )}


                        {!categoryLoading &&
                            !categoryError &&
                            categories.length === 0 && (

                                <p className="category-message">
                                    No categories found.
                                </p>
                            )}


                        {!categoryLoading &&
                            !categoryError &&
                            categories.length > 0 && (

                                <div className="categories-table-wrapper">

                                    <table className="categories-table">

                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Category Name</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {categories.map((category) => (

                                                <tr key={category.id}>

                                                    <td>
                                                        {category.id}
                                                    </td>

                                                    <td>

                                                        {editingCategory?.id === category.id ? (

                                                            <input
                                                                className="edit-category-input"
                                                                type="text"
                                                                value={editingCategory.name}
                                                                onChange={(e) =>
                                                                    setEditingCategory({
                                                                        ...editingCategory,
                                                                        name: e.target.value
                                                                    })
                                                                }
                                                            />

                                                        ) : (

                                                            <span className="category-name">
                                                                {category.name}
                                                            </span>

                                                        )}

                                                    </td>


                                                    <td className="category-actions">

                                                        {editingCategory?.id === category.id ? (

                                                            <>
                                                                <button
                                                                    className="category-save-button"
                                                                    onClick={handleUpdateCategory}
                                                                >
                                                                    Save
                                                                </button>

                                                                <button
                                                                    className="category-cancel-button"
                                                                    onClick={() =>
                                                                        setEditingCategory(null)
                                                                    }
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </>

                                                        ) : (

                                                            <>
                                                                <button
                                                                    className="category-edit-button"
                                                                    onClick={() =>
                                                                        setEditingCategory(category)
                                                                    }
                                                                >
                                                                    Edit
                                                                </button>

                                                                <button
                                                                    className="category-delete-button"
                                                                    onClick={() =>
                                                                        handleDeleteCategory(category.id)
                                                                    }
                                                                >
                                                                    Delete
                                                                </button>
                                                            </>
                                                        )}

                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                    </table>

                                </div>
                            )}

                    </div>

                    <br /><br />

                    <div className="admin-transactions-section">

                        <h2>Transaction Management</h2>
                        <div className="transaction-filters">

                            <input
                                type="text"
                                placeholder="Search transactions..."
                                value={transactionSearchTerm}
                                onChange={(e) =>
                                    setTransactionSearchTerm(e.target.value)
                                }
                            />

                            <select
                                value={transactionTypeFilter}
                                onChange={(e) =>
                                    setTransactionTypeFilter(e.target.value)
                                }
                            >
                                <option value="ALL">All</option>
                                <option value="INCOME">Income</option>
                                <option value="EXPENSE">Expense</option>
                            </select>

                        </div>
                        {transactionLoading && (
                            <p>Loading transactions...</p>
                        )}

                        {transactionError && (
                            <p>{transactionError}</p>
                        )}

                        {!transactionLoading && !transactionError && (
                            <div className="transactions-table-wrapper">

                                <table className="transactions-table">

                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            {/* <th>User</th> */}
                                            <th>Amount</th>
                                            <th>Type</th>
                                            {/* <th>Category</th> */}
                                            {/* <th>Description</th> */}
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {filteredTransactions.map((transaction) => (

                                            <tr key={transaction.id}>

                                                <td>{transaction.id}</td>

                                                {/* <td>
                                                    {transaction.userName}
                                                </td> */}

                                                <td>
                                                    ₹ {transaction.amount}
                                                </td>

                                                <td>
                                                    {transaction.type}
                                                </td>

                                                {/* <td>
                                                    {transaction.categoryName}
                                                </td> */}

                                                {/* <td>
                                                    {transaction.description}
                                                </td> */}

                                                <td>
                                                    {transaction.date}
                                                </td>

                                                <td>
                                                    <button
                                                        className="view-button"
                                                        onClick={() => setSelectedTransaction(transaction)}
                                                    >
                                                        View
                                                    </button>

                                                    <button
                                                        className="delete-button"
                                                        onClick={() => handleDeleteTransaction(transaction.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>
                        )}

                    </div>
                    {selectedTransaction && (

                        <div className="transaction-modal-overlay">

                            <div className="transaction-modal">

                                <div className="transaction-modal-header">

                                    <h2>Transaction Details</h2>

                                    <button
                                        className="close-modal-button"
                                        onClick={() => setSelectedTransaction(null)}
                                    >
                                        ×
                                    </button>

                                </div>

                                <div className="transaction-details">

                                    <div className="detail-item">
                                        <span>Transaction ID</span>
                                        <strong>
                                            {selectedTransaction.id}
                                        </strong>
                                    </div>

                                    <div className="detail-item">
                                        <span>User</span>
                                        <strong>
                                            {selectedTransaction.userName}
                                        </strong>
                                    </div>

                                    <div className="detail-item">
                                        <span>Amount</span>
                                        <strong>
                                            ₹ {selectedTransaction.amount}
                                        </strong>
                                    </div>

                                    <div className="detail-item">
                                        <span>Type</span>
                                        <strong>
                                            {selectedTransaction.type}
                                        </strong>
                                    </div>

                                    <div className="detail-item">
                                        <span>Category</span>
                                        <strong>
                                            {selectedTransaction.categoryName}
                                        </strong>
                                    </div>

                                    <div className="detail-item">
                                        <span>Date</span>
                                        <strong>
                                            {selectedTransaction.date}
                                        </strong>
                                    </div>

                                    <div className="detail-item description-item">
                                        <span>Description</span>
                                        <strong>
                                            {selectedTransaction.description}
                                        </strong>
                                    </div>

                                </div>

                            </div>

                        </div>
                    )}

                </div>


            </div>

        </>
    );
};

export default AdminDashboard;