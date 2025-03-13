import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(sessionStorage.getItem("tasks")) || [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,

  reducers: {
    addTask: (state, action) => {
      if (!state.tasks) {
        state.tasks = []; // Fallback in case tasks is undefined
      }
      state.tasks.push(action.payload); // Add new task
      sessionStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

    updateTask: (state, action) => {
      const { id, ...updatedTask } = action.payload;
    
      const taskIndex = state.tasks.findIndex(task=> task.id === id)
      if(taskIndex !== -1) {
        state.tasks[taskIndex]={

          ...state.tasks[taskIndex], ...updatedTask
        } 
        sessionStorage.setItem("tasks", JSON.stringify(state.tasks)); // ✅ Save updated tasks
      }
    },
    deleteTask: (state, action) => {
      
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      sessionStorage.setItem("tasks", JSON.stringify(state.tasks)); // Save after delete
    },
    completeTask: (state, action)=>{
      const taskId= action.payload
      const taskIndex = state.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        state.tasks[taskIndex].status = "completed"; // ✅ Update status
        sessionStorage.setItem("tasks", JSON.stringify(state.tasks)); // ✅ Save updated tasks
      }
    }
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  completeTask

} = taskSlice.actions;
export default taskSlice.reducer;
