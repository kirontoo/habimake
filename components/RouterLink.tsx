import NextLink from "next/link";
import { Link, LinkProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface RouterLinkProps extends LinkProps{
    children: ReactNode;
    href: string;
}

function RouterLink({ children, href, ...rest }: RouterLinkProps ) {
    return (
        <NextLink href={href}>
            <Link 
                href={href}
                as="li"
                style={{listStyle: "none"}}
                {...rest}>
                {children}
            </Link>
        </NextLink>
    ) 
}

export default RouterLink;
