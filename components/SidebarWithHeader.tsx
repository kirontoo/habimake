import React, { ReactNode } from 'react';
import {
    Box,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Button,
    VStack,
    useDisclosure,
} from "@chakra-ui/react";

import SidebarContent from "components/SidebarContent";
import NavBar from "components/NavBar";
import NavItem from "components/NavItem";
import RouterLink from "components/RouterLink";
import { useRouter } from "next/router";

const LinkItems: Array<LinkItemProps> = [
    { name: "Home", href: "/"},
    { name: "Account", href: "placeholder" },
    { name: "My Habits", href: "placeholder"},
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
    const router = useRouter();
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
                    borderLeftWidth="5px"
                    borderLeftStyle="solid"
                    borderLeftColor="cyan"
                    bg="navy.300"
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
                        <VStack 
                            m={4}
                            ml={8}
                            p={8}
                            pl={0}
                            w="75%"
                            borderTopWidth="2px"
                            borderTopStyle="solid"
                            borderTopColor="cyan.tint"
                            alignItems="flex-start"
                        >
                            <Button
                                href="login" 
                                fontSize="2xl"
                                size="lg"
                                onClick={() => {
                                    router.push("/login");
                                    onClose();
                                }}
                            >Login</Button>
                        </VStack>
                    </SidebarContent>
                </DrawerContent>
            </Drawer>
            <NavBar onOpen={onOpen} />
            <Box>
                {children}
            </Box>
        </Box>
    );
}

export default SidebarWithHeader;
