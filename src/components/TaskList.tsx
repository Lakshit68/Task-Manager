import { Task } from "@/pages/Index";
import { TaskCard } from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void;
}

export const TaskList = ({ tasks, onToggleTask, onDeleteTask, onEditTask }: TaskListProps) => {
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-muted/50 rounded-full flex items-center justify-center">
          <div className="text-4xl">📝</div>
        </div>
        <h3 className="text-xl font-semibold mb-2">No tasks yet</h3>
        <p className="text-muted-foreground">Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {pendingTasks.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            Pending Tasks ({pendingTasks.length})
          </h2>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={() => onToggleTask(task.id)}
                onDelete={() => onDeleteTask(task.id)}
                onEdit={() => onEditTask(task)}
              />
            ))}
          </div>
        </section>
      )}

      {completedTasks.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            Completed Tasks ({completedTasks.length})
          </h2>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={() => onToggleTask(task.id)}
                onDelete={() => onDeleteTask(task.id)}
                onEdit={() => onEditTask(task)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};