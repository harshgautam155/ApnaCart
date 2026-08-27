import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";

const CATEGORIES = ["Electronics", "Fashion", "Home & Living", "Beauty", "Sports", "Books"];

function AdminProductForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // present only when editing
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: CATEGORIES[0],
    description: "",
    price: "",
    countInStock: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);

  // If editing, load the existing product's data first
  useEffect(() => {
    if (!isEditMode) return;

    const loadProduct = async () => {
      try {
        const { data } = await axiosInstance.get(`/products/${id}`);
        const product = data.product || data;
        setFormData({
          name: product.name,
          brand: product.brand,
          category: product.category,
          description: product.description,
          price: product.price,
          countInStock: product.countInStock,
        });
        setImagePreview(product.image);
      } catch (error) {
        toast.error("Failed to load product");
        navigate("/admin/products");
      } finally {
        setFetching(false);
      }
    };

    loadProduct();
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file)); // instant local preview before upload
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEditMode && !imageFile) {
      toast.error("Please select a product image");
      return;
    }

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("brand", formData.brand);
    payload.append("category", formData.category);
    payload.append("description", formData.description);
    payload.append("price", formData.price);
    payload.append("countInStock", formData.countInStock);
    if (imageFile) {
      payload.append("image", imageFile); // field name must match your Multer upload.single("image")
    }

    setLoading(true);
    try {
      if (isEditMode) {
        await axiosInstance.put(`/products/${id}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product updated");
      } else {
        await axiosInstance.post("/products/admin/create", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product created");
      }
      navigate("/products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <p className="text-center py-20">Loading product...</p>;
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-3xl mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        {isEditMode ? "Edit Product" : "Create Product"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-[#1B2340]/20 rounded px-3 py-2 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            className="w-full border border-[#1B2340]/20 rounded px-3 py-2 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-[#1B2340]/20 rounded px-3 py-2 bg-white"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full border border-[#1B2340]/20 rounded px-3 py-2 bg-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              className="w-full border border-[#1B2340]/20 rounded px-3 py-2 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Stock Count</label>
            <input
              type="number"
              name="countInStock"
              value={formData.countInStock}
              onChange={handleChange}
              required
              min="0"
              className="w-full border border-[#1B2340]/20 rounded px-3 py-2 bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-[#1B2340]/20 rounded px-3 py-2 bg-white"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-3 w-32 h-32 object-cover rounded border border-[#1B2340]/20"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded font-semibold disabled:opacity-50"
          style={{ backgroundColor: "#D85A30", color: "#FDF1EC" }}
        >
          {loading
            ? "Saving..."
            : isEditMode
              ? "Update Product"
              : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default AdminProductForm;