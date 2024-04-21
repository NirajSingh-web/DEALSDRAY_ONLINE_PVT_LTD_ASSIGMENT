import React, { useEffect, useState } from "react";
import Loader from "../Loader";
const AddEmploye = () => {
  useEffect(() => {
    document.title = "Employee/Add ";
  }, []);
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    destination: "HR",
    gender: "Male",
    course: "MCA",
    file: null,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlefileonchage = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    try {
      setloading(true);
      const res = await fetch("http://localhost:5000/employe/add", {
        method: "POST",
        headers: {
          "auth-token": token,
        },
        body: formDataToSend,
      });
      const data = await res.json();
      if (data === "employe added successfully") {
        alert(data);
        setloading(false);
        inputstageChange();
      } else {
        setloading(false);
        alert(JSON.stringify(data));
      }
    } catch (err) {
      console.log(err.message);
      alert(err.message);
      setloading(false);
    }
  };
  const inputstageChange = () => {
    setFormData({
      name: "",
      email: "",
      mobile: "",
      destination: "HR",
      gender: "Male",
      course: "MCA",
      file: null,
    });
  };
  return loading ? (
    <Loader />
  ) : (
    <div className="max-w-md mx-auto relative top-20 max-sm:p-4">
      <h2 className="text-2xl font-bold mb-4">Registration Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex max-sm:gap-3 gap-8 items-center max-sm:block">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1">Mobile No</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Destination:</label>
          <select
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Gender:</label>
          <label className="mr-4">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
              className="mr-1"
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
              className="mr-1"
            />
            Female
          </label>
        </div>
        <div>
          <label className="block mb-1">Course:</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="MCA">MCA</option>
            <option value="BCA">BCA</option>
            <option value="BSC">BSC</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Upload Image:</label>
          <input
            type="file"
            onChange={handlefileonchage}
            accept=".jpg, .png"
            className="border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddEmploye;
