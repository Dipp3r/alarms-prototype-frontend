interface tableProps{
    setShowTable: React.Dispatch<React.SetStateAction<boolean>>;
    handlePopulate: ()=>Promise<void>;
    pages: string[],
    pageSize:number
}

function NavBar({setShowTable,handlePopulate,pages,pageSize}:tableProps){
    return(
        <>
            <nav id="navbar">
                <h1>ABB</h1>
                <div id="options">
                    <button onClick={handlePopulate}>
                        Populate
                    </button>
                    <button onClick={()=>{setShowTable(false)}}>
                        Add
                    </button>
                    <button onClick={()=>{setShowTable(false)}}>
                        Update 
                    </button>
                    <button onClick={()=>{setShowTable(false)}}>
                        Delete 
                    </button>
                </div>
            </nav>
        </>
    );
}

export default NavBar