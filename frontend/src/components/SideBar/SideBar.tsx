// components/Sidebar.js
import React from "react";
import Link from "next/link"; // importing the Link component from next/link

const Sidebar = () => {
  return (
    <div className="min-h-screen w-64 bg-gray-800 text-white">
      <div className="flex flex-col p-4">
        <div className="mb-8">
          <div className="font-semibold text-xl">Proposals</div>
        </div>

        {/* Sidebar links */}
        <nav>
          <Link href="/proposals/active">
            <p className="block py-2.5 px-4 hover:bg-gray-700 rounded transition duration-200">
              Active
            </p>
          </Link>
          <Link href="/proposals/ended">
            <p className="block py-2.5 px-4 hover:bg-gray-700 rounded transition duration-200">
              Ended
            </p>
          </Link>
          <Link href="/proposals/propose">
            <p className="block py-2.5 px-4 hover:bg-gray-700 rounded transition duration-200">
              Propose
            </p>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
