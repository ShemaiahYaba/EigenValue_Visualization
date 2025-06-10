import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import {
  Brain,
  Lightbulb,
  Target,
  HelpCircle,
  ChevronsRight,
  ArrowRight,
  BookOpenCheck,
} from "lucide-react";

const faqs = [
  {
    question: "Can a matrix have multiple eigenvectors and eigenvalues?",
    answer:
      "Yes, absolutely! A matrix (specifically, an N x N square matrix) can have up to N distinct eigenvalues. Each eigenvalue can have one or more associated eigenvectors. These different eigenvector/eigenvalue pairs represent the different fundamental ways the matrix transformation stretches or shrinks space along specific directions.",
  },
  {
    question: "Does every matrix have (real) eigenvectors?",
    answer:
      "Most square matrices do. However, some transformations, like a pure rotation in 2D (unless it's a 0, 180, or 360-degree rotation), might not have eigenvectors that are 'real' vectors (i.e., vectors with only real numbers). Their eigenvectors involve complex numbers. This means there isn't a direction in the real 2D plane that stays perfectly aligned after the rotation; every direction changes.",
  },
  {
    question: "Is the zero vector considered an eigenvector?",
    answer:
      "By definition, eigenvectors must be non-zero vectors. While it's true that for any matrix A and any scalar λ, A * 0 = λ * 0 (since A * 0 is always 0), the zero vector doesn't tell us anything useful or unique about the transformation's special directions. We're interested in non-trivial directions that are preserved.",
  },
  {
    question: "What if an eigenvalue is zero?",
    answer:
      "If an eigenvalue is zero, it means the matrix squashes any corresponding eigenvector down to the zero vector. This is significant because it implies the matrix is 'singular' – it doesn't have an inverse, and it collapses some part of the space.",
  },
];

export default function EigenCrashCoursePage() {
  return (
    <div className="space-y-12">
      <header className="text-center py-8 bg-muted rounded-xl shadow-lg">
        <Brain className="h-20 w-20 text-primary mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline text-primary">
          Eigenvalues & Eigenvectors: A First Principles Crash Course
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 font-body max-w-3xl mx-auto">
          Uncover the "special" directions and scaling factors of matrix
          transformations by understanding them from the ground up.
        </p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-3xl font-headline text-primary">
            <Target className="h-8 w-8 mr-3 text-accent" /> Why First
            Principles?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-lg font-body text-foreground/90">
          <p>
            Instead of memorizing formulas or accepting definitions at face
            value, First Principles Thinking encourages us to break down complex
            problems into their most basic, fundamental truths.
          </p>
          <p>
            For eigenvalues and eigenvectors, this means we won't just say "Av =
            λv". We'll ask:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2">
            <li>What IS a vector fundamentally?</li>
            <li>What does a matrix DO fundamentally?</li>
            <li>
              Why would we even LOOK for vectors that behave "specially" when a
              matrix acts on them?
            </li>
          </ul>
          <p>
            This approach builds genuine intuition, making these powerful
            concepts truly stick.
          </p>
        </CardContent>
      </Card>

      <Separator className="my-8 border-primary/20" />

      <h2 className="text-3xl font-bold text-center mb-8 font-headline text-primary">
        Let's Build Understanding Step-by-Step
      </h2>

      <div className="grid md:grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-headline text-primary">
              <Lightbulb className="h-7 w-7 mr-3 text-accent" /> 1. The Building
              Blocks: Vectors & Matrices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-base font-body text-foreground/80">
            <div>
              <h3 className="font-semibold text-xl mb-2 text-primary/90">
                What is a Vector?
              </h3>
              <p>
                Fundamentally, a vector is an "arrow" in space. It tells us two
                crucial things:
              </p>
              <ul className="list-disc list-inside pl-4 my-2">
                <li>
                  <strong>Direction:</strong> Which way is it pointing?
                </li>
                <li>
                  <strong>Magnitude (Length):</strong> How long is it? Or, how
                  strong is the push/pull it represents?
                </li>
              </ul>
              <p>
                Think of "3 steps East" or "a wind blowing North-East at 10
                mph."
              </p>
              <div className="my-4 p-4 bg-muted rounded-md flex justify-center">
                <img
                  src="https://placehold.co/300x150.png"
                  alt="Simple vector representation"
                  width={300}
                  height={150}
                  className="rounded shadow-md"
                  data-ai-hint="vector arrow"
                />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2 text-primary/90">
                What is a Matrix?
              </h3>
              <p>
                A matrix (for our purposes, a square grid of numbers) is a{" "}
                <strong>recipe for transforming vectors</strong>, or even all of
                space. It can:
              </p>
              <ul className="list-disc list-inside pl-4 my-2">
                <li>Stretch or shrink vectors.</li>
                <li>Rotate vectors.</li>
                <li>Shear (tilt) vectors.</li>
                <li>Or a combination of these!</li>
              </ul>
              <p>
                Imagine a set of instructions: "Double all East-West components
                and halve all North-South components of any given vector."
                That's what a matrix does.
              </p>
              <div className="my-4 p-4 bg-muted rounded-md flex justify-center">
                <img
                  src="https://placehold.co/200x200.png"
                  alt="Matrix grid representation"
                  width={200}
                  height={200}
                  className="rounded shadow-md"
                  data-ai-hint="matrix grid numbers"
                />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2 text-primary/90">
                Matrix Acting on a Vector: The Transformation
              </h3>
              <p>
                When a matrix "acts on" or "multiplies" a vector, it applies its
                transformation recipe to that specific vector. The original
                vector is changed into a new vector (which might have a new
                direction and/or a new length).
              </p>
              <div className="my-4 p-4 bg-muted rounded-md flex justify-center">
                <img
                  src="https://placehold.co/400x250.png"
                  alt="Vector being transformed by a matrix"
                  width={400}
                  height={250}
                  className="rounded shadow-md"
                  data-ai-hint="vector transformation arrow"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-headline text-primary">
              <HelpCircle className="h-7 w-7 mr-3 text-accent" /> 2. The Core
              Question: A Special Behavior?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-base font-body text-foreground/80">
            <p>
              Usually, when a matrix transforms a vector, the vector gets
              knocked off its original path – its direction changes.
            </p>
            <p className="font-semibold text-lg text-primary/90">
              The Big First-Principles Question: Is it possible that for a given
              matrix, there exist some <em>special</em> non-zero vectors whose
              direction is <em>not</em> changed by the transformation?
            </p>
            <p>
              These vectors might get longer, shorter, or even flip to point in
              the exact opposite direction, but they would still lie along the{" "}
              <em>same line</em> as they did before the transformation.
            </p>
            <div className="my-4 p-4 bg-muted rounded-md flex justify-center">
              <img
                src="https://placehold.co/450x300.png"
                alt="Vectors transformed, one stays on its line"
                width={450}
                height={300}
                className="rounded shadow-md"
                data-ai-hint="vector directions preserved scaled"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-headline text-primary">
              <ChevronsRight className="h-7 w-7 mr-3 text-accent" /> 3.
              Discovering Eigenvectors: The "Invariant Directions"
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-base font-body text-foreground/80">
            <p>
              The answer to our core question is YES! Those "special" non-zero
              vectors are called <strong>eigenvectors</strong>.
            </p>
            <p>
              <strong>Eigenvector (from First Principles):</strong> An
              eigenvector of a matrix is a non-zero vector that, when the matrix
              transformation is applied to it, results in a new vector that
              still points along the same line (same or exactly opposite
              direction) as the original eigenvector. Only its length
              (magnitude) might change.
            </p>
            <p>
              Think of them as the "characteristic directions" or "invariant
              lines" of a matrix transformation.
            </p>
            <div className="font-mono p-3 my-4 bg-primary/5 text-primary rounded-md text-center text-lg">
              Matrix A ✕ Eigenvector <span className="text-accent">(v)</span> ➔
              Scaled Eigenvector <span className="text-accent">(λv)</span>
            </div>
            <p>
              Analogy: Imagine stretching a rubber sheet. If you pull it
              perfectly horizontally, vertical lines on the sheet get thinner
              but remain vertical (eigenvectors for horizontal stretch).
              Horizontal lines just get longer (also eigenvectors).
            </p>
            <div className="my-4 p-4 bg-muted rounded-md flex justify-center">
              <img
                src="https://placehold.co/400x300.png"
                alt="Eigenvector remaining on the same line after transformation"
                width={400}
                height={300}
                className="rounded shadow-md"
                data-ai-hint="eigenvector line preserved"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-headline text-primary">
              <BookOpenCheck className="h-7 w-7 mr-3 text-accent" /> 4.
              Understanding Eigenvalues: The Scaling Factors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-base font-body text-foreground/80">
            <p>
              If an eigenvector is a special direction, the{" "}
              <strong>eigenvalue</strong> tells us <em>how much</em> that
              eigenvector is scaled (stretched, shrunk, or flipped) along that
              direction.
            </p>
            <p>
              <strong>Eigenvalue (from First Principles):</strong> For a given
              eigenvector, its corresponding eigenvalue is the numerical factor
              by which the eigenvector's length is multiplied when the matrix
              transformation is applied.
            </p>
            <div className="font-mono p-4 my-4 bg-primary/90 text-primary-foreground rounded-md text-center text-xl shadow-md">
              Av = λv
            </div>
            <ul className="list-none space-y-2 pl-2">
              <li>
                <code className="bg-muted px-1 rounded">A</code> is the matrix
                (the transformation).
              </li>
              <li>
                <code className="bg-muted px-1 rounded">v</code> is the
                eigenvector (the special direction).
              </li>
              <li>
                <code className="bg-muted px-1 rounded">λ</code> (lambda) is the
                eigenvalue (the scaling factor for that direction{" "}
                <code className="bg-muted px-1 rounded">v</code>).
              </li>
            </ul>
            <p>
              Interpreting the eigenvalue{" "}
              <code className="bg-muted px-1 rounded">λ</code>:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>
                If <code className="bg-muted px-1 rounded">λ &gt; 1</code>: The
                eigenvector is stretched.
              </li>
              <li>
                If{" "}
                <code className="bg-muted px-1 rounded">0 &lt; λ &lt; 1</code>:
                The eigenvector is shrunk.
              </li>
              <li>
                If <code className="bg-muted px-1 rounded">λ &lt; 0</code>: The
                eigenvector is flipped (points in the opposite direction) AND
                scaled by <code className="bg-muted px-1 rounded">|λ|</code>.
              </li>
              <li>
                If <code className="bg-muted px-1 rounded">λ = 1</code>: The
                eigenvector is unchanged by the transformation.
              </li>
              <li>
                If <code className="bg-muted px-1 rounded">λ = 0</code>: The
                eigenvector is squashed into the origin (becomes the zero
                vector).
              </li>
            </ul>
            <div className="my-4 p-4 bg-muted rounded-md flex justify-center">
              <img
                src="https://placehold.co/450x250.png"
                alt="Effect of different eigenvalue magnitudes on an eigenvector"
                width={450}
                height={250}
                className="rounded shadow-md"
                data-ai-hint="eigenvalue stretch shrink"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-headline text-primary">
              <Target className="h-7 w-7 mr-3 text-accent" /> 5. Real-World
              Significance: Why Do They Matter?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-base font-body text-foreground/80">
            <p>
              Eigenvectors and eigenvalues aren't just abstract math concepts.
              They reveal the fundamental "axes" or "modes of behavior" of a
              linear system or transformation. This has profound implications:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-1 text-primary/90">
                  Principal Component Analysis (PCA) in Data Science:
                </h4>
                <p>
                  Imagine a cloud of data points. Eigenvectors of a related
                  matrix (the covariance matrix) point in the directions where
                  the data varies the most. The largest eigenvalue corresponds
                  to the direction of maximum variance (the "principal
                  component"). This helps simplify complex data by focusing on
                  these most important directions.
                </p>
                <div className="mt-3 p-2 bg-muted rounded-md flex justify-center">
                  <img
                    src="https://placehold.co/300x200.png"
                    alt="PCA data cloud with principal components"
                    width={300}
                    height={200}
                    className="rounded shadow-sm"
                    data-ai-hint="data principal components"
                  />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1 text-primary/90">
                  Stability of Systems (Engineering):
                </h4>
                <p>
                  In designing structures like bridges or aircraft, engineers
                  analyze how they respond to vibrations. Eigenvalues can
                  determine if small disturbances will grow (large positive
                  eigenvalues, potentially leading to failure) or die out
                  (eigenvalues with magnitude less than 1, indicating
                  stability).
                </p>
                <div className="mt-3 p-2 bg-muted rounded-md flex justify-center">
                  <img
                    src="https://placehold.co/300x200.png"
                    alt="Vibrating bridge modes"
                    width={300}
                    height={200}
                    className="rounded shadow-sm"
                    data-ai-hint="bridge vibration modes"
                  />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1 text-primary/90">
                  Quantum Mechanics:
                </h4>
                <p>
                  In quantum physics, operators (which are like matrices)
                  describe physical quantities. The eigenvalues of these
                  operators correspond to the possible measurable values of
                  those quantities (e.g., energy levels of an atom).
                  Eigenvectors represent the states of the system associated
                  with these values.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1 text-primary/90">
                  Vibrational Analysis:
                </h4>
                <p>
                  Musical instruments, buildings, and machinery all have natural
                  frequencies at which they prefer to vibrate. These are related
                  to the eigenvalues of the system's mathematical model.
                  Understanding these helps in designing for desired sounds or
                  avoiding catastrophic resonance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8 border-primary/20" />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-3xl font-headline text-primary">
            <BookOpenCheck className="h-8 w-8 mr-3 text-accent" /> Key Takeaways
            & Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-lg font-body text-foreground/90">
          <p>From first principles, we've learned:</p>
          <ul className="list-disc list-inside pl-4 space-y-2">
            <li>
              <strong>Eigenvectors</strong> are special, non-zero directions
              that a matrix transformation doesn't alter, except by scaling
              them.
            </li>
            <li>
              <strong>Eigenvalues</strong> are the specific scaling factors
              applied to their corresponding eigenvectors during that
              transformation.
            </li>
            <li>
              Together, they reveal the core, characteristic ways a linear
              system behaves.
            </li>
          </ul>
          <p>
            The best way to solidify this understanding is to see it in action!
          </p>
          <div className="text-center mt-6">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
            >
              <Link to="/features/matrix-playground">
                Explore in MatrixLAB Playground{" "}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-8 border-primary/20" />

      <section>
        <h2 className="text-3xl font-semibold mb-8 text-center font-headline text-primary">
          Common Questions (First Principles Answers)
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto bg-card p-4 rounded-lg shadow"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              value={`item-${index}`}
              key={index}
              className="border-b-primary/10 last:border-b-0"
            >
              <AccordionTrigger className="text-lg font-semibold hover:text-accent font-body py-4 text-left text-primary/90">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 pb-4 font-body leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
