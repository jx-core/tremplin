"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  verifyCredentials,
  login as setSession,
  logout as clearSession,
  getAdminSession,
} from "@/lib/auth";
import {
  createNews,
  updateNews,
  deleteNews,
  createResultBar,
  updateResultBar,
  deleteResultBar,
  getSiteConfig,
  updateSiteConfig,
  type NewsInput,
} from "@/db/queries";
import type { SiteConfig } from "@/db/types";

async function requireAdmin() {
  const s = await getAdminSession();
  if (!s) redirect("/admin/login");
}

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const int = (fd: FormData, k: string) => {
  const n = parseInt(String(fd.get(k) ?? ""), 10);
  return isNaN(n) ? 0 : n;
};
const num = (fd: FormData, k: string) => {
  const n = parseFloat(String(fd.get(k) ?? "").replace(",", "."));
  return isNaN(n) ? 0 : n;
};
const bool = (fd: FormData, k: string) => {
  const v = fd.get(k);
  return v === "on" || v === "true" || v === "1";
};
const lines = (fd: FormData, k: string) =>
  str(fd, k)
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

/* ---------------- auth ---------------- */
export async function loginAction(
  _prev: { error?: string },
  fd: FormData
): Promise<{ error?: string }> {
  const username = str(fd, "username");
  const password = String(fd.get("password") ?? "");
  if (!(await verifyCredentials(username, password))) {
    return { error: "Identifiants invalides." };
  }
  await setSession(username);
  redirect("/admin");
}

export async function logoutAction() {
  await clearSession();
  redirect("/admin/login");
}

/* ---------------- news ---------------- */
function readNews(fd: FormData): NewsInput {
  const dateRaw = str(fd, "date");
  return {
    category: str(fd, "category"),
    title: str(fd, "title"),
    body: str(fd, "body"),
    contacts: str(fd, "contacts"),
    source_label: str(fd, "source_label"),
    source_url: str(fd, "source_url"),
    date: dateRaw ? new Date(dateRaw).toISOString() : null,
    published: bool(fd, "published"),
    sort: int(fd, "sort"),
  };
}

export async function createNewsAction(fd: FormData) {
  await requireAdmin();
  await createNews(readNews(fd));
  revalidatePath("/");
  redirect("/admin/news");
}

export async function updateNewsAction(id: number, fd: FormData) {
  await requireAdmin();
  await updateNews(id, readNews(fd));
  revalidatePath("/");
  redirect("/admin/news");
}

export async function deleteNewsAction(fd: FormData) {
  await requireAdmin();
  await deleteNews(int(fd, "id"));
  revalidatePath("/");
  revalidatePath("/admin/news");
}

/* ---------------- result bars ---------------- */
export async function createResultBarAction(fd: FormData) {
  await requireAdmin();
  await createResultBar({ name: str(fd, "name"), value: num(fd, "value"), sort: int(fd, "sort") });
  revalidatePath("/");
  revalidatePath("/admin/results");
}

export async function updateResultBarAction(id: number, fd: FormData) {
  await requireAdmin();
  await updateResultBar(id, { name: str(fd, "name"), value: num(fd, "value"), sort: int(fd, "sort") });
  revalidatePath("/");
  revalidatePath("/admin/results");
}

export async function deleteResultBarAction(fd: FormData) {
  await requireAdmin();
  await deleteResultBar(int(fd, "id"));
  revalidatePath("/");
  revalidatePath("/admin/results");
}

/* ---------------- site config (merge a single slice, preserve the rest) ---------------- */
async function patchConfig(patch: Partial<SiteConfig>) {
  const current = await getSiteConfig();
  await updateSiteConfig({ ...current, ...patch });
  revalidatePath("/");
}

export async function updateResultsCopyAction(fd: FormData) {
  await requireAdmin();
  await patchConfig({
    results: {
      eyebrow: str(fd, "eyebrow"),
      title: str(fd, "title"),
      lead: str(fd, "lead"),
      footnote: str(fd, "footnote"),
      summary_badges: lines(fd, "summary_badges"),
    },
  });
  revalidatePath("/admin/results");
}

export async function updateNextSessionAction(fd: FormData) {
  await requireAdmin();
  await patchConfig({
    next_session: {
      label: str(fd, "label"),
      edition: str(fd, "edition"),
      day: str(fd, "day"),
      month: str(fd, "month"),
      year: str(fd, "year"),
      blurb: str(fd, "blurb"),
    },
  });
  revalidatePath("/admin/settings");
}

export async function updateScheduleAction(fd: FormData) {
  await requireAdmin();
  await patchConfig({
    schedule: {
      image: str(fd, "image"),
      edition_label: str(fd, "edition_label"),
      footnote: str(fd, "footnote"),
    },
  });
  revalidatePath("/admin/settings");
}

export async function updateContactAction(fd: FormData) {
  await requireAdmin();
  await patchConfig({
    contact: {
      phones: lines(fd, "phones"),
      address_line_1: str(fd, "address_line_1"),
      address_line_2: str(fd, "address_line_2"),
      facebook_url: str(fd, "facebook_url"),
      facebook_name: str(fd, "facebook_name"),
      email: str(fd, "email"),
    },
  });
  revalidatePath("/admin/settings");
}
