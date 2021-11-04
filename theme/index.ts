import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import styles from "theme/styles";
import colors from "theme/colors";

const config : ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

const overrides = {
    config,
    colors,
    styles,
};

export default extendTheme(overrides);
