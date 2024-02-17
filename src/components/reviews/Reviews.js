import React, { useEffect, useRef } from 'react' 
import { useParams} from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import ReviewForm from '../reviewForm/ReviewForm'
import axios from "axios"; 

const Reviews = ({getMovieData,movie,reviews,setReviews}) => {
  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;
    
  useEffect(() => {
    getMovieData(movieId);
  }, [])
  
  const addReview = async (e) => {
    e.preventDefault();
    const rev = revText.current;
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/v1/reviews`, { reviewBody: rev.value, imdbId: movieId });  
      const updatedReviews = [...reviews, { body: rev.value }];
      rev.value = '';
      setReviews(updatedReviews);

    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Container>
      <Row>
        <Col><h3>Reviews</h3></Col>
      </Row>
      <Row className='mt-2'>
        <Col className='review-container' >
          <img src={movie?.poster} alt='' />
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <ReviewForm handleSubmit={addReview} revText={revText} labelText='Write a Review ? '/> 
                </Col>
                <Row>
                  <Col>
                    <hr/>
                  </Col>
                </Row>
              </Row>
            </>
          }
          {
            reviews?.map((r) => {
              return (
                <>
                  <Row>
                    <Col>{r.body}</Col>
                  </Row>
                  <Row>
                    <Col>
                      <hr/>
                    </Col>
                  </Row>
                </>
              )
            })
          }
        </Col>
      </Row>
      <Row>
        <Col>
          <hr/>
        </Col>
      </Row>
    </Container>
  )
}

export default Reviews