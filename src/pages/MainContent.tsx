import NavBar from '../components/Nav'
import DataTable from '../components/DataTable';
import { useEffect, useState } from 'react';
import PageForm from '../components/PaginateForm';
import ResponseMsg from '../components/ResponseMsg';
import {faker} from "@faker-js/faker";
import axios from 'axios';

function MainContent() {
  const [newId, setNewId] = useState("");
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
      console.log(attributes.sort(()=>Math.random()-0.5).slice(0,1));
      await axios.post("http://localhost:8000/alarms",{
        sortOrder:attributes.sort(()=>Math.random()-0.5).slice(0,1),
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
      console.log(attributes);
      await axios.post("http://localhost:8000/addalarm",
        {
          attributes:body,
          collectionName:collectionName
        }
      )
      .then(response=>{
        if(response.data.status){
          setNewId(response.data.id);
          enableAnimation();
        }
      })
      .catch(error=>{
        console.log(error.msg);
      })
    } catch (error) {
      console.log(error)
    }
  }

  const updateAlarm = async(body:object)=>{
    try {
      await axios.put("http://localhost:8000/updatealarm",
        {
          attributes:body,
          collectionName:collectionName
        }
      )
      .then(response=>{
        if(response.data.status){
          setNewId(response.data.id);
          enableAnimation();

        }
      })
      .catch(error=>{
        console.log(error.msg);
      })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteAlarm = async()=>{
    try {
      await axios.post("http://localhost:8000/deletealarm",
        {
          collectionName:collectionName
        }
      )
      .then(response=>{
        if(response.data.status){
          setNewId(response.data.id);
          enableAnimation();
        }
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

  function enableAnimation(){
    setAnimation(true);
    setTimeout(async()=>{
        setAnimation(false);
    },5200);
  }

  async function handleAdd(){
    // await addAlarm();
    setOperation("Add");
    setShowTable(false);  
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

  async function handleUpdate(){
    // await addAlarm();
    setOperation("Update");
    setShowTable(false);
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
    await updateAlarm(newRecord);
    
  }

  async function handleDelete(){
    // await addAlarm();
    setOperation("Delete");
    setShowTable(false);
    await deleteAlarm();
    
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
      <NavBar handleUpdate={handleUpdate} handleDelete={handleDelete} handleAdd={handleAdd} setShowTable={setShowTable} handlePopulate={handlePopulate}></NavBar>
      <div id="main" style={{alignItems:showTable?'flex-start':'center',top:showTable?'97px':'0'}}>
        {showTable? <DataTable alarms={alarms} pages={pages}></DataTable>:<PageForm handlePageSize={handlePageSize} pages={pages} handlePageChange={handlePageChange}></PageForm>}
        <ResponseMsg newId={newId} operation={operation} animation={animation} ></ResponseMsg>
      </div>
    </>
  )
}

export default MainContent