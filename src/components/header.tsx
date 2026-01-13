import { Logo } from '@/components/logo';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Logo />
      </div>
    </header>
  );
}
