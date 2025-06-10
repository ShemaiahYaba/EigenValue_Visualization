import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Target,
  BookOpen,
  Briefcase,
  HelpCircle,
  BarChartBig,
  ShieldCheck,
} from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const teamMembers = [
  {
    name: "Dr. A. A. Mebawondu",
    role: "Lead Architect & Visionary",
    avatarSrc: "https://placehold.co/100x100.png",
    avatarFallback: "EV",
    bio: "Elara is passionate about making complex mathematical concepts accessible to everyone. She designed MatrixLAB to be an intuitive learning tool.",
    dataAiHint: "scientist portrait",
  },
  {
    name: "Shemaiah Wambebe Yaba-Shiaka",
    role: "Head of Engineering",
    avatarSrc: "https://placehold.co/100x100.png",
    avatarFallback: "RS",
    bio: "Raj leads the development team, ensuring MatrixLAB is robust, scalable, and performant. He loves tackling challenging technical problems.",
    dataAiHint: "engineer portrait",
  },
];

const footerLinks = {
  features: [
    { name: "EV-EV Made Easy", href: "" },
    { name: "EV-EV Properties & Concepts", href: "#" },
    { name: "PCA", href: "#" },
    { name: "Numerical Methods", href: "#" },
    { name: "Matrix Playground", href: "/playground" },
  ],
  support: [
    { name: "Meet The Team", href: "/about-us#team" },
    { name: "Suggest a Feature", href: "#" },
    { name: "Help Center", href: "/resources#faq" }, // Assuming FAQ is in resources
  ],
  legal: [
    { name: "Terms of Service", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "License", href: "#" },
    { name: "About", href: "/about-us" },
  ],
};

export default function AboutUsPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 text-center bg-muted rounded-xl shadow-lg overflow-hidden">
        <img
          src="https://placehold.co/1200x400.png"
          alt="MatrixLAB Team Collaboration"
          className="absolute inset-0 opacity-20"
          data-ai-hint="team collaboration"
        />
        <div className="relative max-w-7xl px-4 md:px-6 z-10">
          <Briefcase className="h-24 w-24 text-primary mx-auto mb-6" />
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 font-headline text-primary">
            About MatrixLAB
          </h1>
          <p className="max-w-[700px] mx-auto text-lg md:text-xl text-foreground/80 mb-8 font-body">
            Empowering students and professionals to master linear algebra
            through interactive visualization and AI-driven insights.
          </p>
        </div>
      </section>

      {/* Our Mission & Story */}
      <section className="max-w-7xl px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Target className="h-12 w-12 text-accent mb-4" />
          <h2 className="text-4xl font-bold tracking-tight mb-4 font-headline text-primary">
            Our Mission
          </h2>
          <p className="text-lg text-foreground/80 font-body mb-6">
            At MatrixLAB, our mission is to demystify linear algebra. We believe
            that understanding complex mathematical concepts shouldn't be a
            barrier but a gateway to innovation. We strive to provide an
            engaging, intuitive, and powerful platform that transforms how
            linear algebra is taught and learned, making it accessible and
            enjoyable for everyone, from curious beginners to seasoned experts.
          </p>
        </div>
        <div>
          <BookOpen className="h-12 w-12 text-accent mb-4" />
          <h2 className="text-4xl font-bold tracking-tight mb-4 font-headline text-primary">
            Our Story
          </h2>
          <p className="text-lg text-foreground/80 font-body">
            MatrixLAB was born from a shared frustration with traditional
            methods of learning linear algebra. Recognizing the power of
            visualization and interactive tools, our founders set out to create
            a platform that could bring abstract concepts to life. What started
            as a small project has grown into a comprehensive educational tool,
            continuously evolving with the latest advancements in AI and
            educational technology to serve a global community of learners.
          </p>
        </div>
      </section>

      <Separator className="my-12 border-primary/20" />

      {/* Meet The Team Section */}
      <section id="team" className="max-w-7xl px-4 md:px-6">
        <div className="text-center mb-12">
          <Users className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-4xl font-bold tracking-tight font-headline text-primary">
            Meet The Team
          </h2>
          <p className="text-lg text-foreground/80 font-body mt-2 max-w-2xl mx-auto">
            We are a dedicated group of educators, developers, and designers
            passionate about mathematics and technology.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {teamMembers.map((member) => (
            <Card
              key={member.name}
              className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <CardHeader className="items-center text-center">
                <Avatar className="w-24 h-24 mb-4 border-2 border-accent">
                  <AvatarImage
                    src={member.avatarSrc}
                    alt={member.name}
                    data-ai-hint={member.dataAiHint}
                  />
                  <AvatarFallback>{member.avatarFallback}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl font-headline text-primary">
                  {member.name}
                </CardTitle>
                <CardDescription className="text-accent font-semibold">
                  {member.role}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow text-center">
                <p className="text-sm text-foreground/80 font-body">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-12 border-primary/20" />

      {/* Footer Links Section from Image */}
      <section className="max-w-7xl px-4 md:px-6 py-12 bg-card rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 font-headline text-primary flex items-center">
              <BarChartBig className="h-6 w-6 mr-2 text-accent" /> Features
            </h3>
            <ul className="space-y-2">
              {footerLinks.features.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-foreground/80 hover:text-primary hover:underline font-body transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 font-headline text-primary flex items-center">
              <HelpCircle className="h-6 w-6 mr-2 text-accent" /> Support
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-foreground/80 hover:text-primary hover:underline font-body transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 font-headline text-primary flex items-center">
              <ShieldCheck className="h-6 w-6 mr-2 text-accent" /> Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-foreground/80 hover:text-primary hover:underline font-body transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export const metadata = {
  title: "About Us | MatrixLAB",
  description:
    "Learn more about MatrixLAB, our mission, our team, and what drives us to make linear algebra accessible to everyone.",
};
