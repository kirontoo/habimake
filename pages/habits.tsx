import {
    VStack,
    HStack,
    Flex,
    Box,
    Stack,
    Wrap,
    IconButton,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import {
    useState,
    useEffect
} from "react";
import EntryButton from "components/EntryButton";

function Habits() {
    let date = DateTime.now();
    let [ currentMonth, setMonth ] = useState(date.month);

    function onMark() {
        alert("marked")
    }

    return (
        <>
            <EntryButton isChecked onClick={onMark}/>
            <EntryButton/>
        </>
    );
}

export default Habits;
