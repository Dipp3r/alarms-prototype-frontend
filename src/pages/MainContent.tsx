import NavBar from '../components/Nav'
import DataTable from '../components/DataTable';
import { useState } from 'react';
import PageForm from '../components/PaginateForm';
import ResponseMsg from '../components/ResponseMsg';

function MainContent() {
  const [showTable,setShowTable] = useState(false);
  return (
    <>  
      <NavBar setShowTable={setShowTable}></NavBar>
      <div id="main" style={{alignItems:showTable?'flex-start':'center',top:showTable?'97px':'0'}}>
        {showTable? <DataTable ></DataTable>:<PageForm></PageForm>}
        <ResponseMsg></ResponseMsg>
      </div>
    </>
  )
}

export default MainContent