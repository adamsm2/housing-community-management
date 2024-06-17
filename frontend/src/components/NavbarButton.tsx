interface NavbarButtonProps {
  name: string;
  onClick: () => void;
}

const NavbarButton = (item: NavbarButtonProps) => {
  return (
    <button key={item.name} onClick={item.onClick}
            className="text-sm font-semibold leading-6 group transition duration-300">
      {item.name}
      <span
        className="block transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 h-0.5 bg-primary"></span>
    </button>
  );
};

export default NavbarButton;