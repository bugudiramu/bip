import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Movie = ({ movie }) => {
  const relative_path = 'https://image.tmdb.org/t/p/original';
  const { title, poster_path, overview, id, vote_average } = movie;
  return (
    <Card className='movie_card'>
      <Card.Img
        height={250}
        width={250}
        variant='top'
        src={`${relative_path}${poster_path}`}
      />
      <Card.Body>
        <Card.Text>
          {overview.length > 100 ? overview.substring(0, 97) + '...' : overview}
        </Card.Text>
        <Link to={`/${id}`}>
          <Button variant='primary'>Details...</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Movie;
