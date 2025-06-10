import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import mvp from "@/assets/illustrations/visuals.svg"; // Adjust the path as necessary

const Playground: React.FC = () => {
  return (
    <section className="w-full py-16 md:py-24 rounded-xl ">
      <div className=" px-4 md:px-6 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold tracking-tight mb-6 font-headline text-primary">
            Visualize Complex Math
          </h2>
          <p className="text-lg text-foreground/80 mb-6 font-body">
            MatrixLAB provides a dynamic environment to see matrix operations
            and their geometric interpretations come to life. Understand
            abstract concepts through hands-on interaction.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-black hover:bg-primary/90 text-white shadow-md"
          >
            <Link to="/features/matrix-playground">Explore Visualizations</Link>
          </Button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src={mvp}
            alt="Matrix Visualization Placeholder"
            width={600}
            height={400}
            className="rounded-lg shadow-2xl"
            data-ai-hint="abstract geometric"
          />
        </div>
      </div>
    </section>
  );
};
export default Playground;
