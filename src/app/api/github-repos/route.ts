import { NextResponse } from 'next/server';
import { fetchGitHubRepos } from '@/app/utils/github';
import { GitHubRepo } from '../../utils/github';

// This is a fallback route that returns mock GitHub repositories
// when the main GitHub API route fails or isn't available
export async function GET() {  try {
    // Get GitHub username and token from environment variables
    const username = process.env.GITHUB_USERNAME;
    const token = process.env.GITHUB_TOKEN;
    
    if (!username) {
      return NextResponse.json(
        { error: 'GitHub username not configured' },
        { status: 500 }
      );
    }
    
    // Fetch repositories using server-side environment variables
    const repos = await fetchGitHubRepos(username, token || '');
    
    if (!repos || repos.length === 0) {
      console.warn('No repositories found or empty array returned');
    }
    
    console.log(`Successfully fetched ${repos.length} repositories`);
    return NextResponse.json(repos);
  } catch (error) {
    console.error('Error in GitHub repos API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories' },
      { status: 500 }
    );
  }
}