import NavigateButton, { NavigateButtonProps } from "@/components/ui/NavigateButton.tsx";

interface PanelNavigationProps {
  buttons: NavigateButtonProps[];
}

const PanelNavigation = ({ buttons }: PanelNavigationProps) => {
  return (
    <div className="mt-20 mb-10 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex sm:flex-wrap sm:justify-center sm:flex-row sm:gap-2">
        {buttons.map((button, index) => (
          <div key={index}>
            <NavigateButton path={button.path} name={button.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PanelNavigation;