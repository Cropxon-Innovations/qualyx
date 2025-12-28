import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, FileSpreadsheet, X, CheckCircle2, AlertCircle, AlertTriangle } from "lucide-react";
import * as XLSX from "xlsx";

interface FileUploadProps {
  onUpload: (data: any[], fileName: string) => void;
  accept?: string;
  requiredColumns?: string[];
  maxRows?: number;
}

interface ValidationError {
  row: number;
  column: string;
  message: string;
  type: "error" | "warning";
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  validRows: number;
  invalidRows: number;
}

// Test case validation rules
const testCaseValidationRules = {
  requiredColumns: ["name", "description", "type", "priority"],
  optionalColumns: ["steps", "expected_result", "tags", "suite"],
  validTypes: ["ui", "api", "e2e", "unit", "integration"],
  validPriorities: ["low", "medium", "high", "critical"],
  maxNameLength: 100,
  maxDescriptionLength: 500,
};

const validateTestCaseData = (data: any[]): ValidationResult => {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  let validRows = 0;
  let invalidRows = 0;

  if (data.length === 0) {
    errors.push({
      row: 0,
      column: "file",
      message: "File contains no data rows",
      type: "error"
    });
    return { isValid: false, errors, warnings, validRows: 0, invalidRows: 0 };
  }

  // Check required columns exist
  const columns = Object.keys(data[0]).map(c => c.toLowerCase().trim());
  const missingColumns = testCaseValidationRules.requiredColumns.filter(
    col => !columns.includes(col.toLowerCase())
  );

  if (missingColumns.length > 0) {
    errors.push({
      row: 0,
      column: "headers",
      message: `Missing required columns: ${missingColumns.join(", ")}`,
      type: "error"
    });
  }

  // Validate each row
  data.forEach((row, index) => {
    let rowHasError = false;
    const rowNum = index + 2; // Account for header row and 0-indexing

    // Normalize keys to lowercase
    const normalizedRow: Record<string, any> = {};
    Object.keys(row).forEach(key => {
      normalizedRow[key.toLowerCase().trim()] = row[key];
    });

    // Check required fields
    testCaseValidationRules.requiredColumns.forEach(col => {
      const value = normalizedRow[col];
      if (value === undefined || value === null || String(value).trim() === "") {
        errors.push({
          row: rowNum,
          column: col,
          message: `Missing required field: ${col}`,
          type: "error"
        });
        rowHasError = true;
      }
    });

    // Validate name length
    if (normalizedRow.name && String(normalizedRow.name).length > testCaseValidationRules.maxNameLength) {
      errors.push({
        row: rowNum,
        column: "name",
        message: `Name exceeds ${testCaseValidationRules.maxNameLength} characters`,
        type: "error"
      });
      rowHasError = true;
    }

    // Validate description length
    if (normalizedRow.description && String(normalizedRow.description).length > testCaseValidationRules.maxDescriptionLength) {
      warnings.push({
        row: rowNum,
        column: "description",
        message: `Description exceeds ${testCaseValidationRules.maxDescriptionLength} characters`,
        type: "warning"
      });
    }

    // Validate type
    if (normalizedRow.type) {
      const type = String(normalizedRow.type).toLowerCase().trim();
      if (!testCaseValidationRules.validTypes.includes(type)) {
        errors.push({
          row: rowNum,
          column: "type",
          message: `Invalid type "${normalizedRow.type}". Valid types: ${testCaseValidationRules.validTypes.join(", ")}`,
          type: "error"
        });
        rowHasError = true;
      }
    }

    // Validate priority
    if (normalizedRow.priority) {
      const priority = String(normalizedRow.priority).toLowerCase().trim();
      if (!testCaseValidationRules.validPriorities.includes(priority)) {
        errors.push({
          row: rowNum,
          column: "priority",
          message: `Invalid priority "${normalizedRow.priority}". Valid priorities: ${testCaseValidationRules.validPriorities.join(", ")}`,
          type: "error"
        });
        rowHasError = true;
      }
    }

    // Check for duplicate names (warning only)
    const currentName = String(normalizedRow.name || "").toLowerCase().trim();
    const duplicates = data.filter((r, i) => {
      const otherName = String(Object.entries(r).find(([k]) => k.toLowerCase() === "name")?.[1] || "").toLowerCase().trim();
      return i !== index && otherName === currentName;
    });
    if (duplicates.length > 0 && currentName) {
      warnings.push({
        row: rowNum,
        column: "name",
        message: `Duplicate test case name detected`,
        type: "warning"
      });
    }

    if (rowHasError) {
      invalidRows++;
    } else {
      validRows++;
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    validRows,
    invalidRows
  };
};

export const FileUpload = ({ 
  onUpload, 
  accept = ".xlsx,.xls,.csv",
  requiredColumns,
  maxRows = 10000
}: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any[]>([]);
  const [allData, setAllData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const processFile = useCallback((file: File) => {
    setError(null);
    setValidation(null);
    setIsProcessing(true);

    // File size check (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit");
      setIsProcessing(false);
      return;
    }

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
          setIsProcessing(false);
          return;
        }

        if (jsonData.length > maxRows) {
          setError(`File contains ${jsonData.length} rows, maximum allowed is ${maxRows}`);
          setIsProcessing(false);
          return;
        }

        // Validate data
        const validationResult = validateTestCaseData(jsonData);
        setValidation(validationResult);
        
        setPreview(jsonData.slice(0, 5));
        setAllData(jsonData);
        setFile(file);
        setIsProcessing(false);
      } catch (err) {
        setError("Failed to parse file. Please check the format and try again.");
        setIsProcessing(false);
      }
    };
    
    reader.onerror = () => {
      setError("Failed to read file");
      setIsProcessing(false);
    };

    reader.readAsBinaryString(file);
  }, [maxRows]);

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

  const handleConfirmImport = () => {
    if (file && allData.length > 0) {
      onUpload(allData, file.name);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview([]);
    setAllData([]);
    setError(null);
    setValidation(null);
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
        } ${isProcessing ? "opacity-50 pointer-events-none" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <Upload className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-2">
          {isProcessing ? "Processing file..." : "Drag and drop your file here, or"}
        </p>
        <label>
          <input type="file" accept={accept} onChange={handleChange} className="hidden" disabled={isProcessing} />
          <Button variant="outline" asChild disabled={isProcessing}><span>Browse Files</span></Button>
        </label>
        <p className="text-xs text-muted-foreground mt-2">Supports Excel (.xlsx, .xls) and CSV files (max 10MB)</p>
        <p className="text-xs text-muted-foreground mt-1">
          Required columns: {testCaseValidationRules.requiredColumns.join(", ")}
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm p-3 rounded-lg bg-destructive/10">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {file && !error && validation && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="w-8 h-8 text-green-500" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{allData.length} rows detected</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {validation.isValid ? (
                  <Badge className="bg-green-500/20 text-green-500">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Valid
                  </Badge>
                ) : (
                  <Badge className="bg-destructive/20 text-destructive">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {validation.errors.length} Errors
                  </Badge>
                )}
                {validation.warnings.length > 0 && (
                  <Badge className="bg-amber-500/20 text-amber-500">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {validation.warnings.length} Warnings
                  </Badge>
                )}
                <Button size="sm" variant="ghost" onClick={handleReset}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Validation Summary */}
            <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-muted/20 rounded-lg">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">{validation.validRows}</p>
                <p className="text-xs text-muted-foreground">Valid Rows</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-destructive">{validation.invalidRows}</p>
                <p className="text-xs text-muted-foreground">Invalid Rows</p>
              </div>
            </div>

            {/* Errors */}
            {validation.errors.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-destructive mb-2">Errors ({validation.errors.length})</p>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {validation.errors.slice(0, 10).map((err, i) => (
                    <div key={i} className="text-xs p-2 bg-destructive/10 rounded flex items-start gap-2">
                      <AlertCircle className="w-3 h-3 text-destructive flex-shrink-0 mt-0.5" />
                      <span>
                        {err.row > 0 && <span className="font-medium">Row {err.row}: </span>}
                        {err.message}
                      </span>
                    </div>
                  ))}
                  {validation.errors.length > 10 && (
                    <p className="text-xs text-muted-foreground text-center">
                      ...and {validation.errors.length - 10} more errors
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Warnings */}
            {validation.warnings.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-amber-500 mb-2">Warnings ({validation.warnings.length})</p>
                <div className="max-h-24 overflow-y-auto space-y-1">
                  {validation.warnings.slice(0, 5).map((warn, i) => (
                    <div key={i} className="text-xs p-2 bg-amber-500/10 rounded flex items-start gap-2">
                      <AlertTriangle className="w-3 h-3 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>
                        <span className="font-medium">Row {warn.row}: </span>
                        {warn.message}
                      </span>
                    </div>
                  ))}
                  {validation.warnings.length > 5 && (
                    <p className="text-xs text-muted-foreground text-center">
                      ...and {validation.warnings.length - 5} more warnings
                    </p>
                  )}
                </div>
              </div>
            )}
            
            {/* Preview */}
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

            {/* Import Button */}
            <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
              <Button variant="outline" onClick={handleReset}>Cancel</Button>
              <Button 
                onClick={handleConfirmImport} 
                disabled={!validation.isValid}
                className={validation.isValid ? "bg-primary" : ""}
              >
                {validation.isValid ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Import {validation.validRows} Test Cases
                  </>
                ) : (
                  "Fix Errors to Import"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
