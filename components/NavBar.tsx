import  { HamburgerIcon } from "@chakra-ui/icons";
import {
    IconButton,
    Flex,
    Spacer,
    Center,
    FlexProps,
    IconButtonProps
} from '@chakra-ui/react';
import { motion } from "framer-motion";

import Brand from "components/Brand";

interface NavProps extends FlexProps {
    onOpen: () => void
}

function Navbar({onOpen, ...rest}: NavProps) {
    const MotionMenuButton = motion<IconButtonProps>(IconButton)
    return (
        <Flex {...rest}>
            <Brand/>
            <Spacer/>
            <Center>
                <MotionMenuButton
                    onClick={onOpen}
                    size="lg"
                    aria-label="open menu"
                    variant="ghost"
                    icon={<HamburgerIcon w={8} h={8} color="cyan.500"/>}
                    _hover={{
                        border: "2px",
                        borderStyle: "dashed",
                        borderColor: "cyan.400",
                    }}
                    whileHover={{ 
                        rotate: 180,
                        transition: { 
                            easeIn: "linear",
                            easeOut: "linear",
                            duration: 0.2, 
                            delay: 0 
                        }
                    }}
                />
            </Center>
        </Flex>
    );
}

export default Navbar;
