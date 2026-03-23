import { Helmet } from "react-helmet-async";

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-12 md:py-20 max-w-4xl">
      <Helmet>
        <title>Privacy Policy | Mordern Blog</title>
        <meta name="description" content="Privacy Policy for Mordern Blog. Learn how we collect, use, and protect your data." />
      </Helmet>

      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            At Mordern Blog, accessible from mordernblog.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Mordern Blog and how we use it.
          </p>

          <h2>1. Information We Collect</h2>
          <p>We collect several different types of information for various purposes to provide and improve our Service to you:</p>
          <ul>
            <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you, such as your email address (e.g., when subscribing to our newsletter).</li>
            <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used. This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.</li>
            <li><strong>Cookies and Tracking Data:</strong> We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>Mordern Blog uses the collected data for various purposes:</p>
          <ul>
            <li>To provide and maintain our website</li>
            <li>To notify you about changes to our website</li>
            <li>To allow you to participate in interactive features of our website when you choose to do so</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our website</li>
            <li>To monitor the usage of our website</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>

          <h2>3. Third-Party Advertising (Google AdSense)</h2>
          <p>
            We use third-party advertising companies, including Google, to serve ads when you visit our website. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
          </p>
          <p>
            Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of the DART cookie enables it to serve ads to our users based on their visit to our sites and other sites on the Internet. Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy.
          </p>

          <h2>4. Affiliate Links</h2>
          <p>
            Some of the links on Mordern Blog are "affiliate links", a link with a special tracking code. This means if you click on an affiliate link and purchase the item, we will receive an affiliate commission. The price of the item is the same whether it is an affiliate link or not. Regardless, we only recommend products or services we believe will add value to our readers.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at hello@mordernblog.com.
          </p>
        </div>
      </div>
    </div>
  );
}
