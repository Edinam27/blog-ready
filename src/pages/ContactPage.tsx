import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-20 max-w-2xl">
      <Helmet>
        <title>Contact Us | Mordern Blog</title>
        <meta name="description" content="Get in touch with the Mordern Blog team. Whether you have questions about our content, want to explore partnership opportunities, or need support, we are here to help." />
      </Helmet>

      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Contact Us</h1>
          <p className="text-xl text-muted-foreground">
            Have a question, suggestion, or partnership inquiry? We'd love to hear from you.
          </p>
        </div>

        <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium leading-none">First Name</label>
                <Input id="name" placeholder="John" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium leading-none">Last Name</label>
                <Input id="lastName" placeholder="Doe" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none">Email Address</label>
              <Input id="email" type="email" placeholder="john@example.com" required />
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium leading-none">Subject</label>
              <Input id="subject" placeholder="How can we help you?" required />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium leading-none">Message</label>
              <Textarea 
                id="message" 
                placeholder="Please provide as much detail as possible..." 
                className="min-h-[150px]"
                required 
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              Send Message
            </Button>
          </form>
        </div>

        <div className="text-center pt-8 border-t">
          <h2 className="text-xl font-semibold mb-4">Other Ways to Reach Us</h2>
          <p className="text-muted-foreground mb-2">
            <strong>Email:</strong> hello@mordernblog.com
          </p>
          <p className="text-muted-foreground">
            <strong>Address:</strong> 123 Digital Way, Tech District, NY 10001
          </p>
        </div>
      </div>
    </div>
  );
}
