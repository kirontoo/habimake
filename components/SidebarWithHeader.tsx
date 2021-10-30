import React, { ReactNode } from 'react';
import {
    Box,
    useColorModeValue,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    useDisclosure,
} from '@chakra-ui/react';

import SidebarContent from "components/SidebarContent";
import NavBar from "components/NavBar";

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
                <DrawerContent bg="blue.800">
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            <NavBar onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4" bg="blue.900">
                {children}
            </Box>
        </Box>
    );
}

export default SidebarWithHeader;
