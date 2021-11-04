import NextLink from "next/link";
import { Link, LinkProps } from "@chakra-ui/react";
import { ReactElement } from "react";

interface RouterLinkProps extends LinkProps{
    children: ReactElement;
    href: string;
}

function RouterLink({ children, href, ...rest }: RouterLinkProps ) {
   return (
        <NextLink href={href}>
            <Link 
                as="li"
                style={{listStyle: "none"}}
                {...rest}>
                {children}
            </Link>
        </NextLink>
    ) 
}

export default RouterLink;
