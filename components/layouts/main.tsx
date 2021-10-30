import { Box, Container } from "@chakra-ui/react"
import Head from 'next/head';
import SideBarWithHeader from "components/SidebarWithHeader";

function Layout({ children, router}) {
    return (
        <Box as="main" pb={8}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>Home | Habimake</title>
            </Head>
            <Container maxW="container.xl" pt={5}>
                <SideBarWithHeader>
                    {children} 
                </SideBarWithHeader>
            </Container>
        </Box>
    )
}

export default Layout;
