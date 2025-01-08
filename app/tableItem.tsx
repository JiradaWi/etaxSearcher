import ETAXJSON from "./etaxInfo.json";

export default function Home(props: { searchText: string; }) {
// const tableItem = (props) => {
    // searchText = 'อ';

  const result: object[] = [];
  let index = 1 ;
  ETAXJSON.forEach((element) => {
    if (
      element.ENName.includes(props.searchText) ||
      element.THName.includes(props.searchText) ||
      element.tags.includes(props.searchText)
    ) {
        const tags: object[] = [];
        element.tags.forEach(tag => {
            tags.push(
                <button className="py-2 px-4 shadow-md no-underline rounded-full text-black border-blue btn-primary hover:bg-blue-light focus:outline-none active:shadow-none mr-2">
                    {tag}
                </button>
            );
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
      </tr>
      );
      index++;
    }
 
  });

 

  return result;
}
