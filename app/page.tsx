import { getCurrentUser } from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modal/RegisterModal";
import LoginModal from "./components/modal/LoginModal";
import RentModal from "./components/modal/RentModal";
import Categories from "./components/Categories";
import ListingCard from "./components/listing/ListingCard";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const listings = await getListings();
  // const listings = [];

  return (
    <div>
      <Navbar currentUser={currentUser} />
      <RegisterModal />
      <LoginModal />
      <RentModal />
      <Categories />

      {listings.length === 0 ? (
        <div className="flex justify-center items-center h-[40vh] text-gray-600 text-lg">
          No listings available.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 px-4">
          {listings.map((listing) => (
            <ListingCard key={listing.id} data={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
