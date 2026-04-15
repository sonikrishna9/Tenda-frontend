import Allblogs from "./Allblogs";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/";

async function getSEO() {
    const res = await fetch(`${API_URL}api/meta/seo/blogs`, {
        cache: "no-store",
    });

    const { data } = await res.json();
    return data;
}

export async function generateMetadata() {
    const seo = await getSEO();

    return {
        title: seo?.metaTitle || "Tenda Blogs",
        description: seo?.metaDescription || "Tenda Blogs Page"
    };
}

export default function Page() {
    return <Allblogs />;
}