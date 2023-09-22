import { useState } from "react";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { Layout } from "@/components/Layout";
import store from "../store";

import type { AppProps } from "next/app";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <>
      <Head>
        <title>PentaJam</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}
        >
          <ModalsProvider>
            <QueryClientProvider client={queryClient}>
              <Provider store={store}>
                <Notifications
                  position="top-right"
                  autoClose={3000}
                  limit={5}
                />
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </Provider>
            </QueryClientProvider>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

export default MyApp;
