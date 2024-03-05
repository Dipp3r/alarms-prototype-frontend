import axios from "axios";

interface ColInputProps{
    tableName: [string,React.Dispatch<React.SetStateAction<string>>];
    col: [number,React.Dispatch<React.SetStateAction<number>>];
    toggle: [boolean,React.Dispatch<React.SetStateAction<boolean>>];
    row: [number|undefined, React.Dispatch<React.SetStateAction<number>>];
}

function ColInputForm({col,row,toggle,tableName}:ColInputProps){
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
        console.log("migration under process");
        try {
            await axios.post("http://localhost:8000/migrate-seed",{
                collectionName: collectionName,
                ColNum: colNum,
                rowNum: rowNum
            })
            .then(response=>{
                if(response.data.status){
                    setToggleForm(true);
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

    async function handleGenerate(){
        console.log(!toggleForm)
        setToggleForm(false);
        if(rowNum!<50000){
            setTimeout(()=>migrateTable(),3000);
        }else{
            await migrateTable();
        }
    }

    function handleNameChange(value:string){
        setName(value);
    }

    return(
        <>
            <form>
                <div className="col">
                    <label htmlFor="name">Collection Name:</label>
                    <div className="row"><input type="text" id="name" name="name" placeholder="sampletable1" onChange={(e)=>{handleNameChange(e.target.value)}}/></div>
                </div>
                <div className="col">
                    <label htmlFor="colNum">Number of columns (between 1 and 15):</label>
                    <div className="row"><p>{colNum}</p><input type="range" value={colNum} id="colNum" name="colNum" min="1" max="15" onChange={(e)=>{handleColNum(parseInt(e.target.value))}}/></div>
                </div>
                <div className="col">
                    <label htmlFor="rowNum">Number of records:</label>
                    <input type="number" id="rowNum" value={rowNum} placeholder="max 1,00,000" name="rowNum" max="100000" onChange={(e)=>{handleRowNum(parseInt(e.target.value))}}/>
                </div>
                <button disabled={!((rowNum !== undefined && rowNum>0) && colNum>0 && (collectionName.length>=2))} className="float-right submit" onClick={handleGenerate}>Generate</button>
            </form>
        </>
    )
}

export default ColInputForm;