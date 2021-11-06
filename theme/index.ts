import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import styles from "theme/styles";
import colors from "theme/colors";
import components from "theme/components";

const config : ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

const overrides = {
    components,
    config,
    colors,
    styles,
};

export default extendTheme(overrides);
