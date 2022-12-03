import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review-dto';
import { Review } from './review.entity';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
    constructor(private reviewsService: ReviewsService){}


    @Get('')
    getReviews(): Promise<Review[]> {
        return this.reviewsService.getReviews();
    }

    @Post()
    @UsePipes(ValidationPipe)
    addReview(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
        return this.reviewsService.addReview(createReviewDto);
    }

    @Get('/:id')
    getReviewById(@Param('id', ParseIntPipe) id: number): Promise<Review> {
        return this.reviewsService.getReviewById(id);
    }

    @Delete('/:id')
    deleteReview(@Param('id', ParseIntPipe) id: number) {
        return this.reviewsService.deleteReview(id);
    }
}
