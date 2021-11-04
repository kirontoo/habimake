import {
    HStack,
    BoxProps,
    CloseButton,
    Flex,
    ButtonProps
} from "@chakra-ui/react";
import  { motion } from "framer-motion";

import NavItem from "components/NavItem";

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', href: '/'},
    { name: 'Trending', href: 'trending' },
    { name: 'Explore', href: 'trending'},
    { name: 'Favourites', href: 'trending'},
    { name: 'Settings', href: 'trending'},
];

interface LinkItemProps {
    name: string;
    href: string;
}

function SidebarContent ({ onClose, ...rest }: SidebarProps) {
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
                        borderColor:"cyan.400"
                    }}
                    p={1}
                    color="cyan.400"
                    size="lg"
                    display={{ base: 'flex', md: 'none' }} 
                    onClick={onClose} 
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
            </HStack>
            {LinkItems.map((link, index) => (
                <NavItem 
                    key={link.name} 
                    index={index+1}
                    href={link.href}
                    onClick={onClose}
                >
                    {link.name}
                </NavItem>
            ))}
        </Flex>
    );
};

export default SidebarContent;
