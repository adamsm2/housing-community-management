import { useLocation, useNavigate } from "react-router-dom";

export interface NavigateButtonProps {
  path: string;
  name: string;
}

const NavigateButton = ({ path, name }: NavigateButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <button
      type="button"
      onClick={() => navigate(path)}
      className={"mt-2 block w-full px-3.5 py-2.5 text-center text-sm font-semibold text-textTitle border border-textContent rounded " +
        (location.pathname === path ? "bg-primary text-white" : "hover:bg-primaryHover")}
    >
      {name}
    </button>
  );
};

export default NavigateButton;