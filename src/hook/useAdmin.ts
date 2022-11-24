import { useContext } from "react";
import { AdminContext } from "../contexts/AdminContext";

export function useAdmin() {
  const value = useContext(AdminContext);

  return value;
}
