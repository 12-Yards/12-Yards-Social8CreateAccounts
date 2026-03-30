import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
const owner = "12-Yards";
const repo = "Social8CreateAccounts";
const baseUrl = `https://api.github.com/repos/${owner}/${repo}`;

if (!token) {
  console.log("[GitHub Sync] No GITHUB_PERSONAL_ACCESS_TOKEN set, skipping sync.");
  process.exit(0);
}

const headers = {
  'Authorization': `token ${token}`,
  'Accept': 'application/vnd.github.v3+json',
  'Content-Type': 'application/json'
};

const IGNORE = ['.git', 'node_modules', '.local', '.config', '.cache', '.upm', '.agents', '.canvas'];

function getAllFiles(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);
    if (IGNORE.includes(entry.name)) continue;
    if (entry.isDirectory()) {
      files = files.concat(getAllFiles(full, rel));
    } else {
      files.push({ rel, full });
    }
  }
  return files;
}

async function getLatestCommitSha() {
  const res = await fetch(`${baseUrl}/git/refs/heads/main`, { headers });
  if (!res.ok) return null;
  const data = await res.json();
  return data.object?.sha || null;
}

async function getTreeSha(commitSha) {
  const res = await fetch(`${baseUrl}/git/commits/${commitSha}`, { headers });
  if (!res.ok) return null;
  const data = await res.json();
  return data.tree?.sha || null;
}

async function getRemoteTree(treeSha) {
  const res = await fetch(`${baseUrl}/git/trees/${treeSha}?recursive=1`, { headers });
  if (!res.ok) return {};
  const data = await res.json();
  const map = {};
  for (const item of data.tree || []) {
    if (item.type === 'blob') {
      map[item.path] = item.sha;
    }
  }
  return map;
}

function computeBlobSha(content) {
  const header = `blob ${content.length}\0`;
  const store = Buffer.concat([Buffer.from(header), content]);
  return crypto.createHash('sha1').update(store).digest('hex');
}

async function main() {
  console.log("[GitHub Sync] Checking for changes...");

  const commitSha = await getLatestCommitSha();
  if (!commitSha) {
    console.log("[GitHub Sync] Could not get latest commit. Skipping.");
    process.exit(0);
  }

  const treeSha = await getTreeSha(commitSha);
  const remoteTree = treeSha ? await getRemoteTree(treeSha) : {};

  const localFiles = getAllFiles('/home/runner/workspace');
  const localPaths = new Set(localFiles.map(f => f.rel));

  let changedFiles = [];
  for (const file of localFiles) {
    const content = fs.readFileSync(file.full);
    const localSha = computeBlobSha(content);
    if (remoteTree[file.rel] !== localSha) {
      changedFiles.push(file);
    }
  }

  let deletedFiles = [];
  for (const remotePath of Object.keys(remoteTree)) {
    if (!localPaths.has(remotePath)) {
      deletedFiles.push(remotePath);
    }
  }

  if (changedFiles.length === 0 && deletedFiles.length === 0) {
    console.log("[GitHub Sync] No changes detected. Already in sync.");
    process.exit(0);
  }

  console.log(`[GitHub Sync] ${changedFiles.length} changed/new files, ${deletedFiles.length} deleted files.`);

  const treeItems = [];

  for (const file of changedFiles) {
    const content = fs.readFileSync(file.full);
    const base64 = content.toString('base64');

    const blobRes = await fetch(`${baseUrl}/git/blobs`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ content: base64, encoding: 'base64' })
    });

    if (!blobRes.ok) {
      console.error(`[GitHub Sync] Failed blob for ${file.rel}: ${blobRes.status}`);
      continue;
    }

    const blob = await blobRes.json();
    treeItems.push({ path: file.rel, mode: '100644', type: 'blob', sha: blob.sha });
  }

  for (const deletedPath of deletedFiles) {
    treeItems.push({ path: deletedPath, mode: '100644', type: 'blob', sha: null });
  }

  const treeRes = await fetch(`${baseUrl}/git/trees`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ base_tree: treeSha, tree: treeItems })
  });

  if (!treeRes.ok) {
    console.error("[GitHub Sync] Failed to create tree:", await treeRes.text());
    process.exit(1);
  }

  const tree = await treeRes.json();

  const commitRes = await fetch(`${baseUrl}/git/commits`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      message: `Sync from Replit - ${new Date().toISOString()}`,
      tree: tree.sha,
      parents: [commitSha]
    })
  });

  if (!commitRes.ok) {
    console.error("[GitHub Sync] Failed to create commit:", await commitRes.text());
    process.exit(1);
  }

  const newCommit = await commitRes.json();

  const refRes = await fetch(`${baseUrl}/git/refs/heads/main`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ sha: newCommit.sha, force: true })
  });

  if (!refRes.ok) {
    console.error("[GitHub Sync] Failed to update ref:", await refRes.text());
    process.exit(1);
  }

  console.log(`[GitHub Sync] Pushed ${changedFiles.length} changes to GitHub.`);
  console.log(`[GitHub Sync] Commit: ${newCommit.sha}`);
}

main().catch(e => { console.error("[GitHub Sync] Error:", e.message); process.exit(1); });
