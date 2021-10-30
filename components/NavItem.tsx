import {
    Flex,
    Link,
    FlexProps,
} from '@chakra-ui/react';
import { ReactText } from 'react';
import NextLink from 'next/link';

interface NavItemProps extends FlexProps {
    children: ReactText;
    href: string;
}

function NavItem ({ children, href, ...rest }: NavItemProps) {
    return (
        <NextLink href={href}>
            <Link style={{ textDecoration: 'none' }}>
                <Flex
                    align="center"
                    p="4"
                    mx="4"
                    role="group"
                    cursor="pointer"
                    _hover={{
                        color: 'cyan.400',
                        borderBottom: "1px",
                        borderBottomColor: "cyan.400",
                    }}
                    {...rest}>
                    {children}
                </Flex>
            </Link>
        </NextLink>
    );
};

export default NavItem;
