import { notFound } from "next/navigation";
import { Metadata } from "next";
import { fetchGitHubRepos, convertRepoToProject } from "../../utils/github";
import ReactMarkdown from "react-markdown";

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  // Try to fetch project data for this slug
  const project = await getProjectBySlug(slug);
  
  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }
  
  return {
    title: `${project.name} | Aman Anil | Digital Specialist`,
    description: project.description,
  };
}

// Get project data by slug
async function getProjectBySlug(slug: string) {
  try {
    // First try to get from GitHub API via our API route
    const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/github`, {
      cache: 'no-store',
    });
    
    if (apiResponse.ok) {
      const projects = await apiResponse.json();
      if (projects && Array.isArray(projects)) {
        const project = projects.find(p => p.slug === slug);
        if (project) {
          return project;
        }
      }
    }
    
    // Direct API call as fallback
    const username = process.env.GITHUB_USERNAME;
    const token = process.env.GITHUB_TOKEN || '';
    
    // Try to get from GitHub API
    const repos = await fetchGitHubRepos(username || '', token);
    
    // Generate slug from name and check for match
    for (const repo of repos) {
      const repoSlug = repo.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      if (repoSlug === slug) {
        return await convertRepoToProject(repo, token);
      }
    }
          
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  
  if (!project) {
    notFound();
  }
    return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white py-24 px-6">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-0" />
      
      <div className="container mx-auto relative z-10 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-[#9D3BE1] via-[#FF6B6B] to-[#4ECDC4] bg-clip-text text-transparent animate-pulse">
            {project.name}
          </h1>
          <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Project Screenshots */}
        {project.readmeImages && project.readmeImages.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Project Screenshots
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.readmeImages.slice(0, 6).map((image: string, index: number) => (
                <div key={index} className="group relative rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                  <img 
                    src={image} 
                    alt={`${project.name} screenshot ${index + 1}`} 
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-800 rounded-2xl overflow-hidden p-8 mb-8 shadow-2xl backdrop-blur-sm">          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Project Details Card */}
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Project Details
              </h2>
              
              <div className="space-y-6">
                <div className="group">
                  <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-2">Category</h3>
                  <p className="text-lg font-medium text-white group-hover:text-purple-300 transition-colors">
                    {project.category}
                  </p>
                </div>
                
                <div className="group">
                  <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-2">Status</h3>
                  <p className="text-lg font-medium text-white group-hover:text-green-300 transition-colors">
                    {project.status}
                  </p>
                </div>
                
                <div className="group">
                  <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.technologies.map((tech: string, index: number) => (
                      <span 
                        key={index}
                        className="px-3 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-blue-300 rounded-lg text-sm font-medium hover:from-blue-500/30 hover:to-purple-500/30 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Project Links Card */}
            <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Project Links
              </h2>
              
              <div className="space-y-4">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 hover:from-gray-700/70 hover:to-gray-600/70 border border-gray-600/50 hover:border-gray-500/70 rounded-xl text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    <div className="p-2 bg-gray-700/50 rounded-lg group-hover:bg-gray-600/50 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="group-hover:rotate-12 transition-transform">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">View on GitHub</p>
                      <p className="text-sm text-gray-400">Source code repository</p>
                    </div>
                  </a>
                )}
                
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-[#9D3BE1]/50 to-[#FF6B6B]/50 hover:from-[#8423D0]/70 hover:to-[#FF5252]/70 border border-purple-500/50 hover:border-purple-400/70 rounded-xl text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    <div className="p-2 bg-purple-600/50 rounded-lg group-hover:bg-purple-500/50 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">Live Demo</p>
                      <p className="text-sm text-gray-300">View the project in action</p>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* README.md Content Section */}
        {project.readmeContent && (
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden p-8 mb-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                Project Documentation
              </h2>
            </div>
            <div className="prose prose-invert max-w-none prose-headings:text-purple-400 prose-a:text-blue-400 prose-code:bg-gray-800 prose-code:p-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700">
              <ReactMarkdown>
                {project.readmeContent}
              </ReactMarkdown>
            </div>
          </div>
        )}
        
        {/* Back to Projects Button */}
        <div className="flex justify-center">
          <a 
            href="/projects" 
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 hover:from-gray-700/70 hover:to-gray-600/70 border border-gray-600/50 hover:border-gray-500/70 rounded-xl text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="font-semibold">Back to Projects</span>
          </a>
        </div>
      </div>
    </div>
  );
}
