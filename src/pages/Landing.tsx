import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Calculator,
    TrendingUp,
    Zap,
    DollarSign,
    Target,
    BarChart3,
    Share2,
    FileJson,
    Lightbulb,
    Clock,
    ArrowRight,
    CheckCircle2,
    Sparkles
} from "lucide-react";
import { Navbar } from "@/components/Navbar";

export default function Landing() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80">
            <Navbar />

            {/* Hero Section */}
            <section className="container mx-auto px-4 pt-20 pb-16 text-center">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-4">
                        <Sparkles className="h-4 w-4" />
                        <span>AI-Powered ROI Analysis</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight glow-text">
                        Calculate Your Lead Nurturing ROI
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Make data-driven decisions about your marketing automation investment. Get instant ROI projections,
                        AI insights, and channel breakdowns to justify your budget.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                        <Link to="/calculator">
                            <Button size="lg" className="text-lg px-8 py-6 glow-border group">
                                <Calculator className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                                Start Calculating
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <a href="#how-it-works">
                            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                                Learn How It Works
                            </Button>
                        </a>
                    </div>

                    <div className="pt-8 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span>No signup required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span>Instant results</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span>Free forever</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* What Is This Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                        What Is This Calculator?
                    </h2>
                    <div className="space-y-4 text-lg text-muted-foreground">
                        <p>
                            The <strong className="text-foreground">Lead Nurturing ROI Calculator</strong> is a professional-grade
                            tool designed for marketing and sales teams to quantify the financial impact of their lead nurturing strategies.
                        </p>
                        <p>
                            Instead of guessing whether your investment in marketing automation, email campaigns, and nurturing workflows
                            will pay off, you can <strong className="text-foreground">calculate exact projections</strong> based on your
                            real data.
                        </p>
                        <p>
                            Enter your current metrics, estimate improvements from nurturing, and get instant insights including ROI percentage,
                            revenue projections, sales velocity, break-even analysis, and AI-powered recommendations.
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="container mx-auto px-4 py-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    How It Works
                </h2>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="glass-card p-6 text-center space-y-4">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                            <span className="text-2xl font-bold text-primary">1</span>
                        </div>
                        <h3 className="text-xl font-bold">Enter Your Metrics</h3>
                        <p className="text-muted-foreground">
                            Input your current revenue goals, lead volume, conversion rates, and costs. All fields include helpful tooltips with industry benchmarks.
                        </p>
                    </div>

                    <div className="glass-card p-6 text-center space-y-4">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                            <span className="text-2xl font-bold text-primary">2</span>
                        </div>
                        <h3 className="text-xl font-bold">Get Instant Results</h3>
                        <p className="text-muted-foreground">
                            Our AI-powered engine calculates 15+ metrics in real-time, including ROI, sales velocity, lifetime value, and channel breakdowns.
                        </p>
                    </div>

                    <div className="glass-card p-6 text-center space-y-4">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                            <span className="text-2xl font-bold text-primary">3</span>
                        </div>
                        <h3 className="text-xl font-bold">Export & Share</h3>
                        <p className="text-muted-foreground">
                            Download results as JSON/CSV/PDF, create shareable URLs, or integrate with SendFox and Slack for automated lead capture.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    Powerful Features
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    <FeatureCard
                        icon={TrendingUp}
                        title="Advanced ROI Calculations"
                        description="Calculate ROI, revenue surplus, sales velocity, payback period, and CAC reduction with industry-proven formulas."
                    />

                    <FeatureCard
                        icon={Lightbulb}
                        title="AI-Powered Insights"
                        description="Get 5-7 contextual recommendations based on your specific inputs to optimize your nurturing strategy."
                    />

                    <FeatureCard
                        icon={Target}
                        title="Lead Quality Scoring"
                        description="Automated 1-100 quality score based on conversion rates, deal size, and nurturing potential."
                    />

                    <FeatureCard
                        icon={BarChart3}
                        title="Channel Breakdown"
                        description="See ROI across 6 marketing channels: Organic Search, Email, Paid Ads, Content, Social, and Events."
                    />

                    <FeatureCard
                        icon={Zap}
                        title="Scenario Comparison"
                        description="Save up to 3 scenarios and compare best/realistic/worst case projections side-by-side."
                    />

                    <FeatureCard
                        icon={FileJson}
                        title="Export Anywhere"
                        description="Download as JSON, CSV, or PDF. Generate shareable URLs or email results to stakeholders."
                    />

                    <FeatureCard
                        icon={Share2}
                        title="SendFox Integration"
                        description="Auto-capture leads with 10+ custom fields including ROI, lead score, and priority level."
                    />

                    <FeatureCard
                        icon={Clock}
                        title="Real-Time Updates"
                        description="All calculations update instantly as you type. No page refreshes or waiting required."
                    />

                    <FeatureCard
                        icon={DollarSign}
                        title="3-Year LTV Projection"
                        description="See customer lifetime value projections with retention curves and repeat purchase modeling."
                    />
                </div>
            </section>

            {/* Use Cases */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    Who Uses This?
                </h2>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <div className="glass-card p-6 space-y-4">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                            Marketing Leaders
                        </h3>
                        <p className="text-muted-foreground">
                            Justify marketing automation budgets with data-backed ROI projections. Present to executives
                            with confidence using scenario comparisons and professional PDF exports.
                        </p>
                    </div>

                    <div className="glass-card p-6 space-y-4">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                            Sales Teams
                        </h3>
                        <p className="text-muted-foreground">
                            Calculate the impact of reducing sales cycles and improving conversion rates. See how
                            nurturing affects sales velocity and pipeline value.
                        </p>
                    </div>

                    <div className="glass-card p-6 space-y-4">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                            Revenue Operations
                        </h3>
                        <p className="text-muted-foreground">
                            Model different investment scenarios. Compare platforms and strategies with side-by-side
                            metrics including CAC, LTV, and payback periods.
                        </p>
                    </div>

                    <div className="glass-card p-6 space-y-4">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                            Consultants & Agencies
                        </h3>
                        <p className="text-muted-foreground">
                            Demonstrate value to clients with professional reports. Share pre-filled calculator URLs
                            and help clients understand the ROI of your services.
                        </p>
                    </div>
                </div>
            </section>

            {/* Metrics Explained */}
            <section className="container mx-auto px-4 py-16">
                <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                        What You'll Calculate
                    </h2>

                    <div className="grid gap-6">
                        <MetricExplanation
                            title="ROI Percentage"
                            description="Return on investment showing gain vs. cost. Higher is better. Industry avg: 200-400%."
                        />
                        <MetricExplanation
                            title="Revenue Surplus"
                            description="Extra monthly revenue generated from improved conversion rates and higher deal values."
                        />
                        <MetricExplanation
                            title="Sales Velocity"
                            description="How fast deals close ($/day). Measuring (Leads × Conv Rate × Deal Size) / Sales Cycle."
                        />
                        <MetricExplanation
                            title="Lead Quality Score"
                            description="1-100 rating based on conversion potential, deal size, and nurturing effectiveness."
                        />
                        <MetricExplanation
                            title="Confidence Score"
                            description="How reliable your projections are based on input realism and market benchmarks."
                        />
                        <MetricExplanation
                            title="Break-Even Month"
                            description="When your nurturing investment pays for itself. Faster payback = better ROI."
                        />
                        <MetricExplanation
                            title="Customer LTV"
                            description="3-year lifetime value projection with retention curves and repeat purchases."
                        />
                        <MetricExplanation
                            title="CAC Reduction"
                            description="How much cost-per-acquisition decreases through improved conversion rates."
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="glass-card p-12 text-center max-w-3xl mx-auto space-y-6 glow-border">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Ready to Calculate Your ROI?
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        No signup required. Get instant insights in under 2 minutes.
                    </p>
                    <Link to="/calculator">
                        <Button size="lg" className="text-lg px-8 py-6 group">
                            <Calculator className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                            Launch Calculator
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border/40 py-8 mt-16">
                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                    <p>© 2024 Lead Nurturing ROI Calculator. Built for marketers, by marketers.</p>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon: Icon, title, description }: {
    icon: React.ElementType;
    title: string;
    description: string;
}) {
    return (
        <div className="glass-card p-6 space-y-3 hover:scale-105 transition-transform">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    );
}

function MetricExplanation({ title, description }: { title: string; description: string }) {
    return (
        <div className="flex gap-4 items-start">
            <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
                <h4 className="font-bold text-lg mb-1">{title}</h4>
                <p className="text-muted-foreground">{description}</p>
            </div>
        </div>
    );
}
