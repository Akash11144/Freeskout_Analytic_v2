import { useEffect, useState } from "react";
import dstyles from './index.module.css';

const userData=()=>{
    return(
        <div>
            user
        </div>
    )
}

const Dash=()=>{
    const [count, setcount] = useState(0);

    useEffect(() => {
        const dataFetch= async ()=>{
            let y = await fetch("http://localhost:1369/user/getC");
            let y1=await y.json();
            console.log("data here", y1,y.status);
            setcount(y1);
        }
        dataFetch();
    }, []);
    

    return (
        <div>
            <h1 className={dstyles.heading}>
                Dashboard
            </h1>
            <div className={dstyles.main}> 
                    <h2>{count.length}</h2>
            </div>
            <div>
                    {userData()}
            </div>
        </div>
    )
}

export default Dash;