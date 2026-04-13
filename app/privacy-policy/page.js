import PrivacyPolicy from "./PrivacyPolicy";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/";

async function getSEO() {
    const res = await fetch(`${API_URL}api/meta/seo/privacy-policy`, {
        cache: "no-store",
    });

    const { data } = await res.json();
    return data;
}

export async function generateMetadata() {
    const seo = await getSEO();

    return {
        title: seo?.metaTitle || "Privacy-Policy",
        description: seo?.metaDescription || "Privacy-Policy Page"
    };
}

export default function Page() {
    return <PrivacyPolicy/>;
}