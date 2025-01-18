import { Box } from "@/components/ui/box";
import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export function HomeSkeleton() {
  return (
    <Container className="grid max-w-4xl gap-8 md:grid-cols-2">
      <Box className="flex flex-col justify-center gap-5 rounded-lg border-2 p-4">
        <Box className="text-center">
          <Skeleton className="mx-auto h-6 w-40 sm:w-48" />
        </Box>
        <Box>
          <Skeleton className="h-32" />
        </Box>
        <Box className="flex items-center justify-center gap-4 pt-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Box key={index} className="flex items-center gap-1.5">
              <Skeleton className="h-2 w-2 shrink-0 rounded-[2px]" />
              <Skeleton className="h-4 w-4 sm:w-12" />
            </Box>
          ))}
        </Box>
        <Box className="mx-auto">
          <Skeleton className="h-6 w-40 sm:w-48" />
        </Box>
      </Box>

      <Box className="space-y-8">
        <Box className="rounded-lg border-2 p-4">
          <Box className="grid grid-cols-3 gap-4 text-center">
            {Array.from({ length: 3 }).map((_, index) => (
              <Box key={index} className="space-y-2">
                <Box>
                  <Skeleton className="mx-auto h-12" />
                </Box>
                <Box>
                  <Skeleton className="mx-auto h-6" />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box className="overflow-x-auto rounded-lg border-2 p-6">
          <Box className="space-y-4">
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <Box key={rowIndex} className="flex justify-between rounded-lg">
                {Array.from({ length: 4 }).map((_, cellIndex) => (
                  <Skeleton
                    key={`${rowIndex}-${cellIndex}`}
                    className="h-6 w-10 sm:w-20"
                  />
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
