'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaArrowRight, FaSearch, FaTags, FaLock } from 'react-icons/fa';
import Link from 'next/link';
import { fetchGitHubRepos, convertRepoToProject } from '../utils/github';

// Define project interface
interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  category: string;
  status: 'Live' | 'Completed' | 'In Progress';
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  private?: boolean; // Added private property
}



const Projects: React.FC = () => {
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch GitHub repositories
  useEffect(() => {
    const fetchRepos = async () => {
      setIsLoading(true);
      setError(null);      
      try {
        // Use API route to fetch repositories
        const apiResponse = await fetch('/api/github', {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          }
        });        
        if (apiResponse.ok) {
          const projects = await apiResponse.json();
          
          if (projects && Array.isArray(projects) && projects.length > 0) {
            setProjects(projects);          } else {
            setError("No projects found in your GitHub repositories");
            setProjects([]); // Set empty array as there are no projects
          }
        } else {          
          // If API route fails, try direct fetch as fallback
          const username = process.env.GITHUB_USERNAME; 
            const repos = await fetchGitHubRepos(username || '', '');
          if (repos && Array.isArray(repos) && repos.length > 0) {
            const projectsData = await Promise.all(repos.map(async repo => {
              const project = await convertRepoToProject(repo);
              if (project.status !== 'Live' && project.status !== 'Completed' && project.status !== 'In Progress') {
                project.status = 'Completed';
              }
              return project as Project;
            }));
            setProjects(projectsData);          } else {
            setError("Failed to load projects from GitHub.");
            setProjects([]);
          }
        }      } catch (error) {
        setError("Failed to load projects.");
        setProjects([]); // Set empty array on error
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRepos();
  }, []);
  
  // Available categories for filtering (dynamically generated from projects)
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(projects.map((project) => project.category))];
    return cats;
  }, [projects]);

  // Filter projects based on search term and category
  const filteredProjects = useMemo(() => {
    console.log("Filtering projects. Total projects:", projects.length);
    if (projects.length === 0) {
      console.log("No projects to filter");
      return [];
    }
    
    console.log("Projects before filtering:", projects);
    
    const filtered = projects.filter((project) => {
      // Make sure project has all required properties before filtering
      if (!project || !project.name || !project.description || !Array.isArray(project.technologies)) {
        console.warn("Skipping invalid project:", project);
        return false;
      }
      
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.technologies.some((tech) => 
                             tech && typeof tech === 'string' && tech.toLowerCase().includes(searchTerm.toLowerCase())
                           );
      
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    console.log("Filtered projects:", filtered.length);
    return filtered;
  }, [projects, searchTerm, activeCategory]);

  // Animation variants for smooth transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-24 px-6">
      {/* Grid overlay for visual effect */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20 z-0" />

      <div className="container mx-auto relative z-10">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#9D3BE1] to-[#2BA233] bg-clip-text text-transparent">
            Portfolio Projects
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A collection of my work in cybersecurity, software development, and digital forensics. 
            Each project represents a unique challenge and innovative solution.
          </p>
        </motion.div>

        {/* Filter Section */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            {/* Search Bar */}
            <div className="relative w-full md:max-w-xs">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-3 bg-[#111111] border border-gray-700 rounded-lg focus:border-[#9D3BE1] focus:ring-1 focus:ring-[#9D3BE1] focus:outline-none text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto">
              <FaTags className="text-gray-400 flex-shrink-0" />
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                      activeCategory === category
                        ? 'bg-[#9D3BE1] text-white'
                        : 'bg-[#111111] border border-gray-700 text-gray-300 hover:border-[#9D3BE1]'
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loading indicator */}
        {isLoading && (
          <motion.div 
            className="flex justify-center items-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-10 h-10 border-4 border-[#9D3BE1] border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-300">Loading projects...</span>
          </motion.div>
        )}
        
        {/* Error message */}
        {error && (
          <motion.div 
            className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-red-300">{error}</p>
          </motion.div>
        )}

        {/* Projects Grid */}
        {!isLoading && filteredProjects.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="group bg-[#111111] border border-gray-800 rounded-lg overflow-hidden hover:border-[#9D3BE1] transition-all duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -5 }}
              >                {/* Project Thumbnail */}
                <div className="relative h-48 w-full overflow-hidden">                  
                  {project.thumbnail ? (
                    /* Show actual image if available */
                    <div className="absolute inset-0 border-b border-gray-800">
                      <img 
                        src={project.thumbnail}
                        alt={`${project.name} thumbnail`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      {/* Fallback placeholder (hidden by default when image exists) */}
                      <div className="absolute inset-0 hidden flex items-center justify-center bg-[#111111] border-b border-gray-800 text-5xl font-bold text-gray-700">
                        <div className="w-16 h-16 bg-[#9D3BE1]/20 rounded-md flex items-center justify-center">
                          {project.name.charAt(0)}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Placeholder when no image is available */
                    <div className="absolute inset-0 flex items-center justify-center bg-[#111111] border-b border-gray-800 text-5xl font-bold text-gray-700">
                      <div className="w-16 h-16 bg-[#9D3BE1]/20 rounded-md flex items-center justify-center">
                        {project.name.charAt(0)}
                      </div>
                    </div>
                  )}
                  
                  {/* Status badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Live' ? 'bg-[#2BA233]/20 text-[#2BA233] border border-[#2BA233]/30' :
                      project.status === 'Completed' ? 'bg-[#9D3BE1]/20 text-[#9D3BE1] border border-[#9D3BE1]/30' :
                      'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Private repository badge */}
                  {project.private && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="flex items-center gap-1 px-3 py-1 bg-gray-800/80 text-gray-300 rounded-full text-xs">
                        <FaLock className="text-xs" />
                        Private
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-[#9D3BE1] transition-colors">
                    {project.name}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors">
                    {project.description}
                  </p>
                  
                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies && project.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-[#222222] border border-gray-700 text-gray-400 rounded-md text-xs">
                        {tech}
                      </span>
                    ))}
                    {project.technologies && project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-[#222222] border border-gray-700 text-gray-400 rounded-md text-xs">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link href={`/projects/${project.slug}`} className="flex-1 py-2 px-4 bg-[#9D3BE1] rounded-md hover:bg-[#8423D0] transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2">
                      View Details
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    <div className="flex gap-1">
                      {project.demoUrl && (
                        <a 
                          href={project.demoUrl} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 border border-gray-700 rounded-md hover:border-[#9D3BE1] transition-colors duration-300"
                          aria-label={`View live demo for ${project.name}`}
                        >
                          <FaExternalLinkAlt className="text-gray-400 hover:text-[#9D3BE1] transition-colors" />
                        </a>
                      )}
                      
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="p-2 border border-gray-700 rounded-md hover:border-[#9D3BE1] transition-colors duration-300"
                          aria-label={`View GitHub repository for ${project.name}`}
                        >
                          <FaGithub className="text-gray-400 hover:text-[#9D3BE1] transition-colors" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          !isLoading && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-5xl mb-4 opacity-30">🔍</div>
              <h3 className="text-2xl font-medium text-gray-300 mb-2">No projects found</h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
              <button                onClick={() => {
                  console.log("Resetting filters");
                  setActiveCategory('All');
                  setSearchTerm('');
                }}
                className="mt-4 px-4 py-2 bg-[#9D3BE1] rounded-md hover:bg-[#8423D0] transition-all duration-300"
              >
                Show All Projects
              </button>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
};

export default Projects;