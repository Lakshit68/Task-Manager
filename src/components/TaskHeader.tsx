import { CheckCircle2, Target } from "lucide-react";

interface TaskHeaderProps {
  completedCount: number;
  totalCount: number;
}

export const TaskHeader = ({ completedCount, totalCount }: TaskHeaderProps) => {
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="mb-12 text-center">
      <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
        TaskFlow
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Organize your life, one task at a time
      </p>
      
      <div className="flex items-center justify-center gap-8 p-6 bg-gradient-secondary rounded-2xl shadow-soft border border-border/50">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-success/20 rounded-full">
            <CheckCircle2 className="w-6 h-6 text-success" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{completedCount}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
        </div>
        
        <div className="w-px h-12 bg-border"></div>
        
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/20 rounded-full">
            <Target className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{totalCount}</p>
            <p className="text-sm text-muted-foreground">Total Tasks</p>
          </div>
        </div>
        
        <div className="w-px h-12 bg-border"></div>
        
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{completionPercentage}%</p>
          <p className="text-sm text-muted-foreground">Progress</p>
          <div className="w-20 h-2 bg-muted rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-success transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
};