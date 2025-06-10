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
      id: "nature",
      name: "Nature & Landscape",
      keywords: ["landscape", "mountain", "forest", "ocean", "sunset", "wildlife", "trees", "flowers", "scenic", "natural"]
    },
    {
      id: "technology",
      name: "Technology",
      keywords: ["computer", "smartphone", "software", "digital", "innovation", "tech", "device", "electronic", "modern", "gadget"]
    },
    {
      id: "food",
      name: "Food & Dining",
      keywords: ["restaurant", "cuisine", "cooking", "recipe", "delicious", "meal", "dining", "ingredients", "chef", "gourmet"]
    },
    {
      id: "fashion",
      name: "Fashion & Style",
      keywords: ["clothing", "style", "fashion", "trendy", "outfit", "designer", "apparel", "accessories", "wardrobe", "chic"]
    },
    {
      id: "business",
      name: "Business & Work",
      keywords: ["office", "professional", "meeting", "corporate", "business", "workspace", "team", "productivity", "strategy", "success"]
    },
    {
      id: "travel",
      name: "Travel & Adventure",
      keywords: ["travel", "vacation", "destination", "adventure", "tourism", "journey", "exploration", "culture", "landmark", "exotic"]
    }
  ]);

  const analyzeImage = async (imageUrl: string) => {
    setIsAnalyzing(true);
    
    try {
      // Simulate AI analysis - in a real app, this would call an AI service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock analysis result based on categories
      const mockResult: AnalysisResult = {
        searchTerms: [
          "modern architecture",
          "urban design", 
          "contemporary building",
          "glass facade",
          "city skyline",
          "structural engineering"
        ],
        confidence: 0.92,
        categories: ["Architecture", "Urban Planning", "Design"],
        description: "This image appears to show modern architectural elements with clean lines and contemporary design features."
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
      // Mock search functionality - generate search terms based on query
      const mockResult: AnalysisResult = {
        searchTerms: [
          searchQuery,
          `${searchQuery} related`,
          `${searchQuery} concept`,
          `${searchQuery} ideas`,
          `${searchQuery} trends`
        ],
        confidence: 0.85,
        categories: ["Search Results"],
        description: `Search results for: ${searchQuery}`
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
