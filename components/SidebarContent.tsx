import {
    Box,
    BoxProps,
    CloseButton,
    Flex,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

import NavItem from "components/NavItem";

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', href: '/'},
    { name: 'Trending', href: 'trending' },
    { name: 'Explore, ', href: 'trending'},
    { name: 'Favourites', href: 'trending'},
    { name: 'Settings', href: 'trending'},
];

interface LinkItemProps {
    name: string;
    href: string;
}

function SidebarContent ({ onClose, ...rest }: SidebarProps) {
    return (
        <Box
            transition="3s ease"
            w={{ base: 'full'}}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                Logo
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem 
                    key={link.name} 
                    href={link.href}
                    onClick={onClose}
                >
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

export default SidebarContent;
