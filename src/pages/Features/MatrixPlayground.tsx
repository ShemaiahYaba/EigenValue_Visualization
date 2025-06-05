import { MatrixProvider } from "@/contexts/MatrixProvider";
import MatrixPlayground from "@/components/GraphingTools/PlaygroundInner";

const MatrixPlaygroundPage: React.FC = () => {
  return (
    <MatrixProvider>
      <MatrixPlayground />
    </MatrixProvider>
  );
};

export default MatrixPlaygroundPage;
