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
import { AuthSchema } from "lib/Schema";
import { useAuth } from "context/Auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

type AuthUserForm = {
    email: string,
    password: string,
    username: string
};

function Signup() {
    const auth = useAuth();
    const router = useRouter();

    let initialValues: AuthUserForm = {
        username: "",
        email: "",
        password: "",
    }

    const SignupSchema: Yup.SchemaOf<AuthUserForm> = Yup.object().shape({
        email: AuthSchema.Email,
        password: AuthSchema.Password,
        username: AuthSchema.Username
    });

    useEffect(() => {
        if ( auth.isAuth ) {
            router.push("/");
        }
    }, [auth]);

    let onSubmit = async (values: AuthUserForm, actions: FormikHelpers<AuthUserForm> ) => {
        try {
            await auth.signUp({ 
                email: values.email, 
                password: values.password,
                username: values.username,
            });

            router.push("/");
        } catch(err) {
            if ( err == "Email is already in use") {
                actions.setErrors({ email: err });
            } else {
                actions.setErrors({email: "Invalid email or password", password: "Invalid email or password"})
            }
            actions.setSubmitting(false);
        }
    };

    return (
        <AuthFormContainer title="Signup">
            <Formik
                initialValues={initialValues}
                validationSchema={SignupSchema}
                onSubmit={onSubmit}
            >
                {(props) => (
                    <Form style={{width: "100%"}}>
                        <VStack 
                            spacing={4}
                            w="full"
                        >
                            <Field name="username">
                                { ({ field, meta }) => ( 
                                    <FormControl isInvalid={meta.error && meta.touched} isRequired>
                                        <FormLabel htmlFor="username">Username</FormLabel>
                                        <Input 
                                            {...field}
                                            id="username"
                                            type="text"
                                            />
                                        {
                                        (meta.touched && meta.error)
                                        ? ( <FormErrorMessage>{meta.error}</FormErrorMessage> )
                                        : ( <FormHelperText>Please enter a username</FormHelperText> )
                                        }
                                    </FormControl>
                                )}
                            </Field>
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
                                        ? ( <FormErrorMessage>{meta.error}</FormErrorMessage> )
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
                                        ? ( <FormErrorMessage>{meta.error}</FormErrorMessage> )
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
                            >Signup</Button>
                            <RouterLink href="/login">Already have an account? Login here.</RouterLink>
                        </VStack>
                    </Form>
                )}
            </Formik>
        </AuthFormContainer>
    )
}

export default Signup;
