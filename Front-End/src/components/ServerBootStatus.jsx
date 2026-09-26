import { Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ServerBootStatus = ({ className = "py-16" }) => {
  const { t } = useLanguage();

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground text-center max-w-md">
        {t("common.serverStarting")}
      </p>
    </div>
  );
};

export default ServerBootStatus;
