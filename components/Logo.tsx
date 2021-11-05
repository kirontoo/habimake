import {
    Center,
    Link,
} from "@chakra-ui/react";
import NextLink from "next/link";

function Logo({...rest}) {
    return (
        <Center 
            border="2px" 
            borderColor="cyan" 
            borderRadius="md"
            p={1}
            {...rest}
        >
            <NextLink href="/">
                <Link 
                    fontSize="3xl"
                    fontFamily="Rubik Mono One"
                    color="white" 
                    lineHeight="1"
                    _hover={{ 
                        textDecoration: "none" 
                    }}
                >HM</Link>
            </NextLink>
        </Center>
    );
}

export default Logo;

