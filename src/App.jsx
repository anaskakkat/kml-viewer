import React from "react";
import KMLViewer from "./screens/KMLViewer";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      />
      <KMLViewer />
    </>
  );
}

export default App;
