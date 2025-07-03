import { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
const C = createContext();
export const useTheme = () => useContext(C);
export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(Appearance.getColorScheme());
  useEffect(
    () =>
      Appearance.addChangeListener(({ colorScheme }) => setMode(colorScheme)),
    []
  );
  return (
    <C.Provider
      value={{
        mode,
        toggle: () => setMode((m) => (m === "light" ? "dark" : "light")),
      }}
    >
      {children}
    </C.Provider>
  );
}
