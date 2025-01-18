import { Container } from "@/components/ui/container";
import { Typography } from "@/components/ui/typography";

export function Footer() {
  return (
    <Container as="footer" className="mt-auto py-12 text-center">
      <Typography as="h3" className="text-2xl font-bold text-green-500">
        FraudChecker
      </Typography>
      <Typography className="text-[15px] text-gray-500">
        Protect your business ⛨
      </Typography>
    </Container>
  );
}
