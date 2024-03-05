import NavBar from '../components/Nav'
import DataTable from '../components/DataTable';
import { useState } from 'react';
import PageForm from '../components/PaginateForm';
import ResponseMsg from '../components/ResponseMsg';

function MainContent() {
  const [showTable,setShowTable] = useState(false);
  const [pageSize, setPageSize] = useState(0);
  const [pages, setPages] = useState<string[]>([]);

  function handlePageSize(value:number){
      setPageSize(value);
  }

  function handlePageChange(value:string){
      const pages:string[] = value.split(',');
      setPages(pages);
  }

  return (
    <>  
      <NavBar pages={pages} pageSize={pageSize} setShowTable={setShowTable}></NavBar>
      <div id="main" style={{alignItems:showTable?'flex-start':'center',top:showTable?'97px':'0'}}>
        {showTable? <DataTable ></DataTable>:<PageForm pageSize={pageSize} handlePageSize={handlePageSize} pages={pages} handlePageChange={handlePageChange}></PageForm>}
        <ResponseMsg></ResponseMsg>
      </div>
    </>
  )
}

export default MainContent