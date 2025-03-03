// src/pages/LandingPage.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Title from "@/components/Title";
import { ModeToggle } from "@/components/ModeToggle";

function LandingPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5">
      <Title />
      <div className="flex flex-col items-center justify-center gap-4">
        <p>This is the landing page</p>
        <div className="flex gap-2">
          <Link to="/auth/login">
            <Button>Login</Button>
          </Link>
          <Link to="/auth/register">
            <Button variant="secondary">Register</Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
