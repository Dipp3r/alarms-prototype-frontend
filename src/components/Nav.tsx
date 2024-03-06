interface tableProps{
    setShowTable: React.Dispatch<React.SetStateAction<boolean>>;
    setAnimation: React.Dispatch<React.SetStateAction<boolean>>;
    handlePopulate: ()=>Promise<void>;
    handleAdd: ()=>Promise<void>;
}

function NavBar({setAnimation,setShowTable,handlePopulate,handleAdd}:tableProps){
    return(
        <>
            <nav id="navbar">
                <h1>ABB</h1>
                <div id="options">
                    <button onClick={handlePopulate}>
                        Populate
                    </button>
                    <button onClick={()=>{
                        handleAdd();
                    }}>
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