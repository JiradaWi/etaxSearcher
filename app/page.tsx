"use client";

import { useState, useEffect, KeyboardEvent } from "react";
import ETAXJSON from "./etaxInfo.json";

interface Shop {
  THName: string;
  ENName: string;
  tags?: string[];
  URL?: string;
  Note?: string;
}

const ITEMS_PER_PAGE = 20;

const sheetUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTdvvl5XPEY6dVpi3iY7YUfWo_Oleb2mro3RxKLiGjjgNaPIbZefqdNrniE8PmMGw/pub?gid=1902185066&single=true&output=csv";
 
export default function Home() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState<Shop[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(sheetUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch data from Google Sheets");
        }

        // const csvData = await response.text();
        // const rows = csvData.split("\n").map((row) => row.split(","));

        // Convert CSV rows to JSON
        // const headers = rows[0].map((header) => header.trim());
        // const jsonData = rows
        //   .slice(1)
        //   .map((row) => {
        //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //     const obj: any = {};
        //     row.forEach((value, index) => {
        //       const header = headers[index];
        //       if (header) {
        //         if (header.startsWith("tags-")) {
        //           if (!obj.tags) {
        //             obj.tags = [];
        //           }
        //           obj.tags.push(value.trim());
        //           obj.tags = obj.tags.filter(Boolean);
        //         } else {
        //           obj[header] = value.trim();
        //         }

        //         if(!obj.URL){
        //           obj.URL = 'https://www.google.co.th/maps/search/'+obj.ENName;
        //         }
        //       }

             
        //     });
        //     return obj;
        //   })
        const jsonData: Shop[] = [];
        ETAXJSON.forEach((element) => {
          const ENName = element.ENName.toUpperCase();
          const THName = element.THName.toUpperCase();

          const URL = element.URL;
          const note = element.Note;

          const tag1 = element.tag1;
          const tag2 = element.tag2;
          const tag3 = element.tag3;

          const tagList: string[] = [];
          if(tag1 != ''){
            tagList.push(tag1);
          }

          if(tag2 != ''){
            tagList.push(tag2);
          }

          if(tag3 != ''){
            tagList.push(tag3);
          }

          const record: Shop = {ENName : ENName, THName : THName, tags : tagList, URL: URL, Note: note};
 
          jsonData.push(record);
        });
       //   .reverse();

        setShops(jsonData);
        setFilteredData(jsonData)
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full" />
          <div className="mt-4 text-2xl font-bold">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSearchBtn = () => {
    handleSearch(inputValue, 'input');
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {   
    if(e.code === 'Enter' || e.code === 'NumpadEnter'){
      handleSearch(inputValue, 'input');
    }
  }

  const handlePillSearch = (pillClicked: { tag: string }) => {
    handleSearch(pillClicked.tag, 'pill');
  };

  const clearFilter = () => {
    handleSearch('', 'input');
  };

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, endIndex);

 

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (searchText: string, searchType: string) => {
    setCurrentPage(1);
    const filteredShop: Shop[] = [];
    const searchTextUpper = searchText.toUpperCase();

    if(searchType === 'input' ){      
      shops.forEach((element) => {        
        const ENName = element.ENName.toUpperCase();
        const THName = element.THName.toUpperCase();
      
        if(searchTextUpper === "" ||
          ENName.includes(searchTextUpper) ||
          THName.includes(searchTextUpper)){
            filteredShop.push(element);
        }
      });
      
    } else if(searchType === 'pill'){
      shops.forEach((element) => {
        const tags = element.tags;
        const upperTag: string[] = [];
        tags.forEach((tag)=>{
          upperTag.push(tag.toUpperCase());
        })
        if(upperTag.includes(searchTextUpper)){
          filteredShop.push(element);
        }
      });
    }
    setFilteredData(filteredShop);
    setInputValue(searchText);    
  }


  return (
    <div className="bg-gray-200" style={{ minHeight: "100vh" }}>
      <nav className="sticky-nav">
        <div className="nav-content flex gap-2">
          <h1 className="text-lg text-black font-bold min-w-fit">
            ETAX
          </h1>
          <div className="w-full">
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
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                  />
                </svg>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3">
                  <input
                    type="search"
                    name="searchTextbox"
                    id="searchTextbox"
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyUp={(e) =>handleKeyPress(e) }
                    className="block w-full px-4 py-3 ps-10 text-sm text-gray-900 rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-white placeholder:text-gray-500"
                    placeholder="Search..."
                    autoComplete="off"
                    value={inputValue}
                  />
                </div>
                <div className="col-span-1" >
                  <button
                    style={{ width: '100%'}}
                    className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={() => handleSearchBtn()}
                  >
                    Search
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </nav>
      <div>
        <div className="text-gray-600 mb-4 px-4 py-2">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              1. กรุณายืนยันกับพนักงานหน้าร้านอีกครั้งก่อนซื้อ <br/>
              2. สถานที่ใน Google Map อาจไม่ตรงเป๊ะ 
            </div>
            <div className="flex justify-end ">
              <div>
                <button
                  className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={() => clearFilter()}
                >
                  Clear Filter
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {currentData.map((element, index) => (
            <div
              key={startIndex + index}
              className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 hover:-translate-y-1"
            >
              <div className="relative p-6">
                {/* <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gray-50 via-gray-50 to-transparent rounded-bl-full opacity-50"></div> */}

                <div className="flex items-center justify-between mb-6">
                  <span className="bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-teal-100 shadow-sm">
                    #{startIndex + index + 1}
                  </span>
                  <div className="flex flex-wrap gap-2 max-w-[70%] justify-end">
                    {element.tags.map((tag, tagIndex) => {
                      if(tag == 'OTOP'){
                        return (<button
                          onClick={() => handlePillSearch({ tag })}
                          key={tagIndex}
                          className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-100 shadow-sm whitespace-nowrap"
                        >
                          {tag}
                        </button>);
                      }else{
                        return (<button
                          onClick={() => handlePillSearch({ tag })}
                          key={tagIndex}
                          className="bg-pink-50 text-pink-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-pink-100 shadow-sm whitespace-nowrap"
                        >
                          {tag}
                        </button>);
                      }

                     
                    })}
                  </div>
                </div>

                <div className="relative">
                  <a href={element.URL}  target="_blank" >
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
                      {element.THName}
                    </h3>
                    <p className="text-gray-600 font-medium mb-4">
                      {element.ENName}
                    </p>
                  </a>
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

        {currentData.length === 0 && (
          <div className="text-center text-gray-600 mt-8">
            No results found for {inputValue}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8 mb-8 sticky bottom-0 bg-white p-2">
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
      <br />
    </div>
  );
}
