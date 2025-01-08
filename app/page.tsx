"use client";

// import TableItem from './tableItem'
import ETAXJSON from "./etaxInfo.json";
import { ReactNode, useState } from "react";

// const userSearch = '';
let tableItem:  ReactNode[]= [];

export default function Home() {
 
  const [inputValue, setInputValue] = useState('')

  function checkEnter(e){
    const code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) { //Enter keycode
      handleSearch();
    }

  }

  function handleSearch() {    
    console.log('handle search 1');
    const result: ReactNode[] = [];
    let index = 1 ;
    const searchText = inputValue.toUpperCase();
    ETAXJSON.forEach((element) => {
      const ENName = element.ENName.toUpperCase();
      const THName = element.THName.toUpperCase();
      const tags = element.tags;
      if (
          ENName.includes(searchText) ||
          THName.includes(searchText) ||
          tags.includes(searchText)
      ) {
          const tags: object[] = [];
          element.tags.forEach(tag => {
              const key = ENName + tag;
              if(tag == 'OTOP'){
                  tags.push(
                      <button key={key} className="py-2 px-4 shadow-md bg-green-300 no-underline rounded-full text-black border-blue btn-primary hover:bg-blue-light focus:outline-none active:shadow-none mr-2">
                          {tag}
                      </button>
                  );
              }else{
                  tags.push(
                      <button key={key} className="py-2 px-4 shadow-md bg-pink-200 no-underline rounded-full text-black border-blue btn-primary hover:bg-blue-light focus:outline-none active:shadow-none mr-2">
                          {tag}
                      </button>
                  );
              }
              
          });
  
          const trkey = 'item'+index;
          const tdkey1 = 'itemtd1'+index;
          const tdkey2 = 'itemtd2'+index;
          const tdkey3 = 'itemtd3'+index;
          const tdkey4 = 'itemtd4'+index;
          const tdkey5 = 'itemtd5'+index;
        result.push(
          <tr key={trkey}>
          <td key={tdkey1} className="border px-4 py-2" data-name="#">{index}</td>
          <td key={tdkey2} className="border px-4 py-2" data-name="THNAME">{element.THName}</td>
          <td key={tdkey3} className="border px-4 py-2" data-name="ENNAME">{element.ENName}</td>
          <td key={tdkey4} className="border px-4 py-2" data-name="TAGS">
              {tags}
          </td>
          <td key={tdkey5} className="border px-4 py-2" data-name="ENNAME">{element.Note}</td>
        </tr>
        );
        index++;
      }


   
    });
  
   
    tableItem = result;
    console.log('handle search 2');
    // return result;
   
  }



  




  handleSearch();

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
          <div className="col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4">
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

          {/* <div className="col-span-1 sm:col-span-4 md:col-span-4 lg:col-span-1 xl:col-span-1">
            <button
              style={{ width: "100%" }}
              onClick={handleSearch}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div> */}
        </div>

        <br />
        <table className="table-auto" style={{ width: "100%" }}>
          <thead >
            <tr >
              <th className="px-4 py-2" key="head1">#</th>
              <th className="px-4 py-2" key="head2">TH Name</th>
              <th className="px-4 py-2" key="head3">EN Name</th>
              <th className="px-4 py-2" key="head4">Tags</th>
              <th className="px-4 py-2" key="head5">Note</th>
            </tr>
          </thead>
          <tbody>
            {/* <TableItem key="test" searchText={userSearch}></TableItem> */}
            {tableItem}
           
          </tbody>
        </table>
      </div>
    </div>
  );
}

