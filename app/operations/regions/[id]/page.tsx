import { RegionDetailPage } from "@/components/operations-pages";
export default async function Page({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <RegionDetailPage id={id}/>; }
