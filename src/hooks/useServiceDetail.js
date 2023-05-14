import { useEffect, useState } from "react";

import auth from "../firebase.init";

const useServiceDetail=serviceId=>{
    const [service,setService]=useState({});
    useEffect(()=>{
        fetch(`https://genius-car-server-nu-blond.vercel.app/service/${serviceId}`)
        .then(res=>res.json())
        .then(data=>setService(data))
    },[serviceId])
return [service]
}
export default useServiceDetail;