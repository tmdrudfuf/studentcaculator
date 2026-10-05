import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { adsenseConfig, adsenseScriptUrl, adsTxtEntry } from "@/lib/adsense/config";

describe("AdSense configuration", () => {
  it("uses the production publisher account in the loader URL", () => {
    expect(adsenseConfig.clientId).toBe("ca-pub-3024928824650244");
    expect(adsenseScriptUrl).toContain(`client=${adsenseConfig.clientId}`);
  });

  it("publishes a matching authorized seller entry", () => {
    const adsTxtPath = resolve(process.cwd(), "public", "ads.txt");

    expect(readFileSync(adsTxtPath, "utf8").trim()).toBe(adsTxtEntry);
  });
});
