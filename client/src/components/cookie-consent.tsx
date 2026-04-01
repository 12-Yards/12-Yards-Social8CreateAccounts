import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Cookie } from "lucide-react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4" data-testid="popup-cookie-consent">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card border rounded-xl shadow-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Cookie className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-foreground font-medium mb-1" data-testid="text-cookie-heading">We use cookies</p>
              <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-cookie-message">
                We use cookies to enhance your browsing experience, analyse site traffic, and personalise content. By clicking "Accept All", you consent to our use of cookies. Read our{" "}
                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> for more information.
              </p>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
            <Button variant="outline" size="sm" onClick={handleDecline} className="flex-1 sm:flex-none" data-testid="button-cookie-decline">
              Decline
            </Button>
            <Button size="sm" onClick={handleAccept} className="flex-1 sm:flex-none" data-testid="button-cookie-accept">
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
