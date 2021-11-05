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
                    fontFamily="Rubik"
                    color="white" 
                    as="strong" 
                    align="center">HabiMake</Text>
            </RouterLink>
        </HStack>
    );
}

export default Brand;

