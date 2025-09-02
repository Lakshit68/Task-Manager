import { useState } from "react";
import { Task } from "@/pages/Index";
import { Check, Edit3, Trash2, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export const TaskCard = ({ task, onToggle, onDelete, onEdit }: TaskCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const priorityColors = {
    low: 'text-info border-info/20 bg-info/10',
    medium: 'text-warning border-warning/20 bg-warning/10',
    high: 'text-destructive border-destructive/20 bg-destructive/10'
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div 
      className={cn(
        "group p-4 rounded-lg border bg-card shadow-soft hover:shadow-medium transition-all duration-300",
        "hover:scale-[1.02] hover:border-primary/30",
        task.completed && "opacity-75"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={onToggle}
          className={cn(
            "flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-300",
            "hover:scale-110 active:scale-95",
            task.completed 
              ? "bg-gradient-success border-success text-success-foreground shadow-soft" 
              : "border-muted-foreground hover:border-primary hover:bg-primary/10"
          )}
        >
          {task.completed && <Check className="w-3 h-3 m-auto text-white" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className={cn(
                "font-semibold text-foreground mb-1 transition-all duration-300",
                task.completed && "line-through text-muted-foreground"
              )}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {task.description}
                </p>
              )}

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className={cn(
                  "px-2 py-1 rounded-full border text-xs font-medium capitalize",
                  priorityColors[task.priority]
                )}>
                  {task.priority}
                </span>
                
                {task.dueDate && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(task.dueDate)}
                  </span>
                )}

                {task.dueDate && new Date() > task.dueDate && !task.completed && (
                  <span className="flex items-center gap-1 text-destructive">
                    <AlertCircle className="w-3 h-3" />
                    Overdue
                  </span>
                )}
              </div>
            </div>

            <div className={cn(
              "flex gap-2 opacity-0 transition-opacity duration-300",
              (isHovered || window.innerWidth < 768) && "opacity-100"
            )}>
              <Button
                variant="ghost"
                size="sm"
                onClick={onEdit}
                className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};