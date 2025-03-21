import { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const MatrixInput = () => {
  const [size, setSize] = useState(2); // Default matrix size
  const [matrix, setMatrix] = useState<number[][]>(
    Array(2).fill(Array(2).fill(0))
  );
  const [eigenvalues, setEigenvalues] = useState<number[]>([]);
  const [eigenvectors, setEigenvectors] = useState<number[][]>([]);
  const [plotData, setPlotData] = useState<{
    data: Plotly.Data[];
    layout: Partial<Plotly.Layout>;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws");

    ws.onopen = () => {
      console.log("WebSocket Connected");
      ws.send(JSON.stringify({ matrix }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.error) {
        setError(data.error);
        setEigenvalues([]);
        setEigenvectors([]);
        setPlotData(null);
      } else {
        setError(null);
        setEigenvalues(data.eigenvalues);
        setEigenvectors(data.eigenvectors);
        setPlotData(JSON.parse(data.plot));
      }
    };

    return () => ws.close();
  }, [matrix]);

  const handleChange = (row: number, col: number, value: string) => {
    const newMatrix = matrix.map((r, i) =>
      i === row ? r.map((c, j) => (j === col ? parseFloat(value) || 0 : c)) : r
    );
    setMatrix(newMatrix);
  };

  const updateSize = (newSize: number) => {
    setSize(newSize);
    setMatrix(
      Array(newSize)
        .fill(0)
        .map(() => Array(newSize).fill(0))
    );
  };

  return (
    <div>
      <h2>Enter Matrix (2×2 to 4×4)</h2>

      <label>Matrix Size: </label>
      <select
        value={size}
        onChange={(e) => updateSize(parseInt(e.target.value))}
      >
        <option value={2}>2×2</option>
        <option value={3}>3×3</option>
        <option value={4}>4×4</option>
      </select>

      <div>
        {matrix.map((row, i) => (
          <div key={i}>
            {row.map((val, j) => (
              <input
                key={j}
                type="number"
                value={val}
                onChange={(e) => handleChange(i, j, e.target.value)}
                style={{ width: "50px", margin: "5px" }}
              />
            ))}
          </div>
        ))}
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Eigenvalues:</h3>
      <p>{JSON.stringify(eigenvalues)}</p>

      {plotData && <Plot data={plotData.data} layout={plotData.layout} />}
    </div>
  );
};

export default MatrixInput;
