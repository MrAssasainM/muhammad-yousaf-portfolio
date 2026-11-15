import type { ProjectItem } from '../data/portfolioData';

export const VALID_SECTION_IDS = [
  'home',
  'about',
  'projects',
  'skills',
  'journey',
  'contact',
] as const;

export type SectionId = (typeof VALID_SECTION_IDS)[number];

export function getProjectCategories(projects: ProjectItem[]): string[] {
  const seen = new Set<string>();
  const categories: string[] = ['All'];

  for (const project of projects) {
    const trimmed = project.category.trim();
    if (trimmed && !seen.has(trimmed)) {
      seen.add(trimmed);
      categories.push(trimmed);
    }
  }

  return categories;
}

export function filterProjectsByCategory(
  projects: ProjectItem[],
  selectedCategory: string
): ProjectItem[] {
  if (!selectedCategory || selectedCategory === 'All') {
    return projects;
  }

  return projects.filter((project) => project.category === selectedCategory);
}

export function isGithubPlaceholderUrl(url: string): boolean {
  const normalized = url.trim().toLowerCase();
  return (
    normalized.includes('your-username') ||
    normalized.includes('username') && normalized.endsWith('/username') ||
    normalized.includes('placeholder')
  );
}

export function formatDisplayHostname(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function isValidSectionId(id: string): id is SectionId {
  return (VALID_SECTION_IDS as readonly string[]).includes(id);
}
