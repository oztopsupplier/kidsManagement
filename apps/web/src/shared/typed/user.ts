import type { UUID, Timestamp } from "./common";

// KM-79: profiles
export interface Profile {
  id: UUID;
  full_name: string | null;
  avatar_url: string | null;
  created_at: Timestamp;
}
