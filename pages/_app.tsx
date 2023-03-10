import Layout from "@/components/header/layout";
import store from "@/store/store";
import "@/styles/globals.css";
// import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { persistor } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/Apollo-client";
// import { NextComponentType } from "next";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  return (
    <>
      <ApolloProvider client={client}>
        <SessionProvider session={session}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Layout>
                {Component.auth ? (
                  <Auth>
                    <Component {...pageProps} />
                  </Auth>
                ) : (
                  <Component {...pageProps} />
                )}
              </Layout>
            </PersistGate>
          </Provider>
        </SessionProvider>
      </ApolloProvider>
    </>
  );
}

function Auth({ children }: { children: any }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login Required");
    },
  });
  if (status == "loading")
    return (
      <div>
        <CircularProgress
          size={100}
          sx={{
            color: "red",
            position: "absolute",
            top: "30%",
            left: "50%",
          }}
        />
        ;
      </div>
    );
  return children;
}
