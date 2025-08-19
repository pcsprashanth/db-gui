import { useState } from "react";
import { Activity, AlertCircle, CheckCircle, Clock, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LogEvent {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  status: "success" | "warning" | "error" | "info";
  details: string;
}

const mockEvents: LogEvent[] = [
  {
    id: "1",
    timestamp: "2024-01-30 14:23:15",
    user: "john.doe@company.com",
    action: "Database Backup",
    status: "success",
    details: "Successfully backed up production database to Azure Blob Storage"
  },
  {
    id: "2", 
    timestamp: "2024-01-30 13:45:22",
    user: "admin@company.com",
    action: "Create New Environment",
    status: "success",
    details: "Created new DTS environment for user test.user@company.com"
  },
  {
    id: "3",
    timestamp: "2024-01-30 12:15:08",
    user: "jane.smith@company.com", 
    action: "Environment Removal",
    status: "warning",
    details: "Removed development environment - backup retained for 7 days"
  },
  {
    id: "4",
    timestamp: "2024-01-30 11:32:45",
    user: "admin@company.com",
    action: "Database Restore",
    status: "error",
    details: "Failed to restore database - backup file corrupted"
  }
];

export const EventLogger = () => {
  const [filter, setFilter] = useState<string>("all");

  const filteredEvents = filter === "all" 
    ? mockEvents 
    : mockEvents.filter(event => event.status === filter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-primary" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      success: "bg-success/10 text-success border-success/20",
      warning: "bg-warning/10 text-warning border-warning/20", 
      error: "bg-destructive/10 text-destructive border-destructive/20",
      info: "bg-primary/10 text-primary border-primary/20"
    };

    return (
      <Badge className={variants[status as keyof typeof variants] || variants.info}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Card className="shadow-md border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Event Log</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filteredEvents.map((event) => (
            <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex-shrink-0 mt-0.5">
                {getStatusIcon(event.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground">
                    {event.action}
                  </p>
                  {getStatusBadge(event.status)}
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  {event.user} • {event.timestamp}
                </p>
                <p className="text-sm text-foreground/80">
                  {event.details}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button variant="outline" size="sm">
            View All Events
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};