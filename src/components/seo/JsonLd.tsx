type TJsonLdProps = {
  data: Record<string, unknown>;
};

// A literal `</script>` inside any string would otherwise close the tag early.
function serialize(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: TJsonLdProps) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialize(data) }} />
  );
}
