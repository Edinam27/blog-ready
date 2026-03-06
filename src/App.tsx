
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Layout } from "@/components/Layout";
import NotFound from "@/pages/NotFound";
import HomePage from "@/pages/HomePage";
import CategoryPage from "@/pages/CategoryPage";
import PostPage from "@/pages/PostPage";
import LoginPage from "@/pages/admin/LoginPage";
import { AdminLayout } from "@/components/admin/AdminLayout";
import DashboardPage from "@/pages/admin/DashboardPage";
import PostsPage from "@/pages/admin/PostsPage";
import NewPostPage from "@/pages/admin/NewPostPage";
import EditPostPage from "@/pages/admin/EditPostPage";
import CategoriesPage from "@/pages/admin/CategoriesPage";
import SettingsPage from "@/pages/admin/SettingsPage";
import UsersPage from "@/pages/admin/UsersPage";
import ProfilePage from "@/pages/admin/ProfilePage";

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            {/* Main website routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="category/:slug" element={<CategoryPage />} />
              <Route path="blog/:slug" element={<PostPage />} />
            </Route>
            
            {/* Admin routes */}
            <Route path="admin/login" element={<LoginPage />} />
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="posts" element={<PostsPage />} />
              <Route path="posts/new" element={<NewPostPage />} />
              <Route path="posts/edit/:slug" element={<EditPostPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            
            {/* Catch-all route - 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
