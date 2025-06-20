import { NextResponse } from 'next/server';
import { fetchGitHubRepos, convertRepoToProject } from '../../utils/github';

export const dynamic = 'force-dynamic'; // Don't cache this route

export async function GET() {
  try {
    console.log("Fetching GitHub repositories...");
    const username = process.env.GITHUB_USERNAME; // Your GitHub username
    const token = process.env.GITHUB_TOKEN;
    
    if (!username) {
      console.error("GITHUB_USERNAME environment variable is not set");
      return NextResponse.json([], { status: 500 });
    }
    
    // Log the fetch URL for debugging
    console.log(`Fetching from https://api.github.com/user/repos with auth token`);
    
    // Fetch repositories
    const repos = await fetchGitHubRepos(username, token || '');
    
    if (!repos || !Array.isArray(repos)) {
      console.error("Failed to fetch repositories or invalid response");
      return NextResponse.json([], { status: 500 });
    }
    
    console.log(`Fetched ${repos.length} repositories from GitHub`);
    
    // Convert repositories to project format with README content
    const projectPromises = repos.map(repo => convertRepoToProject(repo, token));
    const projects = await Promise.all(projectPromises);
      // Filter out private projects and ensure valid status
    const validProjects = projects.filter(project => !project.private).map(project => {
      // Ensure status is valid
      if (project.status !== 'Live' && project.status !== 'Completed' && project.status !== 'In Progress') {
        project.status = 'Completed'
      }
      return project;
    });
    
    return NextResponse.json(validProjects);
  } catch (error) {
    console.error("Error in GitHub API route:", error);
    return NextResponse.json([], { status: 500 });
  }
}