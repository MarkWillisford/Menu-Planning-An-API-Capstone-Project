const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      q: `${searchTerm} in:name`,
      per_page: 5,
      part: 'snippet',
      key: 'AIzaSyAO2Uspz6K8ulVW0pVLlh-q9nR8BeJXJ2I'
    },
    dataType: 'json',
    type: 'GET',
    success: callback,
    error: function(e){
      console.log(e);
    }
  };

  //console.log(`parmObject created: ${settings}`);
  $.ajax(settings);
}

function renderResult(result) {
  return `
    <div>      
      <a class="js-result-name" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><img src="${result.snippet.thumbnails.medium.url}"></a>
    </div>
  `;
}

function displayYouTubeSearchData(data) {  
  const results = data.items.map((item, index) => renderResult(item));
  console.log(data);
  $('.js-search-results').html(results);
  
}



function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    //console.log(`about to search for ${query}`);
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);
