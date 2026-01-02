import { Outlet } from "react-router-dom";

export default function Subject() {
  return (
    <div className="w-full min-h-full">
      {/* Main Content Viewport */}
      <main className="w-full relative">
        <Outlet />
      </main>
    </div>
  );
}
