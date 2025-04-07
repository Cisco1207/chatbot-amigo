import { useLocation, Link } from "wouter";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="w-64 h-full bg-white shadow-medium transform transition-transform duration-300 translate-x-0">
        <div className="flex justify-between items-center p-4 border-b border-neutral-100">
          <div className="flex items-center">
            <img 
              src="https://images.unsplash.com/photo-1606791422814-b32c705e3e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
              alt="Logo AmigBot" 
              className="h-10 w-10 rounded-full"
            />
            <h1 className="font-nunito font-bold text-lg text-primary ml-2">AmigBot</h1>
          </div>
          <button 
            className="text-neutral-600 focus:outline-none" 
            onClick={onClose}
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        <nav className="py-4">
          <ul className="space-y-1">
            <li>
              <Link href="/">
                <a className={`flex items-center px-4 py-3 ${isActive("/") 
                  ? "text-primary font-semibold bg-primary bg-opacity-10" 
                  : "text-neutral-600 hover:bg-neutral-50 transition-colors"}`}
                  onClick={onClose}
                >
                  <i className="fas fa-comments mr-3"></i>
                  <span>Chat</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/recursos">
                <a className={`flex items-center px-4 py-3 ${isActive("/recursos") 
                  ? "text-primary font-semibold bg-primary bg-opacity-10" 
                  : "text-neutral-600 hover:bg-neutral-50 transition-colors"}`}
                  onClick={onClose}
                >
                  <i className="fas fa-book-open mr-3"></i>
                  <span>Recursos</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/reportar">
                <a className={`flex items-center px-4 py-3 ${isActive("/reportar") 
                  ? "text-primary font-semibold bg-primary bg-opacity-10" 
                  : "text-neutral-600 hover:bg-neutral-50 transition-colors"}`}
                  onClick={onClose}
                >
                  <i className="fas fa-bullhorn mr-3"></i>
                  <span>Reportar</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/aprende">
                <a className={`flex items-center px-4 py-3 ${isActive("/aprende") 
                  ? "text-primary font-semibold bg-primary bg-opacity-10" 
                  : "text-neutral-600 hover:bg-neutral-50 transition-colors"}`}
                  onClick={onClose}
                >
                  <i className="fas fa-graduation-cap mr-3"></i>
                  <span>Aprende</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/ayudar">
                <a className={`flex items-center px-4 py-3 ${isActive("/ayudar") 
                  ? "text-primary font-semibold bg-primary bg-opacity-10" 
                  : "text-neutral-600 hover:bg-neutral-50 transition-colors"}`}
                  onClick={onClose}
                >
                  <i className="fas fa-hands-helping mr-3"></i>
                  <span>Cómo ayudar</span>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
