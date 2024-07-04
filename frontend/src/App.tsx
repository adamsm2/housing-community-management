import { RouterProvider } from "react-router-dom";
import router from "@/router/router.tsx";
import "./index.css";
import "./i18n";
import "react-toastify/dist/ReactToastify.css";
import useInitApp from "@/hooks/useInitApp.ts";

const App = () => {
  useInitApp();
  return (
    <RouterProvider router={router} />
  );
};

export default App;