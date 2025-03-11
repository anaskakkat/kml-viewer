import React from "react";

const FileUploadSection = ({
  fileName,
  loading,
  handleFileUpload,
  toggleSummary,
  toggleDetailed,
  summary,
  detailed,
  isDisabled,
}) => {
  return (
    <div className="p-6 border-b min-h-[60vh] ">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <label className="flex-1 h-68 w-60 flex items-center justify-center ">
          <div className="relative cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:bg-gray-100 transition duration-300 h-full min-h-[12rem] flex flex-col items-center justify-center w-full ">
            <input
              type="file"
              accept=".kml"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="text-gray-700 flex flex-col items-center justify-center">
              <svg
                className="h-16 w-16"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="mt-2 text-sm font-medium text-center">
                {fileName ? fileName : "Click or drag to upload KML file"}
              </p>
            </div>
          </div>
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={toggleSummary}
            disabled={isDisabled}
            className={`px-4 py-2 rounded-md font-medium ${
              summary
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            } transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Summary
          </button>
          <button
            onClick={toggleDetailed}
            disabled={isDisabled}
            className={`px-4 py-2 rounded-md font-medium ${
              detailed
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            } transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Detailed
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700"></div>
        </div>
      )}
    </div>
  );
};

export default FileUploadSection;
