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
import { 
   Formik,
   Form,
   Field,
} from "formik";
import { useState } from "react";
import * as Yup from "yup";

 const LoginSchema: Yup.SchemaOf<{email: string, password: string}> = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
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
    let [ showPassword, setShowPassword ]= useState<boolean>(false);

    function onShowPassword() {
        setShowPassword(!showPassword);
    };

    let initialValues: AuthUserForm = {
        email: "",
        password: "",
    }

    let onSubmit = (values: AuthUserForm, actions) => {
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
                                        <FormControl isInvalid={meta.error && meta.touched}>
                                            <FormLabel htmlFor="email">Email address</FormLabel>
                                            <Input 
                                                {...field}
                                                id="email"
                                                type="email"
                                                />
                                            {
                                                (meta.touched && meta.error)
                                                ? ( <FormErrorMessage color="pink">{meta.error}</FormErrorMessage> )
                                                : ( <FormHelperText>We&apos;ll never share your email.</FormHelperText> )
                                            }
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="password">
                                    {({ field, meta }) => (
                                        <FormControl isInvalid={meta.errors && meta.touched}>
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
                                            {
                                                (meta.touched && meta.error)
                                                ? ( <FormErrorMessage color="pink">{meta.error}</FormErrorMessage> )
                                                : ( <FormHelperText>We&apos;ll never share your email.</FormHelperText> )
                                            }
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
