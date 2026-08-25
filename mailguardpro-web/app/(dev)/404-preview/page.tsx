import { notFound } from "next/navigation";
import NotFound from "@/app/not-found";

export default function FourOhFourPreviewPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return <NotFound />;
}
