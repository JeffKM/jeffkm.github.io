import { locales, projects } from "../lib/content";

const errors: string[] = [];
const slugs = new Set<string>();

for (const project of projects) {
  if (slugs.has(project.slug)) errors.push(`Duplicate project slug: ${project.slug}`);
  slugs.add(project.slug);
  for (const locale of locales) {
    const fields = [project.eyebrow[locale], project.summary[locale], project.problem[locale], project.role[locale], project.decision[locale], project.validation[locale]];
    if (fields.some((field) => !field.trim())) errors.push(`${project.slug}: missing ${locale} content`);
  }
  if (project.status === "Released" && !project.live) errors.push(`${project.slug}: Released projects require a live URL`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${projects.length} bilingual project records.`);
