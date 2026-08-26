import React, { useEffect, useState } from "react";
import "./TransactionForm.css";

const TransactionForm = ({
    editingTransaction,
    onTransactionSaved
}) => {

    const [amount, setAmount] = useState("");
    const [type, setType] = useState("EXPENSE");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [categoryId, setCategoryId] = useState("");

    const [categories, setCategories] = useState([]);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [showNewCategory, setShowNewCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [categoryLoading, setCategoryLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (editingTransaction) {
            setAmount(editingTransaction.amount);
            setType(editingTransaction.type);
            setDescription(editingTransaction.description);
            setDate(editingTransaction.date);

            const category = categories.find(
                (cat) => cat.name === editingTransaction.categoryName
            );

            if (category) {
                setCategoryId(category.id);
            }
        }
    }, [editingTransaction, categories]);

    const handleAddCategory = async () => {

        const categoryName = newCategoryName.trim();

        if (!categoryName) {

            setError("Please enter a category name");

            return;
        }

        setCategoryLoading(true);
        setError("");
        setMessage("");

        try {

            const token = localStorage.getItem("authToken");

            const response = await fetch(
                "https://moneyflow-ws6d.onrender.com/api/categories",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        name: categoryName
                    })
                }
            );

            if (!response.ok) {

                const errorData = await response.json();

                throw new Error(
                    errorData.message ||
                    "Failed to create category"
                );
            }

            const newCategory = await response.json();

            // Add new category to dropdown
            setCategories((previousCategories) => [
                ...previousCategories,
                newCategory
            ]);

            // Automatically select new category
            setCategoryId(newCategory.id);

            // Close new category input
            setShowNewCategory(false);

            // Clear input
            setNewCategoryName("");

            setMessage(
                "Category added successfully!"
            );

        } catch (error) {

            console.error(error);

            setError(error.message);

        } finally {

            setCategoryLoading(false);

        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        try {

            const token = localStorage.getItem("authToken");

            const transactionData = {
                amount: Number(amount),
                type: type,
                description: description,
                date: date,
                category_id: Number(categoryId)
            };

            const url = editingTransaction
                ? `https://moneyflow-ws6d.onrender.com/api/transactions/${editingTransaction.id}`
                : "https://moneyflow-ws6d.onrender.com/api/transactions";

            const method = editingTransaction ? "PUT" : "POST";

            const response = await fetch(
                url,
                {
                    method: method,

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify(transactionData)
                }
            );

            if (!response.ok) {

                const errorData = await response.json();

                throw new Error(
                    errorData.message || "Failed to add transaction"
                );
            }

            const data = await response.json();

            console.log("Transaction created:", data);

            if (onTransactionSaved) { onTransactionSaved(data); }

            setMessage(editingTransaction ? "Transaction updated successfully!" : "Transaction added successfully!");

            // Clear form
            setAmount("");
            setType("EXPENSE");
            setDescription("");
            setDate("");
            setCategoryId("");

        } catch (error) {

            console.error(error);

            setError(error.message);
        }
    };

    const fetchCategories = async () => {
        try {

            const token = localStorage.getItem("authToken");

            const response = await fetch(
                "https://moneyflow-ws6d.onrender.com/api/categories",
                {
                    method: "GET",
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

            console.error(error);
            setError("Unable to load categories");

        }
    };

    return (
        <div className="transaction-form-container">

            <div className="transaction-form-card">

                <h2>{editingTransaction ? "Update Transaction" : "Add Transaction"}</h2>
                {message && (
                    <p className="success-message">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                <div className="form">
                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label>Amount</label>

                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount"
                            />
                        </div>


                        <div className="form-group">
                            <label>Type</label>

                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="EXPENSE">Expense</option>
                                <option value="INCOME">Income</option>
                            </select>
                        </div>


                        <div className="form-group">

                            <label>Category</label>

                            <select
                                value={categoryId}
                                onChange={(e) => {

                                    const value = e.target.value;

                                    setCategoryId(value);

                                    if (value === "ADD_NEW") {
                                        setShowNewCategory(true);
                                    } else {
                                        setShowNewCategory(false);
                                    }

                                }}
                            >

                                <option value="">
                                    Select Category
                                </option>

                                {categories.map((category) => (

                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>

                                ))}

                                <option value="ADD_NEW">
                                    + Add New Category
                                </option>

                            </select>

                            {showNewCategory && (

                                <div className="new-category-box">

                                    <input
                                        type="text"
                                        value={newCategoryName}
                                        onChange={(e) =>
                                            setNewCategoryName(e.target.value)
                                        }
                                        placeholder="Enter new category"
                                    />

                                    <button
                                        type="button"
                                        onClick={handleAddCategory}
                                        disabled={categoryLoading}
                                    >
                                        {categoryLoading
                                            ? "Adding..."
                                            : "Add Category"}
                                    </button>

                                </div>

                            )}

                        </div>


                        <div className="form-group">
                            <label>Description</label>

                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter description"
                            />
                        </div>


                        <div className="form-group">
                            <label>Date</label>

                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>


                        <button type="submit">
                            {editingTransaction ? "Edit Transaction" : "Add Transaction"}
                        </button>


                    </form>
                </div>
            </div>

        </div>
    );
};

export default TransactionForm;