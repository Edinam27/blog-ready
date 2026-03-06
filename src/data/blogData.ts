
export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  images?: string[];
  date: string;
  author: Author;
  category: Category;
  tags: string[];
  isTrending: boolean;
  isFeatured: boolean;
  readTime: number;
  views: number;
}

export const authors: Author[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "John is a tech enthusiast and writer with over 10 years of experience in the industry."
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Jane is a lifestyle blogger who loves to share her experiences and insights."
  },
  {
    id: "3",
    name: "David Wilson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "David writes about business trends and entrepreneurship based on his experience as a startup founder."
  }
];

export const categories: Category[] = [
  {
    id: "1",
    name: "Technology",
    slug: "technology"
  },
  {
    id: "2",
    name: "Business",
    slug: "business"
  },
  {
    id: "3",
    name: "Lifestyle",
    slug: "lifestyle"
  },
  {
    id: "4",
    name: "Education",
    slug: "education"
  },
  {
    id: "5",
    name: "News",
    slug: "news"
  }
];

export const posts: Post[] = [
  {
    id: "new-3",
    title: "The Ultimate Guide to Building a Productivity Tech Stack in 2026",
    slug: "ultimate-guide-productivity-tech-stack-2026",
    excerpt: "Discover the essential tools and strategies to optimize your workflow and boost productivity in the digital age.",
    content: `
      # The Ultimate Guide to Building a Productivity Tech Stack in 2026

      In the fast-paced digital world of 2026, having the right set of tools is crucial for maintaining efficiency and staying ahead of the curve. Whether you're a freelancer, a remote worker, or leading a team, building a robust productivity tech stack can transform the way you work.

      ## What is a Productivity Tech Stack?

      A productivity tech stack is a collection of software and applications that work together to streamline your workflow, enhance communication, and automate repetitive tasks. The goal is to create a seamless ecosystem where information flows freely and distractions are minimized.

      ## 1. Project Management: The Central Hub

      Your project management tool is the backbone of your productivity system. In 2026, tools like **Notion** and **ClickUp** have evolved into all-in-one workspaces.

      - **Notion**: Perfect for those who love customization. It combines notes, databases, and wikis into a single platform.
      - **ClickUp**: Ideal for teams needing robust task management, time tracking, and goal setting features.

      ## 2. Communication: Staying Connected

      Effective communication is key, especially for distributed teams.

      - **Slack**: Remains the industry standard for real-time messaging, with enhanced AI features for summarizing threads.
      - **Microsoft Teams**: A powerhouse for organizations deeply integrated into the Microsoft ecosystem.

      ## 3. Time Management and Focus

      Understanding how you spend your time is the first step to improving it.

      - **Toggl Track**: Simple yet powerful time tracking to identify productivity leaks.
      - **Forest**: Gamifies your focus sessions, helping you stay off your phone and plant real trees.

      ## 4. Knowledge Management: Building a Second Brain

      Don't rely on your memory alone. Tools for "Personal Knowledge Management" (PKM) are essential.

      - **Obsidian**: A local-first markdown note-taking app that links your thoughts together.
      - **Roam Research**: Great for networked thought and bi-directional linking.

      ## 5. Automation: Working Smarter

      Connect your apps and automate mundane tasks to save hours every week.

      - **Zapier**: The glue that connects thousands of web apps.
      - **Make (formerly Integromat)**: Offers more complex visual workflows for advanced automation users.

      ## Conclusion

      Building the ultimate productivity tech stack is a personal journey. Start by identifying your specific needs and pain points. Experiment with different tools, but remember: the best tool is the one you actually use.

      By curating a stack that works for you, you can reclaim your time, reduce stress, and achieve your goals with greater ease in 2026.
    `,
    coverImage: "/images/modern-productivity.png",
    date: "2026-03-06",
    author: authors[0],
    category: categories[0],
    tags: ["Productivity", "Tech Stack", "Remote Work", "Efficiency"],
    isTrending: true,
    isFeatured: true,
    readTime: 7,
    views: 850
  },
  {
    id: "new-1",
    title: "Ghana Marks 69th Independence Day: Digital Future and Economic Resilience",
    slug: "ghana-69th-independence-day-digital-future",
    excerpt: "As Ghana celebrates its 69th Independence Day, the nation highlights its digital transformation, inflation drop, and future economic resilience.",
    content: `
      # Ghana Marks 69th Independence Day: Digital Future and Economic Resilience

      Today, Ghana celebrates its 69th Independence Day with a renewed focus on national values, accountability, and digital transformation. In a timeline marked by resilience, the nation is observing this significant milestone under the theme of "Harnessing Digital Opportunities for National Development."

      ## A Call for Values and Accountability

      President Mahama, addressing the nation at the independence parade, emphasized that Ghana's "reset" must begin with a return to core values and strict accountability. He described corruption as a "cancer" that undermines development and called for a united front to combat it. The President's speech resonated with many, as he highlighted that wealth acquired through dubious means is a curse to the nation.

      ## Economic Milestones: Inflation Drops

      On the economic front, there is cause for cautious optimism. Reports indicate that Ghana has recorded its 14th straight drop in inflation, signaling a stabilizing economy. This positive trend is a relief to citizens and businesses alike, offering a glimmer of hope for a more robust economic future.

      ## Digital Transformation: 5G and Beyond

      A major highlight of the celebrations is the focus on technology. The National Communications Authority (NCA) has moved to scrap the exclusivity of the Next Gen Infraco (NGIC) 5G license. This policy shift is expected to open up the market, fostering competition and accelerating the deployment of high-speed internet across the country.

      "Harnessing digital opportunities is not just a choice but a necessity for our future," the President noted. With new agreements signed under the Accra Reset initiative, Ghana is positioning itself as a digital hub in West Africa.

      ## Infrastructure and Social Developments

      In other news, the Electricity Company of Ghana (ECG) has embarked on a major transformer upgrade to stabilize power in key areas like Adenta. Meanwhile, on the sports front, the Confederation of African Football (CAF) has pushed the 2026 Women's Africa Cup of Nations (WAFCON) to July, giving Ghana more time to prepare for the continental showpiece.

      As the flags wave and the anthem plays today, the mood is one of reflection and determination. Ghana at 69 is a nation aware of its challenges but boldly stepping into a digital and economically resilient future.
    `,
    coverImage: "https://images.unsplash.com/photo-1543167123-0852026219c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80",
    date: "2026-03-06",
    author: authors[2],
    category: categories[4],
    tags: ["Ghana", "Independence Day", "Economy", "Technology", "5G"],
    isTrending: true,
    isFeatured: true,
    readTime: 5,
    views: 1500
  },
  {
    id: "new-2",
    title: "Global Tensions Escalate: Middle East Crisis and AI Warfare Concerns",
    slug: "global-tensions-middle-east-ai-warfare",
    excerpt: "World leaders express concern over the escalating conflict in the Middle East and the growing role of AI in military decision-making.",
    content: `
      # Global Tensions Escalate: Middle East Crisis and AI Warfare Concerns

      The world wakes up to a volatile geopolitical landscape today, March 6, 2026. Escalating conflicts in the Middle East and the rising influence of Artificial Intelligence (AI) in warfare are dominating global headlines.

      ## Middle East Conflict Intensifies

      Reports confirm intensified military actions in the Middle East, with "Operation Epic Fury" involving significant airstrikes. The situation remains fluid, with global powers urging restraint. The conflict has already had ripple effects on global logistics, with major shipping giant Maersk suspending services to the region due to safety concerns.

      The humanitarian impact is also severe, with the UN warning of worsening conditions in conflict zones. The international community is scrambling for diplomatic solutions, but the path to peace remains uncertain.

      ## The AI Arms Race and Nuclear Decision Making

      In a chilling development, a new UN report highlights the "Impact of Artificial Intelligence in Nuclear Decision-Making." As AI systems become more integrated into military command and control structures, experts are raising alarms about the risks of algorithmic errors leading to unintended escalation.

      "The potential militarization of AI threatens to dominate every aspect of our lives," warns the report. The debate over autonomous weapons systems is no longer theoretical; it is a pressing reality that demands immediate global regulation.

      ## Tech Policy Shifts: Social Media Bans

      On a different tech front, the Indian state of Karnataka has taken a bold step by banning social media for anyone under the age of 16. This move joins a growing global trend of restricting minor's access to digital platforms, sparking a worldwide debate on digital rights, mental health, and parental control.

      ## Conclusion

      From the battlefields of the Middle East to the digital frontiers of AI and social media regulation, March 6, 2026, marks a pivotal moment in history. As technology and conflict intersect in unprecedented ways, the need for wise leadership and ethical frameworks has never been more critical.
    `,
    coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80",
    date: "2026-03-06",
    author: authors[0],
    category: categories[4],
    tags: ["Global News", "AI", "Middle East", "Conflict", "Technology"],
    isTrending: true,
    isFeatured: true,
    readTime: 6,
    views: 2300
  },
  {
    id: "1",
    title: "The Future of Artificial Intelligence",
    slug: "future-of-artificial-intelligence",
    excerpt: "Exploring the latest trends and innovations in artificial intelligence and its impact on various industries.",
    content: `
      # The Future of Artificial Intelligence

      Artificial Intelligence (AI) continues to be one of the most transformative technologies of our time. As we move forward, AI is expected to play an increasingly important role in shaping various aspects of our society, from healthcare and education to transportation and entertainment.

      ## Current Trends in AI

      Several trends are currently dominating the AI landscape:

      1. **Machine Learning Advancements**: With the development of more sophisticated algorithms and increased computational power, machine learning models are becoming more accurate and efficient.
      
      2. **Natural Language Processing (NLP)**: Recent breakthroughs in NLP have enabled systems like GPT-4 to understand and generate human-like text, opening up new possibilities for communication between humans and machines.
      
      3. **Computer Vision**: AI systems are now capable of interpreting and understanding visual data with remarkable accuracy, leading to applications in fields like autonomous driving, medical imaging, and security.

      ## Impact on Industries

      AI is revolutionizing various industries:

      ### Healthcare
      
      In healthcare, AI is being used for early disease detection, drug discovery, and personalized treatment plans. Machine learning algorithms can analyze medical images like X-rays and MRIs to identify patterns that might be missed by the human eye.

      ### Education
      
      AI-powered educational tools can provide personalized learning experiences, adapting to each student's strengths and weaknesses. Virtual tutors can offer immediate feedback and support, making quality education more accessible.

      ### Transportation
      
      Self-driving cars represent one of the most visible applications of AI in transportation. These vehicles use a combination of sensors, cameras, and AI algorithms to navigate roads, potentially reducing accidents and traffic congestion.

      ## Ethical Considerations

      As AI becomes more integrated into our daily lives, important ethical questions arise:

      - **Privacy**: How do we balance the benefits of data-driven AI with individuals' right to privacy?
      - **Bias**: How can we ensure that AI systems are fair and don't perpetuate existing biases?
      - **Autonomy**: As AI systems become more capable of making decisions, how do we ensure that humans maintain appropriate control?

      ## Conclusion

      The future of AI holds tremendous potential for improving our lives and solving complex problems. However, realizing this potential will require thoughtful implementation, robust ethical frameworks, and ongoing dialogue between technologists, policymakers, and the public.

      As we navigate this rapidly evolving landscape, it's crucial to approach AI development with both excitement about its possibilities and mindfulness about its implications.
    `,
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80",
    date: "2023-05-15",
    author: authors[0],
    category: categories[0],
    tags: ["AI", "Technology", "Future", "Machine Learning"],
    isTrending: true,
    isFeatured: true,
    readTime: 8,
    views: 1250
  },
  {
    id: "2",
    title: "10 Strategies for Business Growth in 2023",
    slug: "strategies-for-business-growth-2023",
    excerpt: "Learn effective strategies to grow your business in the current economic landscape and stay ahead of competitors.",
    content: `
      # 10 Strategies for Business Growth in 2023

      In today's rapidly evolving business landscape, companies need to adopt innovative strategies to maintain growth and stay competitive. Here are ten effective approaches for business growth in 2023.

      ## 1. Embrace Digital Transformation

      Digital transformation is no longer optional. Businesses must integrate digital technologies into all areas of their operations to fundamentally change how they operate and deliver value to customers.

      ## 2. Focus on Customer Experience

      Customer experience has become a key differentiator. Companies that provide exceptional, personalized experiences can build stronger customer loyalty and increase retention rates.

      ## 3. Adopt Data-Driven Decision Making

      Leveraging data analytics can provide valuable insights for making informed business decisions. By analyzing customer behavior, market trends, and operational metrics, businesses can identify growth opportunities and optimize processes.

      ## 4. Explore New Markets

      Expanding into new geographic markets or targeting new customer segments can open up additional revenue streams. Conduct thorough market research to identify untapped opportunities that align with your business strengths.

      ## 5. Build Strategic Partnerships

      Collaborating with complementary businesses can help you reach new audiences, share resources, and create innovative offerings that wouldn't be possible alone.

      ## 6. Invest in Employee Development

      Your workforce is your greatest asset. Investing in employee training and development not only improves productivity but also increases retention and attracts top talent.

      ## 7. Optimize Your Supply Chain

      Supply chain resilience has become crucial in recent years. Businesses should focus on building more flexible, transparent, and efficient supply chains to mitigate disruptions.

      ## 8. Implement Sustainable Practices

      Sustainability is increasingly important to consumers and investors alike. Adopting environmentally friendly practices can enhance your brand reputation and appeal to conscious consumers.

      ## 9. Leverage Social Media Marketing

      Social media platforms continue to evolve as powerful marketing channels. Developing a strategic social media presence can boost brand awareness, engage customers, and drive sales.

      ## 10. Stay Agile and Adaptable

      The ability to quickly adapt to changing market conditions is essential. Foster a culture of innovation and agility that allows your business to pivot when necessary and capitalize on emerging opportunities.

      ## Conclusion

      Implementing these strategies requires careful planning and execution. Start by assessing your current business position, identifying your most pressing challenges and opportunities, and then prioritizing which strategies will deliver the greatest impact for your specific situation.

      Remember that sustainable growth is a marathon, not a sprint. Focus on building strong foundations that will support your business's growth trajectory for years to come.
    `,
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2426&q=80",
    date: "2023-04-22",
    author: authors[2],
    category: categories[1],
    tags: ["Business", "Growth", "Strategy", "Innovation"],
    isTrending: true,
    isFeatured: false,
    readTime: 6,
    views: 980
  },
  {
    id: "3",
    title: "Mindfulness Practices for Better Work-Life Balance",
    slug: "mindfulness-practices-for-better-work-life-balance",
    excerpt: "Discover effective mindfulness techniques to improve your work-life balance and reduce stress in today's fast-paced world.",
    content: `
      # Mindfulness Practices for Better Work-Life Balance

      In today's fast-paced, always-connected world, achieving a healthy work-life balance can seem like an impossible task. However, incorporating mindfulness practices into your daily routine can help you manage stress, increase productivity, and improve your overall well-being.

      ## Understanding Mindfulness

      Mindfulness is the practice of being fully present and engaged in the moment, aware of your thoughts and feelings without judgment. It involves paying attention to your experiences as they unfold, moment by moment.

      ## Benefits of Mindfulness for Work-Life Balance

      Research has shown that regular mindfulness practice can:

      - Reduce stress and anxiety
      - Improve focus and concentration
      - Enhance emotional regulation
      - Boost creativity and problem-solving abilities
      - Improve relationships and communication
      - Increase resilience to challenges

      ## Simple Mindfulness Practices for Daily Life

      ### 1. Mindful Breathing (5-5-5 Technique)

      Take five minutes in the morning, midday, and evening to focus on your breath:
      
      - Inhale deeply for a count of five
      - Hold for a count of five
      - Exhale slowly for a count of five
      - Repeat for five minutes

      ### 2. Body Scan Meditation

      This practice involves systematically bringing attention to different parts of your body, from head to toe, noticing any sensations without trying to change them.

      ### 3. Mindful Transitions

      Instead of immediately jumping between tasks, take a moment to pause, breathe, and set an intention for your next activity.

      ### 4. Digital Boundaries

      Create specific times when you're offline and fully present with yourself or loved ones. This might include:
      
      - No phones at the dinner table
      - Tech-free hours before bedtime
      - Email-free weekends or evenings

      ### 5. Mindful Listening

      Practice giving your full attention when others are speaking, without planning your response or being distracted by your own thoughts.

      ## Incorporating Mindfulness at Work

      - Start meetings with a minute of silence to help everyone get present
      - Take short mindful breaks between tasks
      - Practice single-tasking rather than multitasking
      - Create a mindful workspace with minimal distractions

      ## Building a Sustainable Practice

      Start small with just a few minutes of mindfulness each day, gradually increasing as it becomes part of your routine. Remember that mindfulness is a skill that develops with practice.

      ## Conclusion

      Mindfulness isn't about adding one more thing to your busy schedule—it's about approaching your existing activities with greater awareness and intention. By incorporating these simple practices into your daily life, you can cultivate a more balanced relationship between work and personal time, leading to greater satisfaction in both areas.
    `,
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=2702&q=80",
    date: "2023-06-03",
    author: authors[1],
    category: categories[2],
    tags: ["Mindfulness", "Work-Life Balance", "Mental Health", "Wellness"],
    isTrending: false,
    isFeatured: true,
    readTime: 5,
    views: 756
  },
  {
    id: "4",
    title: "Modern Approaches to Online Learning",
    slug: "modern-approaches-to-online-learning",
    excerpt: "Explore innovative methods and technologies that are transforming the landscape of online education and e-learning.",
    content: `
      # Modern Approaches to Online Learning

      The landscape of education has been dramatically transformed by digital technologies, offering new opportunities for learning beyond traditional classroom settings. This article explores modern approaches to online learning that are making education more accessible, engaging, and effective.

      ## The Evolution of Online Learning

      Online learning has evolved significantly from its early days of simple video lectures and PDF documents. Today's e-learning environments incorporate interactive elements, collaborative tools, adaptive technologies, and immersive experiences that cater to diverse learning styles and needs.

      ## Key Trends in Modern Online Education

      ### 1. Microlearning

      Breaking content into small, focused segments that can be consumed in 5-10 minutes makes learning more manageable and improves retention. This approach is particularly effective for skills-based training and is compatible with mobile learning.

      ### 2. Adaptive Learning Systems

      These platforms use AI to personalize the learning experience based on a student's performance, preferences, and goals. They can identify knowledge gaps, adjust difficulty levels, and recommend appropriate resources.

      ### 3. Gamification

      Incorporating game elements such as points, badges, leaderboards, and challenges increases engagement and motivation. When thoughtfully implemented, gamification can transform mundane learning tasks into enjoyable activities.

      ### 4. Social Learning

      Online forums, collaborative projects, and peer feedback systems foster community and provide opportunities for students to learn from one another. These social elements help combat the isolation that can sometimes accompany online learning.

      ### 5. Immersive Technologies

      Virtual reality (VR) and augmented reality (AR) create immersive learning experiences that would be impossible or impractical in traditional settings. For example, medical students can practice surgical procedures, or history students can "visit" ancient civilizations.

      ## Effective Implementation Strategies

      ### Focus on Learning Objectives

      Technology should serve clear educational goals rather than being implemented for its own sake. Always start with what students need to learn and then select appropriate tools.

      ### Prioritize User Experience

      A confusing or frustrating interface can derail even the best educational content. Invest in intuitive design and provide adequate technical support.

      ### Encourage Active Learning

      Design activities that require students to think critically, solve problems, and apply concepts rather than passively consuming information.

      ### Provide Meaningful Feedback

      Regular, specific feedback helps students understand their progress and areas for improvement. Automated assessments can provide immediate feedback, while instructor comments offer deeper insights.

      ### Support Different Learning Styles

      Offer content in multiple formats (text, audio, video, interactive) to accommodate various preferences and learning needs.

      ## Challenges and Considerations

      - **Digital Divide**: Access to technology and high-speed internet remains unequal, potentially exacerbating educational disparities.
      - **Assessment Integrity**: Online environments present unique challenges for ensuring academic honesty.
      - **Screen Fatigue**: Extended screen time can lead to mental and physical exhaustion.
      - **Maintaining Engagement**: Without face-to-face interaction, keeping students motivated requires intentional design.

      ## Conclusion

      Modern approaches to online learning offer exciting possibilities for making education more personalized, engaging, and accessible. By thoughtfully implementing these strategies and technologies while addressing potential challenges, educators and institutions can create effective learning experiences that prepare students for success in an increasingly digital world.
    `,
    coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2751&q=80",
    date: "2023-05-28",
    author: authors[0],
    category: categories[3],
    tags: ["Education", "E-Learning", "EdTech", "Online Courses"],
    isTrending: true,
    isFeatured: false,
    readTime: 7,
    views: 890
  },
  {
    id: "5",
    title: "Sustainable Fashion: Beyond the Trends",
    slug: "sustainable-fashion-beyond-trends",
    excerpt: "An in-depth look at how sustainable practices are reshaping the fashion industry and how consumers can make more eco-friendly choices.",
    content: `
      # Sustainable Fashion: Beyond the Trends

      In recent years, sustainable fashion has emerged from niche markets to become a significant force in the industry. This shift reflects growing awareness of fashion's environmental impact and consumer demand for more ethical practices. However, true sustainability goes beyond marketing buzzwords and temporary trends.

      ## The Environmental Cost of Fashion

      The conventional fashion industry is one of the world's largest polluters:

      - **Water Consumption**: It takes approximately 2,700 liters of water to produce one cotton t-shirt—enough water for one person to drink for 2.5 years.
      
      - **Chemical Pollution**: Textile dyeing is the second largest water polluter globally, with many chemicals used being toxic and non-biodegradable.
      
      - **Waste Generation**: The average American throws away about 81 pounds of clothing each year, with the majority ending up in landfills.
      
      - **Carbon Emissions**: The fashion industry produces 10% of global carbon emissions—more than international flights and maritime shipping combined.

      ## What Makes Fashion Sustainable?

      Sustainable fashion encompasses several interconnected aspects:

      ### Environmental Sustainability

      - **Materials**: Using organic, recycled, or low-impact materials that minimize resource use and pollution
      - **Production Processes**: Reducing water, energy, and chemical use in manufacturing
      - **Waste Management**: Implementing zero-waste design and recycling programs
      - **Carbon Footprint**: Reducing emissions throughout the supply chain

      ### Social Sustainability

      - **Fair Labor Practices**: Ensuring safe working conditions and fair wages
      - **Artisan Support**: Preserving traditional crafts and providing sustainable livelihoods
      - **Transparency**: Sharing information about where and how products are made

      ### Economic Sustainability

      - **Quality Over Quantity**: Creating durable products that last longer
      - **Circular Business Models**: Rental, resale, and repair services that extend product life
      - **Local Production**: Supporting local economies and reducing transport emissions

      ## Beyond Greenwashing

      As sustainability becomes marketable, many brands engage in "greenwashing"—making misleading claims about their environmental practices. To identify truly sustainable options:

      - Look for specific details rather than vague claims
      - Check for credible third-party certifications (e.g., GOTS, Fair Trade, B Corp)
      - Research a brand's overall business practices, not just their "eco" collections
      - Consider a company's transparency about their supply chain

      ## Building a Sustainable Wardrobe

      ### 1. Buy Less, Choose Well

      The most sustainable garment is the one already in your closet. Before purchasing, ask:
      - Do I need this item?
      - Will it integrate well with my existing wardrobe?
      - Is it made to last?

      ### 2. Research Brands and Materials

      Different materials have different environmental impacts. Generally:
      - Organic natural fibers (cotton, hemp, linen) are better than conventional ones
      - Recycled synthetics are better than virgin synthetics
      - Semi-synthetic fibers like viscose/rayon vary greatly in sustainability

      ### 3. Explore Alternative Models

      - Second-hand shopping (thrift, vintage, online platforms)
      - Clothing rental services for occasional-wear items
      - Clothing swaps with friends and community
      - DIY and upcycling projects

      ### 4. Care for Clothes Properly

      - Wash less frequently and at lower temperatures
      - Line dry when possible
      - Repair items rather than replacing them
      - Dispose responsibly through donation, recycling, or textile collection programs

      ## The Future of Fashion

      The industry is gradually embracing innovation:

      - **Material Innovation**: Development of fibers from agricultural waste, algae, mushrooms, and lab-grown alternatives
      - **Digital Design**: 3D design tools reducing sample waste
      - **On-Demand Manufacturing**: Reducing overproduction by making items when ordered
      - **Blockchain Technology**: Improving supply chain transparency

      ## Conclusion

      Sustainable fashion is not just about eco-friendly materials—it's a comprehensive approach that considers environmental impact, social responsibility, and economic viability throughout a product's lifecycle. By making mindful choices as consumers and demanding better practices from brands, we can collectively transform the fashion industry into a force for positive change.
    `,
    coverImage: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80",
    date: "2023-06-10",
    author: authors[1],
    category: categories[2],
    tags: ["Fashion", "Sustainability", "Ethical Fashion", "Environment"],
    isTrending: false,
    isFeatured: true,
    readTime: 9,
    views: 620
  },
  {
    id: "6",
    title: "Web3 and the Future of the Internet",
    slug: "web3-and-the-future-of-the-internet",
    excerpt: "Understanding Web3, blockchain technology, and how they might reshape our digital experiences and online interactions.",
    content: `
      # Web3 and the Future of the Internet

      The internet has evolved significantly since its inception, moving from static web pages (Web1) to interactive platforms dominated by tech giants (Web2). Now, a new vision for the internet—Web3—promises to reshape our digital interactions through decentralization, blockchain technology, and user ownership.

      ## What is Web3?

      Web3 represents the next iteration of the internet, built on decentralized protocols and blockchain technology. Unlike the current internet dominated by large centralized services, Web3 envisions a web where users control their data, digital assets, and online identities without relying on intermediaries.

      ## Core Principles of Web3

      ### Decentralization

      Web3 aims to distribute control and decision-making across a network rather than concentrating it in the hands of a few powerful entities. This is achieved through:

      - **Blockchain Networks**: Distributed ledgers that record transactions across many computers
      - **Peer-to-Peer Interactions**: Direct exchanges between users without intermediaries
      - **DAOs (Decentralized Autonomous Organizations)**: Community-governed entities operating through smart contracts

      ### Ownership and Control

      Web3 emphasizes user ownership of:

      - **Data**: Personal information remains under individual control rather than being harvested by platforms
      - **Digital Assets**: Through NFTs (Non-Fungible Tokens) and cryptocurrencies
      - **Digital Identity**: Self-sovereign identity systems allow users to control their online personas

      ### Permissionless Innovation

      Web3 platforms aim to be open, allowing developers to build on existing protocols without seeking permission from gatekeepers, fostering greater innovation and competition.

      ## Key Technologies Enabling Web3

      ### Blockchain

      The distributed ledger technology underlying cryptocurrencies provides a transparent, tamper-resistant record of transactions and changes, enabling trust in a trustless environment.

      ### Smart Contracts

      Self-executing programs stored on a blockchain that automatically implement agreements when predetermined conditions are met, enabling complex interactions without middlemen.

      ### Cryptocurrencies and Tokens

      Digital currencies and tokens serve various functions in Web3:
      - Medium of exchange
      - Governance (voting on protocol changes)
      - Access to services or applications
      - Representation of ownership

      ### Decentralized Applications (dApps)

      Applications built on blockchain networks that operate without central authority, ranging from financial services to social media alternatives.

      ## Potential Impacts of Web3

      ### Reimagining Digital Economies

      - **Creator Economy**: Direct artist-fan relationships through NFTs and tokens
      - **Play-to-Earn**: Gaming economies where players truly own assets and can monetize gameplay
      - **DeFi (Decentralized Finance)**: Financial services without traditional banking intermediaries

      ### Transforming Governance

      - **Tokenized Voting**: Stakeholders directly influencing protocol decisions
      - **Quadratic Funding**: Community-directed allocation of resources
      - **Reputation Systems**: Merit-based influence in decentralized communities

      ### Reshaping Digital Identity

      - **Portable Reputation**: Carrying your online history across platforms
      - **Selective Disclosure**: Sharing only necessary personal information
      - **Credential Verification**: Proving qualifications without revealing underlying data

      ## Challenges and Criticisms

      Despite its promise, Web3 faces significant hurdles:

      - **Scalability**: Current blockchain networks struggle with transaction volume
      - **User Experience**: Complex interfaces and technical knowledge requirements
      - **Environmental Concerns**: Energy consumption of proof-of-work blockchains
      - **Regulatory Uncertainty**: Evolving legal frameworks for decentralized systems
      - **Centralization Risks**: Wealth concentration and validator power in some networks

      ## The Path Forward

      Web3's development will likely be gradual, with various approaches coexisting:

      - **Progressive Decentralization**: Projects starting with centralized components and gradually distributing control
      - **Hybrid Models**: Applications combining Web2 and Web3 elements for better user experience
      - **Layer 2 Solutions**: Technologies built on top of blockchains to improve scalability and efficiency

      ## Conclusion

      Web3 represents an ambitious reimagining of the internet's architecture and power dynamics. While it faces significant technical and social challenges, its core principles of user ownership, decentralization, and permissionless innovation offer compelling alternatives to the current digital landscape.

      Whether Web3 will fulfill its revolutionary potential or simply influence existing systems remains to be seen, but the conversation it has sparked about data ownership, digital rights, and the structure of online platforms is already reshaping our expectations of the internet.
    `,
    coverImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=2832&q=80",
    date: "2023-06-05",
    author: authors[0],
    category: categories[0],
    tags: ["Web3", "Blockchain", "Cryptocurrency", "Decentralization"],
    isTrending: true,
    isFeatured: false,
    readTime: 10,
    views: 1050
  },
  {
    id: "7",
    title: "Grammy Nominations 2026: Full Guide, Highlights & Key Changes",
    slug: "grammy-nominations-2026",
    excerpt: "A thorough look at the 2026 GRAMMY nominations: key dates, new categories, headline contenders, and what’s unique this year.",
    content: `
      # Grammy Nominations 2026

      ![2026 GRAMMYs Hero](https://i8.amplience.net/i/naras/2026_grammys_68th_grammy_awards_Date-Hero-V3_1644x925)

      The Recording Academy announced nominations for the 68th GRAMMY Awards (2026), with a stacked slate across pop, hip-hop, Latin, country, and alternative. This guide rounds up the essentials — dates, new categories, headline nominees, and how to watch — in one place.

      ## Key Dates
      - **Nominations announcement**: Nov 7, 2025
      - **Awards ceremony**: Feb 1, 2026 — Crypto.com Arena, Los Angeles
      - **Official site**: [GRAMMY.com](https://www.grammy.com/)

      ## What’s New In 2026
      The Recording Academy introduced changes that broaden recognition and keep pace with today’s music landscape. Highlights include:
      - **Best Traditional Country Album** — celebrating classic, roots-informed country projects.
      - **Best Album Cover** — spotlighting visual design and packaging as a creative discipline.
      - Expanded opportunities and clearer guidelines across several categories.

      Source: [GRAMMY.com update overview](https://grammy.com/news/2026-grammys-things-know-about-new-categories-changes)

      ## Headline Contenders
      This year’s predictions and early coverage point to a star-heavy lineup across the Big Four categories:

      ![Kendrick Lamar, Lady Gaga, Bad Bunny](https://ca-times.brightspotcdn.com/dims4/default/450c3ed/2147483647/strip/true/crop/3000x1575+0+0/resize/1200x630!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F1d%2F6e%2F0b622d4d4233b81f4f31aaa98dab%2Fkendrick-lamar-lady-gaga-and-bad-bunny.jpg)

      - **Album Of The Year**: Bad Bunny, Kendrick Lamar, Lady Gaga, Justin Bieber among expected leaders.
      - **Record Of The Year**: Lady Gaga, Kendrick Lamar, Justin Bieber, Chappell Roan widely cited.
      - **Song Of The Year**: Billie Eilish, Kendrick Lamar, Laufey, Justin Bieber, among others.
      - **Best New Artist**: Olivia Dean, Ravyn Lenae, Alex Warren and more rising voices.

      Sources: [Los Angeles Times predictions](https://www.latimes.com/entertainment-arts/music/story/2025-11-05/grammys-2026-nominations-predictions-kendrick-lady-gaga-bad-bunny), [The Independent coverage](https://www.the-independent.com/arts-entertainment/music/news/grammy-nominations-2026-announcement-b2860152.html)

      ## Category Highlights
      ### Pop & General Field
      Expect fierce competition between global superstars and breakout acts. Pop singles dominate **Record Of The Year**, while intimate songwriting pushes into **Song Of The Year**.

      ### Hip-Hop & R&B
      Kendrick Lamar continues to be a benchmark for artistry and impact in hip-hop. R&B sees a mix of classic vocal performances and modern alt-R&B textures.

      ### Latin
      Bad Bunny leads a broad wave of Latin excellence spanning urbano, pop, and regional styles — another strong year for the genre’s global footprint.

      ### Country
      With **Best Traditional Country Album** added, heritage sounds and roots projects get a dedicated spotlight, alongside contemporary country categories.

      ### Visual Design
      The new **Best Album Cover** category brings designers and art directors into the spotlight — a win for the creative teams shaping music’s visual identity.

      ## How To Watch
      - **Date**: Feb 1, 2026
      - **Where**: Crypto.com Arena, Los Angeles
      - **Broadcast/Streaming**: Check your local listings and GRAMMY.com for official partners.

      ## Final Take
      The 2026 GRAMMYs sharpen focus on both musical craft and creative presentation. Whether you’re following the Big Four or exploring genre-specific categories, this year balances superstar competition with thoughtful recognition across the field.
    `,
    coverImage: "https://i8.amplience.net/i/naras/2026_grammys_68th_grammy_awards_Date-Hero-V3_1644x925",
    date: "2025-11-07",
    author: authors[1],
    category: categories[2],
    tags: ["Grammys", "Music", "Lifestyle", "Awards", "2026"],
    isTrending: true,
    isFeatured: true,
    readTime: 9,
    views: 0,
    images: [
      "https://i8.amplience.net/i/naras/2026_grammys_68th_grammy_awards_Date-Hero-V3_1644x925",
      "https://ca-times.brightspotcdn.com/dims4/default/450c3ed/2147483647/strip/true/crop/3000x1575+0+0/resize/1200x630!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F1d%2F6e%2F0b622d4d4233b81f4f31aaa98dab%2Fkendrick-lamar-lady-gaga-and-bad-bunny.jpg"
    ]
  }
];

// Function to get trending posts
export const getTrendingPosts = (): Post[] => {
  return posts.filter(post => post.isTrending).sort((a, b) => b.views - a.views);
};

// Function to get featured posts
export const getFeaturedPosts = (): Post[] => {
  return posts.filter(post => post.isFeatured);
};

// Function to get posts by category
export const getPostsByCategory = (categorySlug: string): Post[] => {
  return posts.filter(post => post.category.slug === categorySlug);
};

// Function to get post by slug
export const getPostBySlug = (slug: string): Post | undefined => {
  return posts.find(post => post.slug === slug);
};

// Function to get related posts
export const getRelatedPosts = (currentPost: Post, count: number = 3): Post[] => {
  return posts
    .filter(post => 
      post.id !== currentPost.id && 
      (post.category.id === currentPost.category.id || 
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
};
