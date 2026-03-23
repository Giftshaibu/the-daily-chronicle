import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ArticlePage from "./pages/ArticlePage";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import BookmarksPage from "./pages/BookmarksPage";
import ListenPage from "./pages/ListenPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import { AudioPlayerProvider } from "./hooks/useAudioPlayer";
import { BookmarksProvider } from "./contexts/BookmarksContext";
import GlobalAudioPlayer from "./components/AudioPlayer";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import VerifyEmailNoticePage from "./pages/VerifyEmailNoticePage";

// Admin pages
import { AdminLayout } from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminArticles from "./pages/admin/AdminArticles";
import AdminArticleEditor from "./pages/admin/AdminArticleEditor";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminMedia from "./pages/admin/AdminMedia";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AudioPlayerProvider>
          <BookmarksProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/article/:slug" element={<ArticlePage />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/bookmarks" element={<ProtectedRoute><BookmarksPage /></ProtectedRoute>} />
                <Route path="/listen/:slug" element={<ListenPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/password-reset/:token" element={<ResetPasswordPage />} />
                <Route path="/verify-email/:id/:hash" element={<VerifyEmailPage />} />
                <Route path="/verify-email-notice" element={<VerifyEmailNoticePage />} />
                <Route path="/about" element={<AboutPage />} />

                {/* Admin Dashboard – restricted to admin & author roles */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'author']}>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="articles" element={<AdminArticles />} />
                  <Route path="articles/new" element={<AdminArticleEditor />} />
                  <Route path="articles/:id" element={<AdminArticleEditor />} />
                  <Route path="media" element={<AdminMedia />} />
                  {/* Admin-only routes – authors are redirected away */}
                  <Route
                    path="categories"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminCategories />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="analytics"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminAnalytics />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="users"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminUsers />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="settings"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminSettings />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
              <GlobalAudioPlayer />
            </BrowserRouter>
          </BookmarksProvider>
        </AudioPlayerProvider>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
