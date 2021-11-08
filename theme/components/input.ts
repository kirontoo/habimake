/**
* source: https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/input.ts
*/

import { inputAnatomy as parts } from "@chakra-ui/anatomy"
import type {
    PartsStyleFunction,
} from "@chakra-ui/theme-tools"
import { getColor, mode } from "@chakra-ui/theme-tools"

function getDefaults(props: Record<string, any>) {
    const { focusBorderColor: fc, errorBorderColor: ec } = props
    return {
        focusBorderColor: fc || mode("blue.500", "cyan.100")(props),
        errorBorderColor: ec || mode("red.500", "red.300")(props),
    }
}

const variantFilled: PartsStyleFunction<typeof parts> = (props) => {
    const { theme } = props
    const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

    return {
        field: {
            border: "2px solid",
            borderColor: "transparent",
            bg: mode("gray.100", "whiteAlpha.50")(props),
            _hover: {
                bg: mode("gray.200", "cyan.tint")(props),
            },
            _readOnly: {
                boxShadow: "none !important",
                userSelect: "all",
            },
            _disabled: {
                opacity: 0.4,
                cursor: "not-allowed",
            },
            _invalid: {
                borderColor: getColor(theme, ec),
            },
            _focus: {
                bg: "transparent",
                borderColor: getColor(theme, fc),
            },
        },
        addon: {
            border: "2px solid",
            borderColor: "transparent",
            bg: mode("gray.100", "whiteAlpha.50")(props),
        },
    }
}

const variants = {
    filled: variantFilled,
}

const defaultProps = {
    size: "md",
    variant: "filled",
}

export default {
    parts: parts.keys,
    variants,
    defaultProps,
}
