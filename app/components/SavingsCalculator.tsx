'use client';

import { useState } from 'react';
import Link from 'next/link';

const STATE_RATES: Record<string, { rate: number; avgBill: number }> = {
  "Alabama": { rate: 16.06, avgBill: 183.57 },
  "Alaska": { rate: 25.52, avgBill: 147.51 },
  "Arizona": { rate: 15.61, avgBill: 167.81 },
  "Arkansas": { rate: 12.35, avgBill: 129.43 },
  "California": { rate: 30.29, avgBill: 152.36 },
  "Colorado": { rate: 16.44, avgBill: 110.81 },
  "Connecticut": { rate: 28.30, avgBill: 196.69 },
  "Delaware": { rate: 16.51, avgBill: 150.41 },
  "Florida": { rate: 15.92, avgBill: 175.76 },
  "Georgia": { rate: 14.46, avgBill: 155.30 },
  "Hawaii": { rate: 39.79, avgBill: 196.96 },
  "Idaho": { rate: 12.07, avgBill: 113.94 },
  "Illinois": { rate: 16.36, avgBill: 113.37 },
  "Indiana": { rate: 16.19, avgBill: 145.87 },
  "Iowa": { rate: 12.83, avgBill: 106.75 },
  "Kansas": { rate: 14.29, avgBill: 125.18 },
  "Kentucky": { rate: 14.27, avgBill: 149.41 },
  "Louisiana": { rate: 12.46, avgBill: 149.77 },
  "Maine": { rate: 30.73, avgBill: 169.02 },
  "Maryland": { rate: 20.61, avgBill: 191.47 },
  "Massachusetts": { rate: 31.16, avgBill: 177.61 },
  "Michigan": { rate: 19.52, avgBill: 120.63 },
  "Minnesota": { rate: 14.98, avgBill: 106.66 },
  "Mississippi": { rate: 14.24, avgBill: 164.61 },
  "Missouri": { rate: 11.80, avgBill: 118.12 },
  "Montana": { rate: 12.86, avgBill: 109.57 },
  "Nebraska": { rate: 11.76, avgBill: 112.43 },
  "Nevada": { rate: 13.98, avgBill: 130.01 },
  "New Hampshire": { rate: 26.32, avgBill: 162.92 },
  "New Jersey": { rate: 23.13, avgBill: 153.12 },
  "New Mexico": { rate: 14.70, avgBill: 96.14 },
  "New York": { rate: 28.37, avgBill: 161.99 },
  "North Carolina": { rate: 13.68, avgBill: 138.85 },
  "North Dakota": { rate: 10.92, avgBill: 112.37 },
  "Ohio": { rate: 17.59, avgBill: 148.81 },
  "Oklahoma": { rate: 12.62, avgBill: 136.17 },
  "Oregon": { rate: 14.66, avgBill: 129.30 },
  "Pennsylvania": { rate: 20.19, avgBill: 164.95 },
  "Rhode Island": { rate: 30.14, avgBill: 170.89 },
  "South Carolina": { rate: 15.41, avgBill: 161.81 },
  "South Dakota": { rate: 13.60, avgBill: 135.18 },
  "Tennessee": { rate: 13.10, avgBill: 151.17 },
  "Texas": { rate: 15.36, avgBill: 168.35 },
  "Utah": { rate: 12.88, avgBill: 99.69 },
  "Vermont": { rate: 23.29, avgBill: 133.68 },
  "Virginia": { rate: 15.87, avgBill: 163.78 },
  "Washington": { rate: 13.81, avgBill: 131.89 },
  "West Virginia": { rate: 14.77, avgBill: 151.69 },
  "Wisconsin": { rate: 18.20, avgBill: 117.39 },
  "Wyoming": { rate: 12.85, avgBill: 110.90 },
  "District of Columbia": { rate: 17.71, avgBill: 113.23 },
};

export default function SavingsCalculator() {
  const [selectedState, setSelectedState] = useState('');
  const [monthlyBill, setMonthlyBill] = useState(150);

  const annualSavings = monthlyBill * 12 * 0.85;
  const twentyFiveYearSavings = annualSavings * 25;
  const paybackYears = (25000 / annualSavings).toFixed(1);

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  function handleStateChange(state: string) {
    setSelectedState(state);
    if (state && STATE_RATES[state]) {
      setMonthlyBill(Math.round(STATE_RATES[state].avgBill));
    }
  }

  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-2 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          How Much Could You Save With Solar?
        </h2>
        <p className="mb-8 text-center text-sm text-gray-500">
          Select your state and drag the slider to match your average monthly electric bill.
        </p>

        <div className="rounded-2xl bg-[#1e2333] px-8 py-10 shadow-xl">

          {/* State selector */}
          <div className="mb-6">
            <label htmlFor="state-select" className="mb-2 block text-sm font-medium text-gray-300">
              Select Your State
            </label>
            <select
              id="state-select"
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full rounded-lg border border-[#F0A500]/30 bg-[#111827] px-4 py-2 text-white focus:border-[#F0A500] focus:outline-none"
            >
              <option value="">— Choose a state —</option>
              {Object.keys(STATE_RATES).sort().map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {selectedState && (
              <p className="mt-2 text-xs text-gray-400">
                Average monthly bill for {selectedState}: ${STATE_RATES[selectedState].avgBill.toFixed(0)}
              </p>
            )}
          </div>

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
