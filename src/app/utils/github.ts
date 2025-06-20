// GitHub API Types and Utility Functions
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  topics: string[];
  language: string | null;
  updated_at: string;
  created_at: string;
  private: boolean;
  fork: boolean;
  archived: boolean;
  pushed_at?: string;
  git_url?: string;
  url?: string;
  disabled?: boolean;
  visibility?: string;
  default_branch?: string;
  permissions?: {
    admin: boolean;
    maintain?: boolean;
    push?: boolean;
    triage?: boolean;
    pull?: boolean;
  };
}

// Project interface for converted repositories
export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  readmeImages?: string[];
  readmeContent?: string;
  technologies: string[];
  category: string;
  status: 'Live' | 'Completed' | 'In Progress';
  demoUrl?: string;
  githubUrl: string;
  featured: boolean;
  private?: boolean;
}

// Interface for parsed README content
export interface ReadmeContent {
  content: string;
  images: string[];
  technologies?: string[];
  description?: string;
}

// Function to fetch README content from a GitHub repo
export async function fetchReadmeContent(repo: GitHubRepo, token: string): Promise<ReadmeContent | null> {
  try {
    const [owner, repoName] = repo.full_name.split('/');
    const readmeUrl = `https://api.github.com/repos/${owner}/${repoName}/readme`;
    
    const response = await fetch(readmeUrl, {
      headers: {
        Accept: 'application/vnd.github.raw',
        ...(token && { Authorization: `Bearer ${token}` }),
        'X-GitHub-Api-Version': '2022-11-28',
      },
      cache: 'no-store',
    });
      if (!response.ok) {
      return null;
    }
    
    const content = await response.text();
    
    // Parse README content
    const images = extractImagesFromMarkdown(content);
    const enhancedDescription = extractEnhancedDescription(content, repo.description || '');
    const technologies = extractTechnologiesFromReadme(content);
    
    return {
      content,
      images,
      description: enhancedDescription,
      technologies    };
  } catch (error) {
    return null;
  }
}

// Extract image URLs from markdown content
function extractImagesFromMarkdown(markdown: string): string[] {
  const imageRegex = /!\[.*?\]\((.*?)\)/g;
  const images: string[] = [];
  let match;
  
  while ((match = imageRegex.exec(markdown)) !== null) {
    // Only add valid image URLs
    if (match[1] && !match[1].startsWith('#')) {
      images.push(match[1]);
    }
  }
  
  return images;
}

// Extract a better description from README content
function extractEnhancedDescription(markdown: string, fallbackDescription: string): string {
  // Try to find the first paragraph after a heading that might contain a project description
  const paragraphs = markdown.split('\n\n').filter(p => p.trim() !== '');
  
  // Look for paragraphs after headings like "Introduction", "About", "Description"
  const introHeadings = ['introduction', 'about', 'overview', 'description'];
  
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    if (paragraph.startsWith('#')) {
      const headingText = paragraph.replace(/#/g, '').trim().toLowerCase();
      if (introHeadings.some(h => headingText.includes(h)) && i + 1 < paragraphs.length) {
        // Found a relevant heading, return the next paragraph
        const description = paragraphs[i + 1]
          .replace(/[#*_`]/g, '') // Remove markdown formatting
          .trim();
        
        if (description.length > 30) {
          return description;
        }
      }
    }
  }
  
  // If no suitable paragraph found, return the GitHub description or a fallback
  return fallbackDescription;
}

// Extract technologies from README content
function extractTechnologiesFromReadme(markdown: string): string[] {
  const techKeywords = [
    "react", "nextjs", "next.js", "vue", "angular", "svelte", 
    "javascript", "typescript", "python", "java", "c\\+\\+", "c#", "ruby", "go",
    "django", "express", "flask", "spring", "laravel", "rails", 
    "mongodb", "postgresql", "mysql", "redis", "firebase", "aws", "azure",
    "docker", "kubernetes", "terraform", "jenkins", "git",
    "tensorflow", "pytorch", "scikit-learn", "pandas", "numpy",
    "tailwind", "bootstrap", "material-ui", "chakra-ui"
  ];
  
  const techPattern = new RegExp(`(${techKeywords.join('|')})`, 'gi');
  const matches = markdown.match(techPattern) || [];
  
  // Remove duplicates and normalize case
  return [...new Set(matches.map(t => t.toLowerCase()))].map(t => {
    // Convert to proper case for display
    return t.charAt(0).toUpperCase() + t.slice(1);
  });
}

// Converts a GitHub repository to our Project format
export async function convertRepoToProject(repo: GitHubRepo, token: string = '') {
  // Generate a slug from the repo name
  const slug = repo.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  // Fetch README content to enhance project data
  const readmeContent = await fetchReadmeContent(repo, token);
  
  // Generate technology tags from topics, language, and README
  const technologies = [...(repo.topics || [])];
  if (repo.language && !technologies.includes(repo.language)) {
    technologies.unshift(repo.language);
  }
  
  // Add technologies extracted from README if available
  if (readmeContent?.technologies) {
    readmeContent.technologies.forEach(tech => {
      if (!technologies.includes(tech)) {
        technologies.push(tech);
      }
    });
  }
  
  // Determine category based on topics or language
  let category = 'Software Development';
  if (repo.topics.includes('cybersecurity') || 
      repo.topics.includes('security') ||
      repo.name.toLowerCase().includes('security')) {
    category = 'Cybersecurity';
  } else if (repo.topics.includes('ai') || 
             repo.topics.includes('machine-learning') ||
             repo.topics.includes('ml')) {
    category = 'AI';
  } else if (repo.language === 'Python') {
    category = 'Python';
  } else if (repo.language === 'TypeScript' || 
             repo.language === 'JavaScript') {
    category = 'Web Development';
  }  // Determine status based on update recency, deployment status, and other indicators
  const updatedDate = new Date(repo.updated_at);
  const currentDate = new Date();
  const daysSinceUpdate = (currentDate.getTime() - updatedDate.getTime()) / (1000 * 3600 * 24);
  
  // Check for indicators in topics or description suggesting project state
  const inProgressIndicators = ['wip', 'work-in-progress', 'ongoing', 'development', 'in-progress'];
  const completedIndicators = ['completed', 'done', 'finished', 'released', 'stable'];
  
  // Check if any indicators are present in topics or description
  const hasInProgressIndicator = [...repo.topics, repo.description]
    .filter(Boolean)
    .some(text => text && inProgressIndicators.some(indicator => 
      text.toString().toLowerCase().includes(indicator)
    ));
    
  const hasCompletedIndicator = [...repo.topics, repo.description]
    .filter(Boolean)
    .some(text => text && completedIndicators.some(indicator => 
      text.toString().toLowerCase().includes(indicator)
    ));
    
  // Additional check for recently pushed commits
  const pushedDate = repo.pushed_at ? new Date(repo.pushed_at) : updatedDate;
  const daysSincePush = (currentDate.getTime() - pushedDate.getTime()) / (1000 * 3600 * 24);
  
  // Default status
  let status: 'Live' | 'Completed' | 'In Progress' = 'Completed';
  
  // Project status determination logic with priority order:
  
  // 1. Explicit indicators in description or topics take highest priority
  if (hasInProgressIndicator) {
    status = 'In Progress';
  } else if (hasCompletedIndicator) {
    status = 'Completed';
  }
  // 2. Recent activity (last 30 days) suggests work is ongoing, unless explicitly marked as completed
  else if ((daysSinceUpdate < 30 || daysSincePush < 30) && !hasCompletedIndicator) {
    status = 'In Progress';
  } 
  // 3. Project with homepage URL is considered "Live" if not marked as "In Progress"
  else if (repo.homepage) {
    status = 'Live';
  }
  // 4. Default fallback is "Completed" - already set above
  
  return {
    id: repo.id.toString(),
    name: repo.name,
    slug,
    description: readmeContent?.description || repo.description || `A ${category.toLowerCase()} project by Aman Anil`,
    thumbnail: readmeContent?.images && readmeContent.images.length > 0 ? readmeContent.images[0] : '',
    readmeImages: readmeContent?.images || [],
    readmeContent: readmeContent?.content || '',
    technologies,
    category,
    status,
    demoUrl: repo.homepage || undefined,
    githubUrl: repo.html_url,
    featured: false,  // Could implement logic to determine featured projects
    private: repo.private
  };
}  
// Function to fetch GitHub repositories
export async function fetchGitHubRepos(username: string, token: string = '') {  
  try {
    let repos: GitHubRepo[] = [];
    
    // Try direct GitHub API first - explicitly request only owned repositories
    try {
      // Using affiliation=owner parameter to ensure we only get repositories owned by the user
      // We could also use /user/repos endpoint with the token for better filtering
      const url = token 
        ? `https://api.github.com/user/repos?per_page=100&sort=updated&direction=desc&affiliation=owner` 
        : `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&direction=desc&type=owner`;
      
      const headers: Record<string, string> = {
        'Accept': 'application/vnd.github.v3+json'
      };
      
      // Only add authorization header if token is provided
      if (token) {
        headers['Authorization'] = `Bearer ${token}`; // Using Bearer format
      }
      
      console.log(`Attempting direct fetch from GitHub API for ${username}'s owned repos only`);      
      const response = await fetch(url, {
        headers,
        cache: 'no-store' // Ensure fresh data
      });
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
        repos = await response.json();
    } catch (directError) {
      
      // If direct fetch fails, try the API route
      console.log('Attempting fetch from API route as fallback');
      const apiResponse = await fetch('/api/github', {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!apiResponse.ok) {
        throw new Error(`API route error: ${apiResponse.status}`);
      }
      
      repos = await apiResponse.json();
      console.log(`Successfully fetched ${repos.length} repos from API route`);
    }
    
    // Strict filtering to ensure we only get repos owned by the user and exclude collaborations
    const filteredRepos = repos.filter((repo) => {
      // Extract the owner part from the repository's full name
      const repoOwner = repo.full_name.split('/')[0].toLowerCase();
      
      // Check if the repository is owned by the user (exact match on username)
      const isOwnedByUser = repoOwner === username.toLowerCase();
      
      // Look at permissions field if available (will be present when using authenticated requests)
      const isAdmin = repo.permissions?.admin === true;
      
      // Check if the repo has admin permission AND is owned by the user OR is just owned by the user
      // This double-check ensures we're only showing repos the user created/owns
      
      // Only return repositories that:
      // 1. Are not forks
      // 2. Are owned directly by the user (exact match on username)
      // 3. Are not archived or disabled
      // 4. User has admin permissions (if permissions info is available)
      return !repo.fork && 
             isOwnedByUser && 
             !repo.archived && 
             !repo.disabled &&
             (repo.permissions === undefined || isAdmin);
    });
    
    console.log(`Filtered to ${filteredRepos.length} owned repositories (excluding collaborations)`);
    
    // Sort by update date
    return filteredRepos.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}