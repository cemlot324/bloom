"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UploadProvider } from "@/components/providers/uploadthing-provider";
import { 
  LayoutDashboard, 
  Package,
  PlusCircle,
  Settings,
  Menu,
  X,
  Plus
} from "lucide-react";
import { toast } from "sonner"

const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be positive"),
  category: z.string().min(1, "Category is required"),
});

type ProductFormData = z.infer<typeof productSchema>;

// Default vitamin categories
const defaultCategories = [
  "Fruity Collection",
  "Health",
  "Brain",
  "Eergy",
  "Wellness",
  "Minerals",
  "Probiotics"
];

interface NavItemProps {
  icon: React.ReactNode;  // or the specific type your icon uses
  text: string;
  active?: boolean;
  onClick: () => void;
}

function NavItem({ icon, text, active = false, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100
        ${active ? 'bg-gray-100 border-r-4 border-blue-500' : ''}
      `}
    >
      <span className="mr-3">{icon}</span>
      <span>{text}</span>
    </button>
  );
}

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState<string[]>([]);
  const [categories, setCategories] = useState(defaultCategories);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  useEffect(() => {
    fetchProducts();
    // Load saved categories from localStorage
    const savedCategories = localStorage.getItem('vitaminCategories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      const updatedCategories = [...categories, newCategory.trim()];
      setCategories(updatedCategories);
      localStorage.setItem('vitaminCategories', JSON.stringify(updatedCategories));
      setNewCategory("");
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!selectedCategory) {
        toast.error("Please select a category");
        return;
      }

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          price: Number(price),
          images: uploadedImages,
          category: selectedCategory,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      toast.success("Product created successfully");
      
      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setSelectedCategory("");
      setUploadedImages([]);
      fetchProducts(); // Refresh the products list
      
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <button
        className="fixed p-4 lg:hidden z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          <NavItem 
            icon={<Package size={20} />} 
            text="Products" 
            active={activeTab === "products"}
            onClick={() => setActiveTab("products")}
          />
          <NavItem 
            icon={<PlusCircle size={20} />} 
            text="Add Product" 
            active={activeTab === "add-product"}
            onClick={() => setActiveTab("add-product")}
          />
          <NavItem 
            icon={<Settings size={20} />} 
            text="Settings" 
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          />
        </nav>
      </aside>

      <main className={`
        lg:ml-64 transition-margin duration-300
        ${isSidebarOpen ? 'ml-64' : 'ml-0'}
      `}>
        <div className="p-8">
          {activeTab === "products" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product: any) => (
                  <div key={product._id} className="bg-white rounded-lg shadow p-6">
                    {product.images?.[0] && (
                      <img 
                        src={product.images[0]} 
                        alt={product.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="font-bold text-lg">{product.title}</h3>
                    <p className="text-gray-600 text-sm mt-2">{product.description}</p>
                    <p className="text-lg font-bold mt-2">£{product.price}</p>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2">
                      {product.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "add-product" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Add New Product</h2>
              <form onSubmit={handleSubmit} className="max-w-2xl bg-white rounded-lg shadow p-6">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Product Title
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded"
                    rows={4}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Price (£)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {categories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => handleCategorySelect(category)}
                        className={`px-4 py-2 rounded-full border transition-colors
                          ${selectedCategory === category 
                            ? 'bg-blue-500 text-white border-blue-500' 
                            : 'hover:bg-gray-100'
                          }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Add new category"
                        className="flex-1 p-2 border rounded"
                      />
                      <button
                        type="button"
                        onClick={handleAddCategory}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2"
                      >
                        <Plus size={16} />
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Images
                  </label>
                  <UploadProvider
                    endpoint="imageUploader"
                    onChange={(url) => {
                      if (url) {
                        setUploadedImages(prev => [...prev, url])
                      }
                    }}
                  />
                  <div className="mt-4 flex gap-4">
                    {uploadedImages.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`Upload ${index + 1}`}
                          className="w-24 h-24 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => setUploadedImages(images.filter((_, i) => i !== index))}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                  {isSubmitting ? "Adding Product..." : "Add Product"}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 