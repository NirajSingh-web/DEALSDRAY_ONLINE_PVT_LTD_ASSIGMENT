import { configureStore } from "@reduxjs/toolkit";
import EmployeSlice from "./EmployeSlice";
const Store = configureStore({
  reducer: {
    Employedata: EmployeSlice
  },
});
export default Store;