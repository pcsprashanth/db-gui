import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FunctionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  variant: "backup" | "create" | "remove" | "restore";
  onClick: () => void;
}

export const FunctionCard = ({ title, description, icon: Icon, variant, onClick }: FunctionCardProps) => {
  const variantStyles = {
    backup: "border-primary/20 hover:border-primary/40 hover:shadow-primary/10",
    create: "border-success/20 hover:border-success/40 hover:shadow-success/10",
    remove: "border-warning/20 hover:border-warning/40 hover:shadow-warning/10",
    restore: "border-destructive/20 hover:border-destructive/40 hover:shadow-destructive/10"
  };

  const iconStyles = {
    backup: "text-primary",
    create: "text-success",
    remove: "text-warning",
    restore: "text-destructive"
  };

  return (
    <Card className={`
      transition-all duration-300 cursor-pointer group
      hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1
      ${variantStyles[variant]}
    `} onClick={onClick}>
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className={`
            p-3 rounded-lg bg-gradient-to-br from-background to-muted/50
            group-hover:scale-110 transition-transform duration-300
          `}>
            <Icon className={`h-6 w-6 ${iconStyles[variant]}`} />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">
              {title}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {description}
        </CardDescription>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full group-hover:bg-muted transition-colors duration-200"
        >
          Configure
        </Button>
      </CardContent>
    </Card>
  );
};