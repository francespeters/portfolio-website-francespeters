import type { UserPersonaProps } from "@/app/components/ui/UserPersona";
import userPersonas from "@/app/database/userPersonas.json";

/**
 * One row in userPersonas.json: persona fields + linkage to a project.
 * Projects with no rows simply render no personas.
 */
export type UserPersonaRecord = {
  id: string;
  /** Must match `projects.json` → `id` */
  projectId: string;
  /** Lower numbers first; omit for stable JSON order */
  sortOrder?: number;
} & Omit<UserPersonaProps, "className">;

const rows = userPersonas as UserPersonaRecord[];

export function getPersonasForProject(projectId: string): UserPersonaRecord[] {
  return rows
    .filter((r) => r.projectId === projectId)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

/** Props ready for `<UserPersona />` (strips linkage fields). */
export function personaProps(record: UserPersonaRecord): UserPersonaProps {
  const {
    name,
    role,
    summary,
    avatarSrc,
    avatarAlt,
    initials,
    quote,
    demographics,
    goals,
    frustrations,
    behaviors,
  } = record;
  return {
    name,
    role,
    summary,
    avatarSrc,
    avatarAlt,
    initials,
    quote,
    demographics,
    goals,
    frustrations,
    behaviors,
  };
}
