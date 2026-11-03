import { projects } from "./data/projects";

export default function App() {
  return (
    <ul className="p-10 space-y-2">
      {projects.map((p) => <li key={p.id}>{p.title}</li>)}
    </ul>
  );
}