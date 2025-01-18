import { Container } from "@/components/ui/container";
import { Typography } from "@/components/ui/typography";

export function Header() {
  return (
    <Container as="header" className="py-12 text-center font-bold" lang="bn">
      <Typography as="h1" className="mb-3 text-3xl text-gray-900">
        ফেইক অর্ডার সনাক্ত করে
      </Typography>
      <Typography as="h2" className="text-2xl text-orange-500">
        পার্সেল রিটার্ন এর পরিমাণ কমান
      </Typography>
    </Container>
  );
}
