import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import styles from "theme/styles";

const config : ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

const overrides = {
    config,
    styles,
};

export default extendTheme(overrides);
