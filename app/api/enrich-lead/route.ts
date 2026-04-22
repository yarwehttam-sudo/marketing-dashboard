/**
 * 🚫 SHELVED — DO NOT USE — 2026-04-19
 *
 * This module is part of the abandoned Phase 2 lead enrichment pipeline.
 * Diagnostic test (Step 6) proved that property enrichment via Firecrawl
 * does not return usable data from county assessors, Zillow, or utilities.
 *
 * Why: URL-guessing patterns can't reach real parcel/property data on these
 * sources. County assessor pages return search forms, Zillow is JS-rendered
 * and hostile to scrapers, utility rate pages are PDFs.
 *
 * Decision: Property enrichment removed from SREnergy strategy. Sales reps
 * can look up Zillow on mobile during the call instead. Enrichment was not
 * needed for the "no credit check" value proposition anyway.
 *
 * See: docs/decisions/001-enrichment-shelved.md
 *
 * If reviving: scope it to one well-structured public source (DSIRE, US
 * Census API, etc.) — NOT three-source merge across hostile platforms.
 */
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSalesCRMLead } from '@/lib/notion';
import { enrichLead } from '@/lib/enrichment/pipeline';

const LeadSchema = z.object({
  contactName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10).optional(),
  address: z.string().min(5),
  zip: z.string().regex(/^\d{5}$/, 'ZIP must be exactly 5 digits'),
  state: z.string().length(2, 'State must be a 2-letter code'),
  productInterest: z
    .array(z.enum(['Solar Panels', 'Home Battery', 'EV Charger', 'Complete Package']))
    .optional(),
  monthlyElectricBill: z.number().optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const lead = parsed.data;

  let pageId: string;
  try {
    const result = await createSalesCRMLead(lead);
    pageId = result.pageId;
  } catch (err) {
    console.error('[enrich-lead] Failed to create Sales CRM row:', err);
    return NextResponse.json({ error: 'Failed to record lead' }, { status: 500 });
  }

  enrichLead(pageId, lead.address, lead.zip, lead.state).catch((err) => {
    console.error('[enrich-lead] Background enrichment threw:', err);
  });

  return NextResponse.json(
    { success: true, leadId: pageId, message: 'Lead received, enrichment in progress' },
    { status: 202 },
  );
}
