import { Slot } from "expo-router";
import { AuthProvider } from "../context/authContext";
import { BioAuthProvider } from "@/context/bioAuthContext";

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <BioAuthProvider>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </BioAuthProvider>

  );
}
