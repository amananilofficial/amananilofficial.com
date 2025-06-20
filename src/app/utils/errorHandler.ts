/**
 * Utility functions for handling GitHub API errors
 */

// Define error types
export type ApiErrorType = 
  | 'rateLimitExceeded'
  | 'authenticationFailed'
  | 'networkError'
  | 'notFound'
  | 'unknown';

// API error interface
export interface ApiError {
  type: ApiErrorType;
  status?: number;
  message: string;
  retryAfter?: number;
}

/**
 * Parse an error from the GitHub API
 * @param error The error object
 * @param response The fetch response (if available)
 * @returns Structured API error
 */
export function parseGitHubError(error: any, response?: Response): ApiError {
  // Rate limit errors
  if (response?.status === 403 && response.headers.get('X-RateLimit-Remaining') === '0') {
    const resetTime = response.headers.get('X-RateLimit-Reset');
    const retryAfter = resetTime ? parseInt(resetTime) - Math.floor(Date.now() / 1000) : undefined;
    return {
      type: 'rateLimitExceeded',
      status: 403,
      message: 'GitHub API rate limit exceeded. Please try again later.',
      retryAfter
    };
  }
  
  // Authentication failures
  if (response?.status === 401) {
    return {
      type: 'authenticationFailed',
      status: 401,
      message: 'GitHub authentication failed. Please check your token.'
    };
  }
  
  // Not found
  if (response?.status === 404) {
    return {
      type: 'notFound',
      status: 404,
      message: 'GitHub resource not found. The repository or endpoint may not exist.'
    };
  }
  
  // Network errors
  if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
    return {
      type: 'networkError',
      message: 'Network error when connecting to GitHub API. Please check your connection.'
    };
  }
  
  // Default case - unknown error
  return {
    type: 'unknown',
    status: response?.status,
    message: error.message || 'An unknown error occurred when accessing GitHub API.'
  };
}

/**
 * Handle common GitHub API errors
 * @param error The error to handle
 * @param callback Optional callback for custom error handling
 */
export function handleGitHubError(
  error: any, 
  response?: Response,
  callback?: (parsedError: ApiError) => void
): void {
  const parsedError = parseGitHubError(error, response);
  
  // Log the error regardless of callback
  console.error(`GitHub API Error (${parsedError.type}):`, parsedError.message);
  
  // Execute callback if provided
  if (callback) {
    callback(parsedError);
  }
}