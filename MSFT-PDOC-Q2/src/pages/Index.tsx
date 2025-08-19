import { useState } from "react";
import { Database, Plus, Trash2, Upload, Download } from "lucide-react";
import { Header } from "@/components/Header";
import { FunctionCard } from "@/components/FunctionCard";
import { EventLogger } from "@/components/EventLogger";
import { FunctionModal } from "@/components/FunctionModal";
import { LoginForm } from "@/components/LoginForm";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [activeModal, setActiveModal] = useState<"backup" | "create" | "remove" | "restore" | null>(null);
  const { toast } = useToast();

  const handleLogin = (credentials: { email: string; password: string }) => {
    // Simulate Azure AD authentication
    setUser({
      name: credentials.email.split('@')[0].replace('.', ' '),
      email: credentials.email
    });
    setIsAuthenticated(true);
    toast({
      title: "Authentication Successful",
      description: "Welcome to Azure Database Manager",
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out",
    });
  };

  const functions = [
    {
      title: "Database Backup",
      description: "Create full database backups and store them securely in Azure Blob Storage with automated retention policies.",
      icon: Download,
      variant: "backup" as const,
      onClick: () => setActiveModal("backup")
    },
    {
      title: "Create New Environment", 
      description: "Spin up new database environments from templates with automated build scripts and user provisioning.",
      icon: Plus,
      variant: "create" as const,
      onClick: () => setActiveModal("create")
    },
    {
      title: "Safely Remove Environment",
      description: "Remove environments with automatic backup creation and 7-day retention for recovery purposes.",
      icon: Trash2,
      variant: "remove" as const,
      onClick: () => setActiveModal("remove")
    },
    {
      title: "Restore Database",
      description: "Restore databases from backup files with support for .bak and .bacpac formats from Azure storage.",
      icon: Upload,
      variant: "restore" as const,
      onClick: () => setActiveModal("restore")
    }
  ];

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Database className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">
              Database Operations
            </h2>
          </div>
          <p className="text-muted-foreground">
            Manage your Azure SQL databases with enterprise-grade security and monitoring
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {functions.map((func, index) => (
            <FunctionCard
              key={index}
              title={func.title}
              description={func.description}
              icon={func.icon}
              variant={func.variant}
              onClick={func.onClick}
            />
          ))}
        </div>

        <EventLogger />
      </main>

      <FunctionModal
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        functionType={activeModal}
      />
    </div>
  );
};

export default Index;
