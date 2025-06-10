
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Download, Loader2, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnalysisResult } from "./ImageAnalyzer";

interface SearchTermsProps {
  result: AnalysisResult | null;
  isAnalyzing: boolean;
}

const SearchTerms = ({ result, isAnalyzing }: SearchTermsProps) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Search terms have been copied to your clipboard",
    });
  };

  const downloadTerms = () => {
    if (!result) return;
    
    const content = `Image Analysis Results\n\nDescription: ${result.description}\n\nSearch Terms:\n${result.searchTerms.join('\n')}\n\nCategories:\n${result.categories.join('\n')}\n\nConfidence: ${(result.confidence * 100).toFixed(1)}%`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'image-analysis-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: "Analysis results have been downloaded",
    });
  };

  const searchOnArket = () => {
    if (!result) return;
    
    const searchTerms = result.searchTerms.join(' ');
    const searchUrl = `https://www.arket.com/en-dk/search?search=${encodeURIComponent(searchTerms)}`;
    window.open(searchUrl, '_blank');
    
    toast({
      title: "Searching on Arket",
      description: "Opening Arket search in a new tab",
    });
  };

  if (isAnalyzing) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <div className="text-center">
              <h3 className="font-semibold mb-2">Analyzing Image</h3>
              <p className="text-muted-foreground text-sm">
                Our AI is processing your image to generate relevant search terms...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Analysis Results
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(result.searchTerms.join(', '))}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadTerms}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                size="sm"
                onClick={searchOnArket}
                className="bg-primary hover:bg-primary/90"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Search on Arket
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Description</h4>
            <p className="text-muted-foreground">{result.description}</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Confidence Score</h4>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${result.confidence * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium">{(result.confidence * 100).toFixed(1)}%</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Detected Categories</h4>
            <div className="flex flex-wrap gap-2">
              {result.categories.map((category, index) => (
                <Badge key={index} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Generated Search Terms</h4>
            <div className="flex flex-wrap gap-2">
              {result.searchTerms.map((term, index) => (
                <Badge 
                  key={index} 
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => copyToClipboard(term)}
                >
                  {term}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Click on any term to copy it individually
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchTerms;
