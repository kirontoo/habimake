import {
    IconButton,
    Icon,
    Checkbox,
    useCheckbox
} from "@chakra-ui/react"
import { CheckCircleIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

function EntryIcon(props) {
    const { isIndeterminate, isChecked, ...rest } = props;
    return isChecked ? <CheckCircleIcon {...rest}/> : <SmallCloseIcon {...rest}/>
    ;
}

// TODO: create a hook for toggle functionality
function EntryButton(props) {
    let [ isChecked, setChecked ] = useState(false);

    function toggle() {
        setChecked(!isChecked);
    }

    return (
        <EntryIcon
            isChecked={isChecked}
            onClick={toggle}
            _hover={{ cursor: "pointer" }}
            {...props}
        />
    );
}

export default EntryButton;