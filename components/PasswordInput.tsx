import {
    Input,
    InputGroup,
    InputProps,
    InputRightElement,
    Button
} from "@chakra-ui/react";
import { useState } from "react";

function PasswordInput(props : InputProps ) {
    let [ showPassword, setShowPassword ]= useState<boolean>(false);

    function onShowPassword() {
        setShowPassword(!showPassword);
    };

    return (
        <InputGroup size="md">
            <Input
                {...props}
                pr="4.5rem"
                type={showPassword ? "text" : "password"}
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
    );
}

export default PasswordInput;

// <InputGroup size="md">
//     <Input
//         {...field}
//         id="password"
//         pr="4.5rem"
//         type={showPassword ? "text" : "password"}
//         placeholder="Enter password"
//         />
//     <InputRightElement width="4.5rem">
//         <Button 
//             h="1.75rem" 
//             size="sm" 
//             onClick={onShowPassword}
//         >
//             {showPassword ? "Hide" : "Show"}
//         </Button>
//     </InputRightElement>
// </InputGroup>
