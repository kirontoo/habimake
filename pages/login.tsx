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
} from "@chakra-ui/react";
import { 
    Formik,
    Form,
    Field,
    FormikHelpers,
} from "formik";
import * as Yup from "yup";
import PasswordInput from "components/PasswordInput";
import { supabase } from "lib/supabaseClient";
import { useState } from "react";

const LoginSchema: Yup.SchemaOf<{email: string, password: string}> = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .required('Required')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
});

type AuthUserForm = {
    email: string,
    password: string,
    username?: string,
    verifyPassword?: string
};

function Login() {
    let initialValues: AuthUserForm = {
        email: "",
        password: "",
    }

    let onSubmit = async (values: AuthUserForm, actions: FormikHelpers<AuthUserForm> ) => {
        try {
            const { user, session, error } = await supabase.auth.signIn({
                email: values.email,
                password: values.password,
            });
        } catch(err) {
            actions.setErrors({email: "Invalid email or password", password: "Invalid email or password"})
            actions.setSubmitting(false);
        }
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
                    validationSchema={LoginSchema}
                    onSubmit={onSubmit}
                >
                    {(props) => (
                        <Form style={{width: "100%"}}>
                            <VStack 
                                spacing={10}
                                w="full"
                            >
                                <Field name="email">
                                    { ({ field, meta }) => ( 
                                        <FormControl isInvalid={meta.error && meta.touched} isRequired>
                                            <FormLabel htmlFor="email">Email</FormLabel>
                                            <Input 
                                                {...field}
                                                id="email"
                                                type="email"
                                                />
                                            {
                                                (meta.touched && meta.error)
                                                ? ( <FormErrorMessage color="pink">{meta.error}</FormErrorMessage> )
                                                : ( <FormHelperText>Please enter your email address.</FormHelperText> )
                                            }
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="password">
                                    {({ field, meta }) => (
                                        <FormControl isInvalid={meta.error && meta.touched} isRequired>
                                            <FormLabel htmlFor="password">Password</FormLabel>
                                            <PasswordInput
                                                id="password"
                                                {...field}
                                                />
                                            {
                                                (meta.touched && meta.error)
                                                ? ( <FormErrorMessage color="pink">{meta.error}</FormErrorMessage> )
                                                : ( <FormHelperText>Please enter your password</FormHelperText> )
                                            }
                                        </FormControl>
                                    )}
                                </Field>
                                <Button 
                                    w="70%"
                                    type="submit"
                                    isLoading={props.isSubmitting}
                                    size="lg"
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
