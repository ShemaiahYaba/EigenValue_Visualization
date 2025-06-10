import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpenText, GraduationCap, FileText, Projector } from "lucide-react";

const resourceTopics = [
  {
    icon: <GraduationCap className="h-8 w-8 text-accent" />,
    title: "Introduction to Matrices",
    description:
      "Learn the fundamentals of matrices, their types, and basic operations.",
    link: "/features",
  },
  {
    icon: <FileText className="h-8 w-8 text-accent" />,
    title: "Eigenvalues and Eigenvectors",
    description:
      "Explore the concepts of eigenvalues and eigenvectors and their significance.",
    link: "/features",
  },
  {
    icon: <Projector className="h-8 w-8 text-accent" />,
    title: "Matrix Transformations",
    description:
      "Understand how matrices can represent linear transformations in geometric space.",
    link: "/features",
  },
];

const faqs = [
  {
    question: "What is a matrix?",
    answer:
      "A matrix is a rectangular array or table of numbers, symbols, or expressions, arranged in rows and columns, which is used to represent a mathematical object or a property of such an object.",
  },
  {
    question: "How do I use the interactive playground?",
    answer:
      "Navigate to the Playground page, select your desired matrix size, input your values, and then explore transformations or use the AI explainer to understand concepts.",
  },
  {
    question: "What types of matrices are supported?",
    answer:
      "The interactive playground supports square matrices from 2x2 up to 4x4.",
  },
];

export default function ResourcesPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <BookOpenText className="h-20 w-20 text-primary mx-auto mb-6" />
        <h1 className="text-5xl font-bold mb-4 font-headline text-primary">
          Educational Resources
        </h1>
        <p className="text-xl text-foreground/80 font-body max-w-2xl mx-auto">
          Deepen your understanding of linear algebra with our curated
          tutorials, guides, and explanations.
        </p>
      </section>

      <section className="">
        <h2 className="text-3xl font-semibold mb-8 text-center font-headline text-primary">
          Learning Modules
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {resourceTopics.map((topic) => (
            <Card
              key={topic.title}
              className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <CardHeader className="items-center text-center">
                {topic.icon}
                <CardTitle className="mt-3 text-xl font-headline text-primary">
                  {topic.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-center font-body">
                  {topic.description}
                </CardDescription>
              </CardContent>
              <div className="p-4 mt-auto text-center">
                {/* For now, links are #, will be actual links in a full app */}
                <a
                  href={topic.link}
                  className="text-accent hover:text-accent/80 font-semibold font-body"
                >
                  Learn More &rarr;
                </a>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center gap-12 py-12 bg-muted rounded-lg p-8">
        <div className="md:w-1/2">
          <img
            src="https://placehold.co/500x350.png"
            alt="Learning linear algebra"
            width={500}
            height={350}
            className="rounded-lg shadow-xl"
            data-ai-hint="education study"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-semibold mb-6 font-headline text-primary">
            Step-by-Step Tutorials
          </h2>
          <p className="text-lg text-foreground/80 mb-4 font-body">
            Our detailed tutorials break down complex topics into manageable
            steps. Follow along with examples and solidify your knowledge.
            (Content coming soon!)
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground/80 font-body">
            <li>Matrix Addition and Subtraction</li>
            <li>Scalar Multiplication</li>
            <li>Matrix Multiplication</li>
            <li>Finding Determinants</li>
            <li>Calculating Inverses</li>
          </ul>
        </div>
      </section>

      <section>
        <h2
          id="faq"
          className="text-3xl font-semibold mb-8 text-center font-headline text-primary"
        >
          Frequently Asked Questions
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              value={`item-${index}`}
              key={index}
              className="border-b-primary/20"
            >
              <AccordionTrigger className="text-lg font-semibold hover:text-accent font-body py-4 text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/90 pb-4 font-body leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
