import columns  from "../assets/columns.json";
interface pageProps{
    pages:string[],
    alarms:object[]
}

function DataTable({pages,alarms}:pageProps){
    let alarm_keys:string[] = [];
    let alarmsList:string[] = [];
    try {
        alarmsList = Object.values(alarms[parseInt(pages[0])]);
        alarm_keys = Object.keys(alarmsList[0]);
    } catch (error) {
        console.log(error);
    }
    return(
        <>
            <table>
                <thead>
                    <tr>
                        {alarm_keys.map((key)=>{
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
                        const record_keys = Object.keys(alarm).filter((e)=>e!='_id');
                        return(
                            <tr key={alarm._id}>
                                {
                                    record_keys.map((key,index)=>{
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