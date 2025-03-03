import { useNavigate } from "react-router-dom";

export function useNavigateTo() {
  const navigate = useNavigate();

  return {
    toLogin: (email?: string) => navigate("/auth/login", { state: { email } }),
    toRegister: () => navigate("/auth/register"),
    toHome: () => navigate("/app/home"),
    toLanding: () => navigate("/"),
  };
}
