// ✅ src/api/productApi.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ✅ Helper to handle responses safely
const handleResponse = async (response, defaultErrorMessage) => {
  if (!response.ok) {
    let errorDetail;
    try {
      errorDetail = await response.json();
    } catch {
      errorDetail = {};
    }
    throw new Error(errorDetail.error || defaultErrorMessage);
  }
  return response.json();
};

// ✅ GET All Products
export const getAllProducts = async () => {
  try {
    console.log("📡 Fetching products from:", API_BASE_URL);

    const response = await fetch(API_BASE_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    return await handleResponse(response, "Failed to fetch products.");
  } catch (error) {
    console.error("❌ Error fetching products:", error.message);
    throw error;
  }
};

// ✅ POST New Product
export const createProduct = async (productData) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    return await handleResponse(response, "Failed to create product.");
  } catch (error) {
    console.error("❌ Error creating product:", error.message);
    throw error;
  }
};

// ✅ PUT Update Product
export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    return await handleResponse(response, `Failed to update product ${id}.`);
  } catch (error) {
    console.error("❌ Error updating product:", error.message);
    throw error;
  }
};

// ✅ DELETE Product
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });

    // Some servers return 204 No Content after deletion
    if (response.status === 204) return true;

    return await handleResponse(response, `Failed to delete product ${id}.`);
  } catch (error) {
    console.error("❌ Error deleting product:", error.message);
    throw error;
  }
};
