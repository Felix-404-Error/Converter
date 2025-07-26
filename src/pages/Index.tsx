import ImageConverter from "@/components/ImageConverter";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <ImageConverter />
      
      {/* Footer */}
      <footer className="mt-16 border-t border-border/40 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-6 text-center md:text-left">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Image Converter Pro</h3>
              <p className="text-sm text-muted-foreground">
                Free, offline image conversion tool that respects your privacy.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground mb-3">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Offline Processing</li>
                <li>Batch Conversion</li>
                <li>Multiple Formats</li>
                <li>100% Free</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border/40 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Image Converter Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
