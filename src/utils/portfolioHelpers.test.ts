import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProjectsByCategory,
  formatDisplayHostname,
  getProjectCategories,
  isGithubPlaceholderUrl,
  isValidSectionId,
} from './portfolioHelpers';
import { FEATURED_PROJECTS, SITE_IDENTITY } from '../data/portfolioData';

test('getProjectCategories returns All followed by unique categories', () => {
  const categories = getProjectCategories(FEATURED_PROJECTS);
  assert.deepEqual(categories, ['All', 'Web Development', 'Workflow & Operations']);
});

test('filterProjectsByCategory returns all items for All and filters specific categories', () => {
  const all = filterProjectsByCategory(FEATURED_PROJECTS, 'All');
  assert.equal(all.length, 2);

  const webOnly = filterProjectsByCategory(FEATURED_PROJECTS, 'Web Development');
  assert.equal(webOnly.length, 1);
  assert.equal(webOnly[0].id, 'sheikh-banoori');

  const opsOnly = filterProjectsByCategory(FEATURED_PROJECTS, 'Workflow & Operations');
  assert.equal(opsOnly.length, 1);
  assert.equal(opsOnly[0].id, 'opspilot');
});

test('isGithubPlaceholderUrl identifies default placeholder handle and real handles', () => {
  assert.equal(isGithubPlaceholderUrl('https://github.com/your-username'), true);
  assert.equal(isGithubPlaceholderUrl(SITE_IDENTITY.githubUrl), false);
});

test('formatDisplayHostname extracts clean hostname from live project URLs', () => {
  assert.equal(
    formatDisplayHostname('https://sheikh-banoori-site.vercel.app/'),
    'sheikh-banoori-site.vercel.app'
  );
  assert.equal(
    formatDisplayHostname('https://opspilot-app.base44.app/'),
    'opspilot-app.base44.app'
  );
});

test('isValidSectionId validates all 6 portfolio sections', () => {
  for (const id of ['home', 'about', 'projects', 'skills', 'journey', 'contact']) {
    assert.equal(isValidSectionId(id), true);
  }
  assert.equal(isValidSectionId('blog'), false);
});
