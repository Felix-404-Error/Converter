import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, Database } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              Your privacy is our top priority. Learn how we protect your data.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Privacy Highlights */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle>No Data Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We don't collect, store, or transmit any of your personal data or images. Everything happens locally in your browser.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Lock className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Local Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All image conversions are performed entirely on your device. Your images never leave your computer.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Eye className="h-8 w-8 text-primary mb-2" />
                <CardTitle>No Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We don't use cookies, analytics, or any tracking technologies to monitor your usage.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Database className="h-8 w-8 text-primary mb-2" />
                <CardTitle>No Servers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Since everything works offline, there are no servers involved in the image conversion process.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Policy */}
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Detailed Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Information We Don't Collect</h3>
                <p className="text-muted-foreground">
                  Image Converter Pro is designed with privacy by design. We do not collect:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                  <li>Personal information (names, emails, addresses)</li>
                  <li>Images or files you upload or convert</li>
                  <li>Usage analytics or behavior tracking</li>
                  <li>Device information or browser fingerprints</li>
                  <li>IP addresses or location data</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">How the App Works</h3>
                <p className="text-muted-foreground">
                  When you upload images to Image Converter Pro, they are processed entirely within your web browser using the Canvas API and FileReader API. No network requests are made to send your images to external servers. The converted images are generated locally and downloaded directly to your device.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Third-Party Services</h3>
                <p className="text-muted-foreground">
                  This application may display advertisements through Google AdSense. Google may use cookies and web beacons to serve ads based on your visits to this and other websites. You can opt out of personalized advertising by visiting Google's Ad Settings.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Data Security</h3>
                <p className="text-muted-foreground">
                  Since no data is transmitted or stored on external servers, your images and data remain completely secure on your device. We recommend keeping your browser updated for the best security experience.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Changes to This Policy</h3>
                <p className="text-muted-foreground">
                  We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                <p className="text-muted-foreground">
                  If you have any questions about this privacy policy, please contact us through our contact page.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Privacy;