import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertTriangle, Scale, Users } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground">
              Please read these terms carefully before using our service.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Key Points */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <FileText className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Free Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Image Converter Pro is provided free of charge with no hidden fees or premium subscriptions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <AlertTriangle className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Use at Your Own Risk</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  While we strive for reliability, you use this service at your own risk. Always keep backups of important files.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Scale className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Legal Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You must only convert images you own or have the legal right to process and distribute.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Fair Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Please use our service responsibly and avoid any activities that could harm the service or other users.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Terms */}
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Terms and Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">1. Acceptance of Terms</h3>
                <p className="text-muted-foreground">
                  By accessing and using Image Converter Pro, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">2. Description of Service</h3>
                <p className="text-muted-foreground">
                  Image Converter Pro is a free, browser-based image conversion tool that allows users to convert images between various formats including PNG, JPG, WebP, BMP, and GIF. All processing is performed locally in the user's browser.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">3. User Responsibilities</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>You are responsible for the images you upload and convert</li>
                  <li>You must have the legal right to process and distribute the images</li>
                  <li>You must not use the service for illegal or harmful purposes</li>
                  <li>You must not attempt to reverse engineer or exploit the service</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">4. Intellectual Property</h3>
                <p className="text-muted-foreground">
                  You retain all rights to the images you upload and convert. We do not claim any ownership of your content. The Image Converter Pro software and interface are protected by copyright and other intellectual property laws.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">5. Disclaimer of Warranties</h3>
                <p className="text-muted-foreground">
                  The service is provided "as is" without any warranties, express or implied. We do not guarantee that the service will be uninterrupted, error-free, or that converted images will meet your specific requirements.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">6. Limitation of Liability</h3>
                <p className="text-muted-foreground">
                  In no event shall we be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use this service, including but not limited to loss of data or corrupted files.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">7. Third-Party Advertisements</h3>
                <p className="text-muted-foreground">
                  This service may display third-party advertisements. We are not responsible for the content or practices of advertisers. Your interactions with advertisers are solely between you and the advertiser.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">8. Modifications to Terms</h3>
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the service after changes constitutes acceptance of the new terms.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">9. Termination</h3>
                <p className="text-muted-foreground">
                  We reserve the right to terminate or restrict access to the service at any time, without notice, for any reason.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">10. Governing Law</h3>
                <p className="text-muted-foreground">
                  These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">11. Contact Information</h3>
                <p className="text-muted-foreground">
                  If you have any questions about these Terms of Service, please contact us through our contact page.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms;