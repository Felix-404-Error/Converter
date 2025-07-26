import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Shield, Zap, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent mb-6">
              About Image Converter Pro
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The most advanced, completely free, and privacy-focused image converter that works entirely in your browser.
            </p>
          </div>

          {/* Mission */}
          <Card className="mb-12 border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Heart className="h-6 w-6 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-muted-foreground">
                We believe that powerful image conversion tools should be accessible to everyone, completely free, 
                and respect your privacy. That's why we built Image Converter Pro to work entirely in your browser - 
                no uploads, no tracking, no limits.
              </p>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle>100% Private</CardTitle>
                <CardDescription>
                  All processing happens locally in your browser. Your images never leave your device.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Convert multiple images instantly with our optimized Canvas API implementation.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Globe className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Works Offline</CardTitle>
                <CardDescription>
                  Once loaded, the app works completely offline. No internet connection required.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Technology */}
          <Card className="mb-12 border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Built with Modern Web Technology</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Image Converter Pro leverages the latest web technologies to provide a seamless experience:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Canvas API</strong> for high-performance image processing</li>
                <li>• <strong>FileReader API</strong> for secure local file handling</li>
                <li>• <strong>Web Workers</strong> for non-blocking conversion operations</li>
                <li>• <strong>Progressive Web App</strong> technology for offline functionality</li>
                <li>• <strong>Modern React</strong> with TypeScript for reliability</li>
              </ul>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary via-primary-glow to-accent text-primary-foreground px-8 py-3"
              onClick={() => window.location.href = '/'}
            >
              Start Converting Images
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;