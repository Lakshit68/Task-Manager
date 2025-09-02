import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskList } from "@/components/TaskList";
import { TaskForm } from "@/components/TaskForm";
import { TaskHeader } from "@/components/TaskHeader";

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  dueDate?: Date;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Design Task Manager UI',
      description: 'Create a beautiful and functional task manager interface',
      completed: false,
      priority: 'high',
      createdAt: new Date(),
      dueDate: new Date(Date.now() + 86400000) // Tomorrow
    },
    {
      id: '2',
      title: 'Set up Supabase Integration',
      description: 'Connect to Supabase for authentication and data storage',
      completed: false,
      priority: 'medium',
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Add Task Animations',
      description: 'Implement smooth animations for task interactions',
      completed: true,
      priority: 'low',
      createdAt: new Date(),
    }
  ]);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTasks(prev => [newTask, ...prev]);
    setIsFormOpen(false);
  };

  const handleEditTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...taskData }
          : task
      ));
      setEditingTask(null);
      setIsFormOpen(false);
    }
  };

  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <TaskHeader 
          completedCount={completedCount}
          totalCount={totalCount}
        />
        
        <div className="mb-8">
          <Button 
            onClick={() => setIsFormOpen(true)}
            size="lg"
            className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Task
          </Button>
        </div>

        <TaskList 
          tasks={tasks}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
          onEditTask={(task) => {
            setEditingTask(task);
            setIsFormOpen(true);
          }}
        />

        {isFormOpen && (
          <TaskForm 
            task={editingTask}
            onSubmit={editingTask ? handleEditTask : handleCreateTask}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingTask(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Index;