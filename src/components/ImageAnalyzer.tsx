
import { useState } from "react";
import ImageUpload from "./ImageUpload";
import SearchTerms from "./SearchTerms";
import Categories from "./Categories";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setAnalysisResult(null);
    analyzeImage(imageUrl);
  };

  const handleCategoriesUpdate = (updatedCategories: Category[]) => {
    setCategories(updatedCategories);
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
            <ImageUpload onImageUpload={handleImageUpload} />
            
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
