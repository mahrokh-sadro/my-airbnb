import { getCurrentUser } from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modal/RegisterModal";
import LoginModal from "./components/modal/LoginModal";
import RentModal from "./components/modal/RentModal";
import Categories from "./components/Categories";
import ListingCard from "./components/listing/ListingCard";
import { Toaster } from "react-hot-toast";
import SearchModal from "./components/modal/SearchModal";
import SearchBar from "./components/navbar/SearchBar";

export default async function Home({
  searchParams,
}: Promise<{
  searchParams?: {
    category?: string;
    locationValue?: string;
    guestCount?: string;
    roomCount?: string;
    bathroomCount?: string;
    startDate?: string;
    endDate?: string;
  };
}>) {
  const currentUser = await getCurrentUser();
  const paramsData = await searchParams;

  const listings = await getListings({
    category: paramsData?.category,
    locationValue: paramsData?.locationValue,
    guestCount: paramsData?.guestCount ? +paramsData.guestCount : undefined,
    roomCount: paramsData?.roomCount ? +paramsData.roomCount : undefined,
    bathroomCount: paramsData?.bathroomCount
      ? +paramsData.bathroomCount
      : undefined,
    startDate: paramsData?.startDate,
    endDate: paramsData?.endDate,
  });

  return (
    <div>
      <div className="flex items-center justify-between px-4 mt-1 gap-4">
        <div className="flex-grow overflow-hidden">
          <Categories />
        </div>

        <div className="hidden md:block shrink-0">
          <SearchBar />
        </div>
      </div>

      {listings.length === 0 ? (
        <div className="flex justify-center items-center h-[40vh] text-gray-600 text-lg">
          No listings available.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-1 px-4">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      )}
    </div>
  );
}
