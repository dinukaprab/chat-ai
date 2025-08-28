"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CPage() {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined" && window.location.pathname === "/c") {
            router.push("/");
        }
    }, [router]);

    return;
}
