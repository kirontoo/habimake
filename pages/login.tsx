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

import { useState } from "react";

import { Prisma } from "@prisma/client";
import { Formik, Form, Field } from "formik";

type AuthUser = {
    email: string,
    password: string,
    username?: string,
    verifyPassword?: string
};

function Login() {
    let [ showPassword, setShowPassword ]= useState<boolean>(false);

    function onShowPassword() {
        setShowPassword(!showPassword);
    };

    let initialValues: AuthUser = {
        email: "",
        password: "",
    }

    let onSubmit = (values: AuthUser, actions) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            actions.setSubmitting(false)
        }, 1000)
    };

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
                    >Login</Text>
                </Center>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                >
                    {(props) => (
                        <Form style={{width: "100%"}}>
                            <VStack 
                                spacing={10}
                                w="full"
                            >
                                <Field name="email">
                                    { ({ field, form }) => ( 
                                        <FormControl isInvalid={form.errors.email && form.touched.email}>
                                            <FormLabel htmlFor="email">Email address</FormLabel>
                                            <Input 
                                                {...field}
                                                id="email"
                                                type="email"
                                                />
                                            <FormHelperText>We&apos;ll never share your email.</FormHelperText>
                                            <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="password">
                                    {({ field, form}) => (
                                        <FormControl isInvalid={form.errors.password && form.touched.password}>
                                            <FormLabel htmlFor="password">Password</FormLabel>
                                            <InputGroup size="md">
                                                <Input
                                                    {...field}
                                                    id="password"
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
                                            <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Button 
                                    w="70%"
                                    type="submit"
                                    isLoading={props.isSubmitting}
                                >Login</Button>
                            </VStack>
                        </Form>
                    )}
                </Formik>
            </VStack>
        </Center>
    )
}

export default Login;
