
import "../app/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
        <Component {...pageProps} />
    </div>
  );
}

export default MyApp;