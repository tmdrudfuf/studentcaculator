const DEFAULT_ADSENSE_CLIENT_ID = "ca-pub-3024928824650244";

export const adsenseConfig = {
  clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() || DEFAULT_ADSENSE_CLIENT_ID,
  publisherId: "pub-3024928824650244",
} as const;

export const adsenseScriptUrl =
  `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseConfig.clientId}`;

export const adsTxtEntry = `google.com, ${adsenseConfig.publisherId}, DIRECT, f08c47fec0942fa0`;
