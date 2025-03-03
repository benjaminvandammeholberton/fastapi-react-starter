import ReactLogo from "@/assets/react-1.png";
import FastAPILogo from "@/assets/fastapi-1.png";
import PostgresLogo from "@/assets/postgres-1.png";
import DockerLogo from "@/assets/docker-1.png";
import TraefikLogo from "@/assets/traefik-1.png";

const Title = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-3">Full Stack Template</h1>
      <div className="flex gap-4 justify-center mb-2">
        <img className="size-10" src={DockerLogo} alt="Docker logo" />
        <img className="size-10" src={PostgresLogo} alt="Postgres logo" />
        <img className="size-10" src={FastAPILogo} alt="FastAPI logo" />
        <img className="size-10" src={ReactLogo} alt="React logo" />
        <img className="size-10" src={TraefikLogo} alt="Traefik logo" />
      </div>
    </div>
  );
};

export default Title;
