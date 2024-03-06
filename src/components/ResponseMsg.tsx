import tick from "../assets/tick-box.svg";

interface resProps{
    animation: boolean,
    operation: string
}

function ResponseMsg({animation, operation}:resProps){
    return(
        <div className={animation? "row msg-card animate-card":"row msg-card"}>
            <img src={tick} alt="tick" height={20}/>
            <p>{operation} operation executed sucessfully</p>
        </div>
    )
}

export default ResponseMsg;