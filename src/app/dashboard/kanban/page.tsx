import { KanbanBoard } from "@/components/kanban/kanban-board";
import NewTaskDialog from "@/components/kanban/new-task-dialog";

export default function KanbanPage() {
  return (
    <div>
      <div><NewTaskDialog/></div>
      <br />
      <div><KanbanBoard/></div>
    </div>
  )
}
