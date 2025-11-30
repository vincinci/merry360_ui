import { computed } from 'vue'
import { useUserStore } from '../stores/userStore'

const translations = {
  EN: {
    // Navigation
    'nav.home': 'Home',
    'nav.accommodations': 'Accommodations',
    'nav.tours': 'Tours',
    'nav.transport': 'Transport',
    'nav.services': 'Services',
    'nav.myTrips': 'My Trips',
    'nav.login': 'Login',
    
    // Home Page
    'home.welcome': 'Welcome to Merry360',
    'home.tagline': 'Find the best accommodations, transport, tours, and services for your next adventure. Add them to your trip cart and book everything in one go.',
    'home.search': 'Search',
    'home.whatLookingFor': 'What are you looking for?',
    'home.accommodations': 'Accommodations',
    'home.toursActivities': 'Tours & Activities',
    'home.transportation': 'Transportation',
    'home.aiConcierge': 'AI Concierge',
    'home.recommendedStays': 'Recommended Stays',
    'home.featuredTours': 'Featured Tours',
    'home.nearbyProperties': 'Nearby Listed Properties',
    'home.topRated': 'Top Rated Properties',
    'home.featured': 'Featured Properties on our Listing',
    'home.guides': 'Property Rental Guides & Tips',
    'home.viewAll': 'View all',
    'home.viewMore': 'View more',
    
    // Search Form
    'search.whereGoing': 'Where are you going?',
    'search.checkIn': 'Check-in',
    'search.checkOut': 'Check-out',
    'search.adults': 'Adults',
    'search.rooms': 'Rooms',
    
    // Transport
    'transport.title': 'Transportation Services',
    'transport.subtitle': 'Get around Rwanda with ease',
    'transport.taxi': 'Taxi Service',
    'transport.taxiDesc': 'Quick rides around the city',
    'transport.shuttle': 'Shuttle Service',
    'transport.shuttleDesc': 'Shared rides to popular destinations',
    'transport.carRental': 'Car Rental',
    'transport.carRentalDesc': 'Rent a vehicle for your journey',
    'transport.bookTaxi': 'Book Taxi',
    'transport.bookShuttle': 'Book Shuttle',
    'transport.browseCars': 'Browse Cars',
    'transport.popularRoutes': 'Popular Routes',
    'transport.bookNow': 'Book Now',
    
    // Tours
    'tours.title': 'Tours & Experiences',
    'tours.subtitle': 'Discover the beauty of Rwanda',
    'tours.all': 'All',
    'tours.nature': 'Nature',
    'tours.adventure': 'Adventure',
    'tours.cultural': 'Cultural',
    'tours.wildlife': 'Wildlife',
    'tours.historical': 'Historical',
    'tours.bookNow': 'Book Now',
    
    // Services
    'services.title': 'Services',
    'services.subtitle': 'Everything you need for a perfect trip',
    'services.bookNow': 'Book Now',
    
    // My Trips
    'myTrips.title': 'My Trips',
    'myTrips.subtitle': 'Manage your bookings and travel plans',
    'myTrips.upcoming': 'Upcoming Trips',
    'myTrips.saved': 'Saved',
    'myTrips.cartItems': 'Cart Items',
    'myTrips.loyaltyPoints': 'Loyalty Points',
    'myTrips.upcomingTab': 'Upcoming',
    'myTrips.pastTab': 'Past',
    'myTrips.savedTab': 'Saved',
    
    // Cart
    'cart.title': 'Your Trip Cart',
    'cart.subtitle': 'Review and book everything in one go',
    'cart.empty': 'Your cart is empty',
    'cart.emptyDesc': 'Add accommodations, tours, and services to your cart',
    'cart.startPlanning': 'Start Planning',
    'cart.items': 'Cart Items',
    'cart.orderSummary': 'Order Summary',
    'cart.subtotal': 'Subtotal',
    'cart.discount': 'Discount',
    'cart.total': 'Total',
    'cart.checkout': 'Proceed to Checkout',
    'cart.remove': 'Remove',
    'cart.clearAll': 'Clear All',
    
    // Wishlist
    'wishlist.title': 'My Wishlist',
    'wishlist.subtitle': 'Your saved items',
    'wishlist.empty': 'Your wishlist is empty',
    'wishlist.emptyDesc': 'Start adding items to your wishlist',
    'wishlist.explore': 'Explore',
    'wishlist.addToCart': 'Add to Cart',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
  },
  
  RW: {
    // Navigation
    'nav.home': 'Ahabanza',
    'nav.accommodations': 'Aho Guturamo',
    'nav.tours': 'Urugendo',
    'nav.transport': 'Ibinyabiziga',
    'nav.services': 'Serivisi',
    'nav.myTrips': 'Ingendo Zanjye',
    'nav.login': 'Kwinjira',
    
    // Home Page
    'home.welcome': 'Murakaza Neza kuri Merry360',
    'home.tagline': 'Shakisha aho guturamo, ibinyabiziga, ingendo, na serivisi zizewe. Shyiramo mugikarito ugure byose icyarimwe.',
    'home.search': 'Shakisha',
    'home.whatLookingFor': 'Urashaka iki?',
    'home.accommodations': 'Aho Guturamo',
    'home.toursActivities': 'Ingendo & Ibikorwa',
    'home.transportation': 'Ibinyabiziga',
    'home.aiConcierge': 'AI Concierge',
    'home.recommendedStays': 'Aho Guturamo Dusaba',
    'home.featuredTours': 'Ingendo Zidasanzwe',
    'home.nearbyProperties': 'Aho Guturamo Hafi',
    'home.topRated': 'Aho Guturamo Kuzuye',
    'home.featured': 'Aho Guturamo Dusaba',
    'home.guides': 'Amabwiriza yo Gukodesha',
    'home.viewAll': 'Reba byose',
    'home.viewMore': 'Reba birenze',
    
    // Search Form
    'search.whereGoing': 'Uragana he?',
    'search.checkIn': 'Italiki yinjira',
    'search.checkOut': 'Italiki usohoka',
    'search.adults': 'Abantu Bakuru',
    'search.rooms': 'Ibyumba',
    
    // Transport
    'transport.title': 'Serivisi zo Gutwara Abantu',
    'transport.subtitle': 'Genda hose mu Rwanda byoroshye',
    'transport.taxi': 'Taxi',
    'transport.taxiDesc': 'Ingendo zihuse mumujyi',
    'transport.shuttle': 'Shuttle',
    'transport.shuttleDesc': 'Ingendo zihuye nabantu benshi',
    'transport.carRental': 'Gukodesha Imodoka',
    'transport.carRentalDesc': 'Kodesha imodoka kurugendo rwawe',
    'transport.bookTaxi': 'Tanga Taxi',
    'transport.bookShuttle': 'Tanga Shuttle',
    'transport.browseCars': 'Reba Imodoka',
    'transport.popularRoutes': 'Inzira Zizwi',
    'transport.bookNow': 'Tanga Ubu',
    
    // Tours
    'tours.title': 'Ingendo & Uburambe',
    'tours.subtitle': 'Vugurura ubwiza bwa Rwanda',
    'tours.all': 'Byose',
    'tours.nature': 'Kamere',
    'tours.adventure': 'Uburambe',
    'tours.cultural': 'Umuco',
    'tours.wildlife': 'Inyamaswa',
    'tours.historical': 'Amateka',
    'tours.bookNow': 'Tanga Ubu',
    
    // Services
    'services.title': 'Serivisi',
    'services.subtitle': 'Ibyo ukeneye byose kurugendo rwawe',
    'services.bookNow': 'Tanga Ubu',
    
    // My Trips
    'myTrips.title': 'Ingendo Zanjye',
    'myTrips.subtitle': 'Genzura ingendo zawe',
    'myTrips.upcoming': 'Ingendo Zizaza',
    'myTrips.saved': 'Byabitswe',
    'myTrips.cartItems': 'Ibintu Mugikarito',
    'myTrips.loyaltyPoints': 'Amanota',
    'myTrips.upcomingTab': 'Zizaza',
    'myTrips.pastTab': 'Zarangiye',
    'myTrips.savedTab': 'Byabitswe',
    
    // Cart
    'cart.title': 'Igikarito Cyawe',
    'cart.subtitle': 'Suzuma ugure byose icyarimwe',
    'cart.empty': 'Igikarito cyawe cyuzuye',
    'cart.emptyDesc': 'Shyiramo aho guturamo, ingendo na serivisi',
    'cart.startPlanning': 'Tangira Gutegura',
    'cart.items': 'Ibintu Mugikarito',
    'cart.orderSummary': 'Incamake yIbintu',
    'cart.subtotal': 'Igiteranyo',
    'cart.discount': 'Kugabanyirizwa',
    'cart.total': 'Igiteranyo',
    'cart.checkout': 'Komeza Kugura',
    'cart.remove': 'Kuraho',
    'cart.clearAll': 'Siba Byose',
    
    // Wishlist
    'wishlist.title': 'Ibyo Nifuza',
    'wishlist.subtitle': 'Ibintu byawe byabitswe',
    'wishlist.empty': 'Ibyo wifuza ntabyo',
    'wishlist.emptyDesc': 'Tangira kongeramo ibintu',
    'wishlist.explore': 'Shakisha',
    'wishlist.addToCart': 'Shyiramo Mugikarito',
    
    // Common
    'common.loading': 'Birimo Gutegurwa...',
    'common.error': 'Ikosa',
    'common.success': 'Byakunze',
    'common.cancel': 'Hagarika',
    'common.confirm': 'Emeza',
    'common.save': 'Bika',
    'common.delete': 'Siba',
    'common.edit': 'Hindura',
  },
  
  FR: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.accommodations': 'Hébergements',
    'nav.tours': 'Circuits',
    'nav.transport': 'Transport',
    'nav.services': 'Services',
    'nav.myTrips': 'Mes Voyages',
    'nav.login': 'Connexion',
    
    // Home Page
    'home.welcome': 'Bienvenue à Merry360',
    'home.tagline': 'Trouvez les meilleurs hébergements, transports, circuits et services pour votre prochaine aventure. Ajoutez-les à votre panier et réservez tout en une seule fois.',
    'home.search': 'Rechercher',
    'home.whatLookingFor': 'Que cherchez-vous?',
    'home.accommodations': 'Hébergements',
    'home.toursActivities': 'Circuits & Activités',
    'home.transportation': 'Transport',
    'home.aiConcierge': 'Concierge IA',
    'home.recommendedStays': 'Séjours Recommandés',
    'home.featuredTours': 'Circuits en Vedette',
    'home.nearbyProperties': 'Propriétés à Proximité',
    'home.topRated': 'Mieux Notés',
    'home.featured': 'Propriétés en Vedette',
    'home.guides': 'Guides de Location',
    'home.viewAll': 'Voir tout',
    'home.viewMore': 'Voir plus',
    
    // Search Form
    'search.whereGoing': 'Où allez-vous?',
    'search.checkIn': 'Arrivée',
    'search.checkOut': 'Départ',
    'search.adults': 'Adultes',
    'search.rooms': 'Chambres',
    
    // Transport
    'transport.title': 'Services de Transport',
    'transport.subtitle': 'Déplacez-vous facilement au Rwanda',
    'transport.taxi': 'Service Taxi',
    'transport.taxiDesc': 'Trajets rapides en ville',
    'transport.shuttle': 'Service Navette',
    'transport.shuttleDesc': 'Trajets partagés vers destinations populaires',
    'transport.carRental': 'Location de Voiture',
    'transport.carRentalDesc': 'Louez un véhicule pour votre voyage',
    'transport.bookTaxi': 'Réserver Taxi',
    'transport.bookShuttle': 'Réserver Navette',
    'transport.browseCars': 'Voir Voitures',
    'transport.popularRoutes': 'Itinéraires Populaires',
    'transport.bookNow': 'Réserver',
    
    // Tours
    'tours.title': 'Circuits & Expériences',
    'tours.subtitle': 'Découvrez la beauté du Rwanda',
    'tours.all': 'Tous',
    'tours.nature': 'Nature',
    'tours.adventure': 'Aventure',
    'tours.cultural': 'Culturel',
    'tours.wildlife': 'Faune',
    'tours.historical': 'Historique',
    'tours.bookNow': 'Réserver',
    
    // Services
    'services.title': 'Services',
    'services.subtitle': 'Tout ce dont vous avez besoin pour un voyage parfait',
    'services.bookNow': 'Réserver',
    
    // My Trips
    'myTrips.title': 'Mes Voyages',
    'myTrips.subtitle': 'Gérez vos réservations et plans',
    'myTrips.upcoming': 'Voyages à Venir',
    'myTrips.saved': 'Sauvegardés',
    'myTrips.cartItems': 'Articles du Panier',
    'myTrips.loyaltyPoints': 'Points de Fidélité',
    'myTrips.upcomingTab': 'À Venir',
    'myTrips.pastTab': 'Passés',
    'myTrips.savedTab': 'Sauvegardés',
    
    // Cart
    'cart.title': 'Votre Panier',
    'cart.subtitle': 'Vérifiez et réservez tout en une fois',
    'cart.empty': 'Votre panier est vide',
    'cart.emptyDesc': 'Ajoutez hébergements, circuits et services',
    'cart.startPlanning': 'Commencer à Planifier',
    'cart.items': 'Articles du Panier',
    'cart.orderSummary': 'Résumé de la Commande',
    'cart.subtotal': 'Sous-total',
    'cart.discount': 'Réduction',
    'cart.total': 'Total',
    'cart.checkout': 'Passer la Commande',
    'cart.remove': 'Retirer',
    'cart.clearAll': 'Tout Vider',
    
    // Wishlist
    'wishlist.title': 'Ma Liste de Souhaits',
    'wishlist.subtitle': 'Vos articles sauvegardés',
    'wishlist.empty': 'Votre liste est vide',
    'wishlist.emptyDesc': 'Commencez à ajouter des articles',
    'wishlist.explore': 'Explorer',
    'wishlist.addToCart': 'Ajouter au Panier',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.cancel': 'Annuler',
    'common.confirm': 'Confirmer',
    'common.save': 'Enregistrer',
    'common.delete': 'Supprimer',
    'common.edit': 'Modifier',
  }
}

export function useTranslation() {
  const userStore = useUserStore()
  
  const currentLanguage = computed(() => userStore.preferences.language)
  
  const t = (key) => {
    const lang = currentLanguage.value
    return translations[lang]?.[key] || translations.EN[key] || key
  }
  
  return {
    t,
    currentLanguage
  }
}
