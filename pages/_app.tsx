import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/600.css";
import "@fontsource/rubik-mono-one/400.css";
import "@fontsource/rubik";

import { ChakraProvider } from "@chakra-ui/react";
import Layout from "components/layouts/main";
import theme from "theme";
import { AuthProvider } from "components/Auth";

function App({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <AuthProvider>
                <Layout>
                    <Component {...pageProps}/>
                </Layout>
            </AuthProvider>
        </ChakraProvider>
    )
}

export default App

