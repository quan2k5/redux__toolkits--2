import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const state:any= []
export const getWorks:any = createAsyncThunk(
    "works/getWorks",
    async ()=>{
        const response = await axios.get("http://localhost:3000/works")
        return response.data
    }
)
export const addWorks:any = createAsyncThunk(
    "works/addWorks",
    async (obj)=>{
        const response = await axios.post("http://localhost:3000/works",obj)
        return response.data
    }
)

export const deleteWorks:any = createAsyncThunk(
    "works/deleteWorks",
    async (id)=>{
        const response = await axios.delete(`http://localhost:3000/works/${id}`)
        return id;
    }
)
export const changeStatus:any = createAsyncThunk("works/changeStatus", async (obj:any) => {
    const status1=obj.status;
    const response = await axios.patch(`http://localhost:3000/works/${obj.id}`,{status1});
    return response.data;
  });
  
export const updateWorks:any = createAsyncThunk("works/updateWorks",
    async (obj:any) => {
        const name1=obj.name;
      const response = await axios.patch(`http://localhost:3000/works/${obj.id}`,{name1});
      return response.data;
    }
  )
export const filterComplete:any = createAsyncThunk("works/filterComplete",
    async ()=>{
        const response = await axios.get("http://localhost:3000/works")
        return response.data
    }
)
const reducerWorks = createSlice({
    name:"reducerWorks",
    initialState:{
        works:state
    },
    reducers:{

    },
    extraReducers(builder) {
        builder
        .addCase(getWorks.pending, (state, action)=>{})
        .addCase(getWorks.fulfilled,(state,action)=>{
            state.works = action.payload
        })
        .addCase(getWorks.rejected,()=>{})
        .addCase(addWorks.fulfilled,(state,action)=>{
            state.works.push(action.payload)
        })
        .addCase(deleteWorks.fulfilled,(state,action)=>{
            state.works = state.works.filter((item:any)=> item.id !== action.payload)
        })
        .addCase(changeStatus.fulfilled,(state,action)=>{
            state.works=state.works.map(function(e:any){
                if(e.id===action.payload.id){
                    e.status=action.payload.status;
                }
                return e
            })
        })
        .addCase(updateWorks.fulfilled,(state,action)=>{
            state.works=state.works.map((e:any)=>{
                if(e.id===action.payload.id){
                    e.name=action.payload.name;
                }
            })
        })
        .addCase(filterComplete.fulfilled,(state,action)=>{
            
        })
    },
})
export default reducerWorks.reducer