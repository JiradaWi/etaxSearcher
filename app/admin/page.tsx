"use client";

import { useState, useEffect } from "react";

interface Shop {
  THName: string;
  ENName: string;
  tags: string[];
  Note?: string;
}

export default function AdminPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [newShop, setNewShop] = useState<Shop>({
    THName: "",
    ENName: "",
    tags: [],
    Note: "",
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    fetchShops();
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculate pagination
  const totalPages = Math.ceil(shops.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentShops = shops.slice(startIndex, endIndex);

  const fetchShops = async () => {
    try {
      const response = await fetch("/api/shops");
      if (!response.ok) {
        throw new Error("Failed to fetch shops");
      }
      const data = await response.json();
      setShops(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load shops");
    } finally {
      setIsLoading(false);
    }
  };

  const saveToServer = async (updatedShops: Shop[]) => {
    try {
      const response = await fetch("/api/shops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedShops),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      const result = await response.json();
      console.log(result.message);
      await fetchShops(); // Refresh the data after saving
    } catch (error) {
      console.error("Error saving data:", error);
      setError("Failed to save changes. Please try again.");
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setNewShop({
        ...newShop,
        tags: [...newShop.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setNewShop({
      ...newShop,
      tags: newShop.tags.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async () => {
    if (newShop.THName && newShop.ENName) {
      let updatedShops;
      if (editingIndex !== null) {
        updatedShops = [...shops];
        updatedShops[editingIndex] = newShop;
      } else {
        updatedShops = [...shops, newShop];
      }

      await saveToServer(updatedShops);
      setNewShop({ THName: "", ENName: "", tags: [], Note: "" });
      setEditingIndex(null);
    }
  };

  const handleEdit = (index: number) => {
    setNewShop(shops[index]);
    setEditingIndex(index);
  };

  const handleDelete = async (index: number) => {
    const updatedShops = shops.filter((_, i) => i !== index);
    await saveToServer(updatedShops);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Add/Edit Shop
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thai Name
              </label>
              <input
                type="text"
                value={newShop.THName}
                onChange={(e) =>
                  setNewShop({ ...newShop, THName: e.target.value })
                }
                className="w-full p-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter Thai name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                English Name
              </label>
              <input
                type="text"
                value={newShop.ENName}
                onChange={(e) =>
                  setNewShop({ ...newShop, ENName: e.target.value })
                }
                className="w-full p-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter English name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                  className="flex-1 p-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Add a tag (Enter to add)"
                />
                <button
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Add Tag
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newShop.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(index)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Note
              </label>
              <textarea
                value={newShop.Note}
                onChange={(e) =>
                  setNewShop({ ...newShop, Note: e.target.value })
                }
                className="w-full p-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter note"
                rows={3}
              />
            </div>
            <div>
              <button
                onClick={handleSubmit}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {editingIndex !== null ? "Update Shop" : "Add Shop"}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop List</h2>
          <div className="grid grid-cols-1 gap-4">
            {currentShops.map((shop, index) => (
              <div
                key={startIndex + index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {shop.THName}
                    </h3>
                    <p className="text-gray-600">{shop.ENName}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {shop.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {shop.Note && (
                      <p className="mt-2 text-sm text-gray-500">{shop.Note}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(startIndex + index)}
                      className="px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(startIndex + index)}
                      className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="flex space-x-2">
                {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage === 1) {
                    pageNumber = i + 1;
                  } else if (currentPage === totalPages) {
                    pageNumber = totalPages - 2 + i;
                  } else {
                    pageNumber = currentPage - 1 + i;
                  }

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`w-10 py-2 text-sm font-medium rounded-md ${
                        currentPage === pageNumber
                          ? "bg-indigo-600 text-white"
                          : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                {totalPages > 3 && currentPage < totalPages - 1 && (
                  <>
                    <span className="px-2 py-2 text-gray-500">...</span>
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className={`w-10 py-2 text-sm font-medium rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
