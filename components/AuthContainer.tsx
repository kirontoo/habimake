import {
    Center,
    VStack,
    Text,
    Link,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface AuthContainerProps {
    title: string,
    children: ReactNode
}

function AuthContainer({ children, title }: AuthContainerProps) {
    return (
        <Center 
            my="20"
            h={{ lg:"50vh" }}
        >
            <VStack
                borderWidth={2}
                borderColor="cyan"
                borderRadius="4px"
                h="min-content"
                w={{
                    sm: "full",
                    md: "50%",
                    lg: "40%"
                }}
                position="relative"
                p={10}
                pt={14}
            >
                <Center
                    position="absolute"
                    top="-10"
                    w="3xs"
                    h="fit-content"
                    borderWidth={2}
                    borderColor="cyan"
                    borderRadius="4px"
                    bg="navy.400"
                    p={2}
                >
                    <Text
                        as="span"
                        fontWeight="600"
                        fontSize="4xl"
                    >{title}</Text>
                </Center>
                {children}
            </VStack>
        </Center>
    )
}

export default AuthContainer;
