import getListings from "@/app/actions/getListings";
import PropertiesClient from "./PropertiesClient";
import { getCurrentUser } from "../actions/getCurrentUser";

export const dynamic = "force-dynamic";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <div className="p-4 text-center text-xl">
        You must be logged in to view your properties.
      </div>
    );
  }

  const listings = await getListings({ userId: currentUser.id });

  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default PropertiesPage;
