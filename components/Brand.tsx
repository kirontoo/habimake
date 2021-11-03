import {
    Text,
    HStack,
} from "@chakra-ui/react";
import Logo from "./Logo";

function Brand() {
    return (
        <HStack fontSize="2xl">
            <Logo/>
            <Text 
                color="white" 
                as="strong" 
                align="center">HABIMAKE</Text>
        </HStack>
    );
}

export default Brand;

