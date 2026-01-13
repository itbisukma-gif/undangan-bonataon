import { Briefcase } from 'lucide-react';

export function Logo() {
  return (
    <div
      className="flex items-center gap-2"
      aria-label="Logo"
    >
      <Briefcase className="h-6 w-6 text-primary" />
      <span className="text-lg font-semibold text-foreground">
        Logo
      </span>
    </div>
  );
}
