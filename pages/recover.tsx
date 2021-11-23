import {
    VStack,
    FormControl,
    FormLabel,
    Input,
    Button,
    FormErrorMessage,
    FormHelperText,
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    ModalContent,
    useDisclosure
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
import { AuthSchema } from "lib/Schema";
import { useEffect } from "react";
import { useAuth } from "context/Auth";

type RecoverForm = {
    email: string
}

function RecoverAccount() {
    const router = useRouter();
    const auth = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();

    let initialValues: RecoverForm = {
        email: "",
    }

    const RecoverSchema: Yup.SchemaOf<RecoverForm> = Yup.object().shape({
        email: AuthSchema.Email
    });

    useEffect(() => {
        if (auth.isAuth) {
            router.push("/");
        }

        onOpen()
    }, [])

    let onSubmit = async( 
        values: RecoverForm, 
        actions: FormikHelpers<RecoverForm>
    ) => {
        try {
            await supabase.auth.api.resetPasswordForEmail(values.email)

            onOpen();
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

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Recovery Email</ModalHeader>
                    <ModalCloseButton></ModalCloseButton>
                    <ModalBody><span>Check your email for the recovery link.</span></ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </AuthFormContainer>
    );
}

export default RecoverAccount;
