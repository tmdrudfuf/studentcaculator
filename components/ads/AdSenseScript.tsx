import { adsenseConfig, adsenseScriptUrl } from "@/lib/adsense/config";

export function AdSenseScript() {
  return (
    <script
      async
      crossOrigin="anonymous"
      data-ad-client={adsenseConfig.clientId}
      id="google-adsense"
      src={adsenseScriptUrl}
    />
  );
}
