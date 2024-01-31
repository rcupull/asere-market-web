import { AuthProvider } from "./features/auth";
import { CookiesService } from "./features/cookies";
import { RouterProvider } from "./features/router";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CookiesService>
      <RouterProvider>
        <AuthProvider>{children}</AuthProvider>
      </RouterProvider>
    </CookiesService>
  );
};
