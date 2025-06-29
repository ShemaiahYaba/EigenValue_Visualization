import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import {
  RotateCcw,
  ScanLine,
  Maximize,
  Orbit,
  BarChartHorizontalBig,
  ExternalLink,
  ArrowRight,
  Projector,
  ShieldCheck,
  Layers,
  PlayCircle,
} from "lucide-react";

const commonTransformations = [
  {
    title: "Linear Transformations: Grid Visualization",
    icon: <Layers className="h-7 w-7 text-accent" />,
    description:
      "Visualize how a matrix transforms the plane using a grid. Try different matrices to see how they affect the grid.",
    imgSrc: "https://placehold.co/400x250.png",
    imgAlt: "Projection matrix transformation visualization",
    aiHint: "vector projection shadow",
    href: "/features/custom-visuals/linear-transformation",
  },
  {
    title: "Identity Matrix: The Unchanged",
    icon: <RotateCcw className="h-7 w-7 text-accent" />,
    description:
      "The identity matrix is the 'do nothing' operator. When it transforms a vector or a space, everything remains in its original position and orientation. All its eigenvalues are 1.",
    imgSrc: "https://placehold.co/400x250.png",
    imgAlt: "Identity matrix transformation visualization",
    aiHint: "grid vector unchanged",
    href: "/features/custom-visuals/identity-matrix",
  },
  {
    title: "Scaling Matrices: Stretch & Shrink",
    icon: <Maximize className="h-7 w-7 text-accent" />,
    description:
      "Scaling matrices enlarge or reduce vectors and shapes. Uniform scaling affects all directions equally. Non-uniform scaling stretches/squashes along specific axes (eigenvectors), with scaling factors as eigenvalues.",
    imgSrc: "https://placehold.co/400x250.png",
    imgAlt: "Scaling matrix transformation visualization",
    aiHint: "circle ellipse scale",
    href: "/features/custom-visuals/scaling-matrix",
  },
  {
    title: "Rotation Matrices: Spin Around",
    icon: <Orbit className="h-7 w-7 text-accent" />,
    description:
      "Rotation matrices pivot vectors and shapes around the origin. In 2D, most rotations don't have real eigenvectors (unless 0° or 180°), but in 3D, the axis of rotation is an eigenvector with eigenvalue 1.",
    imgSrc: "https://placehold.co/400x250.png",
    imgAlt: "Rotation matrix transformation visualization",
    aiHint: "vector rotation origin",
    href: "/features/custom-visuals/rotation-matrix",
  },
  {
    title: "Shear Matrices: Tilt and Skew",
    icon: <BarChartHorizontalBig className="h-7 w-7 text-accent" />,
    description:
      "Shear matrices slant shapes. A horizontal shear, for example, keeps horizontal lines horizontal (eigenvectors) but shifts points on them based on their vertical distance.",
    imgSrc: "https://placehold.co/400x250.png",
    imgAlt: "Shear matrix transformation visualization",
    aiHint: "square parallelogram shear",
    href: "/features/custom-visuals/shear-matrix",
  },
  {
    title: "Reflection Matrices: Mirror Image",
    icon: <ScanLine className="h-7 w-7 text-accent" />,
    description:
      "Reflection matrices flip vectors across a line (2D) or plane (3D). Vectors on the reflection line/plane are eigenvectors (eigenvalue 1); vectors perpendicular are also eigenvectors (eigenvalue -1).",
    imgSrc: "https://placehold.co/400x250.png",
    imgAlt: "Reflection matrix transformation visualization",
    aiHint: "vector reflection axis",
    href: "/features/custom-visuals/reflection-matrix",
  },
  {
    title: "Orthogonal Matrices: Preserve Structure",
    icon: <ShieldCheck className="h-7 w-7 text-accent" />,
    description:
      "Orthogonal matrices preserve dot products, meaning they maintain lengths of vectors and angles between them. Rotations and reflections are key examples of orthogonal transformations.",
    imgSrc: "https://placehold.co/400x250.png",
    imgAlt: "Orthogonal matrix transformation visualization",
    aiHint: "shape preserved angles",
    href: "/features/custom-visuals/orthogonal-matrix",
  },
  {
    title: "Projection Matrices: Casting Shadows",
    icon: <Layers className="h-7 w-7 text-accent" />,
    description:
      "Projection matrices 'cast shadows' of vectors onto a subspace (like a line or plane). They are idempotent (P²=P). Eigenvalues are 0 (for directions collapsed) or 1 (for directions within the subspace).",
    imgSrc: "https://placehold.co/400x250.png",
    imgAlt: "Projection matrix transformation visualization",
    aiHint: "vector projection shadow",
    href: "/features/custom-visuals/projection-matrix",
  },
 
];

export default function MatrixTransformationsPage() {
  return (
    <div className="space-y-12 px-4 md:px-8">
      <header className="text-center py-8 bg-muted rounded-xl shadow-lg">
        <Projector className="h-20 w-20 text-primary mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline text-primary">
          Visualizing Matrix Transformations
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 font-body max-w-3xl mx-auto">
          See how matrices reshape space, from simple stretches to complex 3D
          rotations, and understand their core components.
        </p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-3xl font-headline text-primary">
            What is a Matrix Transformation?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-lg font-body text-foreground/90">
          <p>
            At its heart, a matrix transformation is a rule that takes an input
            vector (or a set of points representing a shape) and maps it to an
            output vector (or a new set of points). This mapping is defined by
            the numbers within the matrix. Visualizing these transformations is
            crucial because it turns abstract numbers into tangible geometric
            changes, making concepts like linearity, scaling, rotation, and
            shearing much more intuitive.
          </p>
          <p>
            By observing how matrices affect simple shapes or individual
            vectors, we can gain deep insights into their properties and the
            systems they represent.
          </p>
        </CardContent>
      </Card>

      <Separator className="my-8 border-primary/20" />

      <h2 className="text-3xl font-bold text-center mb-8 font-headline text-primary" id="common-transformations">
        Common Matrix Transformations
      </h2>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
        {commonTransformations.map((tf) => (
          <Card
            key={tf.title}
            className="flex flex-col shadow-md hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                {tf.icon}
                <CardTitle className="text-2xl font-headline text-primary">
                  {tf.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
              <p className="font-body text-sm text-foreground/80">
                {tf.description}
              </p>
              <div className="flex justify-center">
                <img
                  src={tf.imgSrc}
                  alt={tf.imgAlt}
                  width={300}
                  height={190}
                  className="rounded-md shadow-sm mb-2"
                  data-ai-hint={tf.aiHint}
                />
              </div>
              <p className="text-xs text-foreground/60 font-body italic text-center">
                Visualization of {tf.title.toLowerCase()}.
              </p>
            </CardContent>
            <CardContent className="pt-2 text-center">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="text-accent border-accent hover:bg-accent/10"
              >
                <Link to={tf.href ?? ''}>
                  <PlayCircle className="mr-2 h-4 w-4" /> Try in Playground
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-8 border-primary/20" />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-3xl font-headline text-primary">
            <Maximize className="h-8 w-8 mr-3 text-accent" /> Eigenvalues &
            Eigenvectors in Transformations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-lg font-body text-foreground/90">
          <p>
            When a matrix transforms space, most vectors change their direction.
            However, <strong>eigenvectors</strong> are special: they are the
            directions that are only scaled (stretched, shrunk, or flipped) by
            the transformation, without changing their original line of action.
            The factor by which an eigenvector is scaled is its corresponding{" "}
            <strong>eigenvalue</strong>.
          </p>
          <div className="my-4 p-4 bg-muted rounded-md flex flex-col items-center gap-4 md:flex-row">
            <img
              src="https://placehold.co/400x250.png"
              alt="Eigenvectors in a transformation"
              width={400}
              height={250}
              className="rounded shadow-md"
              data-ai-hint="eigenvector transformation scaled"
            />
            <p className="text-base font-body text-foreground/80 md:w-1/2">
              Imagine a shear transformation. While most of the shape deforms,
              there might be one direction that remains perfectly horizontal (an
              eigenvector), though its length might change (eigenvalue).
              Eigenvectors reveal the fundamental 'axes' or 'principal
              directions' of a transformation.
            </p>
          </div>
          <p>
            Visualizing these helps understand how a matrix fundamentally
            distorts or orients space. They are key to understanding concepts
            like Principal Component Analysis (PCA).
          </p>
          <Button
            asChild
            variant="link"
            className="text-accent hover:text-accent/80 px-0"
          >
            <Link to="/features/made-easy">
              Review Eigen-Concepts In-Depth{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Separator className="my-8 border-primary/20" />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-3xl font-headline text-primary">
            <Orbit className="h-8 w-8 mr-3 text-accent" /> Stepping into 3D:
            Visualizing Transformations in Space
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-lg font-body text-foreground/90">
          <p>
            Matrix transformations aren't limited to 2D planes. They can also
            describe how 3D objects and spaces are altered. Common 3D
            transformations include rotations around the x, y, or z axes,
            scaling in three dimensions, and shearing a 3D shape.
          </p>
          <div className="my-4 p-4 bg-muted rounded-md flex flex-col items-center gap-4 md:flex-row-reverse">
            <img
              src="https://placehold.co/400x300.png"
              alt="3D matrix transformation"
              width={400}
              height={300}
              className="rounded shadow-md"
              data-ai-hint="3d cube transformation"
            />
            <p className="text-base font-body text-foreground/80 md:w-1/2">
              Visualizing 3D transformations can be more challenging due to
              issues like occlusion (objects hiding others) and perspective.
              However, interactive 3D models can greatly aid in understanding
              how a 3x3 or 4x4 matrix (for homogeneous coordinates) can rotate,
              scale, or translate objects in a 3D environment.
            </p>
          </div>
          <p>
            These concepts are fundamental in computer graphics, robotics, and
            physics simulations. (Note: MatrixLAB playground currently focuses
            on 2D to 4D matrix algebra, 3D visualization capabilities are
            planned for future updates.)
          </p>
        </CardContent>
      </Card>

      <Separator className="my-8 border-primary/20" />

      <Card className="shadow-lg bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center text-3xl font-headline text-primary">
            <ExternalLink className="h-8 w-8 mr-3 text-accent" /> Application
            Spotlight: Principal Component Analysis (PCA)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-lg font-body text-foreground/90">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-2/3">
              <p>
                Principal Component Analysis (PCA) is a powerful statistical
                technique that heavily relies on matrix transformations,
                particularly eigenvalues and eigenvectors. It's used to simplify
                complex, high-dimensional datasets by transforming them into a
                new set of coordinates (the principal components).
              </p>
              <p className="mt-2">
                The first principal component is the direction in the data with
                the largest variance. Subsequent components are orthogonal and
                capture decreasing amounts of variance. Essentially, PCA uses
                matrix transformations to find the most 'informative' view of
                the data.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <img
                src="https://placehold.co/300x200.png"
                alt="PCA scatter plot"
                width={300}
                height={200}
                className="rounded-md shadow-md"
                data-ai-hint="pca scatter plot"
              />
            </div>
          </div>
          <div className="mt-4">
            <Button
              asChild
              variant="default"
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Link to="/features/pca-intro">
                Dive Deeper into PCA {" "}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-8 border-primary/20" />

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 font-headline text-primary">
          Ready to Experiment?
        </h2>
        <p className="text-lg text-foreground/80 mb-6 font-body">
          The best way to understand matrix transformations is to see them in
          action.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md"
        >
          <Link to="/features/matrix-playground">
            Go to the MatrixLAB Playground{" "}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
