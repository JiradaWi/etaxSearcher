"use client";

import ETAXJSON from "./etaxInfo.json";
import { useState, useMemo } from "react";

const ITEMS_PER_PAGE = 20;

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return ETAXJSON.filter((element) => {
      const searchTextUpper = inputValue.toUpperCase();
      const ENName = element.ENName.toUpperCase();
      const THName = element.THName.toUpperCase();
      const tags = element.tags;

      return (
        searchTextUpper === "" ||
        ENName.includes(searchTextUpper) ||
        THName.includes(searchTextUpper) ||
        tags.some((tag) => tag.toUpperCase().includes(searchTextUpper))
      );
    });
  }, [inputValue]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="">
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center"></div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <span id="bannerText" style={{ color: "white" }}>
                    ETAX Searcher
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div style={{ margin: "2%" }}>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                onChange={(e) => setInputValue(e.target.value)}
                type="search"
                name="searchTextbox"
                id="searchTextbox"
                className="block w-full p-4 ps-10 text-sm text-gray-900 rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-white placeholder:text-gray-500"
                placeholder="Search..."
                autoComplete="off"
              />
            </div>
          </div>
        </div>
        <br />
        <p className="text-gray-600 mb-4">
          ไหมเห็ด กรุณายืนยันกับพนักงานหน้าร้านอีกครั้งก่อนซื้อ
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {currentData.map((element, index) => (
            <div
              key={startIndex + index}
              className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 hover:-translate-y-1"
            >
              <div className="relative p-6">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gray-50 via-gray-50 to-transparent rounded-bl-full opacity-50"></div>

                <div className="flex items-center justify-between mb-6">
                  <span className="bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-teal-100 shadow-sm">
                    #{startIndex + index + 1}
                  </span>
                  <div className="flex flex-wrap gap-2 max-w-[70%] justify-end">
                    {element.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-pink-50 text-pink-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-pink-100 shadow-sm whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
                    {element.THName}
                  </h3>
                  <p className="text-gray-600 font-medium mb-4">
                    {element.ENName}
                  </p>
                  {element.Note && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-start gap-2">
                        <svg
                          className="w-4 h-4 text-gray-400 mt-0.5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {element.Note}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8 mb-8">
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
  );
}
