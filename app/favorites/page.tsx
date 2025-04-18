// app/favorites/page.tsx

import { getCurrentUser } from "../actions/getCurrentUser";
import { getFavorites } from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <div className="text-center mt-10 text-xl">
        Please login to view your trips.
      </div>
    );
  }
  const favorites = await getFavorites();

  return <FavoritesClient listings={favorites} currentUser={currentUser} />;
};

export default FavoritesPage;
