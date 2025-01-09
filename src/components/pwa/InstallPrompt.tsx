import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { usePWA } from "@/hooks/usePWA";
import { toast } from "sonner";

export function InstallPrompt() {
  const { isInstallable, promptInstall } = usePWA();

  if (!isInstallable) return null;

  const handleInstall = async () => {
    try {
      await promptInstall();
      toast.success("Thanks for installing Shyft!");
    } catch (error) {
      toast.error("Installation failed. Please try again.");
    }
  };

  return (
    <Button
      onClick={handleInstall}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      <Download className="h-4 w-4" />
      Install App
    </Button>
  );
}