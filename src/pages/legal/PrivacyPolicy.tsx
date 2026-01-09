import { SEOHead } from "@/components/SEOHead";
import { FeaturePageLayout } from "@/components/FeaturePageLayout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <FeaturePageLayout>
      <SEOHead
        title="Privacy Policy | QUALYX - Autonomous QA-as-a-Service"
        description="QUALYX Privacy Policy. Learn how we collect, use, and protect your personal information."
        canonicalPath="/privacy"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <p className="text-muted-foreground">
            <strong>Last Updated:</strong> January 9, 2025
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              QUALYX, a product of Cropxon Innovations Pvt. Ltd. ("we," "our," or "us"), is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our autonomous QA-as-a-Service platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-medium text-foreground mt-4 mb-2">Personal Information</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Name and email address</li>
              <li>Company name and role</li>
              <li>Team size and contact information</li>
              <li>Payment and billing information</li>
            </ul>
            
            <h3 className="text-xl font-medium text-foreground mt-4 mb-2">Usage Information</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Test execution data and analytics</li>
              <li>Platform usage patterns</li>
              <li>Device and browser information</li>
              <li>IP addresses and location data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>To provide and maintain our services</li>
              <li>To process your transactions</li>
              <li>To send administrative information</li>
              <li>To improve our platform and develop new features</li>
              <li>To respond to your inquiries and provide support</li>
              <li>To send marketing communications (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information, including encryption, access controls, and regular security assessments. Our platform is SOC 2 Type II compliant.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Access to your personal data</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your data</li>
              <li>Objection to data processing</li>
              <li>Data portability</li>
              <li>Withdrawal of consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-muted-foreground mt-2">
              <strong>Email:</strong> privacy@qualyx.com<br />
              <strong>Company:</strong> Cropxon Innovations Pvt. Ltd.<br />
              <strong>Website:</strong> <a href="https://cropxon.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">cropxon.com</a>
            </p>
          </section>
        </div>
      </div>
    </FeaturePageLayout>
  );
};

export default PrivacyPolicy;
