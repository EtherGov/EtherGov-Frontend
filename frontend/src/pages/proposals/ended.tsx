import React from "react";
import Sidebar from "../components/SideBar";

export default function Ended() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      {/* Content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-4">
          <h1>Ended</h1>
          <p>
            This is the main content area where you might place your text,
            images, or other types of content.
          </p>
        </main>
      </div>
    </div>
  );
}
