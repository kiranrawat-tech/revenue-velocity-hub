import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
    loadIntegrationConfig,
    saveIntegrationConfig,
    testSendFoxConnection,
    testSlackWebhook,
    IntegrationConfig,
} from "@/lib/integrations";
import { Settings, Send, MessageSquare, CheckCircle2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function IntegrationSettings() {
    const [config, setConfig] = useState<IntegrationConfig>({});
    const [testing, setTesting] = useState({ sendFox: false, slack: false });
    const [testResults, setTestResults] = useState({ sendFox: false, slack: false });
    const { toast } = useToast();

    useEffect(() => {
        const loaded = loadIntegrationConfig();
        setConfig(loaded);
    }, []);

    const handleSave = () => {
        saveIntegrationConfig(config);
        toast({ title: "Settings saved!", description: "Integration configuration updated." });
    };

    const handleTestSendFox = async () => {
        if (!config.sendFoxToken) {
            toast({
                title: "Token required",
                description: "Please enter a SendFox API token first.",
                variant: "destructive",
            });
            return;
        }

        setTesting({ ...testing, sendFox: true });
        const success = await testSendFoxConnection(config.sendFoxToken);
        setTesting({ ...testing, sendFox: false });
        setTestResults({ ...testResults, sendFox: success });

        toast({
            title: success ? "Connection successful!" : "Connection failed",
            description: success
                ? "SendFox API is working correctly."
                : "Check your token and try again.",
            variant: success ? "default" : "destructive",
        });
    };

    const handleTestSlack = async () => {
        if (!config.slackWebhookUrl) {
            toast({
                title: "Webhook URL required",
                description: "Please enter a Slack webhook URL first.",
                variant: "destructive",
            });
            return;
        }

        setTesting({ ...testing, slack: true });
        const success = await testSlackWebhook(config.slackWebhookUrl);
        setTesting({ ...testing, slack: false });
        setTestResults({ ...testResults, slack: success });

        toast({
            title: success ? "Message sent!" : "Connection failed",
            description: success
                ? "Check your Slack channel for the test message."
                : "Verify your webhook URL and try again.",
            variant: success ? "default" : "destructive",
        });
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="container py-8 max-w-3xl">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Settings className="h-7 w-7 text-primary" />
                        <h1 className="text-3xl font-bold tracking-tight">Integration Settings</h1>
                    </div>
                    <p className="text-muted-foreground text-sm">
                        Configure connections to SendFox and Slack for automated lead capture and notifications.
                    </p>
                </div>

                <Alert className="mb-6 border-primary/30 bg-primary/5">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    <AlertDescription className="text-xs">
                        <strong>Demo Mode:</strong> Settings are stored locally in your browser. In production,
                        these would be securely stored on a backend server.
                    </AlertDescription>
                </Alert>

                <div className="space-y-6">
                    {/* SendFox Integration */}
                    <div className="glass-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/15 flex items-center justify-center">
                                <Send className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">SendFox Integration</h3>
                                <p className="text-xs text-muted-foreground">
                                    Automatically add calculator users to your email lists
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="sendFoxToken" className="text-xs">
                                    Personal Access Token
                                </Label>
                                <Input
                                    id="sendFoxToken"
                                    type="password"
                                    placeholder="sk_..."
                                    value={config.sendFoxToken || ""}
                                    onChange={(e) => setConfig({ ...config, sendFoxToken: e.target.value })}
                                    className="mt-1.5"
                                />
                                <p className="text-[10px] text-muted-foreground mt-1">
                                    Get your token from{" "}
                                    <a
                                        href="https://sendfox.com/account/oauth"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline"
                                    >
                                        SendFox Account Settings
                                    </a>
                                </p>
                            </div>

                            <Button
                                onClick={handleTestSendFox}
                                variant="outline"
                                size="sm"
                                disabled={testing.sendFox || !config.sendFoxToken}
                                className="w-full gap-2"
                            >
                                {testing.sendFox ? (
                                    "Testing..."
                                ) : testResults.sendFox ? (
                                    <>
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        Connection Verified
                                    </>
                                ) : (
                                    "Test Connection"
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Slack Integration */}
                    <div className="glass-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/15 flex items-center justify-center">
                                <MessageSquare className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Slack Integration</h3>
                                <p className="text-xs text-muted-foreground">
                                    Get real-time alerts when high-intent leads use the calculator
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="slackWebhook" className="text-xs">
                                    Incoming Webhook URL
                                </Label>
                                <Input
                                    id="slackWebhook"
                                    type="url"
                                    placeholder="https://hooks.slack.com/services/..."
                                    value={config.slackWebhookUrl || ""}
                                    onChange={(e) => setConfig({ ...config, slackWebhookUrl: e.target.value })}
                                    className="mt-1.5"
                                />
                                <p className="text-[10px] text-muted-foreground mt-1">
                                    Create a webhook in your{" "}
                                    <a
                                        href="https://api.slack.com/messaging/webhooks"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline"
                                    >
                                        Slack App Settings
                                    </a>
                                </p>
                            </div>

                            <Button
                                onClick={handleTestSlack}
                                variant="outline"
                                size="sm"
                                disabled={testing.slack || !config.slackWebhookUrl}
                                className="w-full gap-2"
                            >
                                {testing.slack ? (
                                    "Sending Test..."
                                ) : testResults.slack ? (
                                    <>
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        Message Sent
                                    </>
                                ) : (
                                    "Send Test Message"
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Auto Notifications */}
                    <div className="glass-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-sm">Enable Auto-Notifications</h3>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Automatically send Slack alerts for high-priority leads (ROI &gt; 200%)
                                </p>
                            </div>
                            <Switch
                                checked={config.enableAutoNotifications || false}
                                onCheckedChange={(checked) =>
                                    setConfig({ ...config, enableAutoNotifications: checked })
                                }
                            />
                        </div>
                    </div>

                    {/* Save Button */}
                    <Button onClick={handleSave} className="w-full" size="lg">
                        Save Configuration
                    </Button>
                </div>
            </main>
        </div>
    );
}
