import React, { useState } from "react";

import toGeoJSON from "@mapbox/togeojson";
import { calculateElementDetails, countElements } from "../utils/services";
import FileUploadSection from "../components/FileUploadSection";
import MapView from "../components/MapView";
import DetailedTable from "../components/DetailedTable";
import SummaryTable from "../components/SummaryTable";
import toast from "react-hot-toast";

const KMLViewer = () => {
  const [kmlData, setKmlData] = useState(null);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [summary, setShowSummary] = useState(false);
  const [detailed, setShowDetailed] = useState(false);
  const [elementCounts, setElementCounts] = useState({});
  const [elementDetails, setElementDetails] = useState([]);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (
      file.type !== "application/vnd.google-earth.kml+xml" &&
      !file.name.toLowerCase().endsWith(".kml")
    ) {
      toast.error("Only KML files are allowed!");
      return;
    }

    if (!file) {
      toast.error("file not selected");
      return;
    }

    setFileName(file.name);
    setLoading(true);
    setShowSummary(false);
    setShowDetailed(false);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        // Parse KML
        const kmlText = e.target.result;
        const parser = new DOMParser();
        const kmlDoc = parser.parseFromString(kmlText, "text/xml");

        console.log("kmlDoc--->", kmlDoc);

        setKmlData(kmlDoc);

        // Convert to GeoJSON
        const geoJson = toGeoJSON.kml(kmlDoc);
        setGeoJsonData(geoJson);

        // Count elements
        const counts = countElements(geoJson);
        setElementCounts(counts);

        // Calculate details (lengths)
        const details = calculateElementDetails(geoJson);
        setElementDetails(details);

        setLoading(false);
      } catch (error) {
        console.error("Error processing KML file:", error);
        toast.error(
          "Error processing KML file. Please check if the file is valid."
        );
        setLoading(false);
      }
    };

    reader.readAsText(file);
  };

  const toggleSummary = () => {
    setShowSummary(!summary);
    if (!summary) setShowDetailed(false);
  };

  const toggleDetailed = () => {
    setShowDetailed(!detailed);
    if (!detailed) setShowSummary(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-black to-gray-700 p-6">
            <h1 className="text-3xl font-bold text-white">KML Viewer</h1>
            <p className="text-blue-100 mt-2">
              Upload a KML file to visualize and analyze geographic data
            </p>
          </div>

          {/* File Upload Section */}
          <FileUploadSection
            fileName={fileName}
            loading={loading}
            handleFileUpload={handleFileUpload}
            toggleSummary={toggleSummary}
            toggleDetailed={toggleDetailed}
            summary={summary}
            detailed={detailed}
            isDisabled={!kmlData || loading}
          />

          {/* Summary Section */}
          {summary && kmlData && <SummaryTable elementCounts={elementCounts} />}

          {/* Detailed Section */}
          {detailed && kmlData && (
            <DetailedTable elementDetails={elementDetails} />
          )}

          {/* Map Section */}
          {kmlData && <MapView geoJsonData={geoJsonData} fileName={fileName} />}
        </div>
      </div>
      <div className="mt-6 bg-center bg-black  text-sm h-10"></div>
    </div>
  );
};

export default KMLViewer;
