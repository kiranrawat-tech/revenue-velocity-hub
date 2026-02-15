# 🚀 Lead Nurturing ROI Calculator

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> A professional-grade web application for calculating and visualizing the ROI of lead nurturing strategies with AI-powered insights, scenario planning, and seamless integrations.

![ROI Calculator](https://via.placeholder.com/800x400/1a1a2e/eab308?text=Lead+Nurturing+ROI+Calculator)

## ✨ Features

### 🎯 Core Capabilities

- **Advanced ROI Calculations** - 15+ metrics including sales velocity, LTV, break-even analysis
- **AI-Powered Insights** - Context-aware recommendations based on your inputs
- **Lead Quality Scoring** - Automated 1-100 quality score with confidence levels
- **Scenario Comparison** - Save and compare up to 3 scenarios (best/realistic/worst)
- **Channel Breakdown** - ROI analysis across 6 marketing channels
- **Theme Toggle** - Beautiful light/dark modes with smooth transitions

### 📤 Export & Share

- **JSON Export** - Machine-readable format for integrations
- **CSV Export** - Full metrics + channel breakdown
- **PDF Export** - Print-optimized for presentations
- **Shareable URLs** - Pre-filled calculator links with encoded parameters
- **Email Results** - Auto-formatted summary for stakeholders

### 🔌 Integrations

- **SendFox** - Auto-capture leads with 10+ custom fields
- **Slack** - Real-time alerts for high-priority leads
- **LocalStorage** - Automatic input persistence

---

## 🎬 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/revenue-velocity-hub.git
cd revenue-velocity-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

Open **http://localhost:8080** in your browser 🎉

---

## 📊 Use Cases

### 1. **Marketing Budget Planning**

**Scenario:** CMO needs to justify $50K investment in marketing automation.

**How to Use:**
1. Enter current metrics (500 leads/month, 3% conversion, $5K deal size)
2. Estimate nurturing impact (30% conversion lift, 20% cycle reduction)
3. Input costs ($2K/month platform, $10K setup)
4. **Result:** See 856% ROI projection with 3.2-month payback period
5. Export PDF for executive presentation

### 2. **Sales Cycle Optimization**

**Scenario:** Sales team wants to reduce 90-day sales cycle by 25%.

**How to Use:**
1. Navigate to "Nurturing Impact" section
2. Set Sales Cycle Reduction to 25%
3. Observe sales velocity increase from $326/day to $556/day
4. Review AI insight: "⚡ Reducing sales cycle by 25% will significantly boost pipeline velocity"
5. Save as "Cycle Optimization" scenario

### 3. **Channel Performance Analysis**

**Scenario:** Compare ROI across different lead sources.

**How to Use:**
1. Scroll to Results Dashboard
2. View Channel Breakdown chart
3. See ROI by channel:
   - Organic Search: 1250% ROI
   - Email Marketing: 980% ROI
   - Paid Ads: 650% ROI
4. Export CSV for deeper analysis

### 4. **Stakeholder Presentations**

**Scenario:** Present to board of directors on nurturing investment.

**How to Use:**
1. Create 3 scenarios:
   - **Best Case**: 50% lift, 30% reduction
   - **Realistic**: 25% lift, 15% reduction
   - **Conservative**: 10% lift, 5% reduction
2. Compare side-by-side in Scenario Comparison table
3. Show confidence score (85%) to establish credibility
4. Share URL with board members before meeting

### 5. **Lead Qualification**

**Scenario:** Auto-score and route high-value leads.

**How to Use:**
1. Configure SendFox integration with API token
2. Enable auto-notifications in settings
3. When someone fills the calculator:
   - Lead score calculated (e.g., 78/100)
   - Priority assigned (high/medium/low)
   - Auto-added to SendFox with custom fields
   - Slack alert sent if ROI > 200%

---

## 🎓 How to Use

### Step 1: Enter Your Metrics

Navigate to the **Calculator** page and fill in four sections:

#### 💰 Financial Goals
- **Target Monthly Revenue**: Your revenue goal (e.g., $100,000)
- **Average Deal Size**: Typical contract value (e.g., $5,000)
- **Current Monthly Leads**: Leads entering funnel (e.g., 500)
- **Current Conversion Rate**: Baseline lead-to-customer % (e.g., 3%)
- **Visitor-to-Lead Rate**: Website conversion (e.g., 2.5%)

#### 📈 Nurturing Impact
- **Conversion Rate Lift**: Expected improvement (e.g., 25%)
- **Sales Cycle Reduction**: Time savings (e.g., 20%)
- **AOV Increase**: Higher deal sizes (e.g., 15%)

#### ⏰ Efficiency Gains
- **Hours Saved / Month**: Automation time savings (e.g., 40 hrs)
- **Hourly Labor Rate**: Loaded cost per hour (e.g., $75)

#### 🧾 Costs (TCO)
- **Monthly Platform Fees**: Software subscription (e.g., $500)
- **Monthly Content Costs**: Creative production (e.g., $1,000)
- **One-time Setup Costs**: Initial investment (e.g., $5,000)
- **Training Hours**: Onboarding time (e.g., 20 hrs)

### Step 2: Review Results

Check the **Results Panel** (right sidebar) for:

- **ROI Percentage**: e.g., 1,132%
- **Monthly Revenue Surplus**: e.g., $30,000
- **Sales Velocity**: e.g., $556/day (vs $326 baseline)
- **Payback Period**: e.g., 2.5 months
- **CAC Reduction**: e.g., 32%

### Step 3: Explore Insights

Scroll to **Insights Panel** to see:

- **Lead Quality Score**: 75/100 (with color-coded gauge)
- **Confidence Score**: 85% reliability
- **Break-Even Analysis**: Month 3 indicator
- **AI Insights**: 5-7 actionable recommendations
- **Customer LTV**: $35,600 projection

### Step 4: Compare Scenarios

Use **Scenario Comparison**:

1. Click "Save Scenario" and name it (e.g., "Current Plan")
2. Load template: "Best Case" / "Realistic" / "Worst Case"
3. Adjust inputs and save as new scenario
4. Compare ROI, revenue, payback across all 3

### Step 5: Export & Share

Click export buttons in **Export Section**:

- **JSON**: Download for integrations
- **CSV**: Open in Excel/Google Sheets
- **PDF**: Opens print dialog
- **Link**: Copies shareable URL to clipboard
- **Email**: Opens mailto with pre-filled summary

### Step 6: Configure Integrations (Optional)

Navigate to `/integrations`:

1. **SendFox Setup**:
   - Get token from [SendFox Account](https://sendfox.com/account/oauth)
   - Paste into "Personal Access Token" field
   - Click "Test Connection"
   - ✅ Verified!

2. **Slack Setup**:
   - Create webhook at [Slack API](https://api.slack.com/messaging/webhooks)
   - Paste webhook URL
   - Click "Send Test Message"
   - Check Slack channel for confirmation

3. Enable auto-notifications for ROI > 200%

---

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Test Coverage

- ✅ **40+ Unit Tests** - Core calculations & integrations
- ✅ **Component Tests** - UI interactions and rendering
- ✅ **Edge Case Coverage** - Zero values, negative inputs, large numbers
- ✅ **Integration Tests** - SendFox & Slack formatting

---

## 🏗️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, Shadcn UI |
| **Charts** | Recharts |
| **Theme** | next-themes |
| **Testing** | Vitest, React Testing Library |
| **Integrations** | SendFox API, Slack Webhooks |

---

## 📁 Project Structure

```
revenue-velocity-hub/
├── src/
│   ├── components/
│   │   ├── calculator/           # Calculator-specific components
│   │   │   ├── InputSection.tsx
│   │   │   ├── ResultsPanel.tsx
│   │   │   ├── InsightsPanel.tsx
│   │   │   ├── ExportSection.tsx
│   │   │   └── ScenarioComparison.tsx
│   │   ├── Navbar.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ThemeProvider.tsx
│   ├── lib/
│   │   ├── calculations.ts       # Core ROI engine
│   │   └── integrations.ts       # SendFox & Slack
│   ├── pages/
│   │   ├── Calculator.tsx        # Main page
│   │   ├── ResultsDashboard.tsx  # Visualizations
│   │   ├── Benchmarks.tsx        # Industry data
│   │   └── IntegrationSettings.tsx
│   └── index.css                 # Global styles
├── DOCUMENTATION.md              # Technical docs
├── README.md                     # This file
└── package.json
```

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
# Deploy dist/ folder
```

### Docker

```bash
docker build -t roi-calculator .
docker run -p 8080:8080 roi-calculator
```

---

## 🎨 Customization

### Change Theme Colors

Edit `src/index.css`:

```css
:root {
  --primary: 42 87% 58%;  /* Change primary color (HSL) */
}
```

### Modify Default Inputs

Edit `src/lib/calculations.ts`:

```typescript
export const defaultInputs: CalculatorInputs = {
  targetMonthlyRevenue: 100000,  // Your defaults
  averageDealSize: 5000,
  // ...
};
```

### Add New Insights

Edit `generateInsights()` in `src/lib/calculations.ts`:

```typescript
if (results.roi > 500) {
  insights.push("🎯 Your custom insight here!");
}
```

---

## 📚 Documentation

- **[DOCUMENTATION.md](./DOCUMENTATION.md)** - Full technical documentation
- **[walkthrough.md](./brain/walkthrough.md)** - Implementation walkthrough
- **API Reference** - See DOCUMENTATION.md § API Reference

---

## 🤝 Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

---

## 📝 License

MIT License - see [LICENSE](LICENSE) file

---

## 🙏 Acknowledgments

- **Shadcn UI** for beautiful components
- **Recharts** for charting library
- **Tailwind CSS** for styling system
- **Vite** for blazing-fast dev experience

---

## 📧 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/revenue-velocity-hub/issues)
- **Email**: support@yourapp.com
- **Docs**: [DOCUMENTATION.md](./DOCUMENTATION.md)

---

<p align="center">Made with ❤️ for marketers and sales teams</p>
<p align="center">⭐ Star this repo if you find it helpful!</p>
