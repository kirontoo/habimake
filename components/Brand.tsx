import {
    Text,
    HStack,
} from "@chakra-ui/react";
import Logo from "./Logo";

function Brand() {
    return (
        <HStack fontSize="2xl">
            <Logo zIndex="1400"/>
            <Text 
                color="white" 
                as="strong" 
                align="center">HABIMAKE</Text>
        </HStack>
    );
}

export default Brand;

