#!/usr/bin/env npx tsx
/**
 * Admin-only script to provision team user accounts from an email list.
 *
 * Usage:
 *   npx tsx supabase/scripts/provision-team.ts [path-to-emails.txt]
 *
 * Requires env: SUPABASE_API_URL, SUPABASE_SERVICE_ROLE_KEY, TENANT_ID
 *
 * Input file: one email per line; lines starting with # are ignored.
 * Creates auth.users entries and profiles with auth_id, tenant_id, profile_type.
 * Outputs a credentials file (team-credentials-TIMESTAMP.txt) with temp passwords.
 * Users should change password on first login.
 */

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const API_URL = process.env.SUPABASE_API_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TENANT_ID = process.env.TENANT_ID;

function randomPassword(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0123456789!@#$%';
  let s = '';
  for (let i = 0; i < 16; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

function emailToUsername(email: string): string {
  const local = email.split('@')[0] || 'user';
  return local.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 50) || 'user';
}

async function main() {
  if (!API_URL || !SERVICE_ROLE_KEY || !TENANT_ID) {
    console.error('Missing env: SUPABASE_API_URL, SUPABASE_SERVICE_ROLE_KEY, TENANT_ID');
    process.exit(1);
  }

  const inputPath = process.argv[2] || path.join(__dirname, 'team-emails.example.txt');
  const resolvedPath = path.isAbsolute(inputPath) ? inputPath : path.resolve(process.cwd(), inputPath);

  if (!fs.existsSync(resolvedPath)) {
    console.error(`File not found: ${resolvedPath}`);
    console.error('Copy team-emails.example.txt to team-emails.txt and add your emails, or pass a path.');
    process.exit(1);
  }

  const content = fs.readFileSync(resolvedPath, 'utf-8');
  const emails = content
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'));

  if (emails.length === 0) {
    console.error('No emails found in file. Add one email per line.');
    process.exit(1);
  }

  const client = createClient(API_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { headers: { 'x-tenant-id': TENANT_ID } },
  });

  const { data: typeData } = await client
    .from('profile_types')
    .select('id')
    .eq('name', 'member')
    .eq('tenant_id', TENANT_ID)
    .limit(1)
    .maybeSingle();

  const memberTypeId = typeData?.id;
  if (!memberTypeId) {
    console.error(`No profile_type 'member' for tenant ${TENANT_ID}. Run fix-sign-up-issues.sql first.`);
    process.exit(1);
  }

  const results: { email: string; status: string; username?: string; password?: string }[] = [];
  const usedUsernames = new Set<string>();

  for (const email of emails) {
    const usernameBase = emailToUsername(email);
    let username = usernameBase;
    let suffix = 0;
    while (usedUsernames.has(username)) {
      suffix++;
      username = `${usernameBase}_${suffix}`;
    }
    usedUsernames.add(username);

    const password = randomPassword();

    try {
      const { data: authData, error: authErr } = await client.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { username },
      });

      if (authErr) {
        if (authErr.message?.includes('already been registered')) {
          results.push({ email, status: 'skipped (already exists)' });
        } else {
          results.push({ email, status: `error: ${authErr.message}` });
        }
        continue;
      }

      const userId = authData?.user?.id;
      if (!userId) {
        results.push({ email, status: 'error: no user id returned' });
        continue;
      }

      const { error: profileErr } = await client.from('profiles').insert({
        auth_id: userId,
        username,
        display_name: username,
        tenant_id: TENANT_ID,
        profile_type: memberTypeId,
      });

      if (profileErr) {
        results.push({ email, status: `profile error: ${profileErr.message}`, username, password });
        continue;
      }

      results.push({ email, status: 'created', username, password });
    } catch (e) {
      results.push({ email, status: `exception: ${(e as Error).message}` });
    }
  }

  const credentials: { email: string; username: string; password: string }[] = results.filter(
    (r): r is { email: string; status: string; username: string; password: string } =>
      r.status === 'created' && r.username != null && r.password != null,
  );

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const credPath = path.join(path.dirname(resolvedPath), `team-credentials-${timestamp}.txt`);
  if (credentials.length > 0) {
    const credContent = credentials
      .map((c) => `${c.email}\t${c.username}\t${c.password}`)
      .join('\n');
    fs.writeFileSync(credPath, credContent + '\n', 'utf-8');
  }

  results.forEach((r) => {
    console.log(`${r.email}: ${r.status}`);
  });
  if (credentials.length > 0) {
    console.log(`\nCredentials written to ${credPath}. Share securely; users should change password on first login.`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
