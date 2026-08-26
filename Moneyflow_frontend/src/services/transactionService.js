const API_URL = "https://moneyflow-ws6d.onrender.com/api/transactions";

const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
};

// Get logged-in user's transactions
export const getUserTransactions = async (userId) => {
    const response = await fetch(`${API_URL}/user/${userId}`, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch transactions");
    }

    return response.json();
};

// Add transaction
export const addTransaction = async (transactionData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(transactionData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add transaction");
    }

    return response.json();
};

// Update transaction
export const updateTransaction = async (id, transactionData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(transactionData),
    });

    if (!response.ok) {
        throw new Error("Failed to update transaction");
    }

    return response.json();
};

// Delete transaction
export const deleteTransaction = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to delete transaction");
    }

    return response.text();
};