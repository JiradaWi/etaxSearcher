import ETAXJSON from "./etaxInfo.json";

export default function Home(props: { searchText: string; }) {
// const tableItem = (props) => {
    // searchText = 'อ';

  const result: object[] = [];
  let index = 1 ;
  const searchText = props.searchText.toUpperCase();
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
            if(tag == 'OTOP'){
                tags.push(
                    <button className="py-2 px-4 shadow-md bg-green-300 no-underline rounded-full text-black border-blue btn-primary hover:bg-blue-light focus:outline-none active:shadow-none mr-2">
                        {tag}
                    </button>
                );
            }else{
                tags.push(
                    <button className="py-2 px-4 shadow-md bg-pink-200 no-underline rounded-full text-black border-blue btn-primary hover:bg-blue-light focus:outline-none active:shadow-none mr-2">
                        {tag}
                    </button>
                );
            }
            
        });

        const key = 'item'+index;
      result.push(
        <tr key={key}>
        <td className="border px-4 py-2" data-name="#">{index}</td>
        <td className="border px-4 py-2" data-name="THNAME">{element.THName}</td>
        <td className="border px-4 py-2" data-name="ENNAME">{element.ENName}</td>
        <td className="border px-4 py-2" data-name="TAGS">
            {tags}
        </td>
        <td className="border px-4 py-2" data-name="ENNAME">{element.Note}</td>
      </tr>
      );
      index++;
    }
 
  });

 

  return result;
}
