import { Button } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";
import { HiMoon, HiSun } from "react-icons/hi2";

const ThemeToggle = () => {
    const { colorMode, setColorMode } = useColorMode();
    const toggleTheme = () => {
      setColorMode(colorMode === 'light' ? 'dark' : 'light');
    };
  
    return (
      <Button onClick={toggleTheme} variant="ghost">
        {colorMode === 'light' ? <HiMoon /> : <HiSun />}
      </Button>
    );
  };

export default ThemeToggle;