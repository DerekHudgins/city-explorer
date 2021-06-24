
function wrangleLocationResponse(locationResponse) {
  const locationItem = locationResponse[0];  
  return {
    formatted_query: locationItem.display_name,
    latitude: locationItem.lat,
    longitude: locationItem.lon
  };
}

function wrangleWeatherResponse(weatherResponse) {
  const forecasts = weatherResponse.data;
  
  const wrangleForecasts = forecasts.map(forecast => {
    return {
      forecast: forecast.weather.description,
      time: new Date(forecast.ts * 1000)
        .toLocaleDateString('en-US', {
          weekday: 'long', 
          year: 'numeric', 
          month: 'long',
          day: 'numeric',
        })
    };
  });

  return wrangleForecasts;
}

function wrangleYelpData(yelpReviews) { 
  const yelpResponse = yelpReviews.map(review => { 
    return { 
        
      name: review.name,
      image_url: review.image_url,
      price: review.price,
      rating: review.rating,
      url: review.url
  
    };
  });
  
  return yelpResponse;
}


module.exports = {
  wrangleLocationResponse,
  wrangleWeatherResponse,
  wrangleYelpData
};