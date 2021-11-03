import {
    Box,
    Link
} from "@chakra-ui/react";
import NextLink from "next/link";

function Logo() {
    return (
        <Box 
            border="2px" 
            borderColor="cyan.500" 
            borderRadius="md"
            h="fit-content"
            pl={1}
            pr={1}
            fontSize="2xl"
        >
            <NextLink href="/">
                <Link 
                    color="white" 
                    as="strong" 
                    _hover={{ 
                        textDecoration: "none" 
                    }}
                >HM</Link>
            </NextLink>
        </Box>
    );
}

export default Logo;

