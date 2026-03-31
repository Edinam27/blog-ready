import { Helmet } from "react-helmet-async";

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-20 max-w-4xl">
      <Helmet>
        <title>About Us | Mordern Blog</title>
        <meta name="description" content="Learn about the mission, values, and editorial standards behind Mordern Blog. We are dedicated to providing readers with high-quality, actionable insights across technology, finance, and digital marketing." />
      </Helmet>

      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">About Mordern Blog</h1>
          <p className="text-xl text-muted-foreground">
            Empowering curious minds with insights that matter.
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            Welcome to <strong>Mordern Blog</strong>, your premier destination for high-quality, actionable content across technology, personal finance, digital marketing, education, and lifestyle.
          </p>

          <h2>Our Mission</h2>
          <p>
            In a digital world overflowing with noise, our mission is simple: to cut through the clutter and provide you with clear, accurate, and deeply researched information. We believe that knowledge is the ultimate equalizer, and our goal is to equip our readers with the tools they need to navigate the modern world successfully.
          </p>

          <h2>What We Cover</h2>
          <ul>
            <li><strong>AI, Tools & Tech:</strong> Staying ahead of the curve in a rapidly evolving technological landscape.</li>
            <li><strong>Personal Finance:</strong> Actionable advice to help you build wealth, manage debt, and secure your financial future.</li>
            <li><strong>Digital Marketing:</strong> Strategies for creators and businesses to grow their audience.</li>
            <li><strong>Education & Lifestyle:</strong> Insights on lifelong learning, productivity, and maintaining a balanced life.</li>
          </ul>

          <h2>Editorial Standards</h2>
          <p>
            We pride ourselves on our editorial integrity. Every article published on Mordern Blog goes through a rigorous review process. We rely on data-backed research, expert interviews, and practical experience to ensure that the content you consume is both trustworthy and highly relevant.
          </p>

          <h2>Join Our Community</h2>
          <p>
            Mordern Blog is more than just a website; it's a community of forward-thinkers. We invite you to engage with our content, share your perspectives, and join us on this journey of continuous learning.
          </p>
        </div>
      </div>
    </div>
  );
}
