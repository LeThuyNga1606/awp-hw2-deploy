import {useEffect, useState} from 'react';

export default function App(){
  const [imageUrls, setImageUrls] = useState([]);
  const [searchText, setSearchText] = useState('dog');
  const [finalSearch, setFinalSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  async function loadImages(){
      if (!finalSearch || isLoading)
          return;
      setIsLoading(true);
      //const response = await fetch('https://api.unsplash.com/photos/?client_id=u4zn-nrPHRu4FdT_QDAJZvFAgCuqT6_xSCW2Cf6L7Bw');
      const response = await fetch(`https://api.unsplash.com/search/photos/?query=${searchText}&page=${page}&client_id=u4zn-nrPHRu4FdT_QDAJZvFAgCuqT6_xSCW2Cf6L7Bw`);
      const imagesResult = await response.json();
      //setImageUrls(imagesResult.map(image => image.urls.small));
      setImageUrls((prevImageUrls) => [...prevImageUrls, ...imagesResult.results.map(image => image.urls.small)]);
      setPage(page + 1);
      setIsLoading(false);
  }

    async function handleScroll(){
      // Load more photos when user reaches the bottom of the page
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1) {
          await loadImages();
      }
    }

  useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  },
  [finalSearch]);

  return(
    <div className="App">
      <div>
        <input value={searchText}
        onChange={(e) => setSearchText(e.target.value)}></input>
        <button onClick={() => {setFinalSearch(searchText);
        loadImages();}}>Search</button>

      </div>
      <div id='gallery'>
        {imageUrls.map(url => <img src={url} alt=''></img>)}
      </div>
        {isLoading && <p>Loading...</p>} {/* Display loading indicator */}
    </div>
  );
}

