// src/pages/HomePage.tsx
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { UtilsService } from "@/client";
import { useNavigateTo } from "@/hooks/useNavigateTo";

function HomePage() {
  const { signOut, user } = useAuth();
  const { toLogin } = useNavigateTo();

  const handleLogout = () => {
    signOut();
    toLogin();
  };

  const handleTestEmail = async () => {
    await UtilsService.testEmail({ emailTo: "benjamin.vandamme@me.com" });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Welcome {user?.email}!</h1>
      <p>This is a protected route. You must be logged in to view it.</p>
      <div className="flex gap-2">
        <Button onClick={handleLogout}>Logout</Button>
        <Button onClick={handleTestEmail}>Test email</Button>
      </div>
    </div>
  );
}

export default HomePage;
