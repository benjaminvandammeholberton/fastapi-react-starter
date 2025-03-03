// src/layouts/AppLayout.tsx
import Title from "@/components/Title";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 items-center w-full">
      <Title />
      <main className="flex-1 flex flex-col items-center justify-center">
       {children}
      </main>
    </div>
  );
}

export default AppLayout;
