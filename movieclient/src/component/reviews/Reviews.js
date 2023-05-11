import { useEffect, useRef } from "react";
import api from '../../api/axiosConfig';
import { useParams } from "react-router-dom";
import {Container, Row, Col, TabContainer} from 'react-bootstrap';
import ReviewForm from "../reviewForm/ReviewForm";

import React from 'react'

const Reviews = ({getMovieData, movie, reviews, setReviews}) => {

  // useRef回傳一個物件,物件會有一個current的屬性
  const revText = useRef();
  let params = useParams();

  // imdbId from api 
  const movieId = params.movieId

  // first load ,調用getMovieData方法,將prop傳遞給Component
  useEffect(()=>{
    getMovieData(movieId);
  },[])


  const addReview = async (e) => {
        e.preventDefault();       //停止事件的默認動作

        const rev = revText.current;


        try {

            const response = await api.post("/api/v1/reviews",{reviewBody:rev.value,imdbId:movieId});

            const updateReviews = [...reviews,{body:rev.value}]

            rev.value="";

            setReviews(updateReviews);

        }catch(err)
        {
            console.log(err);
        }

        

  }

  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <img src={movie?.poster} alt="" />
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                {
                    reviews?.map((r) => {
                        return(
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
                <hr />
            </Col>
        </Row>
    </Container>
  )
}

export default Reviews