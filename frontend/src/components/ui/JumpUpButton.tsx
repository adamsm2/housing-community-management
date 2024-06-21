import { ChevronDoubleUpIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

const JumpUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ChevronDoubleUpIcon
      className={"z-20 fixed bottom-4 right-1 h-12 w-12 rounded-full shadow-inner p-2.5 cursor-pointer transition-all duration-300 hover:scale-110 " + (isVisible ? "opacity-100" : "opacity-0 pointer-events-none")}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-hidden="true" />
  );
};

export default JumpUpButton;