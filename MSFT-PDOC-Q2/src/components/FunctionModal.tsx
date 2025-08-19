import { useState, useEffect } from "react";
import { X, Upload, Download, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FunctionModalProps {
  isOpen: boolean;
  onClose: () => void;
  functionType: "backup" | "create" | "remove" | "restore" | null;
}

export const FunctionModal = ({ isOpen, onClose, functionType }: FunctionModalProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [sqlServers, setSqlServers] = useState<Array<{ id: string; name: string }>>([]);
  const [isLoadingServers, setIsLoadingServers] = useState(false);

  const fetchSqlServers = async () => {
  setIsLoadingServers(true);
  try {
    const response = await fetch('https://dbsqllister-cjg7a6aedpatc0e0.centralindia-01.azurewebsites.net/api/ListDatabases?code=ke5ctPizi6eBJzZ4ttQ6FZiRU40LauVdbzGEMS48rX-lAzFuEW6j-w==');
    const servers = await response.json();

    // Map only managedInstance into id and name
    const simplified = servers.map((server: any) => ({
      id: server.managedInstance,
      name: server.managedInstance
    }));

    setSqlServers(simplified);
  } catch (error) {
    console.error('Failed to fetch SQL servers:', error);
    setSqlServers([
      { id: 'sql-prod-001', name: 'sql-prod-001' },
      { id: 'sql-dev-001', name: 'sql-dev-001' },
      { id: 'sql-test-001', name: 'sql-test-001' },
      { id: 'sql-staging-001', name: 'sql-staging-001' },
    ]);
  } finally {
    setIsLoadingServers(false);
  }
};

  useEffect(() => {
    if (isOpen) {
      fetchSqlServers();
    }
  }, [isOpen]);

  const renderBackupForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="server">SQL Server</Label>
          <Select>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={isLoadingServers ? "Loading servers..." : "Select SQL server"} />
            </SelectTrigger>
            <SelectContent>
              {sqlServers.map((server) => (
                <SelectItem key={server.id} value={server.id}>
                  {server.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="database">Database</Label>
          <Input 
            id="database" 
            placeholder="e.g., ProductionDB" 
            className="mt-1"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="location">Storage Location</Label>
        <Select>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select Azure storage location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="primary">Primary Storage (East US)</SelectItem>
            <SelectItem value="secondary">Secondary Storage (West US)</SelectItem>
            <SelectItem value="backup">Backup Storage (Central US)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="bg-primary/5 p-3 rounded-lg">
        <p className="text-sm text-primary">
          <Download className="h-4 w-4 inline mr-2" />
          This will create a full database backup and store it securely in Azure Blob Storage.
        </p>
      </div>
    </div>
  );

  const renderCreateForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="product">Product Type</Label>
        <Select>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select product type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dts">DTS (Data Transfer Service)</SelectItem>
            <SelectItem value="piqs">PIQS (Product Intelligence Query Service)</SelectItem>
            <SelectItem value="emts">EMTS (Enterprise Management Tracking Service)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="server">SQL Server</Label>
          <Select>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={isLoadingServers ? "Loading servers..." : "Select SQL server"} />
            </SelectTrigger>
            <SelectContent>
              {sqlServers.map((server) => (
                <SelectItem key={server.id} value={server.id}>
                  {server.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="database">New Database Name</Label>
          <Input 
            id="database" 
            placeholder="e.g., NewProjectDB" 
            className="mt-1"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input 
            id="username" 
            placeholder="Database username" 
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            type="password" 
            placeholder="Database password" 
            className="mt-1"
          />
        </div>
      </div>
      <div className="bg-success/5 p-3 rounded-lg">
        <p className="text-sm text-success">
          <Plus className="h-4 w-4 inline mr-2" />
          A new database will be created from the selected template and build scripts will be executed automatically.
        </p>
      </div>
    </div>
  );

  const renderRemoveForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="environment">Select Environment to Remove</Label>
        <Select>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Choose environment to safely remove" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dev-001">Development Environment - sql-dev-001</SelectItem>
            <SelectItem value="test-002">Test Environment - sql-test-002</SelectItem>
            <SelectItem value="staging-001">Staging Environment - sql-staging-001</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Card className="border-warning/30 bg-warning/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-warning flex items-center">
            <Trash2 className="h-4 w-4 mr-2" />
            Safety Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="text-xs text-warning/80 space-y-1">
            <li>• Backup will be created automatically before removal</li>
            <li>• Backup retained for 7 days in Azure storage</li>
            <li>• Operation is logged and auditable</li>
            <li>• Requires admin confirmation</li>
          </ul>
        </CardContent>
      </Card>
      <div>
        <Label htmlFor="reason">Reason for Removal</Label>
        <Textarea 
          id="reason" 
          placeholder="Please provide a reason for removing this environment..." 
          className="mt-1 min-h-20"
        />
      </div>
    </div>
  );

  const renderRestoreForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="backup-file">Backup File</Label>
        <div className="mt-1 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Drop backup files here or click to browse
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Supports .bak, .bacpac files
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="target-server">SQL Server</Label>
          <Select>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={isLoadingServers ? "Loading servers..." : "Select SQL server"} />
            </SelectTrigger>
            <SelectContent>
              {sqlServers.map((server) => (
                <SelectItem key={server.id} value={server.id}>
                  {server.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="target-database">Target Database</Label>
          <Input 
            id="target-database" 
            placeholder="e.g., RestoredDB" 
            className="mt-1"
          />
        </div>
      </div>
      <div className="bg-destructive/5 p-3 rounded-lg">
        <p className="text-sm text-destructive">
          <Upload className="h-4 w-4 inline mr-2" />
          This will restore the selected backup to the specified server and database.
        </p>
      </div>
    </div>
  );

  const getModalContent = () => {
    switch (functionType) {
      case "backup":
        return {
          title: "Database Backup",
          icon: <Download className="h-5 w-5" />,
          form: renderBackupForm(),
          actionText: "Start Backup"
        };
      case "create":
        return {
          title: "Create New Environment",
          icon: <Plus className="h-5 w-5" />,
          form: renderCreateForm(),
          actionText: "Create Environment"
        };
      case "remove":
        return {
          title: "Safely Remove Environment",
          icon: <Trash2 className="h-5 w-5" />,
          form: renderRemoveForm(),
          actionText: "Remove Environment"
        };
      case "restore":
        return {
          title: "Restore Database",
          icon: <Upload className="h-5 w-5" />,
          form: renderRestoreForm(),
          actionText: "Start Restore"
        };
      default:
        return null;
    }
  };

  const content = getModalContent();

  if (!content) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-lg">
            {content.icon}
            <span>{content.title}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {content.form}
        </div>
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="shadow-primary/20">
            {content.actionText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};