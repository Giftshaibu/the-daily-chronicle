import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="bg-secondary py-12 md:py-16">
      <div className="container text-center max-w-xl">
        <h2 className="font-headline font-bold text-2xl md:text-3xl">
          Stay Informed
        </h2>
        <p className="text-muted-foreground font-body mt-2 text-sm">
          Get the latest news delivered to your inbox every morning.
        </p>
        {submitted ? (
          <p className="text-primary font-body font-semibold mt-4">
            Thank you for subscribing!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 mt-6 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-body bg-background"
              required
            />
            <Button type="submit" className="bg-primary text-primary-foreground font-body font-semibold px-6 hover:bg-primary/90">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSignup;
