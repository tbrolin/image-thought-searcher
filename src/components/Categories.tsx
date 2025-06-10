
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Edit2, Save, X } from "lucide-react";
import { Category } from "./ImageAnalyzer";
import { useToast } from "@/hooks/use-toast";

interface CategoriesProps {
  categories: Category[];
  onUpdateCategories: (categories: Category[]) => void;
}

const Categories = ({ categories, onUpdateCategories }: CategoriesProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState({ name: "", keywords: "" });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const { toast } = useToast();

  const handleAddCategory = () => {
    if (!newCategory.name.trim() || !newCategory.keywords.trim()) {
      toast({
        title: "Validation Error",
        description: "Please provide both category name and keywords",
        variant: "destructive"
      });
      return;
    }

    const category: Category = {
      id: Date.now().toString(),
      name: newCategory.name.trim(),
      keywords: newCategory.keywords.split(',').map(k => k.trim()).filter(k => k)
    };

    onUpdateCategories([...categories, category]);
    setNewCategory({ name: "", keywords: "" });
    
    toast({
      title: "Category Added",
      description: `"${category.name}" has been added successfully`,
    });
  };

  const handleDeleteCategory = (id: string) => {
    const categoryName = categories.find(c => c.id === id)?.name;
    onUpdateCategories(categories.filter(c => c.id !== id));
    
    toast({
      title: "Category Deleted",
      description: `"${categoryName}" has been removed`,
    });
  };

  const handleEditStart = (category: Category) => {
    setEditingId(category.id);
    setEditingCategory({ ...category });
  };

  const handleEditSave = () => {
    if (!editingCategory) return;
    
    const updatedCategories = categories.map(c => 
      c.id === editingCategory.id ? editingCategory : c
    );
    
    onUpdateCategories(updatedCategories);
    setEditingId(null);
    setEditingCategory(null);
    
    toast({
      title: "Category Updated",
      description: `"${editingCategory.name}" has been updated successfully`,
    });
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingCategory(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Category Name</label>
              <Input
                placeholder="e.g., Sports & Recreation"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Keywords (comma-separated)</label>
              <Input
                placeholder="e.g., sports, athletic, fitness, competition"
                value={newCategory.keywords}
                onChange={(e) => setNewCategory({ ...newCategory, keywords: e.target.value })}
              />
            </div>
          </div>
          <Button onClick={handleAddCategory} className="w-full md:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardContent className="p-4">
              {editingId === category.id && editingCategory ? (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Category Name</label>
                      <Input
                        value={editingCategory.name}
                        onChange={(e) => setEditingCategory({ 
                          ...editingCategory, 
                          name: e.target.value 
                        })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Keywords</label>
                      <Input
                        value={editingCategory.keywords.join(', ')}
                        onChange={(e) => setEditingCategory({ 
                          ...editingCategory, 
                          keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                        })}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleEditSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleEditCancel}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditStart(category)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Categories;
