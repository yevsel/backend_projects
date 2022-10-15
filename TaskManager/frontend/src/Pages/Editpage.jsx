import {useParams} from "react-router-dom"
import { useState,useEffect } from "react"
import { data } from "autoprefixer"
const Editpage = ()=>{
    const {id} = useParams()
    const [task,setTask]=useState("")
    const [completed,setCompleted] = useState(false)
    const [dataFromDB,setDataFromDB]=useState({})

    const updateInDB = async(data)=>{
    try {
        const response = await fetch(`http:127.0.0.1:4500/edit/${id}`,{
            method:"PUT",
            body:JSON.stringify(data)
        })
        console.log(response)
    } catch (error) {
        console.log(error.message)
        }
    }

    useEffect(()=>{
        const dataToEdit = async()=>{
            try {
                const response = await fetch(`http://127.0.0.1:4500/task/${id}`)
                const data = await response.json()
                setDataFromDB(data)
                console.log(data)
            } catch (error) {
                console.log(error.message)
            }
        }
        dataToEdit()
    },[])

    return(
        <div className="w-96 p-5 bg-white shadow-md">
            <p className="text-center p-5">EDIT TASK</p>
            <div className="flex-column space-y-3">
                <div className="flex items-center">
                    <p className="w-20">Task ID</p>
                    <p className="bg-slate-100 p-1">{id}</p>
                </div>
                <div className="flex items-center">
                    <p className="w-20">Name</p>
                    <p className="bg-slate-100 p-1">{data.data}</p>
                </div>
                <div className="flex items-center">
                    <p className="w-20">Completed</p>
                    <input onChange={()=>{
                        setCompleted(!completed)
                    }} className="bg-slate-100 p-1" type="checkbox" checked={data.completed&&true} />
                </div>
                <button className="my-4 p-1 bg-purple-600 w-full text-white" onClick={()=>{
                    const data={
                        task,completed
                    }
                    updateInDB(data)
                }}>EDIT</button>
            </div>
        </div>
    )
}

export default Editpage;