import { Shield, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  user?: {
    name: string;
    email: string;
  };
  onLogout: () => void;
}

export const Header = ({ user, onLogout }: HeaderProps) => {
  return (
    <header className="w-full bg-gradient-to-r from-primary to-primary-hover shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-primary-foreground" />
            <div>
              <h1 className="text-xl font-semibold text-primary-foreground">
                Azure Database Manager
              </h1>
              <p className="text-sm text-primary-foreground/80">
                Enterprise Database Operations Platform
              </p>
            </div>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-primary-foreground">
                  {user.name}
                </p>
                <p className="text-xs text-primary-foreground/80">
                  {user.email}
                </p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-primary-foreground/20">
                <AvatarFallback className="bg-primary-foreground/10 text-primary-foreground">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onLogout}
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};