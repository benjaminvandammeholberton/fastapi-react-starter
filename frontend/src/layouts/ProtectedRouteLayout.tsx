// src/layouts/AppLayout.tsx
import { Outlet } from 'react-router-dom'

function ProtectedRouteLayout() {
  return (
    // <div className="flex flex-col items-center">
    //     <Title />
    //     <main className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    //       <Outlet />
    //     </main>
    // </div>
    <Outlet />

  );
}

export default ProtectedRouteLayout
