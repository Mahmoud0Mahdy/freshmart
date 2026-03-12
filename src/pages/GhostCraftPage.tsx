import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Plus, Minus, ShoppingCart, Sparkles, Edit2, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Switch } from '../components/ui/switch';
import { Slider } from '../components/ui/slider';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Card } from '../components/ui/card';
import { useApp } from '../contexts/AppContext';
import { Product } from '../contexts/AppContext';
import { toast } from 'sonner@2.0.3';

export function GhostCraftPage() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  
  // Food description
  const [foodName, setFoodName] = useState('');
  
  // Preferences
  const [allergies, setAllergies] = useState<string[]>([]);
  const [dietary, setDietary] = useState<string[]>([]);
  const [spiciness, setSpiciness] = useState(3);
  const [saltiness, setSaltiness] = useState(3);
  const [portionSize, setPortionSize] = useState('medium');
  const [cookingMethod, setCookingMethod] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // Order preview
  const [showPreview, setShowPreview] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Available options
  const allergyOptions = [
    'Dairy',
    'Eggs',
    'Fish',
    'Shellfish',
    'Tree Nuts',
    'Peanuts',
    'Wheat',
    'Soy',
  ];
  
  const dietaryOptions = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Keto',
    'Paleo',
    'Low-Carb',
    'High-Protein',
  ];
  
  const portionOptions = [
    { value: 'small', label: 'Small (1-2 servings)', price: 12.99 },
    { value: 'medium', label: 'Medium (3-4 servings)', price: 18.99 },
    { value: 'large', label: 'Large (5-6 servings)', price: 24.99 },
    { value: 'family', label: 'Family (7-8 servings)', price: 32.99 },
  ];
  
  const cookingMethods = [
    'Grilled',
    'Baked',
    'Fried',
    'Steamed',
    'Roasted',
    'Sautéed',
    'Raw',
    'Slow-Cooked',
  ];

  const toggleAllergy = (allergy: string) => {
    setAllergies(prev =>
      prev.includes(allergy)
        ? prev.filter(a => a !== allergy)
        : [...prev, allergy]
    );
  };

  const toggleDietary = (diet: string) => {
    setDietary(prev =>
      prev.includes(diet)
        ? prev.filter(d => d !== diet)
        : [...prev, diet]
    );
  };

  const getPrice = () => {
    const portion = portionOptions.find(p => p.value === portionSize);
    return portion?.price || 18.99;
  };

  const handlePreviewOrder = () => {
    if (!foodName.trim()) {
      toast.error('Please enter what food you want to order');
      return;
    }
    setShowPreview(true);
    setIsEditing(false);
  };

  const handleEditOrder = () => {
    setIsEditing(true);
  };

  const handleAddToCart = () => {
    if (!foodName.trim()) {
      toast.error('Please enter what food you want to order');
      return;
    }

    // Create a custom product from the ghost craft order
    const customProduct: Product = {
      id: `ghost-craft-${Date.now()}`,
      name: `Ghost Craft: ${foodName}`,
      price: getPrice(),
      category: 'Ghost Craft',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
      description: buildOrderDescription(),
      nutrition: {
        calories: 0,
        protein: '0g',
        carbs: '0g',
        fat: '0g',
        fiber: '0g',
      },
      inStock: true,
    };

    dispatch({ type: 'ADD_TO_CART', product: customProduct, quantity: 1 });
    toast.success('Custom order added to cart!');
    
    // Reset form
    setFoodName('');
    setAllergies([]);
    setDietary([]);
    setSpiciness(3);
    setSaltiness(3);
    setPortionSize('medium');
    setCookingMethod('');
    setSpecialInstructions('');
    setShowPreview(false);
    setIsEditing(false);
  };

  const buildOrderDescription = () => {
    const parts = [];
    
    if (allergies.length > 0) {
      parts.push(`Allergies: ${allergies.join(', ')}`);
    }
    if (dietary.length > 0) {
      parts.push(`Dietary: ${dietary.join(', ')}`);
    }
    parts.push(`Spice Level: ${spiciness}/5`);
    parts.push(`Salt Level: ${saltiness}/5`);
    parts.push(`Portion: ${portionOptions.find(p => p.value === portionSize)?.label}`);
    if (cookingMethod) {
      parts.push(`Cooking: ${cookingMethod}`);
    }
    if (specialInstructions) {
      parts.push(`Notes: ${specialInstructions}`);
    }
    
    return parts.join(' • ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4">
            <Sparkles className="text-white" size={32} />
          </div>
          <h1 className="text-gray-900 mb-2">Ghost Craft</h1>
          <p className="text-gray-600">
            Order your perfect custom meal. Tell us what you want and customize every detail.
          </p>
        </div>

        {!showPreview || isEditing ? (
          /* Order Form */
          <div className="space-y-6">
            {/* Food Description */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <ChefHat className="text-green-600" size={24} />
                <h2 className="text-gray-900">What would you like to order?</h2>
              </div>
              <Input
                placeholder="e.g., Grilled salmon with roasted vegetables, Chicken tikka masala..."
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                className="w-full"
              />
            </Card>

            {/* Allergies */}
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Allergies</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {allergyOptions.map((allergy) => (
                  <label
                    key={allergy}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={allergies.includes(allergy)}
                      onCheckedChange={() => toggleAllergy(allergy)}
                    />
                    <span className="text-sm text-gray-700">{allergy}</span>
                  </label>
                ))}
              </div>
            </Card>

            {/* Dietary Restrictions */}
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Dietary Preferences</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {dietaryOptions.map((diet) => (
                  <label
                    key={diet}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={dietary.includes(diet)}
                      onCheckedChange={() => toggleDietary(diet)}
                    />
                    <span className="text-sm text-gray-700">{diet}</span>
                  </label>
                ))}
              </div>
            </Card>

            {/* Spice & Salt Levels */}
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Spiciness Level</Label>
                    <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                      {spiciness}/5
                    </span>
                  </div>
                  <Slider
                    value={[spiciness]}
                    onValueChange={(value) => setSpiciness(value[0])}
                    min={1}
                    max={5}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">Mild</span>
                    <span className="text-xs text-gray-500">Hot</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Saltiness Level</Label>
                    <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {saltiness}/5
                    </span>
                  </div>
                  <Slider
                    value={[saltiness]}
                    onValueChange={(value) => setSaltiness(value[0])}
                    min={1}
                    max={5}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">Low</span>
                    <span className="text-xs text-gray-500">High</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Portion Size */}
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Portion Size</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {portionOptions.map((portion) => (
                  <button
                    key={portion.value}
                    onClick={() => setPortionSize(portion.value)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      portionSize === portion.value
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-gray-900">{portion.label}</div>
                        <div className="text-sm text-gray-600">${portion.price.toFixed(2)}</div>
                      </div>
                      {portionSize === portion.value && (
                        <Check className="text-green-600" size={20} />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Cooking Method */}
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Cooking Method</h3>
              <Select value={cookingMethod} onValueChange={setCookingMethod}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select cooking method (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {cookingMethods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Card>

            {/* Special Instructions */}
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Special Instructions</h3>
              <Textarea
                placeholder="Any additional notes or special requests..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full min-h-24"
              />
            </Card>

            {/* Preview Button */}
            <div className="flex gap-3">
              <Button
                onClick={handlePreviewOrder}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-full h-12"
              >
                Preview Order
              </Button>
            </div>
          </div>
        ) : (
          /* Order Preview */
          <div className="space-y-6">
            <Card className="p-6 border-2 border-green-200">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-gray-900">Order Summary</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEditOrder}
                  className="text-green-600 hover:text-green-700"
                >
                  <Edit2 size={16} className="mr-1" />
                  Edit
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Food Order</div>
                  <div className="text-gray-900">{foodName}</div>
                </div>

                {allergies.length > 0 && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Allergies to Avoid</div>
                    <div className="flex flex-wrap gap-2">
                      {allergies.map((allergy) => (
                        <span
                          key={allergy}
                          className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {dietary.length > 0 && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Dietary Preferences</div>
                    <div className="flex flex-wrap gap-2">
                      {dietary.map((diet) => (
                        <span
                          key={diet}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                        >
                          {diet}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Spice Level</div>
                    <div className="text-gray-900">{spiciness}/5</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Salt Level</div>
                    <div className="text-gray-900">{saltiness}/5</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-1">Portion Size</div>
                  <div className="text-gray-900">
                    {portionOptions.find(p => p.value === portionSize)?.label}
                  </div>
                </div>

                {cookingMethod && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Cooking Method</div>
                    <div className="text-gray-900">{cookingMethod}</div>
                  </div>
                )}

                {specialInstructions && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Special Instructions</div>
                    <div className="text-gray-900">{specialInstructions}</div>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900">Total Price</span>
                    <span className="text-green-600">${getPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-full h-12"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={() => navigate('/cart')}
                variant="outline"
                className="flex-1 border-green-600 text-green-600 hover:bg-green-50 rounded-full h-12"
              >
                View Cart
              </Button>
            </div>
          </div>
        )}

        {/* Info Section */}
        <Card className="mt-8 p-6 bg-orange-50 border-orange-200">
          <h3 className="text-gray-900 mb-2">How Ghost Craft Works</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Describe the dish you want in your own words</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Customize all preferences using simple controls</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Review your custom order before adding to cart</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Our chefs will prepare your meal exactly as specified</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
