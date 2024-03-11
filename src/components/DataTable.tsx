import columns  from "../assets/columns.json";
interface pageProps{
    pages:string[],
    alarms:object[],
    attributes: string[]
}

function DataTable({pages, alarms, attributes}:pageProps){
    let alarmsList:string[] = [];
    try {
        alarmsList = Object.values(alarms[parseInt(pages[0])]);
    } catch (error) {
        console.log(error);
    }
    return(
        <>
            <table>
                <thead>
                    <tr>
                        {attributes.map((key)=>{
                            const col = columns.filter((e)=>e["name"]===key);
                            if(col.length>0){
                                return(
                                    <th key={col[0]["id"]}>{col[0]["description"]}</th>
                                )
                            }
                        })}
                    </tr>
                </thead>
                <tbody>
                    {alarmsList.map((alarm)=>{
                        return(
                            <tr key={alarm['_id'].toString()}>
                                {
                                    attributes.map((key,index)=>{
                                        return(
                                            <td key={alarm._id+index}>{alarm[key]}</td>
                                        )
                                    })
                                }
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot></tfoot>
            </table>
        </>
    );
}

export default DataTable;