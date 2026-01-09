import { SEOHead } from "@/components/SEOHead";
import { FeaturePageLayout } from "@/components/FeaturePageLayout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const RefundPolicy = () => {
  return (
    <FeaturePageLayout>
      <SEOHead
        title="Refund Policy | QUALYX - Autonomous QA-as-a-Service"
        description="QUALYX Refund Policy. Learn about our refund and cancellation policies."
        canonicalPath="/refund-policy"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-foreground mb-8">Refund Policy</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <p className="text-muted-foreground">
            <strong>Last Updated:</strong> January 9, 2025
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. 30-Day Money-Back Guarantee</h2>
            <p className="text-muted-foreground leading-relaxed">
              We offer a 30-day money-back guarantee for all new subscriptions. If you're not satisfied with QUALYX within the first 30 days of your subscription, we'll provide a full refund, no questions asked.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Eligibility for Refunds</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>First-time subscribers within 30 days of initial purchase</li>
              <li>Annual plans may be refunded within 30 days (prorated after 30 days)</li>
              <li>Service issues caused by platform errors or outages</li>
              <li>Duplicate charges or billing errors</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Non-Refundable Items</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Add-on services and one-time purchases</li>
              <li>Refund requests made after 30 days (monthly plans)</li>
              <li>Accounts terminated for Terms of Service violations</li>
              <li>Usage-based charges already consumed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. How to Request a Refund</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">To request a refund:</p>
            <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
              <li>Email billing@qualyx.com with your account details</li>
              <li>Include your reason for requesting a refund</li>
              <li>Allow 3-5 business days for processing</li>
              <li>Refunds are credited to the original payment method</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Cancellation Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              You may cancel your subscription at any time. Upon cancellation:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Access continues until the end of your billing period</li>
              <li>No refunds for partial months on monthly plans</li>
              <li>Annual plans may receive prorated refunds based on remaining months</li>
              <li>Data export is available for 30 days after cancellation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              For billing questions or refund requests:<br />
              <strong>Email:</strong> billing@qualyx.com<br />
              <strong>Company:</strong> Cropxon Innovations Pvt. Ltd.
            </p>
          </section>
        </div>
      </div>
    </FeaturePageLayout>
  );
};

export default RefundPolicy;
