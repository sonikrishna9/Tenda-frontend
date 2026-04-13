import PartnerPage from "./PartnerPage";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/";

async function getSEO() {
    const res = await fetch(`${API_URL}api/meta/seo/partner-program`, {
        cache: "no-store",
    });

    const { data } = await res.json();
    return data;
}

export async function generateMetadata() {
    const seo = await getSEO();

    return {
        title: seo?.metaTitle || "Partner Program",
        description: seo?.metaDescription || "Partner Program Page"
    };
}

export default function Page() {
    return <PartnerPage/>;
}