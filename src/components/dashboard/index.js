
const dataFetch= async ()=>{
    let y = await fetch("http://localhost:1369/user/getC");
    let y1=await y.json();
    console.log("data here", y1)
}

const Dash=()=>{
    return (
        <div>
            <h1>
                Dashboasrd
            </h1>
            <div>
                <button 
                    onClick={()=>dataFetch()}
                > get data</button>
            </div>
        </div>
    )
}

export default Dash;