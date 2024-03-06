import NavBar from '../components/Nav'
import DataTable from '../components/DataTable';
import { useEffect, useState } from 'react';
import PageForm from '../components/PaginateForm';
import ResponseMsg from '../components/ResponseMsg';
import {faker} from "@faker-js/faker";
import axios from 'axios';

function MainContent() {
  const [operation, setOperation] = useState("");
  const [animation,setAnimation] = useState(false);
  const [attributes,setAttributes] = useState([]);
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
        setAlarms(response.data);
      })
      .catch((err)=>{
        console.log(err);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addAlarm = async(body:object)=>{
    try {
      await axios.post("http://localhost:8000/addalarm",
        {
          attributes:body,
          collectionName:collectionName
        }
      )
      .then(response=>{
        console.log(response.data);
      })
      .catch(error=>{
        console.log(error.msg);
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function handlePopulate(){
    await populate();
    setShowTable(true);
  }

  async function handleAdd(){
    // await addAlarm();
    setOperation("Add");
    setShowTable(false);
    setAnimation(true);
    setTimeout(async()=>{
        setAnimation(false);
    },2200);
    const newRecord = {}
    attributes.map((field)=>{
      if(["priorityLevel","severity"].includes(field)){
        newRecord[field] = faker.number.int({min:100,max:1000});
      } else if(["eventTime","activeTime","createdAt","updatedAt"].includes(field)){
        newRecord[field] = faker.date.past();
      }else{
        newRecord[field] = faker.lorem.sentence(1);
      }
    });
    console.log(newRecord);
    await addAlarm(newRecord);
    
  }

  useEffect(()=>{
    setCollectionName(localStorage.getItem("collectionName")!);
    
    const getColumns = async()=>{
      try {
        await axios.post("http://localhost:8000/get-field-names",{
          collectionName:collectionName
        })
        .then(response=>{
          setAttributes(response.data);
        })
        .catch(err=>{
          console.log(err.msg);
        })
      } catch (error) {
        console.log(error)
      }
    };
    getColumns();

  },[collectionName,animation]);

  return (
    <>  
      <NavBar setAnimation={setAnimation} handleAdd={handleAdd} setShowTable={setShowTable} handlePopulate={handlePopulate}></NavBar>
      <div id="main" style={{alignItems:showTable?'flex-start':'center',top:showTable?'97px':'0'}}>
        {showTable? <DataTable alarms={alarms} pages={pages}></DataTable>:<PageForm pageSize={pageSize} handlePageSize={handlePageSize} pages={pages} handlePageChange={handlePageChange}></PageForm>}
        <ResponseMsg operation={operation} animation={animation} ></ResponseMsg>
      </div>
    </>
  )
}

export default MainContent