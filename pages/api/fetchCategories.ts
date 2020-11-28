import instance from 'lib/axios';
import {ResponseType, CategoryType} from 'types';
import {API} from 'constants/endpoint';

const fetchCategories = async (): Promise<CategoryType[]> =>
  instance.get<ResponseType<CategoryType[]>>(API.getCategories).then((res) => res.data.response);

export default fetchCategories;
