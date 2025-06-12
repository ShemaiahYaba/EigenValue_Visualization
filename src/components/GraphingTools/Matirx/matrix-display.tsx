import type { Matrix } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MatrixDisplayProps {
  matrix: Matrix;
  title?: string;
  className?: string;
}

export function MatrixDisplay({
  matrix,
  title,
  className,
}: MatrixDisplayProps) {
  if (!matrix || matrix.length === 0) {
    return <p className="text-muted-foreground">No matrix to display.</p>;
  }

  return (
    <div className={cn("p-4 border rounded-lg shadow-sm bg-card", className)}>
      {title && (
        <h3 className="text-lg font-semibold mb-3 text-primary font-headline">
          {title}
        </h3>
      )}
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${
            matrix[0]?.length || 1
          }, minmax(0, 1fr))`,
        }}
      >
        {matrix.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`cell-${rowIndex}-${colIndex}`}
              className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border rounded bg-background text-foreground font-code text-sm md:text-base shadow-inner"
              title={`Row ${rowIndex + 1}, Column ${colIndex + 1}`}
            >
              {typeof cell === "number" ? cell.toFixed(2) : cell}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
