import { createSlice } from "@reduxjs/toolkit";
const Employeslice = createSlice({
  name: "Employe",
  initialState: {},
  reducers: {
    addEmployeData(state, action) {
      state["_id"] = action.payload._id;
      state["userid"] = action.payload.userid;
      state["name"] = action.payload.name;
      state["email"] = action.payload.email;
      state["mobile"] = action.payload.mobile;
      state["destination"] = action.payload.destination;
      state["gender"] = action.payload.gender;
      state["course"] = action.payload.course;
    },
  },
});
export default Employeslice.reducer;
export const { addEmployeData } = Employeslice.actions;
