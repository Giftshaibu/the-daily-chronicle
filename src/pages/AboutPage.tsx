import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container py-10">
        <div className="max-w-article mx-auto">
          <h1 className="font-headline font-black text-3xl md:text-5xl mb-6">About Us</h1>
          <div className="font-body text-base leading-[1.8] space-y-4 text-muted-foreground">
            <p>
              <span className="text-foreground font-semibold">The Post Office</span> is a modern
              digital news platform dedicated to delivering accurate, timely, and compelling
              journalism to readers across the nation and beyond.
            </p>
            <p>
              Founded on the principles of integrity, transparency, and public service, we cover
              breaking news, politics, business, technology, sports, entertainment, health, and
              lifestyle — all with the depth and quality our readers deserve.
            </p>
            <p>
              Our team of experienced journalists and editors works around the clock to bring you
              the stories that matter most. From in-depth investigative reports to real-time
              breaking news updates, The Post Office is your trusted source for information.
            </p>
            <h2 className="font-headline font-bold text-xl text-foreground pt-4">Our Mission</h2>
            <p>
              To inform, educate, and empower our readers with quality journalism that holds
              the powerful accountable and gives voice to the voiceless.
            </p>
            <h2 className="font-headline font-bold text-xl text-foreground pt-4">Contact Us</h2>
            <p>
              Have a tip or feedback? We'd love to hear from you. Reach out to our editorial
              team at <span className="text-primary font-semibold">editor@thepostoffice.com</span>.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default AboutPage;
