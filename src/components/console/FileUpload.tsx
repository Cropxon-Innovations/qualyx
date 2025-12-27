import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, FileSpreadsheet, X, CheckCircle2, AlertCircle } from "lucide-react";
import * as XLSX from "xlsx";

interface FileUploadProps {
  onUpload: (data: any[], fileName: string) => void;
  accept?: string;
}

export const FileUpload = ({ onUpload, accept = ".xlsx,.xls,.csv" }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback((file: File) => {
    setError(null);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        
        if (jsonData.length === 0) {
          setError("File is empty or has no valid data");
          return;
        }
        
        setPreview(jsonData.slice(0, 5));
        setFile(file);
        onUpload(jsonData, file.name);
      } catch (err) {
        setError("Failed to parse file. Please check the format.");
      }
    };
    
    reader.readAsBinaryString(file);
  }, [onUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) processFile(droppedFile);
  }, [processFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) processFile(selectedFile);
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <Upload className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-2">
          Drag and drop your file here, or
        </p>
        <label>
          <input type="file" accept={accept} onChange={handleChange} className="hidden" />
          <Button variant="outline" asChild><span>Browse Files</span></Button>
        </label>
        <p className="text-xs text-muted-foreground mt-2">Supports Excel (.xlsx, .xls) and CSV files</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {file && !error && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="w-8 h-8 text-green-500" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{preview.length}+ rows detected</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500/20 text-green-500">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Valid
                </Badge>
                <Button size="sm" variant="ghost" onClick={() => { setFile(null); setPreview([]); }}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {preview.length > 0 && (
              <div className="overflow-x-auto">
                <p className="text-xs text-muted-foreground mb-2">Preview (first 5 rows):</p>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b">
                      {Object.keys(preview[0]).map((key) => (
                        <th key={key} className="text-left py-2 px-2 font-medium">{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {preview.map((row, i) => (
                      <tr key={i} className="border-b">
                        {Object.values(row).map((val, j) => (
                          <td key={j} className="py-2 px-2 truncate max-w-[150px]">{String(val)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
