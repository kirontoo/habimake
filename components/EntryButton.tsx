import { CheckCircleIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { useState } from "react";

function EntryIcon(props) {
    const { isChecked, ...rest } = props;
    return isChecked ? <CheckCircleIcon {...rest}/> : <SmallCloseIcon {...rest}/>
    ;
}

// TODO: create a hook for toggle functionality
function EntryButton({onClick, ...rest}) {
    let [ isChecked, setChecked ] = useState(false);

    function toggle() {
        setChecked(!isChecked);
        onClick();
    }

    return (
        <EntryIcon
            isChecked={isChecked}
            _hover={{ cursor: "pointer" }}
            {...rest}
            onClick={toggle}
        />
    );
}

export default EntryButton;
