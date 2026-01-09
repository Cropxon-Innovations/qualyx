import { SEOHead } from "@/components/SEOHead";
import { FeaturePageLayout } from "@/components/FeaturePageLayout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CookiePolicy = () => {
  return (
    <FeaturePageLayout>
      <SEOHead
        title="Cookie Policy | QUALYX - Autonomous QA-as-a-Service"
        description="QUALYX Cookie Policy. Learn how we use cookies and similar technologies."
        canonicalPath="/cookie-policy"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-foreground mb-8">Cookie Policy</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <p className="text-muted-foreground">
            <strong>Last Updated:</strong> January 9, 2025
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. What Are Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cookies are small text files stored on your device when you visit websites. They help websites function properly, provide analytics, and enable personalized experiences. QUALYX uses cookies to improve your experience on our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-medium text-foreground mt-4 mb-2">Essential Cookies</h3>
            <p className="text-muted-foreground mb-4">Required for the platform to function. These cannot be disabled.</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Authentication and session management</li>
              <li>Security features</li>
              <li>Load balancing</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mt-4 mb-2">Analytics Cookies</h3>
            <p className="text-muted-foreground mb-4">Help us understand how visitors use our platform.</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Page views and navigation patterns</li>
              <li>Feature usage statistics</li>
              <li>Performance monitoring</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mt-4 mb-2">Functional Cookies</h3>
            <p className="text-muted-foreground mb-4">Remember your preferences and settings.</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Theme preferences (dark/light mode)</li>
              <li>Language settings</li>
              <li>Dashboard customizations</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mt-4 mb-2">Marketing Cookies</h3>
            <p className="text-muted-foreground mb-4">Used to deliver relevant advertisements.</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Ad targeting and measurement</li>
              <li>Conversion tracking</li>
              <li>Retargeting campaigns</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Third-Party Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may use third-party services that set their own cookies:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Google Analytics for usage analytics</li>
              <li>Intercom for customer support</li>
              <li>Stripe for payment processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Managing Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              You can control cookies through your browser settings:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
              <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
              <li><strong>Edge:</strong> Settings → Privacy & Security → Cookies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about our cookie practices:<br />
              <strong>Email:</strong> privacy@qualyx.com<br />
              <strong>Company:</strong> Cropxon Innovations Pvt. Ltd.
            </p>
          </section>
        </div>
      </div>
    </FeaturePageLayout>
  );
};

export default CookiePolicy;
