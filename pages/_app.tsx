import Aos from "aos";
import { useEffect } from "react";
import { useRouter } from "next/router";
import "aos/dist/aos.css";
import "../styles/index.scss";
import ScrollToTop from "../components/common/ScrollTop";
import '../styles/carousel.css';

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

// @ts-ignore
export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    Aos.init({
      duration: 1200,
    });
  }, []);

  // Track page views
  useEffect(() => {
    const trackView = (path: string) => {
      // Don't track admin pages
      if (path.startsWith('/admin')) return;
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path }),
      }).catch(() => {});
    };

    // Track initial load
    trackView(router.asPath);

    // Track client-side navigations
    const handleRouteChange = (url: string) => trackView(url);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return (
    <div className="main-page-wrapper">
      <Component {...pageProps} />
      <ScrollToTop />
    </div>
  );
}
