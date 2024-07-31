// Fetch saved listings from the backend when the component mounts
useEffect(() => {
    const fetchSavedListings = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/users/${userId}/saved-listings`);
            console.log(response.data);
            setSavedListings(response.data);
        } catch (error) {
            console.error("Error fetching saved listings:", error);
        }
    };
    fetchSavedListings();
}, [userId]);

// Save a listing to the backend
const saveListing = async (listing) => {
    try {
        const response = await axios.post(
            `http://localhost:3000/users/${userId}/saved-listings`,
            { listing }
        );
        setSavedListings(response.data);
    } catch (error) {
        console.error("Error saving listing:", error);
    }
};

// Remove a listing from the backend
const removeListing = async (listingId) => {
    try {
        // eventually will have to change to only the logged in users' ID
        const response = await axios.delete(
            `http://localhost:3000/users/${userId}/saved-listings/${listingId}`
        );
        setSavedListings(response.data);
    } catch (error) {
        console.error("Error removing listing:", error);
    }
};
