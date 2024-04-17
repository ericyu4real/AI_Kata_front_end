import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "MScAC Chatbot",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <script src="https://kit.fontawesome.com/d5df2731d5.js" crossOrigin="anonymous"></script>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Ubuntu:wght@400;500&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <div id="root">{children}</div>
            </body>
        </html>
    );
}
