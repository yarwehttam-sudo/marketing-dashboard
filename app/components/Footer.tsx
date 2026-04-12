import Link from "next/link";
import { BUSINESS_INFO } from "@/lib/businessInfo";
import { STATES } from "@/lib/locations";

const KEY_STATES = ["texas", "california", "new-york", "illinois", "colorado", "georgia", "pennsylvania", "ohio"]
  .map((slug) => STATES.find((s) => s.slug === slug))
  .filter((s): s is (typeof STATES)[number] => !!s);

// Fallback: if some slugs didn't match, just take the first 8 states
const FOOTER_STATES = KEY_STATES.length >= 8 ? KEY_STATES : STATES.slice(0, 8);

export default function Footer() {
  return (
    <footer className="bg-[#111827] border-t border-[#F0A500]/20 w-full py-12 px-4">
      <div className="mx-auto max-w-5xl">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 — Brand */}
          <div>
            <Link href="/" style={{ textDecoration: "none" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2px",
                  width: "fit-content",
                }}
              >
                <div
                  style={{
                    border: "2.5px solid #F0A500",
                    padding: "6px 14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "80px",
                  }}
                >
                  <span
                    style={{
                      color: "#F0A500",
                      fontSize: "38px",
                      fontWeight: "700",
                      letterSpacing: "4px",
                      lineHeight: 1,
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    SR
                  </span>
                </div>
                <span
                  style={{
                    color: "#F0A500",
                    fontSize: "11px",
                    fontWeight: "400",
                    letterSpacing: "8px",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  ENERGY
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mt-2">
              No-Credit-Check Solar, Batteries &amp; EV Chargers
            </p>
            <a
              href={BUSINESS_INFO.phoneTel}
              className="block text-[#F0A500] mt-3"
            >
              {BUSINESS_INFO.phone}
            </a>
            <a
              href={BUSINESS_INFO.emailHref}
              className="block text-gray-400 text-sm"
            >
              {BUSINESS_INFO.email}
            </a>
          </div>

          {/* Column 2 — Services */}
          <div>
            <h3 className="text-white font-semibold mb-3">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/locations/"
                  className="text-gray-400 text-sm hover:text-[#F0A500] transition-colors"
                >
                  Solar Panels
                </Link>
              </li>
              <li>
                <Link
                  href="/locations/"
                  className="text-gray-400 text-sm hover:text-[#F0A500] transition-colors"
                >
                  Home Battery
                </Link>
              </li>
              <li>
                <Link
                  href="/locations/"
                  className="text-gray-400 text-sm hover:text-[#F0A500] transition-colors"
                >
                  EV Charger
                </Link>
              </li>
              <li>
                <Link
                  href="/locations/texas/austin/texas-vpp/"
                  className="text-gray-400 text-sm hover:text-[#F0A500] transition-colors"
                >
                  Texas VPP Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Service Areas */}
          <div>
            <h3 className="text-white font-semibold mb-3">Service Areas</h3>
            <ul className="space-y-2">
              {FOOTER_STATES.map((state) => (
                <li key={state.abbr}>
                  <Link
                    href={`/locations/${state.slug}/`}
                    className="text-gray-400 text-sm hover:text-[#F0A500] transition-colors"
                  >
                    {state.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 text-sm hover:text-[#F0A500] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/locations/"
                  className="text-gray-400 text-sm hover:text-[#F0A500] transition-colors"
                >
                  Locations
                </Link>
              </li>
              <li>
                <Link
                  href="/contact/"
                  className="text-gray-400 text-sm hover:text-[#F0A500] transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/contact/"
                  className="text-gray-400 text-sm hover:text-[#F0A500] transition-colors"
                >
                  Free Quote
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-8">
          <span className="text-gray-400 text-xs flex items-center gap-1">
            ⭐ 5-Star Rated
          </span>
          <span className="text-gray-500 text-xs">|</span>
          <span className="text-gray-400 text-xs flex items-center gap-1">
            🔒 Licensed &amp; Insured
          </span>
          <span className="text-gray-500 text-xs">|</span>
          <span className="text-gray-400 text-xs flex items-center gap-1">
            📅 13 Years Experience
          </span>
          <span className="text-gray-500 text-xs">|</span>
          <span className="text-gray-400 text-xs flex items-center gap-1">
            ✅ No Credit Check
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#F0A500]/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs">
            &copy; 2026 SR Energy. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">
            Licensed &amp; Insured | 13 Years Experience | No Credit Check
            Required
          </p>
        </div>
      </div>
    </footer>
  );
}
