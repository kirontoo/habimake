import {
    Center,
    VStack,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Button,
    Text,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";

import { useState } from 'react';

function Login() {
    let [ showPassword, setShowPassword ]= useState<boolean>(false);

    function onShowPassword() {
        setShowPassword(!showPassword);
    };

    return (
        <Center 
            my="20"
            h={{
                lg:"50vh"
            }}
        >
            <VStack
                borderWidth={2}
                borderColor="cyan"
                borderRadius="4px"
                h="min-content"
                w={{
                    sm: "full",
                    md: "50%",
                    lg: "35%"
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
                    >Login</Text>
                </Center>
                <VStack 
                    as="form" 
                    spacing={10}
                    w="full"
                >
                    <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" />
                        <FormHelperText>We&apos;ll never share your email.</FormHelperText>
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <InputGroup size="md">
                            <Input
                                    pr="4.5rem"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                />
                            <InputRightElement width="4.5rem">
                                <Button 
                                    h="1.75rem" 
                                    size="sm" 
                                    onClick={onShowPassword}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormHelperText>We&apos;ll never share your password.</FormHelperText>
                    </FormControl>
                    <Button 
                        w="70%"
                    >Login</Button>
                </VStack>
            </VStack>
        </Center>
    )
}

export default Login;
