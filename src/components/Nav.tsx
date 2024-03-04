interface tableProps{
    setShowTable: React.Dispatch<React.SetStateAction<boolean>>;
}

function NavBar({setShowTable}:tableProps){
    return(
        <>
            <nav id="navbar">
                <h1>ABB</h1>
                <div id="options">
                    <button onClick={()=>{setShowTable(true)}}>
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