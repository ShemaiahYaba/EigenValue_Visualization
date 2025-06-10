import React, { useState, ReactElement } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/logo.svg"; // Adjust the path as necessary

const Hero: React.FC = (): ReactElement => {
  const [expandedColumnIndex, setExpandedColumnIndex] = useState<number | null>(
    null
  );

  const backdropFeatures = [
    {
      title: "EV-EV Crash Course",
      description:
        "Eigenvalues & Eigenvectors: Like VIPs, they keep their direction under transformation! Uncover their secrets. This is a much longer description to test the scrolling behavior. It needs to be long enough to potentially overflow the available space in the expanded column, especially on smaller viewports or when the hero section itself isn't very tall. We're adding more and more text here to simulate a real-world scenario where a feature might have a detailed explanation that shouldn't push the call-to-action buttons off-screen. Let's add even more. Still more. One more sentence should do it for testing purposes.",
      tooltip: "Unlock Eigen-magic!",
    },
    {
      title: "EV-EV Visualizations",
      description:
        "See the matrix's 'personality' – how it stretches, squashes, and rotates space. A visual feast!",
      tooltip: "Matrices: The Space Invaders",
    },
    {
      title: "Matrix Playground",
      description:
        "Your sandbox for matrix math. Experiment freely. No actual sand, we promise (it gets everywhere).",
      tooltip: "Enter the Matrix... Sandbox",
    },
    {
      title: "Power Method",
      description:
        "Iteratively unmasking the 'strongest' eigenvector, one powerful step at a time! Feel the dominance.",
      tooltip: "Unleash the Power!",
    },
    {
      title: "PCA",
      description:
        "Principal Component Analysis: Finding the essence of your data, like a digital Marie Kondo! Spark joy with dimensions.",
      tooltip: "Data's Inner Zen",
    },
  ];

  return (
    <>
      <div>
        <section
          className="relative w-full py-20 md:py-32 text-center bg-gradient-to-br from-background to-muted rounded-xl shadow-lg overflow-hidden"
          onMouseLeave={() => setExpandedColumnIndex(null)}
        >
          {/* Five Column Backdrop */}
          <div className="absolute inset-0 flex bg-white">
            {backdropFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={cn(
                  "group flex flex-col p-3 text-center border-r border-black/10 last:border-r-0 relative",
                  "transition-all duration-500 ease-in-out",
                  expandedColumnIndex === null
                    ? "flex-1 justify-start pt-6 opacity-60"
                    : "",
                  expandedColumnIndex === index
                    ? "flex-grow-[5] bg-background/95 opacity-100 z-10 justify-start pt-6"
                    : "",
                  expandedColumnIndex !== null && expandedColumnIndex !== index
                    ? "flex-grow-[0] opacity-0 scale-90 w-0 p-0 border-0 overflow-hidden"
                    : ""
                )}
              >
                <h4
                  className={cn(
                    "font-bold break-words transition-all duration-300",
                    expandedColumnIndex === index
                      ? "opacity-0"
                      : "filter blur-[1.5px]",
                    expandedColumnIndex === null
                      ? "text-primary/80"
                      : "text-primary"
                  )}
                >
                  {feature.title}
                </h4>

                <div
                  onMouseEnter={() => setExpandedColumnIndex(index)}
                  className="absolute bottom-0 left-0 w-full h-1/2 cursor-pointer z-0"
                  aria-label={`Expand ${feature.title}`}
                />

                {expandedColumnIndex === index && (
                  <div className="absolute inset-0 flex flex-col items-center p-6 bg-background/90 transition-opacity duration-300 ease-in-out">
                    <h4 className="text-primary text-xl mb-4 font-bold filter-none text-center flex-shrink-0">
                      {feature.title}
                    </h4>
                    <div className="flex-grow overflow-y-auto mb-4 w-full max-w-md">
                      <p className="text-xs md:text-sm text-foreground/80 opacity-100 px-2 text-center">
                        {feature.description}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 flex-shrink-0">
                      <Button
                        asChild
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-transform hover:scale-105"
                      >
                        <Link to="/features">
                          Try It Now <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="text-primary border-primary hover:bg-primary/10 shadow-md transition-transform hover:scale-105"
                      >
                        <Link to="/resources">Learn More</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div
            className={cn(
              "relative mx-auto w-full max-w-4xl px-4 md:px-6 transition-opacity duration-300 ease-in-out z-20 flex items-center justify-center flex-col text-center",
              expandedColumnIndex !== null
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            )}
          >
            <div>
              <img src={logo} className="h-24 w-24 text-primary mx-auto mb-6" />
            </div>
            <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-6 font-headline ">
              Welcome to{" "}
              <span className="font-[satoshi] font-semibold">MatrixLAB</span>
            </h1>
            <p className="max-w-[700px] mx-auto text-lg md:text-xl text-foreground/80 mb-8 font-body">
              from first principles to pca mastery.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Hero;
