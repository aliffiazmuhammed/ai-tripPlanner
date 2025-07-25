
import React, { useState } from "react";
import axios from "axios";
import { pdf } from "@react-pdf/renderer";
import ItineraryPDF from "../pdfGenerator/ItineraryPDF";
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

 const handleSubmit = async (e) => {
   e.preventDefault();
   setgenerating(true);

   try {
     const response = await axios.post(
       "http://localhost:3000/ai/get-response",
       formData
     );

     const itineraryData = response.data;

     // Generate PDF blob
     const blob = await pdf(<ItineraryPDF data={itineraryData} />).toBlob();

     // Create a download link
     const url = URL.createObjectURL(blob);
     const link = document.createElement("a");
     link.href = url;
     link.download = "travel-itinerary.pdf";
     link.click();

     // Cleanup
     URL.revokeObjectURL(url);
   } catch (error) {
     console.error("Error generating itinerary:", error);
   } finally {
     setgenerating(false);
   }
 };


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
                disabled={generating}
                className={`mt-4 w-full py-2 text-white rounded-lg transition duration-300 ${
                  generating
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {generating ? "Generating..." : "Generate"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
