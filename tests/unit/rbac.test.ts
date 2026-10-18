import { describe, expect, it } from "vitest";

import { hasRole, isAdmin, isPartner } from "@/server/permissions/rbac";

describe("RBAC", () => {
  it("admin has all roles", () => {
    expect(hasRole("ADMIN", "TOURIST")).toBe(true);
    expect(hasRole("ADMIN", "GUIDE")).toBe(true);
    expect(isAdmin("ADMIN")).toBe(true);
  });

  it("tourist cannot access guide permissions", () => {
    expect(hasRole("TOURIST", "GUIDE")).toBe(false);
    expect(isPartner("TOURIST")).toBe(false);
  });

  it("guide is a partner", () => {
    expect(isPartner("GUIDE")).toBe(true);
    expect(hasRole("GUIDE", "GUIDE")).toBe(true);
  });
});
