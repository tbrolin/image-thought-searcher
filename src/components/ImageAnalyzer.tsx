
import { useState } from "react";
import ImageUpload from "./ImageUpload";
import SearchTerms from "./SearchTerms";
import Categories from "./Categories";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export interface Category {
  id: string;
  name: string;
  keywords: string[];
}

export interface AnalysisResult {
  searchTerms: string[];
  confidence: number;
  categories: string[];
  description: string;
}

const ImageAnalyzer = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "womens-clothing",
      name: "Women's Clothing",
      keywords: ["dress", "blouse", "skirt", "jeans", "sweater", "cardigan", "blazer", "jacket", "coat", "trousers"]
    },
    {
      id: "mens-clothing",
      name: "Men's Clothing",
      keywords: ["shirt", "polo", "hoodie", "jeans", "chinos", "suit", "blazer", "jacket", "coat", "sweater"]
    },
    {
      id: "accessories",
      name: "Accessories",
      keywords: ["bag", "handbag", "belt", "scarf", "hat", "gloves", "jewelry", "watch", "sunglasses", "wallet"]
    },
    {
      id: "footwear",
      name: "Footwear",
      keywords: ["sneakers", "boots", "heels", "flats", "sandals", "loafers", "oxfords", "trainers", "pumps", "slides"]
    },
    {
      id: "outerwear",
      name: "Outerwear",
      keywords: ["coat", "jacket", "blazer", "cardigan", "puffer", "parka", "trench", "bomber", "denim", "leather"]
    },
    {
      id: "knitwear",
      name: "Knitwear",
      keywords: ["sweater", "jumper", "cardigan", "pullover", "turtleneck", "hoodie", "knit", "cashmere", "wool", "cotton"]
    }
  ]);

  const analyzeImage = async (imageUrl: string) => {
    setIsAnalyzing(true);
    
    try {
      // Simulate AI analysis - in a real app, this would call an AI service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock analysis result with fashion search terms
      const mockResult: AnalysisResult = {
        searchTerms: [
          "blazer",
          "jacket", 
          "formal",
          "navy",
          "tailored",
          "business"
        ],
        confidence: 0.92,
        categories: ["Men's Clothing", "Outerwear", "Business"],
        description: "This image appears to show a navy blazer or formal jacket with tailored fit, suitable for business or formal occasions."
      };
      
      setAnalysisResult(mockResult);
      // Auto-fill search field with the first search term
      setSearchQuery(mockResult.searchTerms[0] || "");
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setAnalysisResult(null);
    setIsUploadDialogOpen(false);
    analyzeImage(imageUrl);
  };

  const handleCategoriesUpdate = (updatedCategories: Category[]) => {
    setCategories(updatedCategories);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Mock search functionality - generate fashion search terms based on query
      const mockResult: AnalysisResult = {
        searchTerms: [
          searchQuery,
          "clothing",
          "fashion",
          "style",
          "apparel"
        ],
        confidence: 0.85,
        categories: ["Search Results"],
        description: `Fashion search results for: ${searchQuery}`
      };
      setAnalysisResult(mockResult);
      setUploadedImage(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-xl">
        <Tabs defaultValue="analyzer" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="analyzer">Image Analyzer</TabsTrigger>
            <TabsTrigger value="categories">Manage Categories</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analyzer" className="space-y-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Enter search terms or upload an image to analyze..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10 pr-12"
                />
                <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Upload Image for Analysis</DialogTitle>
                    </DialogHeader>
                    <ImageUpload onImageUpload={handleImageUpload} />
                  </DialogContent>
                </Dialog>
              </div>
              <Button onClick={handleSearch} disabled={!searchQuery.trim()}>
                Search
              </Button>
            </div>
            
            {uploadedImage && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Uploaded Image</h3>
                  <div className="rounded-lg overflow-hidden border">
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded for analysis"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
                
                <SearchTerms 
                  result={analysisResult}
                  isAnalyzing={isAnalyzing}
                />
              </div>
            )}

            {analysisResult && !uploadedImage && (
              <SearchTerms 
                result={analysisResult}
                isAnalyzing={isAnalyzing}
              />
            )}
          </TabsContent>
          
          <TabsContent value="categories">
            <Categories 
              categories={categories}
              onUpdateCategories={handleCategoriesUpdate}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ImageAnalyzer;
