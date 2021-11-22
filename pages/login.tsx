import {
    VStack,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Button,
} from "@chakra-ui/react";
import { 
    Formik,
    Form,
    Field,
    FormikHelpers,
} from "formik";
import * as Yup from "yup";
import PasswordInput from "components/PasswordInput";
import RouterLink from "components/RouterLink";
import AuthFormContainer from "components/AuthFormContainer";
import { useRouter } from "next/router";
import { useAuth } from "context/Auth";
import { AuthSchema } from "lib/Schema";
import { useEffect } from "react";

type AuthUserForm = {
    email: string,
    password: string
};

function Login() {
    const router = useRouter();
    const auth = useAuth();

    let initialValues: AuthUserForm = {
        email: "",
        password: "",
    };

    useEffect(() => {
        if ( auth.isAuth ) {
            router.push('/');
        }
    }, [auth]);

    const LoginSchema: Yup.SchemaOf<AuthUserForm> = Yup.object().shape({
        email: AuthSchema.Email,
        password: Yup.string()
    });

    let onSubmit = async (values: AuthUserForm, actions: FormikHelpers<AuthUserForm> ) => {
        try {
            await auth.signIn({ email: values.email, password: values.password });
            router.push('/');
        } catch(err) {
            actions.setErrors({email: "Invalid email or password", password: "Invalid email or password"})
            actions.setSubmitting(false);
        }
    };

    return (
        <AuthFormContainer title="Login">
            <Formik
                initialValues={initialValues}
                validationSchema={LoginSchema}
                onSubmit={onSubmit}
            >
                {(props) => (
                    <Form style={{width: "100%"}}>
                        <VStack 
                            spacing={4}
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
                            <RouterLink 
                                maxW="70%" 
                                textAlign="center"
                                href="/recover"
                            >Recover your account</RouterLink>
                            <Button 
                                w="70%"
                                type="submit"
                                isLoading={props.isSubmitting}
                                size="lg"
                            >Login</Button>
                            <RouterLink href="/signup">New user? Sign up here!</RouterLink>
                        </VStack>
                    </Form>
                )}
            </Formik>
        </AuthFormContainer>
    )
}

export default Login;
