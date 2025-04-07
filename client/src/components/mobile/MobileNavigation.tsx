import { useLocation, Link } from "wouter";

export default function MobileNavigation() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <nav className="md:hidden bg-white border-t border-neutral-100 py-2 flex justify-around">
      <Link href="/">
        <a className={`flex flex-col items-center px-3 py-1 ${isActive("/") ? "text-primary" : "text-neutral-500 hover:text-primary transition-colors"}`}>
          <i className="fas fa-comments text-lg"></i>
          <span className="text-xs mt-1">Chat</span>
        </a>
      </Link>
      <Link href="/recursos">
        <a className={`flex flex-col items-center px-3 py-1 ${isActive("/recursos") ? "text-primary" : "text-neutral-500 hover:text-primary transition-colors"}`}>
          <i className="fas fa-book-open text-lg"></i>
          <span className="text-xs mt-1">Recursos</span>
        </a>
      </Link>
      <Link href="/reportar">
        <a className={`flex flex-col items-center px-3 py-1 ${isActive("/reportar") ? "text-primary" : "text-neutral-500 hover:text-primary transition-colors"}`}>
          <i className="fas fa-bullhorn text-lg"></i>
          <span className="text-xs mt-1">Reportar</span>
        </a>
      </Link>
      <Link href="/ayudar">
        <a className={`flex flex-col items-center px-3 py-1 ${isActive("/ayudar") ? "text-primary" : "text-neutral-500 hover:text-primary transition-colors"}`}>
          <i className="fas fa-question-circle text-lg"></i>
          <span className="text-xs mt-1">Ayuda</span>
        </a>
      </Link>
    </nav>
  );
}
