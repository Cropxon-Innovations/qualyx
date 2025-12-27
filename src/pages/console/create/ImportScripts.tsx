import { ConsoleLayout } from "@/components/console/ConsoleLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/console/FileUpload";
import { Import, FileCode, Folder } from "lucide-react";

const ImportScripts = () => {
  return (
    <ConsoleLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Import Scripts</h1>
          <p className="text-muted-foreground">Import test cases from external files or frameworks</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Import className="w-5 h-5" />
                Upload Test Files
              </CardTitle>
              <CardDescription>
                Import test cases from Excel, CSV, or JSON files
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload 
                onUpload={(data, fileName) => {
                  console.log("Uploaded:", fileName, data);
                }}
                accept=".xlsx,.xls,.csv,.json"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="w-5 h-5" />
                Import from Framework
              </CardTitle>
              <CardDescription>
                Convert existing tests from popular frameworks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <img src="https://playwright.dev/img/playwright-logo.svg" alt="Playwright" className="w-5 h-5 mr-2" />
                Import from Playwright
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <img src="https://www.cypress.io/images/logos/cypress-logo.svg" alt="Cypress" className="w-5 h-5 mr-2" />
                Import from Cypress
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <img src="https://www.selenium.dev/images/selenium_logo_square_green.png" alt="Selenium" className="w-5 h-5 mr-2" />
                Import from Selenium
              </Button>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Folder className="w-5 h-5" />
                Recent Imports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                No recent imports. Upload a file to get started.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ConsoleLayout>
  );
};

export default ImportScripts;
