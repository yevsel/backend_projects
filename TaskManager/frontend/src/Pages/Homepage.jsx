import { useState,useEffect } from "react"
import {AiOutlineEdit,AiOutlineCheckCircle} from "react-icons/ai"
import {TiDeleteOutline} from "react-icons/ti"
import {useNavigate} from "react-router-dom"
const Homepage=()=>{

    const [task,setTask]=useState("")
    const [fetchFromDB,setFetchFromDB]=useState(true)
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const navigate = useNavigate()


    const submitToDB = async(data)=>{
        setLoading(true)
        try{
            const response = await fetch("http://127.0.0.1:4500/",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({data})
            })
            const res=await response.json()
            console.log(res)
            setFetchFromDB(!fetchFromDB)
            setLoading(false)
        }catch(err){
            console.log(err.message)
        }
    }

    const deleteFromDB=async(id)=>{
        try {
            const response = await fetch(`http://127.0.0.1:4500/${id}`,{
                method:"DELETE",
            })
            const res = await response.json()
            setFetchFromDB(!fetchFromDB)
        } catch (error) {
            console.log(error.message)
        }
    }

   

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const res = await fetch("http://127.0.0.1:4500/")
                const data=await res.json()
                setData(data)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData()
    },[fetchFromDB])

    return(
        <div className="">
            <div>
                <div className="w-80 shadow-md bg-white p-5">
                    <p className="text-center py-3">TASK MANAGER</p>
                    <div className="rounded-lg overflow-hidden flex">
                        <input onChange={(e)=>{
                            setTask(e.target.value)
                        }} value={task} className="bg-gray-200 p-2" placeholder="eg. Wash Dishes" type="text" />
                        <button onClick={()=>{
                            submitToDB(task)
                            setTask("")
                        }} className="text-sm bg-purple-600 hover:bg-purple-400 text-white  p-2">{loading?"Loading..":"Submit"}</button>
                    </div>
                </div>
            </div>
            <div className="mt-[20px]">
                {
                    data&&data.map(item=>{
                        return(
                            <div className="bg-white flex items-center justify-between p-2 w-100 mt-2 shadow-md" key={item._id}>
                                <div className="flex items-center">
                                    {item.completed&&<AiOutlineCheckCircle className="m-1"/>}
                                    <p>
                                        {item.data}
                                    </p>
                                </div>
                                <div className="p-1 flex space-x-2">
                                    <AiOutlineEdit className="text-green-600" onClick={()=>{
                                        navigate(`/edit/${item._id}`)
                                    }}/>
                                    <TiDeleteOutline onClick={()=>{
                                        deleteFromDB(item._id)
                                    }} className="text-red-500 cursor-pointer"/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Homepage