function DataTable(){
    const alarms = [{ActStack:"random",PrirityLevel:3,Severity:800,AlarmState:"ACT",ObjectName:"obj1",Condition:"random",Message:"random",EventTime:"date",ActiveTime:"date"},{ActStack:"random",PrirityLevel:3,Severity:800,AlarmState:"ACT",ObjectName:"obj1",Condition:"random",Message:"random",EventTime:"date",ActiveTime:"date"},{ActStack:"random",PrirityLevel:3,Severity:800,AlarmState:"ACT",ObjectName:"obj1",Condition:"random",Message:"random",EventTime:"date",ActiveTime:"date"}];
    return(
        <>
            <table>
                <tr>
                    <th>ActStack</th>
                    <th>Priority Level</th>
                    <th>Severity</th>
                    <th>Alarm State</th>
                    <th>Object Name</th>
                    <th>Condition</th>
                    <th>Message</th>
                    <th>Event Time</th>
                    <th>Active Time</th>
                </tr>
                {alarms.map((alarm)=>{
                    return(
                        <tr>
                            <td>{alarm.ActStack}</td>
                            <td>{alarm.PrirityLevel}</td>
                            <td>{alarm.Severity}</td>
                            <td>{alarm.AlarmState}</td>
                            <td>{alarm.ObjectName}</td>
                            <td>{alarm.Condition}</td>
                            <td>{alarm.Message}</td>
                            <td>{alarm.EventTime}</td>
                            <td>{alarm.ActiveTime}</td>
                        </tr>
                    );
                })}
            </table>
        </>
    );
}

export default DataTable;