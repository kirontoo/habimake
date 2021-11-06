import { Box, Container } from "@chakra-ui/react"
import Head from 'next/head';
import SideBarWithHeader from "components/SidebarWithHeader";

function Layout({ children }) {
    return (
        <Box as="main">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>Home | Habimake</title>
            </Head>
            <Container maxW="container.xl" pt={5}>
                <SideBarWithHeader>
                    {children} 
                </SideBarWithHeader>
                { /* TODO: footer here */}
            </Container>
        </Box>
    )
}

export default Layout;
