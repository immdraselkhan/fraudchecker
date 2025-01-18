"use client";

import type { CourierData } from "@/types/courier";
import { EmptyIcon } from "@/components/home/empty-icon";
import { HistoryChart } from "@/components/home/history-chart";
import { HistoryCount } from "@/components/home/history-count";
import { HistoryTable } from "@/components/home/history-table";
import { HomeSkeleton } from "@/components/home/home-skeleton";
import { NewsCard } from "@/components/home/news-card";
import { SearchCard } from "@/components/home/search-card";
import { Box } from "@/components/ui/box";
import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { Typography } from "@/components/ui/typography";
import { Constants } from "@/utils/constants";
import { useState } from "react";

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [courierData, setCourierData] = useState<CourierData | null>(null);
  const [searchResults, setSearchResults] = useState<boolean>(false);

  const handleSearch = (
    data: CourierData,
    phone: string,
    loading: boolean,
  ): void => {
    setIsLoading(loading);
    setCourierData(data);
    setPhoneNumber(phone);
    setSearchResults(true);
    setIsLoading(loading);
  };

  if (!searchResults) {
    return (
      <Container className="max-w-2xl space-y-12">
        <SearchCard onSearch={handleSearch} />
        <NewsCard title="শীঘ্রই আসছে ওয়ার্ডপ্রেস সাইটের জন্য প্লাগিন এবং REST API একদম ফ্রিতে! 🎉" />
      </Container>
    );
  }

  return (
    <>
      <Container className="mb-6 max-w-2xl space-y-6">
        <SearchCard onSearch={handleSearch} />
        {isLoading ? (
          <Skeleton className="mx-auto h-6 w-44 sm:w-64" />
        ) : (
          <Typography
            as="h2"
            className="text-center text-xl font-medium text-gray-600"
            lang="bn"
          >
            অনুসন্ধানের ফলাফল:{" "}
            <span className="font-bold" lang="en">
              {phoneNumber}
            </span>
          </Typography>
        )}
      </Container>

      {isLoading ? (
        <HomeSkeleton />
      ) : !courierData || courierData?.summary?.total_parcel === 0 ? (
        <Container className="mt-20 max-w-2xl text-center">
          <EmptyIcon />
          <Typography className="mt-10 text-2xl text-gray-600" lang="bn">
            কোন তথ্য পাওয়া যায়নি! ☹️
          </Typography>
        </Container>
      ) : (
        <>
          <Container className="grid max-w-4xl gap-8 md:grid-cols-2">
            <HistoryChart props={courierData} />
            <Box className="space-y-8">
              <HistoryCount props={courierData} />
              <HistoryTable props={courierData} />
            </Box>
          </Container>
          <Container className="mt-10 max-w-2xl space-y-12">
            <NewsCard
              title={`${
                Constants.NODE_ENV === "development"
                  ? "বর্তমানে ডেভেলপমেন্ট/টেস্টিং চলছে, তাই উপরের তথ্য রেনডমভাবে তৈরি হচ্ছে। সঠিক তথ্য পেতে অনুগ্রহ করে অপেক্ষা করুন।"
                  : "কুরিয়ারের API'র সীমাবদ্ধতার কারণে মাঝে মাঝে তথ্যের অমিল হতে পারে। সন্দেহ হলে দয়া করে আবার চেক করে নিশ্চিত হবেন।"
              } ⚠️`}
            />
          </Container>
        </>
      )}
    </>
  );
}
