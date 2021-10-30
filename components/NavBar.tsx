import  { 
    HamburgerIcon ,
} from '@chakra-ui/icons';
import {
    IconButton,
    Flex,
    Spacer,
    Center,
    FlexProps
} from '@chakra-ui/react';

import Logo from "components/Logo";

interface NavProps extends FlexProps {
    onOpen: () => void
}

function Navbar({onOpen, ...rest}: NavProps) {
    return (
        <Flex {...rest}>
            <Logo/>
            <Spacer/>
            <Center>
                <IconButton
                    onClick={onOpen}
                    size="lg"
                    aria-label="open menu"
                    variant="ghost"
                    icon={<HamburgerIcon w={8} h={8} color="cyan.500"/>}
                    _hover={{
                        border: "2px",
                        borderStyle: "dashed",
                        borderColor: "cyan.400",
                    }}
                />
            </Center>
        </Flex>
    );
}

export default Navbar;
