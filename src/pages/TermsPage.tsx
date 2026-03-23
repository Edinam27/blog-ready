import { Helmet } from "react-helmet-async";

export default function TermsPage() {
  return (
    <div className="container py-12 md:py-20 max-w-4xl">
      <Helmet>
        <title>Terms of Service | Mordern Blog</title>
        <meta name="description" content="Terms of Service and conditions of use for Mordern Blog." />
      </Helmet>

      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>1. Terms</h2>
          <p>
            By accessing the website at mordernblog.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on Mordern Blog's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>attempt to decompile or reverse engineer any software contained on Mordern Blog's website;</li>
            <li>remove any copyright or other proprietary notations from the materials; or</li>
            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>

          <h2>3. Disclaimer</h2>
          <p>
            The materials on Mordern Blog's website are provided on an 'as is' basis. Mordern Blog makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
          <p>
            Furthermore, Mordern Blog does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site. Content provided, particularly in the realms of finance and investing, is for informational purposes only and should not be construed as professional financial advice.
          </p>

          <h2>4. Limitations</h2>
          <p>
            In no event shall Mordern Blog or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Mordern Blog's website, even if Mordern Blog or a Mordern Blog authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>

          <h2>5. Links</h2>
          <p>
            Mordern Blog has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Mordern Blog of the site. Use of any such linked website is at the user's own risk.
          </p>

          <h2>6. Modifications</h2>
          <p>
            Mordern Blog may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
          </p>
        </div>
      </div>
    </div>
  );
}
