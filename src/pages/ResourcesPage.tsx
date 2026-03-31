
import { Helmet } from "react-helmet-async";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const products = [
  {
    category: "Blogging & Tech Tools",
    items: [
      {
        title: "Bluehost",
        description: "Reliable and affordable web hosting perfect for starting a new blog. Includes a free domain for the first year.",
        price: "Starts at $2.95/mo",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        url: "https://www.bluehost.com/", // Affiliate link
        ctaText: "Get Started",
        badge: "Top Pick"
      },
      {
        title: "NordVPN",
        description: "Secure your internet connection and protect your privacy online with the world's leading VPN service.",
        price: "$3.49/mo",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        url: "https://nordvpn.com/", // Affiliate link
        ctaText: "Get 63% Off",
        badge: "Best Security"
      },
      {
        title: "Grammarly",
        description: "Write mistake-free content with this AI-powered writing assistant. Essential for bloggers and content creators.",
        price: "Free / Premium",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        url: "https://www.grammarly.com/", // Affiliate link
        ctaText: "Try for Free"
      }
    ]
  },
  {
    category: "Business & Productivity",
    items: [
      {
        title: "Canva Pro",
        description: "Design stunning graphics for your blog posts and social media without any design skills.",
        price: "$12.99/mo",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        url: "https://www.canva.com/pro/", // Affiliate link
        ctaText: "Start Free Trial"
      },
      {
        title: "ConvertKit",
        description: "The email marketing platform built for creators. Grow your audience and sell your products easily.",
        price: "Free up to 1k subs",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        url: "https://convertkit.com/", // Affiliate link
        ctaText: "Build Your List"
      }
    ]
  },
  {
    category: "Learning & Education",
    items: [
      {
        title: "Coursera",
        description: "Learn new skills from top universities and companies like Google, IBM, and Stanford.",
        price: "Varies",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        url: "https://www.coursera.org/", // Affiliate link
        ctaText: "Start Learning"
      },
      {
        title: "Udemy",
        description: "Choose from over 210,000 online video courses with new additions published every month.",
        price: "From $14.99",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        url: "https://www.udemy.com/", // Affiliate link
        ctaText: "Browse Courses"
      }
    ]
  }
];

export default function ResourcesPage() {
  return (
    <div className="container py-10">
      <Helmet>
        <title>Recommended Resources | Mordern Blog</title>
        <meta name="description" content="Discover our hand-picked, top recommended tools, platforms, and services designed to help bloggers, entrepreneurs, and lifelong learners succeed online." />
      </Helmet>
      
      <motion.div 
        className="mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Recommended Resources
        </h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
          We've curated a list of the best tools and services to help you grow your business, improve your skills, and stay productive.
        </p>
      </motion.div>

      <div className="space-y-16">
        {products.map((section, idx) => (
          <motion.section 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold">{section.category}</h2>
              <div className="h-px flex-1 bg-border" />
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <ProductCard {...item} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
      
      <motion.div 
        className="mt-16 rounded-xl bg-muted p-8 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-xl font-semibold mb-2">Affiliate Disclosure</h3>
        <p className="text-muted-foreground">
          Some of the links on this page are affiliate links. This means if you click on the link and purchase the item, we may receive an affiliate commission at no extra cost to you. We only recommend products and services we trust.
        </p>
      </motion.div>
    </div>
  );
}
