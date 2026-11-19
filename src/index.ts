import type { Core } from "@strapi/strapi";

/**
 * Every content type on this site is public (it is a public website), so the Public role gets
 * read access to all of them at boot rather than through the admin UI: a fresh Strapi Cloud
 * database then serves the front end with no manual clicking and no API token to rotate.
 *
 * Read-only by design: only `find` / `findOne`, and the Public role never sees drafts.
 */
const PUBLIC_READ = [
  "api::person.person",
  "api::project.project",
  "api::site-setting.site-setting",
  "api::home-page.home-page",
  "api::about-page.about-page",
  "api::legal-page.legal-page",
  "api::contact-page.contact-page",
  "api::archive-page.archive-page",
  "api::longform-page.longform-page",
  "api::party-mode.party-mode",
  "api::ui-label.ui-label",
] as const;

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const role = await strapi.db
      .query("plugin::users-permissions.role")
      .findOne({ where: { type: "public" } });
    if (!role) return;

    // Single types expose `find` only; collection types also expose `findOne`.
    const wanted: string[] = [];
    for (const uid of PUBLIC_READ) {
      wanted.push(`${uid}.find`);
      if (strapi.contentType(uid)?.kind === "collectionType") wanted.push(`${uid}.findOne`);
    }

    const existing = await strapi.db
      .query("plugin::users-permissions.permission")
      .findMany({ where: { role: role.id, action: { $in: wanted } }, select: ["action"] });
    const have = new Set(existing.map((p: { action: string }) => p.action));

    const missing = wanted.filter((action) => !have.has(action));
    for (const action of missing) {
      await strapi.db
        .query("plugin::users-permissions.permission")
        .create({ data: { action, role: role.id } });
    }
    if (missing.length) strapi.log.info(`[eleven] granted the Public role ${missing.length} read permission(s)`);
  },
};
