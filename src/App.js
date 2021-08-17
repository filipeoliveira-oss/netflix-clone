import React, {useEffect, useState} from 'react';
import './App.css'
import tmdb from './tmdb'
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null)

  useEffect(()=>{
    const loadAll = async ()=>{
      //get list from the movie database
      let list = await tmdb.getHomeList();
      setMovieList(list);

      //get featured movie from netflix originals
      let originals = list.filter(i=> i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }
    loadAll();
   }, [])

  return (
    <div className="page">
      {featuredData &&
        <FeaturedMovie item={featuredData}/>
      }

      <section className = "lists">
        {movieList.map((item, key) => (
         <MovieRow key = {key} title={item.title} items={item.items}/>
        ))}
      </section>
    </div>
  )
}