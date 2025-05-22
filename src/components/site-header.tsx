import Link from 'next/link';
import { MessageSquareQuote, Sparkles, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SiteHeader() {
  const navItems = [
    { href: '/', label: 'Home', icon: <MessageSquareQuote className="h-5 w-5" /> },
    { href: '/shifter', label: 'AI Shifter', icon: <Sparkles className="h-5 w-5" /> },
    { href: '/submit', label: 'Submit Fortune', icon: <Send className="h-5 w-5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <MessageSquareQuote className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl text-primary">FortuneVerse</span>
        </Link>
        <nav className="flex items-center space-x-2">
          {navItems.map((item) => (
            <Button key={item.label} variant="ghost" asChild>
              <Link href={item.href} className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary">
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}
