import { SEOHead } from "@/components/SEOHead";
import { FeaturePageLayout } from "@/components/FeaturePageLayout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const DataPolicy = () => {
  return (
    <FeaturePageLayout>
      <SEOHead
        title="Data Policy | QUALYX - Autonomous QA-as-a-Service"
        description="QUALYX Data Policy. Learn how we handle, process, and protect your data."
        canonicalPath="/data-policy"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-foreground mb-8">Data Policy</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <p className="text-muted-foreground">
            <strong>Last Updated:</strong> January 9, 2025
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Data We Process</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              QUALYX processes the following types of data to provide our QA automation services:
            </p>
            
            <h3 className="text-xl font-medium text-foreground mt-4 mb-2">Test Data</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Test scripts and configurations</li>
              <li>Test execution results and logs</li>
              <li>Session recordings and screenshots</li>
              <li>Application URLs and endpoints</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mt-4 mb-2">Account Data</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>User profiles and preferences</li>
              <li>Organization and team information</li>
              <li>Billing and subscription data</li>
              <li>Integration configurations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Data Storage</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your data is stored securely in our cloud infrastructure with the following protections:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>AES-256 encryption at rest</li>
              <li>TLS 1.3 encryption in transit</li>
              <li>Geographically distributed backups</li>
              <li>99.99% uptime SLA</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Data Isolation</h2>
            <p className="text-muted-foreground leading-relaxed">
              Each organization's data is logically isolated. We implement:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Tenant-level data separation</li>
              <li>Role-based access controls</li>
              <li>Audit logging for all data access</li>
              <li>Automatic session expiration</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Hybrid Execution Data</h2>
            <p className="text-muted-foreground leading-relaxed">
              When using our hybrid execution feature:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Test data is processed on your infrastructure</li>
              <li>Only metadata is sent to our cloud</li>
              <li>Session recordings remain on-premise (optional)</li>
              <li>You maintain full control over sensitive data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Retention</h2>
            <table className="w-full border-collapse mt-4">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground">Data Type</th>
                  <th className="text-left py-2 text-foreground">Retention Period</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-2">Test Results</td>
                  <td className="py-2">90 days (configurable)</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2">Session Recordings</td>
                  <td className="py-2">30 days (configurable)</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2">Audit Logs</td>
                  <td className="py-2">1 year</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2">Account Data</td>
                  <td className="py-2">Duration of service + 30 days</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Data Export & Deletion</h2>
            <p className="text-muted-foreground leading-relaxed">
              You can export or delete your data at any time:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Export: Available in JSON, CSV, or XML formats</li>
              <li>Deletion: Complete removal within 30 days of request</li>
              <li>Right to be forgotten: GDPR-compliant data erasure</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Compliance</h2>
            <p className="text-muted-foreground leading-relaxed">
              QUALYX is designed to help you meet compliance requirements:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>SOC 2 Type II certified</li>
              <li>GDPR compliant</li>
              <li>CCPA compliant</li>
              <li>ISO 27001 aligned</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For data-related inquiries:<br />
              <strong>Email:</strong> data@qualyx.com<br />
              <strong>DPO:</strong> dpo@qualyx.com<br />
              <strong>Company:</strong> Cropxon Innovations Pvt. Ltd.
            </p>
          </section>
        </div>
      </div>
    </FeaturePageLayout>
  );
};

export default DataPolicy;
