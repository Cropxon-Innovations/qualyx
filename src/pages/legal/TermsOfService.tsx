import { SEOHead } from "@/components/SEOHead";
import { FeaturePageLayout } from "@/components/FeaturePageLayout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
  return (
    <FeaturePageLayout>
      <SEOHead
        title="Terms of Service | QUALYX - Autonomous QA-as-a-Service"
        description="QUALYX Terms of Service. Read our terms and conditions for using the platform."
        canonicalPath="/terms"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <p className="text-muted-foreground">
            <strong>Last Updated:</strong> January 9, 2025
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using QUALYX ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service. QUALYX is owned and operated by Cropxon Innovations Pvt. Ltd.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              QUALYX is an autonomous QA-as-a-Service platform that provides AI-powered test automation, self-healing test capabilities, session replay, and related quality assurance tools for software development teams.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Accounts</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>You must provide accurate and complete registration information</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You must notify us immediately of any unauthorized access</li>
              <li>You are responsible for all activities under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit malicious code or interfere with the Service</li>
              <li>Attempt to gain unauthorized access to systems</li>
              <li>Use the Service for any illegal or unauthorized purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Service and its original content, features, and functionality are owned by Cropxon Innovations Pvt. Ltd. and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Payment and Billing</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Paid plans are billed in advance on a monthly or annual basis</li>
              <li>All fees are non-refundable except as specified in our Refund Policy</li>
              <li>We reserve the right to modify pricing with 30 days notice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the maximum extent permitted by law, QUALYX and Cropxon Innovations Pvt. Ltd. shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may terminate or suspend your account at any time for violation of these Terms. Upon termination, your right to use the Service will cease immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these terms at any time. We will provide notice of significant changes via email or through the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms, contact us at legal@qualyx.com or visit{" "}
              <a href="https://cropxon.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">cropxon.com</a>
            </p>
          </section>
        </div>
      </div>
    </FeaturePageLayout>
  );
};

export default TermsOfService;
