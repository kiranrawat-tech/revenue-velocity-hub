

# Lead Nurturing ROI Calculator

A sleek, dark-mode glassmorphism dashboard for calculating and visualizing lead nurturing ROI, inspired by the FundedNext UI reference with a warm golden/amber (#f1b837 "Baklava") accent palette.

---

## Page 1: Main Calculator Dashboard

**Layout:** Top navigation bar + two-column layout (inputs left, results right)

**Navigation Bar:**
- Logo/brand name
- Tabs: Calculator, Results Dashboard, Benchmarks
- Dark glass-effect navbar with amber accent on active tab

**Left Panel — Input Section (Glass Cards):**
Four collapsible input groups in frosted-glass cards:

1. **Financial Goals** — Target monthly revenue, average deal size, number of current leads
2. **Nurturing Impact** — Conversion rate lift %, sales cycle reduction %, AOV increase %
3. **Efficiency Gains** — Hours saved per month, hourly labor rate
4. **Costs (TCO)** — Platform fees, content creation costs, setup costs, training hours

Each input has a tooltip explaining the metric with industry benchmarks.

**Right Panel — Live Results:**
- Large glowing ROI percentage display (animated counter)
- Revenue Surplus card (Nurtured Revenue vs Baseline)
- Sales Velocity gauge/meter
- Annual Time Savings amount
- All updating in real-time as inputs change

---

## Page 2: Results Dashboard

**Visual Analytics (Recharts):**
- **Bar Chart:** Baseline Revenue vs Nurtured Revenue comparison
- **Donut Chart:** ROI breakdown (Revenue Gain, Cost Savings, LTV Impact)
- **Line Chart:** Projected monthly revenue over 12 months (with vs without nurturing)
- **Sales Velocity Formula Display:** Interactive formula showing how each variable impacts velocity

**Summary Cards:**
- Customers Needed, Leads Required, Website Visitors Needed (reverse-engineered from goals)
- CAC Reduction percentage
- Payback Period

---

## Page 3: Industry Benchmarks

A reference table showing conversion rates by lead source (Organic, Email, PPC, Webinars, Cold Email) so users can compare their inputs against industry standards. Presented in styled glass cards with amber highlights for top-performing channels.

---

## Design System

- **Background:** Deep dark navy/charcoal (#0a0a1a range)
- **Glass cards:** Semi-transparent with backdrop blur, subtle amber/gold borders
- **Primary accent:** Baklava gold (#f1b837) for CTAs, highlights, active states
- **Secondary accents:** Warm amber gradients for charts and data visualization
- **Typography:** Clean, light text on dark backgrounds
- **Micro-interactions:** Smooth number transitions, hover glows on cards, subtle pulse on key metrics

---

## Scope Notes

- **Frontend only** — all calculations happen client-side, no backend needed for the initial version
- **No SendFox/Slack integrations** in this first build (can be added later)
- **Mobile responsive** with stacked layout on smaller screens
- **Export/share results** via a simple "Copy Summary" button

