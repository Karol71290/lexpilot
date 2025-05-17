import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AIServices } from "@/components/settings/AIServices";

const Settings = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: "Jane Smith",
    email: "jane.smith@lawfirm.com",
    role: "Associate",
    department: "Corporate Law",
    notifications: {
      email: true,
      weeklyReport: true,
      newReleases: true,
      recommendations: false
    },
    preferences: {
      defaultDashboard: "personal",
      theme: "light",
      language: "en"
    }
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved successfully."
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved successfully."
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Application Preferences Updated",
      description: "Your application preferences have been saved successfully."
    });
  };

  const toggleNotification = (key: string) => {
    setFormState({
      ...formState,
      notifications: {
        ...formState.notifications,
        [key]: !formState.notifications[key as keyof typeof formState.notifications]
      }
    });
  };

  const updatePreference = (key: string, value: string) => {
    setFormState({
      ...formState,
      preferences: {
        ...formState.preferences,
        [key]: value
      }
    });
  };

  return (
    <AppLayout title="Settings">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground mb-6">Manage your account and application preferences</p>
        
        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="ai-services">AI Services</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Manage your personal information and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select 
                      value={formState.role}
                      onValueChange={(value) => setFormState({...formState, role: value})}
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Partner">Partner</SelectItem>
                        <SelectItem value="Associate">Associate</SelectItem>
                        <SelectItem value="Paralegal">Paralegal</SelectItem>
                        <SelectItem value="Legal Operations">Legal Operations</SelectItem>
                        <SelectItem value="Administrative">Administrative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select 
                      value={formState.department}
                      onValueChange={(value) => setFormState({...formState, department: value})}
                    >
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select your department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Corporate Law">Corporate Law</SelectItem>
                        <SelectItem value="Litigation">Litigation</SelectItem>
                        <SelectItem value="Intellectual Property">Intellectual Property</SelectItem>
                        <SelectItem value="Family Law">Family Law</SelectItem>
                        <SelectItem value="Real Estate">Real Estate</SelectItem>
                        <SelectItem value="Tax">Tax</SelectItem>
                        <SelectItem value="Employment">Employment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="flex items-center gap-3">
                    <Input id="password" type="password" value="••••••••" disabled />
                    <Button type="button" variant="outline">Change Password</Button>
                  </div>
                </div>
                
                <div className="space-y-2 border-t pt-4">
                  <Label>AI Adoption Persona</Label>
                  <div className="flex items-center justify-between border p-4 rounded-md">
                    <div>
                      <h4 className="font-medium">Strategic Adopter</h4>
                      <p className="text-sm text-muted-foreground">
                        Based on your quiz results from May 10, 2025
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Retake Quiz</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleSaveProfile}>Save Profile</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Control when and how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notif">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch 
                      id="email-notif" 
                      checked={formState.notifications.email}
                      onCheckedChange={() => toggleNotification('email')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekly-report">Weekly Progress Reports</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive weekly summaries of your AI adoption progress
                      </p>
                    </div>
                    <Switch 
                      id="weekly-report" 
                      checked={formState.notifications.weeklyReport}
                      onCheckedChange={() => toggleNotification('weeklyReport')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="new-releases">New AI Releases</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when new AI tools or features are released
                      </p>
                    </div>
                    <Switch 
                      id="new-releases" 
                      checked={formState.notifications.newReleases}
                      onCheckedChange={() => toggleNotification('newReleases')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="recommendations">Personalized Recommendations</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive AI tool and training recommendations based on your persona
                      </p>
                    </div>
                    <Switch 
                      id="recommendations" 
                      checked={formState.notifications.recommendations}
                      onCheckedChange={() => toggleNotification('recommendations')}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleSaveNotifications}>Save Notification Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Preferences</CardTitle>
                <CardDescription>
                  Customize your experience with LawAdapt Pro
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="default-dashboard">Default Dashboard View</Label>
                  <Select 
                    value={formState.preferences.defaultDashboard}
                    onValueChange={(value) => updatePreference('defaultDashboard', value)}
                  >
                    <SelectTrigger id="default-dashboard">
                      <SelectValue placeholder="Select default dashboard" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personal Dashboard</SelectItem>
                      <SelectItem value="team">Team Dashboard (Admins)</SelectItem>
                      <SelectItem value="organization">Organization Dashboard (Admins)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select 
                    value={formState.preferences.theme}
                    onValueChange={(value) => updatePreference('theme', value)}
                  >
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select 
                    value={formState.preferences.language}
                    onValueChange={(value) => updatePreference('language', value)}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-4">Data & Privacy</h3>
                  
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full">Export My Data</Button>
                    <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                      Delete My Account
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleSavePreferences}>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="ai-services" className="mt-6">
            <AIServices />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings;
