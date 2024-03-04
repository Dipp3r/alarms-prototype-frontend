import ColInputForm from "../components/ColInputForm"
import { useState } from "react";

function InputColPage(){
    const [colNum,setColNum] = useState<number>(1);
    const [collectionName,setName] = useState<string>('');
    const [rowNum,setRowNum] = useState<number>(1000);
    const [toggleForm,setToggleForm] = useState(true);
    
    return(
        <div id="input-col-page">
            {
                toggleForm? 
                    <ColInputForm col={[colNum,setColNum]} row={[rowNum,setRowNum]} toggle={[toggleForm,setToggleForm]} tableName={[collectionName,setName]}></ColInputForm>
                    :
                    <>
                        <div style={{textAlign:"center"}}>
                            <p style={{width:'350px',height:'80px',fontWeight:"400",fontSize:"17px"}}>Migrating collection {collectionName} with {colNum} columns and adding {rowNum} random documents</p>
                            <p>Please Wait...</p>
                        </div>
                    </>
            }
        </div>
    )
}

export default InputColPage;