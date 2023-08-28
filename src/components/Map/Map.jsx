export default function AirbnbCard() {
    const property = {
      imageUrl: 'https://bit.ly/2Z4KKcF',
      imageAlt: 'Rear view of modern home with pool',
      beds: 3,
      baths: 2,
      title: 'Modern home in city center in the heart of historic Los Angeles',
      formattedPrice: '$1,900.00',
      reviewCount: 34,
      rating: 4,
    };
  
    return (
      <div className="max-w-sm border border-gray-300 rounded-lg overflow-hidden">
        <img src={property.imageUrl} alt={property.imageAlt} />
  
        <div className="p-6">
          <div className="flex items-baseline">
            <span className="bg-teal-500 text-white rounded-full px-2">New</span>
            <span className="text-gray-500 font-semibold ml-2 text-xs uppercase">
              {property.beds} beds &bull; {property.baths} baths
            </span>
          </div>
  
          <h4 className="mt-1 font-semibold leading-tight">{property.title}</h4>
  
          <div className="mt-1">
            {property.formattedPrice}
            <span className="text-gray-600 text-sm"> / wk</span>
          </div>
  
          <div className="flex mt-2 items-center">
            {Array(5)
              .fill('')
              .map((_, i) => (
                <svg
                  key={i}
                  className={`h-5 w-5 ${i < property.rating ? 'text-teal-500' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 16.732l-4.472 2.232a1 1 0 01-1.341-1.341l2.232-4.472a1 1 0 011.341-.317l4.472 2.232a1 1 0 01.317 1.341l-2.232 4.472a1 1 0 01-1.341.317zm0-12.732a1 1 0 00-.893.553L6 8.732 7.527 12a1 1 0 001.786 0L10 10.268l1.687 1.732a1 1 0 001.786 0L14 8.732l-2.107-4.426A1 1 0 0010 3z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            <span className="ml-2 text-gray-600 text-sm">
              {property.reviewCount} reviews
            </span>
          </div>
        </div>
      </div>
    );
  }