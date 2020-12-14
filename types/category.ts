import {Maybe} from 'types';

export type CategoryType = {
  category_id: string;
  category_name: string;
  category_photo: Maybe<string>;
  category_photo_origin: Maybe<string>;
  parent_category: string;
  category_color: string;
  category_hidden: string;
  sort_order: string;
  fiscal: string;
  nodiscount: string;
  tax_id: string;
  left: string;
  right: string;
  level: string;
  category_tag: null;
  visible: Array<{
    spot_id: number;
    visible: number;
  }>;
};
