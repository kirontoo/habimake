import {
    VStack,
    FormControl,
    FormLabel,
    Input,
    Button,
    FormErrorMessage,
    FormHelperText
} from "@chakra-ui/react";
import { 
    Formik,
    Form,
    Field,
    FormikHelpers,
} from "formik";

import AuthFormContainer from "components/AuthFormContainer";
import * as Yup from "yup";
import { supabase } from "lib/supabaseClient";
import { useRouter } from "next/router";

type RecoverForm = {
    email: string
}

function RecoverAccount() {
    const router = useRouter();
    let initialValues: RecoverForm = {
        email: "",
    }

    const RecoverSchema: Yup.SchemaOf<RecoverForm> = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
    });

    let onSubmit = async( 
        values: RecoverForm, 
        actions: FormikHelpers<RecoverForm>
    ) => {
        try {
            await supabase.auth.api.resetPasswordForEmail(values.email)
        }catch(err) {
            actions.setSubmitting(false);
            router.push('/')
        } 
    }

    return (
        <AuthFormContainer title="Recover">
            <Formik
                initialValues={initialValues}
                validattionSchema={RecoverSchema}
                onSubmit={onSubmit}
            >
                {(props) => (
                    <Form style={{width: "100%"}}>
                        <VStack
                            spacing={8}
                            w="full"
                        >
                            <Field name="email">
                                {({ field, meta }) => (
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
                                            : ( <FormHelperText textAlign="center">Please enter your email address.</FormHelperText> )
                                        }
                                    </FormControl>
                                )}
                            </Field>
                            <Button
                                w="70%"
                                type="submit"
                                isLoading={props.isSubmitting}
                                size="lg"
                            >Recover your password</Button>
                        </VStack>
                    </Form>
                )}
            </Formik>
        </AuthFormContainer>
    );
}

export default RecoverAccount;
