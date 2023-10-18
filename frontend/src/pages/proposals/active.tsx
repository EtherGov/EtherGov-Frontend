import React from "react";
import Sidebar from "../../components/SideBar/SideBar";

export default function Active() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      {/* Content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-4">
          <h1>Active </h1>
          <p>Thiasdasdasdasdas</p>
        </main>
      </div>
    </div>
  );
}
