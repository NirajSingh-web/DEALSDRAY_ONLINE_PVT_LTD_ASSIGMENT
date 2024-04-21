import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEmployeData } from "../store/EmployeSlice";
const Dashboard = () => {
  const [Employelist, setEmployelist] = useState("");
  const [Id, setid] = useState("");
  const [filtereddata, setfiltereddata] = useState();
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/employe/get", {
      method: "GET",
      headers: {
        "auth-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => setEmployelist(data));
  }, [Employelist && Employelist.length]);
  const handleonsearch = (e) => {
    const searchText = e.target.value;
    if (searchText != "") {
      const data = Employelist.filter(
        (e) =>
          e["name"].toLowerCase().includes(searchText.trim().toLowerCase()) ||
          e["employeID"]
            .trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          e["email"]
            .trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          e["mobile"]
            .toString()
            .trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          e["gender"]
            .trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          e["destination"]
            .trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          e["course"]
            .trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase())
      );
      setfiltereddata(data);
    } else {
      setfiltereddata("");
    }
  };
  const HandleonEdit = (Employedata) => {
    if (Employedata != "") {
      dispatch(addEmployeData(Employedata));
      Navigate("/Employee/Edit");
    } else {
      alert("Please select a row");
    }
  };
  // delete method
  const Handleondelete = async (Employedata) => {
    if (Employedata) {
      setloading(true);
      const res = await fetch("http://localhost:5000/employe/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Employedata),
      });
      const res_data = await res.json();
      if (res_data === "Deleted Successfully!") {
        setloading(false);
        Employelist && Employelist.splice(Employedata, 1);
        alert(res_data);
        setid("");
      } else {
        setloading(false);
        alert(res_data);
      }
    } else {
      alert("Please select a row");
    }
  };
  return loading ? (
    <Loader />
  ) : (
    <div
      className={`sm:m-0 max-sm:p-2 relative top-[64px] ${
        Employelist.length === 0 ? "bg-[hsl(208,35%,13%)] h-[91vh]" : "xl:m-5"
      }`}
    >
      {Employelist.length != 0 ? (
        <div className="bg-[hsl(0,0%,100%)] p-3">
          <div className="flex justify-between h-[50px] items-center">
            <h1 className="h5">Employment List</h1>
            <div className="flex items-center gap-2">
              <label htmlFor="">Search</label>
              <input
                type="search"
                className="form-control"
                onChange={handleonsearch}
              />
            </div>
          </div>
          <div className="overflow-x-scroll no-scrollbar">
            <table className="table table-bordered text-center mt-2  table-striped">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Email</th>
                  <th>Destination</th>
                  <th>Gender</th>
                  <th>Course</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {(filtereddata ? filtereddata : Employelist).map((e, index) => (
                  <tr key={index}>
                    <td>{e.name}</td>
                    <td>{e.employeID}</td>
                    <td>{e.email}</td>
                    <td>{e.destination}</td>
                    <td>{e.gender}</td>
                    <td>{e.course}</td>
                    <td>
                      <button
                        className="btn btn-outline-secondary rounded-sm bg-danger-25"
                        onClick={() => HandleonEdit(e)}
                      >
                        {" "}
                        <i className="fa fa-edit me-1"></i>Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger rounded-sm"
                        onClick={() => Handleondelete(e)}
                      >
                        <i className="fa fa-trash-o me-1"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {Array.isArray(filtereddata) && filtereddata.length < 1 && (
              <div className="flex justify-center p-3 bg-[rgb(243,244,245)]  font-bold mb-3 ">
                <div className="bg-[rgb(255,255,255)] btn  cursor-default btn-outline-none text-lg font-medium">
                  No More data found
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              className="btn btn-danger rounded-sm"
              onClick={Handleondelete}
            >
              <i className="fa fa-trash-o me-1"></i> Delete
            </button>
            <button
              className="btn btn-outline-secondary rounded-sm bg-danger-25"
              onClick={HandleonEdit}
            >
              {" "}
              <i className="fa fa-edit me-1"></i>Edit
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center h-[91vh] items-center">
          <div className="card w-[30%] p-3 text-center bg-[hsl(210,56%,25%)] text-white">
            <p>No Data Available</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
