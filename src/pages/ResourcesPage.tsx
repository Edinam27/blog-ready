
import { Helmet } from "react-helmet-async";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const products = [
  {
    category: "Blogging & Web Hosting",
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
        title: "Hostinger",
        description: "Lightning-fast web hosting tailored for small businesses. Features an incredibly intuitive control panel.",
        price: "Starts at $2.49/mo",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        url: "https://www.hostinger.com/", // Affiliate link
        ctaText: "Claim Offer"
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
      }
    ]
  },
  {
    category: "AI & Productivity Tools",
    items: [
      {
        title: "Grammarly",
        description: "Write mistake-free content with this AI-powered writing assistant. Essential for bloggers and content creators.",
        price: "Free / Premium",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        url: "https://www.grammarly.com/", // Affiliate link
        ctaText: "Try for Free"
      },
      {
        title: "Notion",
        description: "The all-in-one workspace for your notes, tasks, wikis, and databases. The ultimate productivity hub.",
        price: "Free / $8/mo",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        url: "https://www.notion.so/", // Affiliate link
        ctaText: "Organize Now",
        badge: "Must Have"
      },
      {
        title: "Jasper AI",
        description: "An incredibly powerful AI writing assistant designed specifically for marketers and bloggers to generate content fast.",
        price: "Starts at $39/mo",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        url: "https://www.jasper.ai/", // Affiliate link
        ctaText: "Start Free Trial"
      }
    ]
  },
  {
    category: "Digital Marketing & SEO",
    items: [
      {
        title: "ConvertKit",
        description: "The email marketing platform built for creators. Grow your audience and sell your products easily.",
        price: "Free up to 1k subs",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        url: "https://convertkit.com/", // Affiliate link
        ctaText: "Build Your List"
      },
      {
        title: "Semrush",
        description: "The ultimate all-in-one SEO tool. Conduct keyword research, track competitors, and optimize your blog's ranking.",
        price: "Starts at $129/mo",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        url: "https://www.semrush.com/", // Affiliate link
        ctaText: "Try Semrush Free",
        badge: "Industry Leader"
      },
      {
        title: "Canva Pro",
        description: "Design stunning graphics for your blog posts, Pinterest pins, and social media without any design skills.",
        price: "$12.99/mo",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        url: "https://www.canva.com/pro/", // Affiliate link
        ctaText: "Start Free Trial"
      }
    ]
  },
  {
    category: "Personal Finance & Wealth",
    items: [
      {
        title: "YNAB (You Need A Budget)",
        description: "The award-winning zero-based budgeting app that helps you gain total control over your personal finances.",
        price: "$14.99/mo",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        url: "https://www.youneedabudget.com/", // Affiliate link
        ctaText: "Start Budgeting",
        badge: "Life Changing"
      },
      {
        title: "Robinhood",
        description: "Commission-free investing in stocks, ETFs, options, and crypto. The easiest way to start your investing journey.",
        price: "Free",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        url: "https://robinhood.com/", // Affiliate link
        ctaText: "Claim Free Stock"
      },
      {
        title: "Wealthfront",
        description: "Automated robo-advisor investing. Set your risk tolerance and let their algorithms build and manage your portfolio.",
        price: "0.25% Advisory Fee",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        url: "https://www.wealthfront.com/", // Affiliate link
        ctaText: "Automate Wealth"
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
      },
      {
        title: "Skillshare",
        description: "Explore thousands of hands-on creative classes in illustration, photography, design, film, and more.",
        price: "Starts at $13.75/mo",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        url: "https://www.skillshare.com/", // Affiliate link
        ctaText: "Get 1 Month Free"
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
