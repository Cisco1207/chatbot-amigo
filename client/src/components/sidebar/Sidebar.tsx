import { useLocation, Link } from "wouter";

export default function Sidebar() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <>
      {/* Sidebar Header */}
      <div className="flex items-center justify-center p-4 border-b border-neutral-100">
        <img 
          src="https://images.unsplash.com/photo-1606791422814-b32c705e3e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
          alt="Logo AmigBot" 
          className="h-12 w-12 rounded-full"
        />
        <div className="ml-3">
          <h1 className="font-nunito font-bold text-xl text-primary">AmigBot</h1>
          <p className="text-xs text-neutral-500">Tu amigo contra el bullying</p>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <nav className="py-6 flex-1">
        <ul className="space-y-2">
          <li>
            <Link href="/">
              <a className={`flex items-center px-6 py-3 ${isActive("/") 
                ? "text-primary font-semibold bg-primary bg-opacity-10" 
                : "text-neutral-600 hover:bg-neutral-50 transition-colors"}`}
              >
                <i className="fas fa-comments mr-3"></i>
                <span>Chat</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/recursos">
              <a className={`flex items-center px-6 py-3 ${isActive("/recursos") 
                ? "text-primary font-semibold bg-primary bg-opacity-10" 
                : "text-neutral-600 hover:bg-neutral-50 transition-colors"}`}
              >
                <i className="fas fa-book-open mr-3"></i>
                <span>Recursos</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/reportar">
              <a className={`flex items-center px-6 py-3 ${isActive("/reportar") 
                ? "text-primary font-semibold bg-primary bg-opacity-10" 
                : "text-neutral-600 hover:bg-neutral-50 transition-colors"}`}
              >
                <i className="fas fa-bullhorn mr-3"></i>
                <span>Reportar</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/aprende">
              <a className={`flex items-center px-6 py-3 ${isActive("/aprende") 
                ? "text-primary font-semibold bg-primary bg-opacity-10" 
                : "text-neutral-600 hover:bg-neutral-50 transition-colors"}`}
              >
                <i className="fas fa-graduation-cap mr-3"></i>
                <span>Aprende</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/ayudar">
              <a className={`flex items-center px-6 py-3 ${isActive("/ayudar") 
                ? "text-primary font-semibold bg-primary bg-opacity-10" 
                : "text-neutral-600 hover:bg-neutral-50 transition-colors"}`}
              >
                <i className="fas fa-hands-helping mr-3"></i>
                <span>Cómo ayudar</span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-neutral-100">
        <div className="text-xs text-neutral-500 text-center">
          <p>AmigBot no guarda tus datos personales.</p>
          <p className="mt-1">© 2023 Programa Anti-Bullying</p>
        </div>
      </div>
    </>
  );
}
