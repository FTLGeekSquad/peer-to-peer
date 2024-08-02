// Fetch saved listings from the backend when the component mounts
useEffect(() => {
    const fetchSavedListings = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/users/${userData.userId}/saved-listings`);
            console.log(response.data);
            setSavedListings(response.data);
        } catch (error) {
            console.error("Error fetching saved listings:", error);
        }
    };
    fetchSavedListings();
}, [userId]);

const saveListing = async (listing) => {
    try {
        const response = await axios.post(
            `http://localhost:3000/users/${userData.userId}/saved-listings`,
            { listing }
        );
        setSavedListings([...savedListings, response.data]);
        //setUserData(user);
    } catch (error) {
        console.error("Error saving listing:", error);
    }
};

const removeListing = async (listingId) => {
    try {
        const response = await axios.delete(
            `http://localhost:3000/users/${userData.userId}/saved-listings/${listingId}`
        );
        setSavedListings(savedListings.filter((listing)=>listing.listingId !== listingId));
        //sets it to listings that do not have the removed listingId
        //setUserData(user);
    } catch (error) {
        console.error("Error removing listing:", error);
    }
};
