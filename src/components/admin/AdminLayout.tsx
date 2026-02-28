
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuthStore } from "@/lib/auth";
import { FileText, Home, LogOut, Plus, Settings, Tags, Users, User } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { useCallback } from "react";

export function AdminLayout() {
  const { isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    navigate("/");
  }, [logout, navigate]);

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col bg-muted p-6 md:flex">
        <div className="flex items-center gap-2 pb-6">
          <span className="font-bold text-xl">Admin Panel</span>
        </div>
        
        <nav className="space-y-1">
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link to="/admin">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link to="/admin/profile">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link to="/admin/posts">
              <FileText className="mr-2 h-4 w-4" />
              Posts
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link to="/admin/categories">
              <Tags className="mr-2 h-4 w-4" />
              Categories
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link to="/admin/users">
              <Users className="mr-2 h-4 w-4" />
              Users
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link to="/admin/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
        </nav>
        
        <div className="mt-auto flex flex-col gap-2">
          <Button asChild variant="default" className="w-full justify-start">
            <Link to="/admin/posts/new">
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile header */}
        <header className="flex h-16 items-center justify-between border-b bg-background px-6 md:hidden">
          <span className="font-bold text-lg">Admin Panel</span>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
