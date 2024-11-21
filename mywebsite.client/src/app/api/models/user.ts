/* tslint:disable */
/* eslint-disable */
export interface User {
  accessFailedCount?: number;
  concurrencyStamp?: string | null;
  email?: string | null;
  emailConfirmed?: boolean;
  id?: string | null;
  lockoutEnabled?: boolean;
  lockoutEnd?: string | null;
  normalizedEmail?: string | null;
  normalizedUserName?: string | null;
  passwordHash?: string | null;
  phoneNumber?: string | null;
  phoneNumberConfirmed?: boolean;
  securityStamp?: string | null;
  twoFactorEnabled?: boolean;
  userName?: string | null;
}
