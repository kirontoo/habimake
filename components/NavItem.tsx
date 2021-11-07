import {
    VStack,
    Text,
    StackProps,
} from "@chakra-ui/react";
import { ReactText } from "react";

import RouterLink from "./RouterLink";

interface NavItemProps extends StackProps {
    children: ReactText;
    href: string;
    index: number;
}

function NavItem ({ children, href, index, ...rest }: NavItemProps) {
    return (
        <RouterLink 
            as="li"
            href={href}
            fontSize="2xl"
            style={{  listStyle: "none" }}
            _hover={{
                textDecoration: "none"
            }}
            position="relative"
        >
            <VStack
                as="a"
                href={href}
                align="flex-start"
                p="4"
                mx="4"
                role="group"
                cursor="pointer"
                _hover={{ color: "cyan" }}
                {...rest}>
                <Text 
                    as="span"
                    fontSize="lg"
                    color="cyan"
                >0{index}.</Text>
                <Text as="span">{children}</Text>
            </VStack>
        </RouterLink>
    );
};

export default NavItem;
