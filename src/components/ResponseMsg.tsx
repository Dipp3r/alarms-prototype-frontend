import tick from "../assets/tick-box.svg";

function ResponseMsg(){
    return(
        <div className="row msg-card">
            <img src={tick} alt="tick" height={20}/>
            <p> Operation executed sucessfully</p>
        </div>
    )
}

export default ResponseMsg;