import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border p-4 flex flex-col items-center w-sm h-[345px]">
        <Outlet />
      </div>
  );
}

export default AuthLayout;
