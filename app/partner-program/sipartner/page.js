import SiPartnerPage from "./SiPartnerPage";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/";

async function getSEO() {
    const res = await fetch(`${API_URL}api/meta/seo/si-partner`, {
        cache: "no-store",
    });

    const { data } = await res.json();
    return data;
}

export async function generateMetadata() {
    const seo = await getSEO();

    return {
        title: seo?.metaTitle || "Si-Partner Program",
        description: seo?.metaDescription || "Si-Partner Program Page"
    };
}

export default function Page() {
    return <SiPartnerPage/>;
}