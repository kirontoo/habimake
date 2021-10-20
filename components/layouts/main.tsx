import { Box, Container } from "@chakra-ui/react"
import Head from 'next/head';

function Layout({ children, router}) {
    return (
        <Box as="main" pb={8}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>Home | Habimake</title>
            </Head>
            <Container maxW="container.lg" pt={14}>
                {children} 
            </Container>
        </Box>
    )
}

export default Layout;
