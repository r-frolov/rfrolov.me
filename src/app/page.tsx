import { defaultLocale } from "@/i18n/config";

const target = `/${defaultLocale}`;

export default function RootPage() {
  return (
    <html lang={defaultLocale}>
      <head>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
      </head>
      <body>
        <a href={target}>Continue to {target}</a>
      </body>
    </html>
  );
}
