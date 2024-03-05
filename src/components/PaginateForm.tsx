import { useState } from "react";

interface pageProps{
    pages: string,
    pageSize: number,
    handlePageSize: React.Dispatch<React.SetStateAction<number>>,
    handlePageChange: React.Dispatch<React.SetStateAction<string>>
}

function PageForm({pages,pageSize,handlePageSize,handlePageChange}:pageProps){
    
    return(
        <form>
            <div className="col" style={{marginBottom:"20px"}}>
                <label htmlFor="pageSize">Page size:</label>
                <input type="number" placeholder="120" name="pageSize" id="pageSize" onChange={(e)=>{handlePageSize(parseInt(e.target.value))}}/>
            </div>
            <div className="col">
                <label htmlFor="pages">Pages:</label>
                <input type="text" name="pages" id="pages" value={pages.join(',')} placeholder="23,24,25"  onChange={(e)=>{handlePageChange(e.target.value)}}/>
            </div>
        </form>
    )
}

export default PageForm;