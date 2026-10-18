import type { UserRole } from "@/generated/prisma";

const roleHierarchy: Record<UserRole, number> = {
  TOURIST: 1,
  GUIDE: 2,
  ATTRACTION: 2,
  HOTEL: 2,
  RESTAURANT: 2,
  AGENCY: 2,
  ADMIN: 10,
};

export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

export function isAdmin(role: UserRole): boolean {
  return role === "ADMIN";
}

export function isPartner(role: UserRole): boolean {
  return ["GUIDE", "ATTRACTION", "HOTEL", "RESTAURANT", "AGENCY"].includes(
    role,
  );
}

export function canManageBookings(role: UserRole): boolean {
  return isAdmin(role) || isPartner(role);
}

export function canReview(role: UserRole): boolean {
  return role === "TOURIST";
}
