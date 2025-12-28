import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Server,
  TrendingUp,
  ArrowRight,
  Circle,
  Code2,
  Import,
  GitMerge,
  Activity,
  BarChart3,
  Download,
  Upload,
  FileSpreadsheet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ConsoleLayout } from "@/components/console/ConsoleLayout";
import { FileUpload } from "@/components/console/FileUpload";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Mock data
const kpiData = {
  totalTests: 2847,
  passed: 2634,
  failed: 89,
  flaky: 124,
  activeEnvs: 4,
  activeRunners: 12,
  lastRun: "2 minutes ago",
  avgDuration: "3.2s"
};

const stabilityData = [
  { day: "Mon", passRate: 92, tests: 180 },
  { day: "Tue", passRate: 94, tests: 195 },
  { day: "Wed", passRate: 91, tests: 210 },
  { day: "Thu", passRate: 95, tests: 188 },
  { day: "Fri", passRate: 93, tests: 220 },
  { day: "Sat", passRate: 96, tests: 150 },
  { day: "Sun", passRate: 97, tests: 165 },
];

const failuresByComponent = [
  { name: "Checkout", failures: 23, color: "#ef4444" },
  { name: "Auth", failures: 15, color: "#f97316" },
  { name: "Search", failures: 12, color: "#eab308" },
  { name: "Cart", failures: 8, color: "#22c55e" },
  { name: "Profile", failures: 5, color: "#3b82f6" },
];

const coverageData = [
  { name: "UI Tests", value: 127, color: "#3b82f6" },
  { name: "API Tests", value: 53, color: "#22c55e" },
  { name: "E2E Tests", value: 45, color: "#8b5cf6" },
  { name: "Unit Tests", value: 89, color: "#f59e0b" },
];

const trendData = [
  { week: "W1", passed: 85, failed: 12, flaky: 3 },
  { week: "W2", passed: 88, failed: 10, flaky: 2 },
  { week: "W3", passed: 82, failed: 15, flaky: 3 },
  { week: "W4", passed: 90, failed: 8, flaky: 2 },
  { week: "W5", passed: 92, failed: 6, flaky: 2 },
  { week: "W6", passed: 94, failed: 5, flaky: 1 },
];

const recentRuns = [
  { id: "run-001", suite: "Auth Flow", status: "passed", tests: 24, duration: "1m 32s", time: "2 min ago" },
  { id: "run-002", suite: "Checkout E2E", status: "failed", tests: 18, duration: "2m 15s", time: "5 min ago" },
  { id: "run-003", suite: "API Health", status: "passed", tests: 45, duration: "45s", time: "12 min ago" },
  { id: "run-004", suite: "User Profile", status: "flaky", tests: 12, duration: "58s", time: "18 min ago" },
  { id: "run-005", suite: "Dashboard UI", status: "passed", tests: 32, duration: "1m 48s", time: "25 min ago" },
];

const activityFeed = [
  { type: "record", message: "Sarah recorded 'Login Flow Test'", time: "3 min ago", user: "SC" },
  { type: "run", message: "CI triggered 'Smoke Tests' suite", time: "8 min ago", user: "CI" },
  { type: "alert", message: "Runner us-east-1 back online", time: "15 min ago", user: "SYS" },
  { type: "fail", message: "Test 'Checkout Payment' failed", time: "22 min ago", user: "CI" },
  { type: "create", message: "Mike created API test 'User CRUD'", time: "35 min ago", user: "MJ" },
];

const KPICard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  color = "primary"
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  trend?: string;
  color?: "primary" | "success" | "destructive" | "warning";
}) => (
  <Card className="bg-card/50 border-border/40">
    <CardContent className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        <div className={`p-2 rounded-lg bg-${color}/10`}>
          <Icon className={`w-5 h-5 text-${color}`} />
        </div>
      </div>
      {trend && (
        <div className="mt-2 flex items-center gap-1 text-xs text-green-400">
          <TrendingUp className="w-3 h-3" />
          {trend}
        </div>
      )}
    </CardContent>
  </Card>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 border border-border/50 rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs text-muted-foreground">
            {entry.name}: <span style={{ color: entry.color }}>{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const ConsoleDashboard = () => {
  const [time, setTime] = useState(new Date());
  const [importDialogOpen, setImportDialogOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleImportData = (data: any[], fileName: string) => {
    toast({
      title: "Data Imported Successfully",
      description: `Imported ${data.length} records from ${fileName}`,
    });
    setImportDialogOpen(false);
  };

  const handleExportExcel = () => {
    // Create CSV data
    const csvData = [
      ["Metric", "Value"],
      ["Total Tests", kpiData.totalTests],
      ["Passed", kpiData.passed],
      ["Failed", kpiData.failed],
      ["Flaky", kpiData.flaky],
      ["Pass Rate", ((kpiData.passed / kpiData.totalTests) * 100).toFixed(1) + "%"],
      [""],
      ["Stability Trend"],
      ["Day", "Pass Rate", "Tests"],
      ...stabilityData.map(d => [d.day, d.passRate + "%", d.tests]),
      [""],
      ["Failures by Component"],
      ["Component", "Failures"],
      ...failuresByComponent.map(d => [d.name, d.failures]),
    ];
    
    const csvContent = csvData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `qualyx-dashboard-report-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    toast({
      title: "Excel Export Complete",
      description: "Dashboard report exported successfully",
    });
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    let yPos = margin;

    // Helper function to add page header
    const addHeader = () => {
      doc.setFillColor(37, 99, 235); // Primary blue
      doc.rect(0, 0, pageWidth, 35, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("QUALYX", margin, 18);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Test Automation Dashboard Report", margin, 27);
      doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth - margin - 60, 27);
      yPos = 50;
    };

    // Helper to check page break
    const checkPageBreak = (neededSpace: number) => {
      if (yPos + neededSpace > pageHeight - margin) {
        doc.addPage();
        addHeader();
      }
    };

    // Page 1: Summary
    addHeader();
    
    // Executive Summary Section
    doc.setTextColor(37, 99, 235);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Executive Summary", margin, yPos);
    yPos += 10;

    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;

    // KPI Cards
    const passRate = ((kpiData.passed / kpiData.totalTests) * 100).toFixed(1);
    const kpis = [
      { label: "Total Tests", value: kpiData.totalTests.toString(), color: [37, 99, 235] },
      { label: "Passed", value: `${kpiData.passed} (${passRate}%)`, color: [34, 197, 94] },
      { label: "Failed", value: kpiData.failed.toString(), color: [239, 68, 68] },
      { label: "Flaky", value: kpiData.flaky.toString(), color: [245, 158, 11] },
    ];

    const cardWidth = (pageWidth - margin * 2 - 15) / 4;
    kpis.forEach((kpi, index) => {
      const x = margin + index * (cardWidth + 5);
      doc.setFillColor(kpi.color[0], kpi.color[1], kpi.color[2]);
      doc.roundedRect(x, yPos, cardWidth, 25, 3, 3, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(kpi.label, x + 5, yPos + 8);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(kpi.value, x + 5, yPos + 19);
    });
    yPos += 35;

    // Stability Trend Table
    doc.setTextColor(37, 99, 235);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("7-Day Stability Trend", margin, yPos);
    yPos += 8;

    autoTable(doc, {
      startY: yPos,
      head: [['Day', 'Pass Rate', 'Total Tests', 'Status']],
      body: stabilityData.map(d => [
        d.day,
        `${d.passRate}%`,
        d.tests.toString(),
        d.passRate >= 95 ? '✓ Excellent' : d.passRate >= 90 ? '○ Good' : '✗ Needs Attention'
      ]),
      headStyles: { 
        fillColor: [37, 99, 235],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      styles: { fontSize: 9, cellPadding: 3 },
      margin: { left: margin, right: margin },
    });

    yPos = (doc as any).lastAutoTable.finalY + 15;

    // Failures by Component
    checkPageBreak(80);
    doc.setTextColor(37, 99, 235);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Failures by Component", margin, yPos);
    yPos += 8;

    autoTable(doc, {
      startY: yPos,
      head: [['Component', 'Failures', 'Priority', 'Trend']],
      body: failuresByComponent.map((d, i) => [
        d.name,
        d.failures.toString(),
        i < 2 ? 'High' : i < 3 ? 'Medium' : 'Low',
        i < 2 ? '↑ Increasing' : '↓ Decreasing'
      ]),
      headStyles: { 
        fillColor: [239, 68, 68],
        textColor: 255,
        fontStyle: 'bold'
      },
      bodyStyles: { fontSize: 9 },
      alternateRowStyles: { fillColor: [254, 242, 242] },
      margin: { left: margin, right: margin },
    });

    yPos = (doc as any).lastAutoTable.finalY + 15;

    // Test Coverage
    checkPageBreak(80);
    doc.setTextColor(37, 99, 235);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Test Coverage Breakdown", margin, yPos);
    yPos += 8;

    const totalCoverage = coverageData.reduce((acc, d) => acc + d.value, 0);
    autoTable(doc, {
      startY: yPos,
      head: [['Test Type', 'Count', 'Percentage', 'Status']],
      body: coverageData.map(d => [
        d.name,
        d.value.toString(),
        `${((d.value / totalCoverage) * 100).toFixed(1)}%`,
        '✓ Active'
      ]),
      headStyles: { 
        fillColor: [34, 197, 94],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: { fillColor: [240, 253, 244] },
      styles: { fontSize: 9 },
      margin: { left: margin, right: margin },
    });

    yPos = (doc as any).lastAutoTable.finalY + 15;

    // Weekly Trend
    checkPageBreak(80);
    doc.setTextColor(37, 99, 235);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("6-Week Performance Trend", margin, yPos);
    yPos += 8;

    autoTable(doc, {
      startY: yPos,
      head: [['Week', 'Passed', 'Failed', 'Flaky', 'Success Rate']],
      body: trendData.map(d => [
        d.week,
        d.passed.toString(),
        d.failed.toString(),
        d.flaky.toString(),
        `${((d.passed / (d.passed + d.failed + d.flaky)) * 100).toFixed(1)}%`
      ]),
      headStyles: { 
        fillColor: [139, 92, 246],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: { fillColor: [245, 243, 255] },
      styles: { fontSize: 9 },
      margin: { left: margin, right: margin },
    });

    yPos = (doc as any).lastAutoTable.finalY + 15;

    // Recent Runs
    checkPageBreak(80);
    doc.setTextColor(37, 99, 235);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Recent Test Runs", margin, yPos);
    yPos += 8;

    autoTable(doc, {
      startY: yPos,
      head: [['Suite', 'Status', 'Tests', 'Duration', 'Time']],
      body: recentRuns.map(run => [
        run.suite,
        run.status.charAt(0).toUpperCase() + run.status.slice(1),
        run.tests.toString(),
        run.duration,
        run.time
      ]),
      headStyles: { 
        fillColor: [37, 99, 235],
        textColor: 255,
        fontStyle: 'bold'
      },
      bodyStyles: { fontSize: 9 },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      margin: { left: margin, right: margin },
      didParseCell: (data) => {
        if (data.section === 'body' && data.column.index === 1) {
          const value = data.cell.raw as string;
          if (value === 'Passed') {
            data.cell.styles.textColor = [34, 197, 94];
          } else if (value === 'Failed') {
            data.cell.styles.textColor = [239, 68, 68];
          } else if (value === 'Flaky') {
            data.cell.styles.textColor = [245, 158, 11];
          }
        }
      }
    });

    // Footer
    const addFooter = (pageNum: number) => {
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text(
        `Page ${pageNum} | QUALYX Test Automation Platform | Confidential`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    };

    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      addFooter(i);
    }

    doc.save(`qualyx-dashboard-report-${new Date().toISOString().split('T')[0]}.pdf`);
    
    toast({
      title: "PDF Export Complete",
      description: "Professional report generated successfully",
    });
  };

  return (
    <ConsoleLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Command Center</h1>
            <p className="text-sm text-muted-foreground">
              Last updated: {time.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExportExcel}>
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportPDF}>
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Data
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Import Test Data</DialogTitle>
                </DialogHeader>
                <FileUpload onUpload={handleImportData} />
              </DialogContent>
            </Dialog>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Play className="w-4 h-4 mr-2" />
              Run All Tests
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <KPICard 
            title="Total Tests" 
            value={kpiData.totalTests.toLocaleString()} 
            icon={BarChart3}
            trend="+12% this week"
          />
          <KPICard 
            title="Passed" 
            value={kpiData.passed.toLocaleString()} 
            subtitle={`${((kpiData.passed / kpiData.totalTests) * 100).toFixed(1)}%`}
            icon={CheckCircle2}
            color="success"
          />
          <KPICard 
            title="Failed" 
            value={kpiData.failed} 
            icon={XCircle}
            color="destructive"
          />
          <KPICard 
            title="Flaky" 
            value={kpiData.flaky} 
            icon={AlertTriangle}
            color="warning"
          />
          <KPICard 
            title="Active Runners" 
            value={kpiData.activeRunners} 
            subtitle="across 4 regions"
            icon={Server}
            color="primary"
          />
          <KPICard 
            title="Avg Duration" 
            value={kpiData.avgDuration} 
            subtitle="per test"
            icon={Clock}
            color="primary"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Stability Trend Chart */}
          <Card className="lg:col-span-2 bg-card/50 border-border/40">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Stability Trend</CardTitle>
                  <CardDescription>Pass rate over last 7 days</CardDescription>
                </div>
                <span className="text-2xl font-bold text-green-400">97.2%</span>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={stabilityData}>
                  <defs>
                    <linearGradient id="colorPassRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[85, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="passRate" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorPassRate)" 
                    name="Pass Rate %"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Coverage Pie Chart */}
          <Card className="bg-card/50 border-border/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Test Coverage</CardTitle>
              <CardDescription>By test type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={coverageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {coverageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={{ fontSize: '12px' }}
                    formatter={(value) => <span className="text-muted-foreground">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Failures by Component */}
          <Card className="bg-card/50 border-border/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Failures by Component</CardTitle>
              <CardDescription>Top 5 failing areas</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={failuresByComponent} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} horizontal={false} />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="failures" radius={[0, 4, 4, 0]} name="Failures">
                    {failuresByComponent.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Trend Analysis */}
          <Card className="bg-card/50 border-border/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Weekly Trend</CardTitle>
              <CardDescription>Test results over 6 weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="passed" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e' }} name="Passed" />
                  <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444' }} name="Failed" />
                  <Line type="monotone" dataKey="flaky" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b' }} name="Flaky" />
                  <Legend 
                    wrapperStyle={{ fontSize: '12px' }}
                    formatter={(value) => <span className="text-muted-foreground">{value}</span>}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Activity */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="bg-card/50 border-border/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/console/create/record">
                <Button variant="outline" className="w-full justify-start gap-3 h-12">
                  <div className="p-1.5 rounded bg-primary/10">
                    <Circle className="w-4 h-4 text-primary" />
                  </div>
                  <span>Record UI Test</span>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </Button>
              </Link>
              <Link to="/console/create/api">
                <Button variant="outline" className="w-full justify-start gap-3 h-12">
                  <div className="p-1.5 rounded bg-green-500/10">
                    <Code2 className="w-4 h-4 text-green-400" />
                  </div>
                  <span>Add API Test</span>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </Button>
              </Link>
              <Link to="/console/create/import">
                <Button variant="outline" className="w-full justify-start gap-3 h-12">
                  <div className="p-1.5 rounded bg-amber-500/10">
                    <Import className="w-4 h-4 text-amber-400" />
                  </div>
                  <span>Import Suite</span>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </Button>
              </Link>
              <Link to="/console/execute/cicd">
                <Button variant="outline" className="w-full justify-start gap-3 h-12">
                  <div className="p-1.5 rounded bg-muted">
                    <GitMerge className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span>Connect CI/CD</span>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Runs */}
          <Card className="bg-card/50 border-border/40">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Runs</CardTitle>
                <Link to="/console/execute/runs">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentRuns.map((run) => (
                  <div 
                    key={run.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {run.status === "passed" ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      ) : run.status === "failed" ? (
                        <XCircle className="w-5 h-5 text-red-400" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-400" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-foreground">{run.suite}</p>
                        <p className="text-xs text-muted-foreground">{run.tests} tests • {run.duration}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{run.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card className="bg-card/50 border-border/40">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Activity Feed</CardTitle>
                <Activity className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activityFeed.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                      item.type === "fail" ? "bg-red-500/20 text-red-400" :
                      item.type === "alert" ? "bg-amber-500/20 text-amber-400" :
                      item.type === "run" ? "bg-primary/20 text-primary" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {item.user}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{item.message}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Runner Status */}
        <Card className="bg-card/50 border-border/40">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Runner Fleet</CardTitle>
                <CardDescription>12 active runners across 4 regions</CardDescription>
              </div>
              <Link to="/console/execute/runners">
                <Button variant="outline" size="sm">Manage Runners</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { region: "us-east-1", runners: 4, load: 72, status: "healthy" },
                { region: "eu-west-1", runners: 3, load: 45, status: "healthy" },
                { region: "ap-south-1", runners: 3, load: 68, status: "healthy" },
                { region: "on-prem", runners: 2, load: 23, status: "idle" },
              ].map((region) => (
                <div key={region.region} className="p-4 rounded-xl border border-border/40 bg-muted/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{region.region}</span>
                    <span className={`w-2 h-2 rounded-full ${
                      region.status === "healthy" ? "bg-green-400" : "bg-muted-foreground"
                    }`} />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{region.runners}</div>
                  <div className="text-xs text-muted-foreground mb-2">runners</div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all"
                      style={{ width: `${region.load}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{region.load}% load</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ConsoleLayout>
  );
};

export default ConsoleDashboard;
