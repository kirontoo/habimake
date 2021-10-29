import {
    Box,
    Center,
    Text,
    HStack,
    Link
} from "@chakra-ui/react";
import NextLink from "next/link";

function Logo() {
    return (
        <HStack fontSize="2xl">
            <Box 
                border="2px" 
                borderColor="cyan.500" 
                borderRadius="md"
                h="fit-content"
                pl={1}
                pr={1}
            >
                <NextLink href="/">
                <Link color="white" as="strong">HM</Link>
                </NextLink>
            </Box>
            <Text color="white"  as="strong" align="center">HABIMAKE</Text>
        </HStack>
    );
}

export default Logo;

