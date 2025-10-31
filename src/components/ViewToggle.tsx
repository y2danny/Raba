interface ViewToggleProps {
  views: string[];
  activeView: string;
  onViewChange: (view: string) => void;
}

export const ViewToggle = ({ views, activeView, onViewChange }: ViewToggleProps) => {
  return (
    <div className="inline-flex items-center bg-secondary/15 border border-border rounded-full p-1">
      {views.map((view) => (
        <button
          key={view}
          onClick={() => onViewChange(view)}
          className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
            activeView === view
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {view}
        </button>
      ))}
    </div>
  );
};
