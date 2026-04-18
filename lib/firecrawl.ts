import FirecrawlApp from '@mendable/firecrawl-js';
import type { z } from 'zod';
import { logFirecrawlOp } from './notion';
import type { FirecrawlEndpoint, FirecrawlJobType, FirecrawlLogEntry } from './firecrawl.types';

export interface ExtractConfig<T> {
  url: string;
  schema: z.ZodType<T>;
  prompt: string;
}

const SCRAPE_DEFAULTS = {
  formats: ['markdown'] as ('markdown')[],
};

function fireLog(entry: FirecrawlLogEntry): void {
  logFirecrawlOp(entry).catch((err) =>
    console.error('[firecrawl] logFirecrawlOp threw unexpectedly:', err),
  );
}

function buildEntry(
  jobType: FirecrawlJobType,
  url: string,
  creditsUsed: number,
  status: FirecrawlLogEntry['status'],
  resultPreview: string,
  endpoint: FirecrawlEndpoint,
  duration: number,
  errorMessage?: string,
): FirecrawlLogEntry {
  return {
    jobType,
    url,
    creditsUsed,
    status,
    resultPreview: resultPreview.slice(0, 200),
    endpoint,
    duration,
    errorMessage,
    timestamp: new Date().toISOString(),
  };
}

class FirecrawlClient {
  private app: FirecrawlApp;

  constructor(apiKey: string) {
    this.app = new FirecrawlApp({ apiKey });
  }

  async scrape(
    url: string,
    jobType: FirecrawlJobType = 'enrichment',
  ): Promise<{ markdown: string; creditsUsed: number }> {
    const start = Date.now();
    const result = await this.app.v1.scrapeUrl(url, SCRAPE_DEFAULTS);
    const duration = Date.now() - start;

    if (!result.success) {
      const msg = result.error ?? 'unknown error';
      fireLog(buildEntry(jobType, url, 1, 'error', '', 'scrape', duration, msg));
      throw new Error(`Firecrawl scrape failed for ${url}: ${msg}`);
    }

    const markdown = result.markdown ?? '';
    fireLog(buildEntry(jobType, url, 1, 'success', markdown, 'scrape', duration));
    return { markdown, creditsUsed: 1 };
  }

  // budget: 5 credits per extract call
  async extract<T>(
    config: ExtractConfig<T>,
    jobType: FirecrawlJobType = 'enrichment',
  ): Promise<T | null> {
    const { url, schema, prompt } = config;
    const start = Date.now();
    const result = await this.app.v1.extract([url], { prompt, schema });
    const duration = Date.now() - start;

    if (!result.success) {
      const msg = result.error ?? 'unknown error';
      fireLog(buildEntry(jobType, url, 5, 'error', '', 'extract', duration, msg));
      return null;
    }

    const preview = JSON.stringify(result.data);
    fireLog(buildEntry(jobType, url, 5, 'success', preview, 'extract', duration));
    return result.data as T;
  }
}

if (!process.env.FIRECRAWL_API_KEY) {
  throw new Error('FIRECRAWL_API_KEY is not set');
}

export const firecrawl = new FirecrawlClient(process.env.FIRECRAWL_API_KEY);
