import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Upload } from "lucide-react";

function parseCSV(text: string): number[][] {
  return text
    .trim()
    .split(/\r?\n/)
    .map((row) =>
      row
        .split(/,|\s+/)
        .map((cell) => parseFloat(cell))
        .filter((v) => !isNaN(v))
    )
    .filter((row) => row.length > 0);
}

const PCADataInput: React.FC<{ onData: (data: number[][]) => void }> = ({ onData }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [manual, setManual] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target?.result as string;
        const data = parseCSV(text);
        if (data.length === 0) throw new Error("No data found");
        onData(data);
        setError(null);
      } catch (err: any) {
        setError("Invalid CSV: " + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleManual = () => {
    try {
      const data = parseCSV(manual);
      if (data.length === 0) throw new Error("No data found");
      onData(data);
      setError(null);
    } catch (err: any) {
      setError("Invalid input: " + err.message);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold mb-2">Input your data</h3>
      <div className="flex flex-col gap-2 mb-2">
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept=".csv,text/csv"
            ref={fileInputRef}
            onChange={handleFile}
            className="hidden"
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2"
          >
            <Upload className="w-4 h-4" /> Upload CSV
          </Button>
          {fileName && <span className="text-xs text-gray-600 ml-2">{fileName}</span>}
        </div>
        <textarea
          className="border rounded p-1 w-full min-h-[60px]"
          placeholder="Paste CSV or whitespace-separated data here"
          value={manual}
          onChange={e => setManual(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded"
          onClick={handleManual}
        >
          Use Manual Data
        </button>
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded"
          onClick={() => onData([[2, 3, 1], [3, 4, 2], [4, 5, 3], [5, 6, 4]])}
        >
          Use Sample Data
        </button>
        {error && <div className="text-red-600 text-xs">{error}</div>}
      </div>
    </div>
  );
};

export default PCADataInput; 