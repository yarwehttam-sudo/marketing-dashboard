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
