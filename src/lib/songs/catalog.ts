export interface RepertoireCategory {
  dimension: string;
  slug: string;
  label: string;
}

export interface RepertoireSong {
  id: number;
  title: string;
  singer: string;
  note: string | null;
  categories: RepertoireCategory[];
}

export interface CategoryDimension {
  dimension: string;
  options: { slug: string; label: string }[];
}

export type CatalogState =
  | { status: "ok"; songs: RepertoireSong[]; categories: CategoryDimension[] }
  | { status: "unknown" };

interface RawRepertoireSong {
  id: number;
  song_title: string;
  singer: string;
  note: string | null;
  categories?: RepertoireCategory[];
}

interface RawCategory {
  dimension: string;
  slug: string;
  label: string;
}

function groupByDimension(rawCategories: RawCategory[]): CategoryDimension[] {
  const byDimension = new Map<string, { slug: string; label: string }[]>();
  for (const category of rawCategories) {
    const options = byDimension.get(category.dimension) ?? [];
    options.push({ slug: category.slug, label: category.label });
    byDimension.set(category.dimension, options);
  }
  return Array.from(byDimension.entries()).map(([dimension, options]) => ({
    dimension,
    options,
  }));
}

export async function getSongCatalog(): Promise<CatalogState> {
  const baseUrl = process.env.STREAM_API_URL;
  if (!baseUrl) {
    return { status: "unknown" };
  }

  const [songsRes, categoriesRes] = await Promise.all([
    fetch(`${baseUrl}/repertoire/`, { next: { revalidate: 60 } }),
    fetch(`${baseUrl}/repertoire/categories`, { next: { revalidate: 60 } }),
  ]);

  if (!songsRes.ok || !categoriesRes.ok) {
    return { status: "unknown" };
  }

  const rawSongs: RawRepertoireSong[] = await songsRes.json();
  const rawCategories: RawCategory[] = await categoriesRes.json();

  const songs: RepertoireSong[] = rawSongs.map(song => ({
    id: song.id,
    title: song.song_title,
    singer: song.singer,
    note: song.note ?? null,
    categories: song.categories ?? [],
  }));

  return {
    status: "ok",
    songs,
    categories: groupByDimension(rawCategories),
  };
}
