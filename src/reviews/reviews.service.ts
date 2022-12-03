import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRepository } from 'src/customers/customer.repository';
import { PlaceRepository } from 'src/places/place.repository';
import { CreateReviewDto } from './dto/create-review-dto';
import { Review } from './review.entity';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(ReviewRepository)
        private reviewRepository: ReviewRepository,
        @InjectRepository(CustomerRepository)
        private customerRepository: CustomerRepository,
        @InjectRepository(PlaceRepository)
        private placeRepository: PlaceRepository
    ) { }


    async getReviews(): Promise<Review[]> {
        const found = await this.reviewRepository.createQueryBuilder('Review').leftJoinAndSelect('Review.place', 'place').leftJoinAndSelect('Review.customer', 'customer').getMany();

        for(let i = 0; i < found.length; i++){
            delete found[i].customer.accessToken;
            delete found[i].customer.salt;
            delete found[i].customer.password;
        }

        return found;
    }

    async addReview(createReviewDto: CreateReviewDto): Promise<Review> {
        return this.reviewRepository.addReview(createReviewDto, this.placeRepository, this.customerRepository);
    }

    async getReviewById(id: number): Promise<Review> {
        const found = await this.reviewRepository.findOne({ where: { id: id } });

        if (!found) {
            throw new NotFoundException(`Review with ID ${id} not found`);
        }

        return found;
    }

    async deleteReview(id: number): Promise<boolean>{
        const deleted = await this.reviewRepository.delete({id: id});
        if(deleted) return true;
        else return false;
    }
}
