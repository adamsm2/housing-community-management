import { useLocation, useNavigate } from "react-router-dom";

interface SidebarButtonProps {
  name: string;
  pathName: string;
  imageComponent: JSX.Element | JSX.Element[];
}

const SidebarButton = ({ name, pathName, imageComponent }: SidebarButtonProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(pathName)} className="group transition duration-300">
      <div className={"flex items-center " + (location.pathname === pathName ? "text-primaryHover" : "")}>
        <div className="w-8">
          {imageComponent}
        </div>
        <h1 className="ml-2 text-sm font-semibold leading-6">{name}</h1>
      </div>
      <span
        className="block transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 h-0.5 bg-primary"></span>
    </button>
  );
};

export default SidebarButton;