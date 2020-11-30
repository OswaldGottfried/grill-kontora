import {CategoryType} from './category';
import {ProductType} from './product';
import {ResponseType} from './response';

export type {CategoryType, ProductType, ResponseType};

export type MayBe<T> = T | null;
