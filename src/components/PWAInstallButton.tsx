import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { usePWA } from "@/hooks/usePWA";
import { toast } from "sonner";

export function PWAInstallButton() {
  const { isInstallable, installPWA } = usePWA();

  if (!isInstallable) return null;

  const handleInstall = async () => {
    await installPWA();
    toast.success("App installed successfully!");
  };

  return (
    <Button
      onClick={handleInstall}
      variant="outline"
      className="gap-2"
    >
      <Download className="h-4 w-4" />
      Install App
    </Button>
  );
}