import Navbar from "@/component/Navbar";
import { Button } from "@/component/ui/button";
import { Input } from "@/component/ui/input";
import { Textarea } from "@/component/ui/textarea";
import { Link } from "react-router-dom";
import contactImage from "../assets/ContactUs.jpg";
import animation from "../assets/animation.json";
import Lottie from "lottie-web";
import { useContext, useEffect, useRef, useState } from "react";
import { NavbarContext } from "@/component/NavbarContext";
const LandingPage = () => {
  const animationContainer = useRef(null);
  const { setLinks } = useContext(NavbarContext);
  const [longUrl,setLongUrl]=useState();
  useEffect(() => {
    const anim = Lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animation,
    });

    const linkData = [
      { href: "#features", label: "Features" },
      { href: "#contact", label: "Contact" },
    ];
    setLinks(linkData);

    return () => {
      anim.destroy();
    };
  }, [setLinks]);
  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <section className="bg-muted py-24 md:py-16 lg:py-32 pt-16">
          <div className="container grid gap-8 px-4 md:grid-cols-2 md:gap-12 md:px-6">
            <div className="flex flex-col items-start justify-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Shorten your links, expand your reach.
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                LynQr makes it easy to create custom short links with QR that
                you can share anywhere.
              </p>
              <form className="flex flex-col gap-2 min-[400px]:flex-row">
                <Input
                  type="url"
                  value={longUrl}
                  onClick={(e)=>setLongUrl(e.targetValue.value)}
                  placeholder="Enter a URL to shorten"
                  className="flex-1"
                />
                <Button type="submit">Shorten URL</Button>
              </form>
            </div>
            <div ref={animationContainer}></div>
          </div>
        </section>
        <section id="features" className="py-12 md:py-24 lg:py-32">
          <div className="container grid gap-8 px-4 md:grid-cols-2 md:gap-12 md:px-6">
            <div className="flex flex-col items-start justify-center space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Powerful features to boost your online presence.
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                LynQr offers a range of features to help you create, manage, and
                track your shortened links.
              </p>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <h3 className="text-lg font-bold">Custom Branding</h3>
                <p className="text-muted-foreground">
                  Create branded, memorable links that reflect your idea,
                  business or work.
                </p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-lg font-bold">Link Analytics</h3>
                <p className="text-muted-foreground">
                  Track clicks, views, and other metrics for your shortened
                  links.
                </p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-lg font-bold">QR Code Generation</h3>
                <p className="text-muted-foreground">
                  Generate QR codes for your shortened links to drive offline
                  engagement.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container grid gap-8 px-4 md:grid-cols-2 md:gap-12 md:px-6">
            <div className="flex flex-col items-start justify-center space-y-4">
              <div className="inline-block rounded-lg px-3 py-1 text-sm bg-white">
                Contact Us
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Get in touch.
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Have a question or need help contact through below form
              </p>
              <form className="flex flex-col gap-4 w-full">
                <Input type="text" placeholder="Name" />
                <Input type="email" placeholder="Email" />
                <Textarea placeholder="Message" />
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </div>
            <img
              src={contactImage}
              width="550"
              height="550"
              alt="Contact"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
            />
          </div>
        </section>
      </main>
      <footer className="bg-muted py-6 text-sm">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <p className="text-muted-foreground">
            &copy; 2024 URL Shortener. All rights reserved.
          </p>
          <nav className="flex items-center gap-4">
            <Link
              href="#"
              className="text-muted-foreground hover:underline underline-offset-4"
              prefetch={false}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:underline underline-offset-4"
              prefetch={false}
            >
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
