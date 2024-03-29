import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ColInputProps{
    tableName: [string,React.Dispatch<React.SetStateAction<string>>];
    col: [number,React.Dispatch<React.SetStateAction<number>>];
    toggle: [boolean,React.Dispatch<React.SetStateAction<boolean>>];
    row: [number|undefined, React.Dispatch<React.SetStateAction<number>>];
}

function ColInputForm({col,row,toggle,tableName}:ColInputProps){
    const NavigateTo = useNavigate();
    const [colNum,setColNum] = col;
    const [rowNum,setRowNum] = row;
    const [collectionName, setName] = tableName;
    const [toggleForm, setToggleForm] = toggle;

    function handleColNum(value: number){
        setColNum(value);
    }

    function handleRowNum(value: number){
        if(value>100000){
            setRowNum(100000);
        }else{
            setRowNum(value);
        }
    }

    const migrateTable = async()=>{
        try {
            await axios.post("http://localhost:8000/migrate-seed",{
                collectionName: collectionName,
                ColNum: colNum,
                rowNum: rowNum
            })
            .then(response=>{
                if(response.data.status){
                    setToggleForm(true);
                    NavigateTo("/home", {state:collectionName});
                }
            })
            .catch(err=>{
                console.log(err.message);
            });
            
        } catch (err) {
            console.error("Error while migrating the table",err);
            setToggleForm(false);
        }
    };

    async function handleGenerate(event){
        event.preventDefault();
        setToggleForm(false);
        if(rowNum!<50000){
            setTimeout(()=>migrateTable(),1500);
        }else{
            await migrateTable();
        }
    }

    function handleNameChange(value:string){
        setName(value);
    }

    return(
        <>
            <form onSubmit={handleGenerate}>
                <div className="col">
                    <label htmlFor="name">Collection Name:</label>
                    <div className="row"><input type="text" id="name" name="name" placeholder="sampletable1" onChange={(e)=>{handleNameChange(e.target.value)}} required/></div>
                </div>
                <div className="col">
                    <label htmlFor="colNum">Number of columns (between 1 and 15):</label>
                    <div className="row"><p>{colNum}</p><input type="range" value={colNum} id="colNum" name="colNum" min="1" max="15" onChange={(e)=>{handleColNum(parseInt(e.target.value))}} required/></div>
                </div>
                <div className="col">
                    <label htmlFor="rowNum">Number of records:</label>
                    <input type="number" id="rowNum" min={1} value={rowNum} placeholder="max 1,00,000" name="rowNum" max="100000" onChange={(e)=>{handleRowNum(parseInt(e.target.value))}} required/>
                </div>
                <button type="submit"  className="float-right submit">Generate</button>
            </form>
        </>
    )
}

export default ColInputForm;