
import ImageAnalyzer from "@/components/ImageAnalyzer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Image Analyzer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload an image and get intelligent search terms based on our curated categories. 
            Perfect for content creators, marketers, and researchers.
          </p>
        </div>
        <ImageAnalyzer />
      </div>
    </div>
  );
};

export default Index;
