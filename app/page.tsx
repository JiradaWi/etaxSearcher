"use client";

// import TableItem from './tableItem'
import ETAXJSON from "./etaxInfo.json";
import { ReactNode, useState } from "react";

// const userSearch = '';


export default function Home() {
  const [inputValue, setInputValue] = useState("");
  let tableItem: ReactNode[] = [];
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
                 
                    <span id="bannerText" style={{color: "white"}}>ETAX Searcher</span>
                 
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
        ไหมเห็ด กรุณายืนยันกับพนักงานหน้าร้านอีกครั้งก่อนซื้อ
        <div  style={{ overflow: "scroll" }}>
          <table className="table-auto" style={{ width: "100%" }}>
            <thead className="bg-teal-100">
              <tr>
                <th className="px-4 py-2" key="head1">
                  #
                </th>
                <th className="px-4 py-2" key="head2">
                  TH Name
                </th>
                <th className="px-4 py-2" key="head3">
                  EN Name
                </th>
                <th className="px-4 py-2" key="head4">
                  Tags
                </th>
                <th className="px-4 py-2" key="head5">
                  Note
                </th>
              </tr>
            </thead>
            <tbody id="tbody">
              {/* <TableItem key="test" searchText={userSearch}></TableItem> */}
              {tableItem}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  function handleSearch() {
    const result: ReactNode[] = [];
    let index = 1;
    const searchTextUpper = inputValue.toUpperCase();
    ETAXJSON.forEach((element) => {
      const ENName = element.ENName.toUpperCase();
      const THName = element.THName.toUpperCase();
      const tags = element.tags;

      const tagCMP: ReactNode[] = [];
      if (
        ENName.includes(searchTextUpper) ||
        THName.includes(searchTextUpper) ||
        tags.includes(inputValue)
      ) {
        // const tags: object[] = [];
        element.tags.forEach( (tag: string) => {
          const key = ENName + tag;
          if (tag == "OTOP") {
            tagCMP.push(
              <button
                key={key}
                onClick={() => handlePillSearch( {tag})}
                className="py-2 px-4 shadow-md bg-green-300 no-underline rounded-full text-black border-blue btn-primary hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
              >
                {tag}
              </button>
            );
          } else {
            tagCMP.push(
              <button
                key={key}
                onClick={() => handlePillSearch( {tag})}
                className="py-2 px-4 shadow-md bg-pink-200 no-underline rounded-full text-black border-blue btn-primary hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
              >
                {tag}
              </button>
            );
          }
        });

        const trkey = "item" + index;
        const tdkey1 = "itemtd1" + index;
        const tdkey2 = "itemtd2" + index;
        const tdkey3 = "itemtd3" + index;
        const tdkey4 = "itemtd4" + index;
        const tdkey5 = "itemtd5" + index;
        result.push(
          <tr key={trkey}>
            <td key={tdkey1} className="border px-4 py-2" data-name="#">
              {index}
            </td>
            <td key={tdkey2} className="border px-4 py-2" data-name="THNAME">
              {element.THName}
            </td>
            <td key={tdkey3} className="border px-4 py-2" data-name="ENNAME">
              {element.ENName}
            </td>
            <td key={tdkey4} className="border px-4 py-2" data-name="TAGS">
              {tagCMP}
            </td>
            <td key={tdkey5} className="border px-4 py-2" data-name="ENNAME">
              {element.Note}
            </td>
          </tr>
        );
        index++;
      }
    });

    tableItem = result;
  }


  function handlePillSearch( tag: {tag: string} ) {
    
    setInputValue(tag.tag);

    console.log('handlePillSearch');
    const pillValue = tag.tag;
    console.log('pillValue1: '+JSON.stringify(pillValue));
    // console.log('pillValue2: '+e.target.innerHTML);
    let index = 1;

    const result: ReactNode[] = [];

    ETAXJSON.forEach((element) => {
      const tags = element.tags;
          

      tags.forEach((tag) => {
        const tagCMP: ReactNode[] = [];
        if(tag == pillValue){
          tags.forEach( (tag: string) => {
            const key = element.ENName + tag;
            if (tag == "OTOP") {
              tagCMP.push(
                <button
                  key={key}
                  onClick={() => handlePillSearch( {tag})}
                  className="py-2 px-4 shadow-md bg-green-300 no-underline rounded-full text-black border-blue btn-primary hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
                >
                  {tag}
                </button>
              );
            } else {
              tagCMP.push(
                <button
                  key={key}
                  onClick={() => handlePillSearch( {tag})}
                  className="py-2 px-4 shadow-md bg-pink-200 no-underline rounded-full text-black border-blue btn-primary hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
                >
                  {tag}
                </button>
              );
            }
          });


          const trkey = "item" + index;
          const tdkey1 = "itemtd1" + index;
          const tdkey2 = "itemtd2" + index;
          const tdkey3 = "itemtd3" + index;
          const tdkey4 = "itemtd4" + index;
          const tdkey5 = "itemtd5" + index;

          index++;
          result.push(
            <tr key={trkey}>
              <td key={tdkey1} className="border px-4 py-2" data-name="#">
                {index}
              </td>
              <td key={tdkey2} className="border px-4 py-2" data-name="THNAME">
                {element.THName}
              </td>
              <td key={tdkey3} className="border px-4 py-2" data-name="ENNAME">
                {element.ENName}
              </td>
              <td key={tdkey4} className="border px-4 py-2" data-name="TAGS">
                {tagCMP}
              </td>
              <td key={tdkey5} className="border px-4 py-2" data-name="ENNAME">
                {element.Note}
              </td>
            </tr>

          );
        }
      })
    })
    tableItem = result;
    
    // document.getElementById('tbody')?.tableItem);
    console.log('end');
      
  }
}
