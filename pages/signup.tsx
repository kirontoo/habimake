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
    Link,
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

function Signup() {
    return (
        <h3>signup</h3>
    );
}

export default Signup;
