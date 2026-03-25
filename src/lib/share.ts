type SharePayload = {
  title: string;
  description?: string | null;
  slug: string;
};

export const shareArticle = async ({ title, description, slug }: SharePayload): Promise<"shared" | "copied" | "prompt" | "dismissed"> => {
  if (typeof window === "undefined") return "dismissed";

  const url = `${window.location.origin}/article/${slug}`;
  const text = description?.trim() || "";

  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return "shared";
    } catch {
      // User canceled or share failed; do not surface an error toast.
      return "dismissed";
    }
  }

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(url);
    return "copied";
  }

  window.prompt("Copy this link", url);
  return "prompt";
};
