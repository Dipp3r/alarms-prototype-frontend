import NavBar from '../components/Nav'
import DataTable from '../components/DataTable';
import { useEffect, useState } from 'react';
import PageForm from '../components/PaginateForm';
import ResponseMsg from '../components/ResponseMsg';
import axios from 'axios';

function MainContent() {
  const [collectionName, setCollectionName] = useState("");
  const [showTable,setShowTable] = useState(false);
  const [pageSize, setPageSize] = useState(0);
  const [pages, setPages] = useState<string[]>([]);
  const [alarms, setAlarms] = useState<object[]>([{id:1,ActStack:"ran",PrirityLevel:3,Severity:800,AlarmState:"ACT",ObjectName:"obj1",Condition:"random",Message:"random",EventTime:"date",ActiveTime:"date"},{id:2,ActStack:"random",PrirityLevel:3,Severity:800,AlarmState:"ACT",ObjectName:"obj1",Condition:"random",Message:"random",EventTime:"date",ActiveTime:"date"},{id:3,ActStack:"random",PrirityLevel:3,Severity:800,AlarmState:"ACT",ObjectName:"obj1",Condition:"random",Message:"random",EventTime:"date",ActiveTime:"date"}]);
  
  function handlePageSize(value:number){
      setPageSize(value);
  }

  function handlePageChange(value:string){
      const pages:string[] = value.split(',');
      setPages(pages);
  }

  const pageList = pages.filter((page)=>(page.length>0));
  const populate = async()=>{
    try {
      await axios.post("http://localhost:8000/alarms",{
        pageSize:pageSize,
        pages:pageList,
        collectionName:collectionName
      })
      .then((response)=>{
        console.log(response.data)
        setAlarms(response.data);
      })
      .catch((err)=>{
        console.log(err);
      });
    } catch (error) {
      console.log(error);
    }
  };

  async function handlePopulate(){
    console.log("populate clicked!",pages,pageSize);
    await populate();
    setShowTable(true);
  }

  useEffect(()=>{
    setCollectionName(localStorage.getItem("collectionName")!);
  });

  return (
    <>  
      <NavBar pages={pages} pageSize={pageSize} setShowTable={setShowTable} handlePopulate={handlePopulate}></NavBar>
      <div id="main" style={{alignItems:showTable?'flex-start':'center',top:showTable?'97px':'0'}}>
        {showTable? <DataTable alarms={alarms} pages={pages} pageSize={pageSize}></DataTable>:<PageForm pageSize={pageSize} handlePageSize={handlePageSize} pages={pages} handlePageChange={handlePageChange}></PageForm>}
        <ResponseMsg></ResponseMsg>
      </div>
    </>
  )
}

export default MainContent