import Layout from "@/components/header/layout";
import store from "@/store/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { persistor } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
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
    </>
  );
}

function Auth({ children }) {
  const router = useRouter();
  const { status, data: session } = useSession({
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
