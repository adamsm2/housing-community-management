import { useNavigate } from "react-router-dom";

interface NavigateFormButtonProps {
  path: string;
  name: string;
}

const NavigateFormButton = ({ path, name }: NavigateFormButtonProps) => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(path)}
      className="mt-2 block w-full px-3.5 py-2.5 text-center text-sm font-semibold text-textTitle underline hover:text-primaryHover"
    >
      {name}
    </button>
  );
};

export default NavigateFormButton;