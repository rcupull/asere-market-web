import { AuthProvider } from "./features/auth";
import { CookiesService } from "./features/cookies";
import { ModalProvider } from "./features/modal";
import { RouterProvider } from "./features/router";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CookiesService>
      <RouterProvider>
        <AuthProvider>
          <ModalProvider>{children}</ModalProvider>
        </AuthProvider>
      </RouterProvider>
    </CookiesService>
  );
};
