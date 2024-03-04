import { useState } from "react";

function PageForm(){
    const [pageSize, setPageSize] = useState(0);
    const [pages, setPages] = useState<string[]>([]);
    function handlePageSize(value:number){
        setPageSize(value);
    }

    function handlePageChange(value:string){
        const pages:string[] = value.split(',');
        setPages(pages);
    }


    return(
        <form>
            <div className="col" style={{marginBottom:"20px"}}>
                <label htmlFor="pageSize">Page size:</label>
                <input type="number" placeholder="120" name="pageSize" id="pageSize" onChange={(e)=>{handlePageSize(parseInt(e.target.value))}}/>
            </div>
            <div className="col">
                <label htmlFor="pages">Pages:</label>
                <input type="text" name="pages" id="pages" value={pages.join(',')} placeholder="23,24,25" onChange={(e)=>{handlePageChange(e.target.value)}}/>
            </div>
        </form>
    )
}

export default PageForm;