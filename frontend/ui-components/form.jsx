
import React, { useState } from "react";
import axios from "axios";
export function FormEnquiry() {

  const [formData, setFormData] = useState({
    destination: "",
    days: "",
    budget: "",
    interests: "",
    groupType: "",
  });

  const [generating, setgenerating] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(formData)
  }

  return (
    <div className="flex justify-center px-4 py-8 bg-blue-100 rounded-2xl ">
      <div className="flex flex-col gap-6 bg-white rounded-2xl shadow-lg w-full sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[600px] p-6">
        <div className="heading text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Enter Your Details
          </h1>
        </div>
        <div className="enquiryform">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* Destination */}
              <div className="grid gap-2">
                <label
                  htmlFor="destination"
                  className="text-sm font-medium text-gray-700"
                >
                  Destination
                </label>
                <input
                  id="destination"
                  name="destination"
                  type="text"
                  placeholder="enter where you have to go....."
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* nDays */}
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="ndays"
                    className="text-sm font-medium text-gray-700"
                  >
                    Number of Days
                  </label>
                </div>
                <input
                  id="ndays"
                  type="number"
                  name="days"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {/* Budget */}
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="budget"
                    className="text-sm font-medium text-gray-700"
                  >
                    Budget
                  </label>
                </div>
                <input
                  id="budget"
                  name="budget"
                  type="number"
                  onChange={handleChange}
                  placeholder="in inr"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* tInterest */}
              <div className="grid gap-2">
                <label
                  htmlFor="tinterest"
                  className="text-sm font-medium text-gray-700"
                >
                  Travel Interest
                </label>
                <input
                  id="tinterest"
                  type="text"
                  name="interests"
                  placeholder="e.g., history, food, adventure"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* gType */}
              <div className="grid gap-2">
                <label
                  htmlFor="gtype"
                  className="text-sm font-medium text-gray-700"
                >
                  Group type
                </label>
                <input
                  id="gtype"
                  name="groupType"
                  type="text"
                  placeholder="solo, couple, family,freinds"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Generate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
