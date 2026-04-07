'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SavingsCalculator() {
  const [monthlyBill, setMonthlyBill] = useState(150);

  const annualSavings = monthlyBill * 12 * 0.85;
  const twentyFiveYearSavings = annualSavings * 25;
  const paybackYears = (25000 / annualSavings).toFixed(1);

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-2 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          How Much Could You Save With Solar?
        </h2>
        <p className="mb-8 text-center text-sm text-gray-500">
          Drag the slider to match your average monthly electric bill.
        </p>

        <div className="rounded-2xl bg-[#1e2333] px-8 py-10 shadow-xl">
          {/* Slider */}
          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <label htmlFor="bill-slider" className="text-sm font-medium text-gray-300">
                Monthly Electric Bill
              </label>
              <span className="rounded-lg bg-[#F0A500]/20 px-3 py-1 text-lg font-bold text-[#F0A500]">
                ${monthlyBill}
              </span>
            </div>
            <input
              id="bill-slider"
              type="range"
              min={50}
              max={500}
              step={5}
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(Number(e.target.value))}
              className="w-full cursor-pointer accent-[#F0A500]"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>$50</span>
              <span>$500</span>
            </div>
          </div>

          {/* Results */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-[#F0A500]/30 bg-white/5 p-5 text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Est. Annual Savings
              </p>
              <p className="mt-2 text-2xl font-bold text-[#F0A500]">{fmt(annualSavings)}</p>
            </div>
            <div className="rounded-xl border border-[#F0A500]/30 bg-white/5 p-5 text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                25-Year Savings
              </p>
              <p className="mt-2 text-2xl font-bold text-[#F0A500]">{fmt(twentyFiveYearSavings)}</p>
            </div>
            <div className="rounded-xl border border-[#F0A500]/30 bg-white/5 p-5 text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Avg Payback Period
              </p>
              <p className="mt-2 text-2xl font-bold text-[#F0A500]">{paybackYears} yrs</p>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-gray-500">
            Estimates based on 85% bill offset. Actual savings vary by location, usage, and system size.
          </p>

          <div className="mt-8 text-center">
            <Link
              href="/contact/"
              className="inline-block rounded-lg bg-[#F0A500] px-8 py-3 text-base font-semibold text-white shadow hover:bg-[#fbb82a] transition-colors"
            >
              Get My Exact Quote →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
