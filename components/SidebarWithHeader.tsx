import React, { ReactNode } from 'react';
import {
    Box,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    useDisclosure,
} from "@chakra-ui/react";

import SidebarContent from "components/SidebarContent";
import NavBar from "components/NavBar";
import NavItem from "components/NavItem";

const LinkItems: Array<LinkItemProps> = [
    { name: "Home", href: "/"},
    { name: "Trending", href: "trending" },
    { name: "Explore", href: "trending"},
    { name: "Favourites", href: "trending"},
    { name: "Settings", href: "trending"},
];

interface LinkItemProps {
    name: string;
    href: string;
}

function SidebarWithHeader({
    children,
}: {
    children: ReactNode;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh">
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="sm"
            >
                <DrawerOverlay/>
                <DrawerContent 
                    borderLeftWidth="4px"
                    borderLeftStyle="solid"
                    borderLeftColor="cyan.500"
                    bg="blue.800"
                >
                    <SidebarContent onClose={onClose}>
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
                    </SidebarContent>
                </DrawerContent>
            </Drawer>
            <NavBar onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}

export default SidebarWithHeader;
