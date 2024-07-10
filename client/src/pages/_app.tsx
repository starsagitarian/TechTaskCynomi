import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SleepDataProvider } from "@/contexts/SleepDataContext";


const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SleepDataProvider>
      <Component {...pageProps} />
    </SleepDataProvider>
  );
}

export default App;