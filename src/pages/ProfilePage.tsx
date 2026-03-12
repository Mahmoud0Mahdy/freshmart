import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useApp } from '../contexts/AppContext';
import { recipes } from '../data/mockData';
import { User, Settings, Heart, ShoppingBag, LogOut, Edit, Camera, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function ProfilePage() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: state.user?.name || '',
    email: state.user?.email || '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });

  if (!state.isAuthenticated || !state.user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    toast.success('Successfully logged out');
    navigate('/');
  };

  const handleSaveProfile = () => {
    // Simulate saving profile
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleUnsaveRecipe = (recipeId: string) => {
    dispatch({ type: 'UNSAVE_RECIPE', recipeId });
    toast.success('Recipe removed from favorites');
  };

  const savedRecipes = recipes.filter(recipe => state.user?.savedRecipes.includes(recipe.id));

  const mockOrderHistory = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      total: 47.99,
      status: 'Delivered',
      items: 5
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      total: 32.50,
      status: 'Delivered',
      items: 3
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      total: 65.25,
      status: 'Delivered',
      items: 8
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {state.user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                  onClick={() => toast.info('Profile picture upload coming soon!')}
                >
                  <Camera size={14} />
                </Button>
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">{state.user.name}</h1>
                <p className="text-gray-600">{state.user.email}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Premium Member
                  </Badge>
                  <span className="text-sm text-gray-500">Member since January 2024</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit size={16} className="mr-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleLogout}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-white p-1 rounded-lg shadow-sm">
            <TabsTrigger value="profile" className="flex items-center">
              <User size={16} className="mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center">
              <ShoppingBag size={16} className="mr-2" />
              Order History
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center">
              <Heart size={16} className="mr-2" />
              Saved Recipes
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings size={16} className="mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!isEditing}
                        className="pl-10"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <Input
                        id="address"
                        value={profileData.address}
                        onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                        disabled={!isEditing}
                        className="pl-10"
                        placeholder="123 Main Street"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={profileData.city}
                      onChange={(e) => setProfileData(prev => ({ ...prev, city: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="New York"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={profileData.zipCode}
                      onChange={(e) => setProfileData(prev => ({ ...prev, zipCode: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="10001"
                    />
                  </div>
                </div>
                
                {isEditing && (
                  <div className="flex space-x-4">
                    <Button onClick={handleSaveProfile} className="bg-green-600 hover:bg-green-700">
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                {mockOrderHistory.length > 0 ? (
                  <div className="space-y-4">
                    {mockOrderHistory.map((order) => (
                      <Card key={order.id} className="border border-gray-200">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                              <p className="text-sm text-gray-600 flex items-center mt-1">
                                <Calendar size={14} className="mr-1" />
                                {new Date(order.date).toLocaleDateString()}
                              </p>
                              <p className="text-sm text-gray-600">{order.items} items</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900">${order.total.toFixed(2)}</p>
                              <Badge className={order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ShoppingBag className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500">No orders yet</p>
                    <Button onClick={() => navigate('/shop')} className="mt-4">
                      Start Shopping
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Saved Recipes ({savedRecipes.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {savedRecipes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedRecipes.map((recipe) => (
                      <Card 
                        key={recipe.id} 
                        className="group cursor-pointer hover:shadow-lg transition-shadow border border-gray-200"
                      >
                        <CardContent className="p-0">
                          <div className="aspect-[4/3] overflow-hidden rounded-t-lg relative">
                            <ImageWithFallback
                              src={recipe.image}
                              alt={recipe.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              className="absolute top-2 right-2 bg-white/90 hover:bg-white p-1 h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUnsaveRecipe(recipe.id);
                              }}
                            >
                              <Heart size={16} className="fill-red-500 text-red-500" />
                            </Button>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-2">{recipe.title}</h3>
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                              <span>{recipe.time}</span>
                              <span>{recipe.difficulty}</span>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="w-full"
                              onClick={() => navigate(`/recipe/${recipe.id}`)}
                            >
                              View Recipe
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500">No saved recipes yet</p>
                    <Button onClick={() => navigate('/recipes')} className="mt-4">
                      Browse Recipes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-600">Receive updates about orders and new recipes</p>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Recipe Recommendations</Label>
                      <p className="text-sm text-gray-600">Get personalized recipe suggestions</p>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Special Offers</Label>
                      <p className="text-sm text-gray-600">Receive notifications about deals and promotions</p>
                    </div>
                    <input type="checkbox" className="toggle" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Account Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Download My Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 border-red-600 hover:bg-red-50">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}