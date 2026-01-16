interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

interface RateLimitState {
  requests: number[];
}

class RateLimiter {
  private config: RateLimitConfig;
  private state: RateLimitState;
  private storageKey: string;

  constructor(key: string, config: RateLimitConfig) {
    this.storageKey = `rate_limit_${key}`;
    this.config = config;
    this.state = this.loadState();
  }

  private loadState(): RateLimitState {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load rate limit state:', e);
    }
    return { requests: [] };
  }

  private saveState(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Failed to save rate limit state:', e);
    }
  }

  private cleanOldRequests(): void {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;
    this.state.requests = this.state.requests.filter(time => time > windowStart);
    this.saveState();
  }

  canMakeRequest(): boolean {
    this.cleanOldRequests();
    return this.state.requests.length < this.config.maxRequests;
  }

  recordRequest(): void {
    this.cleanOldRequests();
    this.state.requests.push(Date.now());
    this.saveState();
  }

  getRemainingRequests(): number {
    this.cleanOldRequests();
    return Math.max(0, this.config.maxRequests - this.state.requests.length);
  }

  getTimeUntilReset(): number {
    this.cleanOldRequests();
    if (this.state.requests.length === 0) {
      return 0;
    }
    const oldestRequest = Math.min(...this.state.requests);
    const resetTime = oldestRequest + this.config.windowMs;
    return Math.max(0, resetTime - Date.now());
  }

  getFormattedTimeUntilReset(): string {
    const ms = this.getTimeUntilReset();
    if (ms <= 0) return '0 seconds';
    
    const seconds = Math.ceil(ms / 1000);
    if (seconds < 60) return `${seconds} second${seconds !== 1 ? 's' : ''}`;
    
    const minutes = Math.ceil(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    
    const hours = Math.ceil(minutes / 60);
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  }
}

// PDF Export rate limiter: 10 exports per hour
export const pdfExportLimiter = new RateLimiter('pdf_export', {
  maxRequests: 10,
  windowMs: 60 * 60 * 1000, // 1 hour
});

// Image upload rate limiter: 20 uploads per hour
export const imageUploadLimiter = new RateLimiter('image_upload', {
  maxRequests: 20,
  windowMs: 60 * 60 * 1000, // 1 hour
});

// General action rate limiter: 100 actions per minute (for spam prevention)
export const actionLimiter = new RateLimiter('general_action', {
  maxRequests: 100,
  windowMs: 60 * 1000, // 1 minute
});

export { RateLimiter };
export type { RateLimitConfig };
