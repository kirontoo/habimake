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
import { useAuth } from 'context/Auth';

const LinkItems: Array<LinkItemProps> = [
    { name: "Home", href: "/"},
    { name: "Account", href: "account" },
    { name: "My Habits", href: "habits"},
];

interface LinkItemProps {
    name: string;
    href: string;
}

interface AuthBtnProps {
    onClick: () => void
};

function AuthButtons({ onClick }: AuthBtnProps ) {
    const auth = useAuth();
    const router = useRouter();
    if (auth.isAuth) {
        return (
            <Button
                fontSize="2xl"
                size="lg"
                onClick={ async () => {
                    try {
                        onClick();
                        await auth.signOut();
                        router.push('/');
                    } catch(err) {
                    }
                }}
            >Logout</Button>
        ) 
    } else {
        return (

            <Button
                fontSize="2xl"
                size="lg"
                onClick={() => {
                    onClick();
                    router.push("/login");
                }}
            >Login</Button>
        ) 
    }
}

function SidebarWithHeader({ children }: { children: ReactNode; }) {
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
                           <AuthButtons onClick={onClose}/> 
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
