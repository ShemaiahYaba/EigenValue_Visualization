"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { LayoutPanelLeft, BookOpenText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <LayoutPanelLeft className="h-10 w-10 text-accent" />,
    title: "Interactive Playground",
    description:
      "Visualize eigenvalues, eigenvectors, and matrix transformations in real-time. Supports matrices up to 4x4.",
    link: "/features/matrix-playground",
  },
  {
    icon: <BookOpenText className="h-10 w-10 text-accent" />,
    title: "Educational Resources",
    description:
      "Access tutorials and step-by-step guides to deepen your understanding of eigenvalues and eigenvectors.",
    link: "/features",
  },
];
const Features: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="w-full py-16 md:py-24">
        <div className=" px-4 md:px-6">
          <h2 className="text-4xl font-bold tracking-tight text-center mb-12 font-headline text-primary">
            Explore MatrixLAB's Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden"
              >
                <CardHeader className="items-center text-center bg-card">
                  {feature.icon}
                  <CardTitle className="mt-4 text-2xl font-headline text-primary">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow text-center">
                  <CardDescription className="text-foreground/80 font-body">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                <div className="p-6 pt-0 mt-auto text-center">
                  <Button
                    asChild
                    variant="link"
                    className="text-accent hover:text-accent/80"
                  >
                    <Link to={feature.link}>
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default Features;
