import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import paths from "@/router/paths.ts";
import { Outlet } from "react-router-dom";

const UserPanelSidebar = () => {
  const sidebarItems = [
    { name: "Apartments", pathName: paths.user.root, imageComponent: <BuildingOffice2Icon /> },
    { name: "Meter readings", pathName: paths.user.meters, imageComponent: <BuildingOffice2Icon /> },
  ];
  return (
    <>
      {/*      <div className="fixed px-2 top-40 left-0 h-1/2 w-auto backdrop-blur-lg shadow-lg">
        <div className="flex-col">
          {sidebarItems.map((item) => (
            <div key={item.name}>
              <SidebarButton name={item.name} pathName={item.pathName}
                             imageComponent={item.imageComponent} />
            </div>
          ))}
        </div>
      </div>*/}
      <Outlet />
    </>
  );
};

export default UserPanelSidebar;