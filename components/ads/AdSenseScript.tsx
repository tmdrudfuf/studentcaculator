import Script from "next/script";

import { adsenseConfig, adsenseScriptUrl } from "@/lib/adsense/config";

export function AdSenseScript() {
  return (
    <Script
      crossOrigin="anonymous"
      data-ad-client={adsenseConfig.clientId}
      id="google-adsense"
      src={adsenseScriptUrl}
      strategy="afterInteractive"
    />
  );
}
