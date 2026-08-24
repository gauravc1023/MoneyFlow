import React, { useEffect, useState } from "react";
import "./UserDashboard.css";
import Navbar from "./Navbar";
import TransactionForm from "./TransactionForm";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";



const PIE_COLORS = [
    "#00d4ff",
    "#8b5cf6",
    "#25d98b",
    "#ff5b63",
    "#f59e0b",
    "#ec4899",
    "#6366f1",
];

const UserDashboard = () => {

    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
    const [monthlySummary, setMonthlySummary] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editingTransaction, setEditingTransaction] = useState(null);

    // Filtering and sorting
    const [filterType, setFilterType] = useState("ALL");
    const [sortOrder, setSortOrder] = useState("NEWEST");

    const [searchText, setSearchText] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");

    // =========================
    // FETCH SUMMARY
    // =========================

    const fetchSummary = async () => {

        try {

            const token = localStorage.getItem("authToken");

            const response = await fetch(
                "http://localhost:8080/api/transactions/summary",
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch transaction summary");
            }

            const data = await response.json();

            setSummary(data);

        } catch (error) {

            console.error("Summary fetch error:", error);

        }
    };

    const goToPreviousMonth = () => {
        setSelectedDate(prev => {
            const date = new Date(prev);
            date.setMonth(date.getMonth() - 1);
            return date;
        });
    };

    const goToNextMonth = () => {
        setSelectedDate(prev => {
            const date = new Date(prev);
            date.setMonth(date.getMonth() + 1);
            return date;
        });
    };


    // =========================
    // FETCH MONTHLY SUMMARY
    // =========================
    const fetchMonthlySummary = async () => {

        try {

            const token = localStorage.getItem("authToken");

            const now = new Date();

            const year = selectedDate.getFullYear();
            const month = selectedDate.getMonth() + 1;

            const response = await fetch(
                `http://localhost:8080/api/transactions/monthly/${year}/${month}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch monthly summary");
            }

            const data = await response.json();
            console.log("Monthly Summary:", data);

            setMonthlySummary(data);

        } catch (error) {

            console.error("Monthly summary error:", error);

        }
    };

    // =========================
    // FETCH TRANSACTIONS
    // =========================

    const fetchTransactions = async () => {

        try {

            setLoading(true);
            setError("");

            const token = localStorage.getItem("authToken");

            const response = await fetch(
                "http://localhost:8080/api/transactions/user",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
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
            setError("Unable to load transactions.");

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        if (!userId) {
            setError("User information not found. Please login again.");
            setLoading(false);
            return;
        }

        fetchTransactions();
        fetchSummary();
        fetchMonthlySummary();

    }, [userId, selectedDate]);


    // =========================
    // CALCULATE TOTALS
    // =========================

    const totalIncome = summary.totalIncome;
    const totalExpense = summary.totalExpense;
    const balance = summary.balance;


    // =========================
    // FILTER TRANSACTIONS
    // =========================


    const filteredTransactions = transactions
        .filter((transaction) => {

            const matchesSearch =
                transaction.description
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                transaction.categoryName
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase());

            const matchesFilter =
                filterType === "ALL" ||
                transaction.type === filterType;

            return matchesSearch && matchesFilter;

        })
        .sort((a, b) => {

            if (sortOrder === "newest") {
                return new Date(b.date) - new Date(a.date);
            }

            if (sortOrder === "oldest") {
                return new Date(a.date) - new Date(b.date);
            }

            if (sortOrder === "amountHigh") {
                return Number(b.amount) - Number(a.amount);
            }

            if (sortOrder === "amountLow") {
                return Number(a.amount) - Number(b.amount);
            }

            return 0;
        });


    // =========================
    // SORT TRANSACTIONS
    // =========================

    const sortedTransactions = [...filteredTransactions].sort(
        (a, b) => {

            if (sortOrder === "NEWEST") {
                return new Date(b.date) - new Date(a.date);
            }

            if (sortOrder === "OLDEST") {
                return new Date(a.date) - new Date(b.date);
            }

            if (sortOrder === "HIGH_AMOUNT") {
                return Number(b.amount) - Number(a.amount);
            }

            if (sortOrder === "LOW_AMOUNT") {
                return Number(a.amount) - Number(b.amount);
            }

            return 0;
        }
    );


    // =========================
    // EXPENSE BY CATEGORY
    // =========================

    const expenseByCategory = transactions
        .filter(transaction => transaction.type === "EXPENSE")
        .reduce((result, transaction) => {

            const category =
                transaction.categoryName || "Other";

            result[category] =
                (result[category] || 0) +
                Number(transaction.amount);

            return result;

        }, {});



    const categoryData = Object.entries(expenseByCategory);


    // =========================
    // EDIT
    // =========================

    const handleEdit = (transaction) => {

        setEditingTransaction(transaction);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // =========================
    // DELETE
    // =========================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const token = localStorage.getItem("authToken");

            const response = await fetch(
                `http://localhost:8080/api/transactions/${id}`,
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
            setTransactions(prev =>
                prev.filter(transaction => transaction.id !== id)
            );

        } catch (error) {

            console.error("Delete error:", error);

            alert("Unable to delete transaction.");
        }
    };


    // =========================
    // AFTER SAVE / UPDATE
    // =========================

    const handleTransactionSaved = () => {

        setEditingTransaction(null);

        fetchTransactions();
    };


    // =========================
    // LOGOUT
    // =========================

    const handleLogout = () => {

        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");

        window.location.href = "/";
    };

    const expenseChartData = Object.entries(expenseByCategory).map(
        ([category, amount]) => ({
            category: category,
            amount: Number(amount)
        })
    );


    return (
        <>
            <Navbar />

            <div className="dashboard-page">

                {/* ================= HEADER ================= */}

                <div className="dashboard-header">

                    <h1>User Dashboard</h1>

                    <p>
                        Welcome back, {userName || "User"}
                    </p>

                </div>


                {/* ================= SUMMARY ================= */}

                <div className="summary-container">

                    {/* INCOME */}

                    <div className="summary-card income-card">

                        <span>Total Income</span>

                        <h2>
                            ₹ {summary.totalIncome.toFixed(2)}
                        </h2>

                    </div>


                    {/* BALANCE */}

                    <div className="summary-card balance-card">

                        <span>Balance</span>

                        <h2>
                            ₹ {summary.balance.toFixed(2)}
                        </h2>

                    </div>


                    {/* EXPENSE */}

                    <div className="summary-card expense-card">

                        <span>Total Expense</span>

                        <h2>
                            ₹ {summary.totalExpense.toFixed(2)}
                        </h2>

                    </div>

                </div>

                {/* ================= MONTHLY SUMMARY ================= */}

                <div className="monthly-summary-container">

                    <div className="month-navigation">

                        <button onClick={goToPreviousMonth} >
                            ← Previous
                        </button>

                        <h2>
                            {selectedDate.toLocaleString("default", {
                                month: "long",
                                year: "numeric"
                            })}
                        </h2>

                        <button onClick={goToNextMonth}
                            disabled={
                                selectedDate.getFullYear() === new Date().getFullYear() &&
                                selectedDate.getMonth() === new Date().getMonth()
                            } >
                            Next →
                        </button>

                    </div>
                    <div className="summary-cards">
                        <div className="monthly-summary-card">
                            <span>Monthly Income</span>
                            <h2>
                                ₹ {monthlySummary?.totalIncome?.toFixed(2) || "0.00"}
                            </h2>
                        </div>

                        <div className="monthly-summary-card">
                            <span>Monthly Expense</span>
                            <h2>
                                ₹ {monthlySummary?.totalExpense?.toFixed(2) || "0.00"}
                            </h2>
                        </div>

                        <div className="monthly-summary-card">
                            <span>Monthly Balance</span>
                            <h2>
                                ₹ {monthlySummary?.balance?.toFixed(2) || "0.00"}
                            </h2>
                        </div>

                        <div className="monthly-summary-card">
                            <span>Transactions This Month</span>
                            <h2>
                                {monthlySummary?.transactionCount || 0}
                            </h2>
                        </div>

                        <div className="monthly-summary-card">
                            <span>Highest Expense Category</span>
                            <h2>
                                {monthlySummary?.highestExpenseCategory || "No expenses"}
                            </h2>
                        </div>
                    </div>

                </div>


                {/* ================= MAIN GRID ================= */}

                <div className="dashboard-main-grid">


                    {/* ================= TRANSACTION FORM ================= */}

                    <div className="transaction-panel">

                        <TransactionForm
                            editingTransaction={editingTransaction}
                            onTransactionSaved={handleTransactionSaved}
                        />

                    </div>

                    {/* ================= ANALYTICS ================= */}

                    <div className="analytics-panel">

                        <h2>Expense Analytics</h2>


                        {/* ================= BAR CHART ================= */}

                        <div className="chart-section">

                            <h3>Expense by Category</h3>

                            {expenseChartData.length > 0 ? (

                                <div className="expense-chart">

                                    {expenseChartData.map((item, index) => {

                                        const maxExpense = Math.max(
                                            ...expenseChartData.map(
                                                (expense) => expense.amount
                                            )
                                        );

                                        const percentage =
                                            maxExpense > 0
                                                ? (item.amount / maxExpense) * 100
                                                : 0;

                                        return (

                                            <div
                                                className="chart-row"
                                                key={index}
                                            >

                                                <div className="chart-label">

                                                    <span>
                                                        {item.category}
                                                    </span>

                                                    <strong>
                                                        ₹ {item.amount.toFixed(2)}
                                                    </strong>

                                                </div>


                                                <div className="chart-bar-background">

                                                    <div
                                                        className="chart-bar"
                                                        style={{
                                                            width: `${percentage}%`
                                                        }}
                                                    />

                                                </div>

                                            </div>

                                        );

                                    })}

                                </div>

                            ) : (

                                <p className="no-data">
                                    No expense data available
                                </p>

                            )}

                        </div>


                        {/* ================= PIE CHART ================= */}

                        <div className="pie-chart-section">

                            <h3>Expense Distribution</h3>

                            {expenseChartData.length > 0 ? (

                                <div className="pie-chart-container">

                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >

                                        <PieChart>

                                            <Pie
                                                data={expenseChartData}
                                                dataKey="amount"
                                                nameKey="category"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={100}
                                                innerRadius={45}
                                                paddingAngle={3}
                                                label
                                            >

                                                {expenseChartData.map(
                                                    (entry, index) => (

                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={
                                                                PIE_COLORS[
                                                                index %
                                                                PIE_COLORS.length
                                                                ]
                                                            }
                                                        />

                                                    )
                                                )}

                                            </Pie>


                                            <Tooltip />


                                            <Legend />

                                        </PieChart>

                                    </ResponsiveContainer>

                                </div>

                            ) : (

                                <p className="no-data">
                                    No expense data available
                                </p>

                            )}

                        </div>

                    </div>

                </div>


                {/* ================= FILTER / SORT / SEARCH ================= */}

                <div className="transaction-controls">

                    {/* SEARCH */}

                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                    />


                    {/* FILTER */}

                    <select
                        value={filterType}
                        onChange={(e) =>
                            setFilterType(e.target.value)
                        }
                    >

                        <option value="ALL">
                            All Transactions
                        </option>

                        <option value="INCOME">
                            Income
                        </option>

                        <option value="EXPENSE">
                            Expense
                        </option>

                    </select>


                    {/* SORT */}

                    <select
                        value={sortOrder}
                        onChange={(e) =>
                            setSortOrder(e.target.value)
                        }
                    >

                        <option value="oldest">
                            Oldest First
                        </option>

                        <option value="newest">
                            Newest First
                        </option>

                        <option value="amountHigh">
                            Amount: High to Low
                        </option>

                        <option value="amountLow">
                            Amount: Low to High
                        </option>

                    </select>

                </div>


                {/* ================= TRANSACTIONS ================= */}

                <div className="transactions-panel">

                    <div className="transactions-header">

                        <h2>
                            Recent Transactions
                        </h2>

                        <span>
                            {filteredTransactions.length} transactions
                        </span>

                    </div>


                    {loading && (
                        <p className="status-message">
                            Loading transactions...
                        </p>
                    )}


                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}


                    {!loading &&
                        !error &&
                        filteredTransactions.length === 0 && (

                            <p className="status-message">
                                No transactions found.
                            </p>

                        )
                    }


                    {!loading &&
                        !error &&
                        filteredTransactions.length > 0 && (

                            <div className="table-wrapper">

                                <table className="transactions-table">

                                    <thead>

                                        <tr>

                                            <th>Date</th>
                                            <th>Description</th>
                                            <th>Category</th>
                                            <th>Type</th>
                                            <th>Amount</th>
                                            <th>Actions</th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {filteredTransactions.map(
                                            (transaction) => (

                                                <tr key={transaction.id}>

                                                    <td>
                                                        {transaction.date}
                                                    </td>

                                                    <td>
                                                        {transaction.description}
                                                    </td>

                                                    <td>
                                                        {transaction.categoryName}
                                                    </td>

                                                    <td>

                                                        <span
                                                            className={
                                                                transaction.type === "INCOME"
                                                                    ? "type-income"
                                                                    : "type-expense"
                                                            }
                                                        >
                                                            {transaction.type}
                                                        </span>

                                                    </td>

                                                    <td>
                                                        ₹ {transaction.amount}
                                                    </td>

                                                    <td>

                                                        <button
                                                            className="edit-button"
                                                            onClick={() =>
                                                                handleEdit(transaction)
                                                            }
                                                        >
                                                            Edit
                                                        </button>


                                                        <button
                                                            className="delete-button"
                                                            onClick={() =>
                                                                handleDelete(transaction.id)
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        )}

                </div>

            </div>
        </>
    );
};


export default UserDashboard;