import { describe, expect, it } from "vitest";
import { pingEndpoint } from "../src/services/pinger.js";

describe("pingEndpoint", () => {
  it("returns ok:false on unreachable host without throwing", async () => {
    const res = await pingEndpoint("http://127.0.0.1:59999", 500);
    expect(res.ok).toBe(false);
    expect(res.statusCode).toBe(0);
  });
});
