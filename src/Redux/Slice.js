import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    conversation : []
}

const conversationSlice= createSlice({
    name:"conversation",
    initialState,
    reducers:{
        addConversation:(state, action)=>{
            state.conversation.push(action.payload);
        },
        clearConversation:(state)=>{
            state.conversation=[];
        }
    }
})

export const { addConversation, clearConversation } = conversationSlice.actions;
export default conversationSlice.reducer;