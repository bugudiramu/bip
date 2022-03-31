import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Spinner,
  Form,
  InputGroup,
  FormControl,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import Movie from './components/Movie';
import { _ } from 'lodash';

const App = () => {
  const [moviesData, setMoviesData] = useState({});
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState({
    minRating: 1,
    maxRating: 10,
  });
  let [currentPage, setCurrentPage] = useState(1);
  const [ratings] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  useEffect(async () => {
    setLoading(true);
    const url = `https://movie-task.vercel.app/api/popular?page=${currentPage}`;
    let response = await axios.get(url);
    setMoviesData(response.data);
    setMovies(response.data.data.results);
    setFilteredMovies(response.data.data.results);
    setLoading(false);
  }, [currentPage]);

  const handleYear = async (e) => {
    const {
      target: { value },
    } = e;
    const year = value.split('-')[0];

    if (value !== '') {
      let searchURL = `https://movie-task.vercel.app/api/popular?page=1`;
      const response = await axios.get(searchURL);
      let results = response.data.data.results.filter((movie) =>
        movie.release_date.includes(year)
      );
      setFilteredMovies(results);
    } else {
      setFilteredMovies(movies);
    }
  };
  // * Actually debounce is not required here because we are searching through local state  variable(that has only 10-20 results)
  const handleSearch = _.debounce((e) => {
    const {
      target: { value },
    } = e;
    if (value !== '') {
      let results = filteredMovies.filter((movie) =>
        movie.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredMovies(results);
    } else {
      setFilteredMovies(movies);
    }
  }, 100);
  const handleRating = (e) => {
    rating[e.target.name] = e.target.value;
    setRating(rating);
  };
  // Filter movies based on rating
  const handleFilterRating = () => {
    let minRating = Number(rating.minRating);
    let maxRating = Number(rating.maxRating);
    if (minRating > maxRating) {
      [minRating, maxRating] = [maxRating, minRating];
    }

    setRating({ minRating, maxRating });
    let results = movies.filter(
      (movie) =>
        movie.vote_average >= parseInt(minRating) &&
        movie.vote_average <= parseInt(maxRating)
    );
    setFilteredMovies(results);
  };
  // Pagination (handles previous button click)
  const handlePrevPage = () => {
    if (currentPage === 1) return;
    currentPage -= 1;
    setCurrentPage(currentPage);
  };
  // Pagination (handles next button click)
  const handleNextPage = () => {
    if (currentPage === moviesData?.data?.total_pages) return;
    currentPage += 1;
    setCurrentPage(currentPage);
  };
  return (
    <div className='container d-flex flex-column align-items-center justify-content-center'>
      <h4 className='py-2 mx-2'>Popular Movies</h4>
      <div className='d-flex align-items-center'>
        <InputGroup className='mb-3'>
          <Row className='px-2'>
            <Form.Label>Movie name</Form.Label>
            <FormControl
              placeholder='Search movie'
              aria-label='Search movie'
              aria-describedby='basic-addon1'
              type='text'
              onChange={handleSearch}
            />
            <Form.Label>Release year</Form.Label>
            <FormControl
              placeholder='April 2022'
              defaultValue='April 2022'
              aria-label='Enter date'
              aria-describedby='basic-addon2'
              type='month'
              onChange={handleYear}
            />
            <Form.Label htmlFor='basic-url'>Rating</Form.Label>
            <div className='d-flex justify-content-around align-items-center gap-4 px-0'>
              <Form.Select
                variant='outline-secondary'
                id='input-group-dropdown-1'
                onChange={handleRating}
                name='minRating'
                defaultValue={rating['minRating']}
              >
                {ratings.map((r, idx) => {
                  return <option key={idx}>{r}</option>;
                })}
              </Form.Select>
              <Form.Label>to</Form.Label>
              <Form.Select
                variant='outline-secondary'
                id='input-group-dropdown-2'
                onChange={handleRating}
                name='maxRating'
                defaultValue={rating['maxRating']}
              >
                {ratings.map((r, idx) => {
                  return <option key={idx}>{r}</option>;
                })}
              </Form.Select>
            </div>
            <Button className='my-2' onClick={handleFilterRating}>
              GO
            </Button>
          </Row>
        </InputGroup>
      </div>
      <div className='movies d-flex justify-content-between align-items-center flex-wrap'>
        {loading && <Spinner animation='grow' />}
        {filteredMovies && filteredMovies.length > 0 ? (
          filteredMovies.map((movie, idx) => {
            return <Movie key={movie.id} movie={movie} />;
          })
        ) : (
          <h4>No movies found...</h4>
        )}
      </div>
      <Row className='my-4'>
        <Col>
          <Button
            className='px-4'
            disabled={currentPage === 1}
            onClick={handlePrevPage}
          >
            Prev
          </Button>
        </Col>
        <Col>
          <Button
            className='px-4'
            disabled={currentPage === moviesData?.data?.total_pages}
            onClick={handleNextPage}
          >
            Next
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default App;
