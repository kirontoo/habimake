import {
    Text,
    HStack,
} from "@chakra-ui/react";
import Logo from "./Logo";
import RouterLink from "./RouterLink";

function Brand() {
    return (
        <HStack fontSize="2xl">
            <Logo zIndex="1400"/>
            <RouterLink href="/" _hover={{ textDecoration: "none" }}>
                <Text 
                    color="white" 
                    as="strong" 
                    align="center">HABIMAKE</Text>
            </RouterLink>
        </HStack>
    );
}

export default Brand;

