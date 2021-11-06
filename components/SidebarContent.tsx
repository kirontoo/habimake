import {
    HStack,
    BoxProps,
    CloseButton,
    Flex,
    ButtonProps
} from "@chakra-ui/react";
import  { motion } from "framer-motion";
import { ReactNode } from "react";

interface SidebarProps extends BoxProps {
    onClose: () => void;
    children?: ReactNode;
}

function SidebarContent ({ onClose, children, ...rest }: SidebarProps) {
    const MotionCloseButton = motion<ButtonProps>(CloseButton);
    return (
        <Flex
            as="ul"
            flexDir="column"
            align="flex-start"
            transition="3s ease"
            w={{ base: 'full'}}
            pos="fixed"
            h="full"
            style={{ counterReset: 'link-inc 0' }}
            {...rest}
        >
            <HStack w="full" justifyContent="flex-end" p={4}>
                <MotionCloseButton 
                    _hover={{
                        borderStyle:"dashed",
                        borderWidth:"2px",
                        borderColor:"cyan"
                    }}
                    p={1}
                    color="cyan"
                    size="lg"
                    display={{ base: 'flex', md: 'none' }} 
                    onClick={onClose} 
                    whileHover={{ 
                        scale: 1.2,
                        transition: { 
                            duration: 0.1, 
                            delay: 0 
                        }
                    }}
                    />
            </HStack>
            {children}
        </Flex>
    );
};

export default SidebarContent;
