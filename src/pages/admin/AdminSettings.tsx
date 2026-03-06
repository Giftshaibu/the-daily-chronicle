import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const { toast } = useToast();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-headline text-2xl font-bold">Settings</h1>
        <p className="font-body text-sm text-muted-foreground">Manage your site configuration.</p>
      </div>

      <Card className="bg-background">
        <CardHeader>
          <CardTitle className="font-headline text-lg">General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="font-body text-sm">Site Name</Label>
            <Input defaultValue="The Post Office" className="mt-1" />
          </div>
          <div>
            <Label className="font-body text-sm">Site Description</Label>
            <Input defaultValue="A modern editorial news platform" className="mt-1" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-body text-sm font-medium">Enable Newsletter</p>
              <p className="font-body text-xs text-muted-foreground">Allow readers to subscribe</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-body text-sm font-medium">Enable Audio Articles</p>
              <p className="font-body text-xs text-muted-foreground">Allow audio playback for articles</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Button onClick={() => toast({ title: "Settings saved" })}>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
