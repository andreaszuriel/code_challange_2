"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Backendless from "@/lib/backendless";
import ProductCard from "@/components/productCard.module";

interface Product {
  category: string;
  image: string;
  productName: string;
  specification: string;
  price: number;
}

export default function Page() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(() => 
    typeof window !== 'undefined' ? localStorage.getItem('searchQuery') || '' : ''
  );
  const [categoryFilter, setCategoryFilter] = useState<string>(() => 
    typeof window !== 'undefined' ? localStorage.getItem('categoryFilter') || '' : ''
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(() => 
    typeof window !== 'undefined' ? (localStorage.getItem('sortOrder') as "asc" | "desc") || 'asc' : 'asc'
  );
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Persist filters to localStorage
  useEffect(() => {
    localStorage.setItem('searchQuery', searchQuery);
    localStorage.setItem('categoryFilter', categoryFilter);
    localStorage.setItem('sortOrder', sortOrder);
  }, [searchQuery, categoryFilter, sortOrder]);

  const formatPrice = (price: number): string => {
    return price.toLocaleString("en-US") + "$";
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setCategoryFilter("");
    setSortOrder("asc");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Backendless.Data.of("products").find<Product>();
        setProducts(response);
        const uniqueCategories = [
          ...new Set(response.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err: unknown) {
        setError("Failed to fetch products: " + (err instanceof Error ? err.message : 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    // Sorting logic
    filtered.sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });

    setFilteredProducts(filtered);
  }, [searchQuery, categoryFilter, products, sortOrder]);

  const handleBuyClick = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleSeeOtherProducts = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleOk = () => {
    router.push("/contact");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-error">{error}</p>;

  return (
    <div className="container mx-auto p-6 mt-20 pb-10">
      <Head>
        <title>Our Products - Your Company Name</title>
        <meta name="description" content="Explore our high-quality products with competitive pricing and specifications." />
      </Head>

      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-6 flex-grow">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input w-full p-2 rounded border flex-grow"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="input w-full p-2 rounded border flex-grow"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="input w-full p-2 rounded border flex-grow"
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
        <button
          onClick={clearAllFilters}
          className="w-full sm:w-auto px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
        >
          Clear Filters
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">
        Our Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.productName}
            category={product.category}
            image={product.image}
            productName={product.productName}
            specification={product.specification}
            price={formatPrice(product.price)}
            onBuyClick={() => handleBuyClick(product)}
          />
        ))}
      </div>

      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg w-full sm:max-w-sm text-center text-white">
            <h3 className="text-xl font-semibold mb-4 text-primary">
              For Quotations and Inquiries contact our teams
            </h3>
            <p className="text-gray-300 mb-6">
              You are interested in: {selectedProduct.productName}
            </p>
            <div className="flex justify-center space-x-2">
              <button
                className="w-1/2 py-2 px-4 text-sm font-semibold text-white bg-[#6b7a50] rounded-md hover:bg-[#5a6942] transition-all duration-300"
                onClick={handleOk}
              >
                Ok
              </button>
              <button
                className="w-1/2 py-2 px-4 text-sm font-semibold text-white bg-[#51749b] rounded-md hover:bg-[#415b7a] transition-all duration-300"
                onClick={handleSeeOtherProducts}
              >
                See Other Products
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}