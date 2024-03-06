interface tableProps{
    setShowTable: React.Dispatch<React.SetStateAction<boolean>>;
    handlePopulate: ()=>Promise<void>;
    handleAdd: ()=>Promise<void>;
    handleUpdate: ()=>Promise<void>;
    handleDelete: ()=>Promise<void>;
}

function NavBar({handleDelete,handleUpdate,handlePopulate,handleAdd}:tableProps){
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
                    <button onClick={handleUpdate}>
                        Update 
                    </button>
                    <button onClick={handleDelete}>
                        Delete 
                    </button>
                </div>
            </nav>
        </>
    );
}

export default NavBar