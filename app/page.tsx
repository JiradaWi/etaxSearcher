"use client";

import TableItem from './tableItem'
import { useState } from "react";

let userSearch = 'OTOP';

export default function Home() {
  // const [searchText, setSearchText] = useState({ searchTextbox: "" });

  const [inputValue, setInputValue] = useState('')

  function handleSearch() {
    
    userSearch = inputValue;
    // TableItem

  }

  function checkEnter(e){
    const code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) { //Enter keycode
      handleSearch();
    }

  }

  // const childRef = useRef();

  return (
    <div className="">
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center"></div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <span
                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                    aria-current="page"
                  >
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
          <div className="col-span-3 sm:col-span-4 md:col-span-4 lg:col-span-3 xl:col-span-3">
            <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
              <input
                onChange={(e) => setInputValue(e.target.value)}
                onKeyUp={checkEnter}
                type="text"
                name="searchTextbox"
                id="searchTextbox"
                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                placeholder="Search..."
              />
            </div>
          </div>

          <div className="col-span-1 sm:col-span-4 md:col-span-4 lg:col-span-1 xl:col-span-1">
            <button
              style={{ width: "100%" }}
              onClick={handleSearch}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </div>

        <br />
        <table className="table-auto" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">TH Name</th>
              <th className="px-4 py-2">EN Name</th>
              <th className="px-4 py-2">Tags</th>
            </tr>
          </thead>
          <tbody>
            <TableItem key="test" searchText={userSearch}></TableItem>
           
          </tbody>
        </table>
      </div>
    </div>
  );
}

